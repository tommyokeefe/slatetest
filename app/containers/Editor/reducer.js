import { EditorState } from 'draft-js';

import * as Actions from './actions';

const initialState = {
    editorState: EditorState.createEmpty(),
};

export default function editor(state = initialState, action) {
    switch (action.type) {
        case Actions.EDITOR_STATE_CHANGED:
            return {
                ...state,
                editorState: action.payload.editorState,
            };
        default:
           return state;
    }
}