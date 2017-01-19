// import {
//     EditorState,
//     Modifier,
//     SelectionState,
//     Entity,
//     CharacterMetadata,
//     ContentBlock,
//     genKey,
//     BlockMapBuilder,
// } from 'draft-js';

import * as Actions from './actions';
import * as AssetActions from './plugins/slate-asset-plugin/actions/actions';

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
          text: 'write me',
        },
      ],
    },
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

export default function editor(passedState, action) {
  // console.log(state);
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
    console.log('hell');
      return {
        ...state,
        state: action.payload.state,
      };

    case AssetActions.ASSET_CREATED:
      return {
        ...state,
        state: state.state.transform().setBlock('asset').apply(),
      };

    case Actions.ASSET_DROPPED:
      // console.log('hee');
      // console.log(action.payload.key);
      // const payloadData = JSON.parse(action.payload.eventData.dataTransfer.getData('text'));
      // console.log(payloadData);
      // const fudge = state.state.transform().undo().apply();
      // const newState = fudge.transform().setBlock('hell').apply();

      // const newKey = state.state.selection.anchorKey;
      // console.log(payloadData);

      // const newState = state.state.transform()
        // .moveNodeByKey(action.payload.key, action.payload.parentKey, newKey).apply();


      // const newState = state.state.transform().insertBlock(payloadData).apply();
      // const newState2 = newState.transform()
      // const fudge = newerState.transform().undo().apply();
      const newerState = state.state.transform().removeNodeByKey(action.payload.key).apply();


      return {
        ...state,
        state: newerState,
      };

    default:
      return state;
  }
}
