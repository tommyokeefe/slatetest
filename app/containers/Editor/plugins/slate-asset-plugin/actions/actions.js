export const ASSET_DROPPED = 'ASSET_DROPPED';
export const ASSET_CREATED = 'ASSET_CREATED';

// export function assetDropped(key, parentKey) {
//   return {
//     type: ASSET_DROPPED,
//     payload: { key, parentKey },
//   };
// }

export function assetCreated() {
  return {
    type: ASSET_CREATED,
  };
}
