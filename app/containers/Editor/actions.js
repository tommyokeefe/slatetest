export const EDITOR_STATE_CHANGED = 'EDITOR_STATE_CHANGED';
export const ASSET_DROPPED = 'ASSET_DROPPED';

export function editorStateChanged(state) {
  return {
    type: EDITOR_STATE_CHANGED,
    payload: { state },
  };
}

export function assetDropped(key, parentKey) {
  return {
    type: ASSET_DROPPED,
    payload: { key, parentKey },
  };
}
