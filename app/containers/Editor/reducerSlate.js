import * as Actions from './actions';

import { List, Repeat } from 'immutable';

import { Editor, Raw } from 'slate';

import Plugins from './plugins';

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'type here...',
        },
      ],
    },
  ],
}, { terse: true });

export default function editor(passedState, action) {
  let state = passedState;
  if (!passedState) {
    state = {
      state: initialState,
      // Add a "schema" to our app's state that we can pass to the Editor.
      schema: Plugins.getSchema(),
    };
  }

  switch (action.type) {
    case Actions.EDITOR_STATE_CHANGED:
      return {
        ...state,
        state: action.payload.state,
      };

    default:
      return state;
  }
}
