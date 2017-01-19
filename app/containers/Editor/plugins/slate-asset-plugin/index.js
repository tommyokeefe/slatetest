import Asset from './components/AssetSlate';
import * as Actions from './actions/actions';
import keycode from 'keycode';

export default function createAssetPlugin(props) {

  return {
    onDrop(event, data, state, editor) {
      event.preventDefault();
      // console.log(event);
      // const node = JSON.parse(event.dataTransfer.getData('text'));
      // props.dispatch(Actions.assetDropped(node.key, node.parentKey));
      return null;
    },
    onKeyDown(event, data, state) {
      if (event.which != 191 || !event.metaKey) return null;

      props.dispatch(Actions.assetCreated());
    },
  };
  // const ASSET = 'asset';

  // const blockRendererFn = (block) => {
  //   const type = block.getType();
  //   switch (type) {
  //     case ASSET:
  //       return {
  //         component: Asset,
  //         editable: false,
  //         props: {},
  //       };

  //     default:
  //       return null;
  //   }
  // };

  // const extendedBlockRenderMap = Map({
  //   [ASSET]: {
  //     element: 'div',
  //   },
  // });

  // const blockRenderMap = DefaultDraftBlockRenderMap.merge(extendedBlockRenderMap);

  // return {
  //   blockRendererFn,
  //   blockRenderMap,
  // };
}
