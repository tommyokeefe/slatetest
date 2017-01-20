import React from 'react';
import assetPlugin from './slate-asset-plugin/components/AssetSlate';
import innerAssetPlugin from './slate-asset-plugin/components/InnerAsset';

const getSchema = () => {
  return {
    nodes: {
      asset: assetPlugin,
      innerAsset: innerAssetPlugin,
    },
  };
};

export default {
  getSchema,
};
