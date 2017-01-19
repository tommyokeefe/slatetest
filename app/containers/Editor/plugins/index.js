import React from 'react';
import assetPlugin from './slate-asset-plugin/components/AssetSlate';

const getSchema = () => {
  return {
    nodes: {
      asset: assetPlugin,
    },
  };
};

export default {
  getSchema,
};
