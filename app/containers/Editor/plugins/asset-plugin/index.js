import Asset from './components/Asset';
import { DefaultDraftBlockRenderMap } from 'draft-js';

import { Map } from 'immutable';

export default function createAssetPlugin() {
  const ASSET = 'asset';

  const blockRendererFn = (block) => {
    const type = block.getType();
    switch (type) {
      case ASSET:
        return {
          component: Asset,
          editable: false,
          props: {},
        };

      default:
        return null;
    }
  };

  const extendedBlockRenderMap = Map({
    [ASSET]: {
      element: 'div',
    },
  });

  const blockRenderMap = DefaultDraftBlockRenderMap.merge(extendedBlockRenderMap);

  return {
    blockRendererFn,
    blockRenderMap,
  };
}
