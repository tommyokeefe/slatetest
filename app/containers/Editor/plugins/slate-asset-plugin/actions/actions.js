export const ASSET_DROPPED = 'ASSET_DROPPED';
export const ASSET_CREATED = 'ASSET_CREATED';

export function assetCreated() {
  return {
    type: ASSET_CREATED,
  };
}
