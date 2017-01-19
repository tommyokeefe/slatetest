import * as Actions from '../actions/actions';
import { List, Repeat } from 'immutable';
import { Editor, Raw } from 'slate';

import Plugins from '../../../plugins';

const initialState = Raw.deserialize({
  nodes: [
    {
      kind: 'block',
      type: 'paragraph',
      nodes: [
        {
          kind: 'text',
          text: 'write me',
        },
      ],
    },
  ],
}, { terse: true });

export default function assetReducer(passedState, action) {
  let state = passedState;
  if (!passedState) {
    state = {
      state: initialState,
      // Add a "schema" to our app's state that we can pass to the Editor.
      schema: Plugins.getSchema(),
    };
  }

  switch (action.type) {
    case Actions.ASSET_CREATED:
      const returnMe = {
        ...state,
        state: state.state.transform().setBlock('asset').apply(),
      };
      return returnMe;
      // const editorStateWithFocus = addBlock(state.editorState);

      // return {
      //   ...state,
      //   editorState: editorStateWithFocus,
      // };

    // case Actions.ASSET_DROPPED:
      // const blockKey = action.payload.eventData.dataTransfer.getData('text');
      // const stateWithMovedAsset = moveBlock(state.editorState, blockKey);

      // return {
      //   ...state,
      //   editorState: stateWithMovedAsset,
      // };
    default:
      return state;
  }
}
