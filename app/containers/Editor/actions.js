export const EDITOR_STATE_CHANGED = 'EDITOR_STATE_CHANGED';

export function editorStateChanged(state) {
  return {
    type: EDITOR_STATE_CHANGED,
    payload: { state },
  };
}

