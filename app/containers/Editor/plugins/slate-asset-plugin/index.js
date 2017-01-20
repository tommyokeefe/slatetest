import Asset from './components/AssetSlate';
import keycode from 'keycode';
import { Block } from 'slate';

export default function createAssetPlugin(props) {

  return {
    onDrop(event, data, state, editor) {
      event.preventDefault();
      const payloadData = JSON.parse(event.dataTransfer.getData('text'));

      return state.transform()
        .removeNodeByKey(payloadData.key)
        .moveTo(data.target)
        .insertBlock({type:'innerAsset'})
        .setBlock({
          data: payloadData.data,
          isVoid: payloadData.isVoid,
          nodes: payloadData.nodes,
        })
        .splitBlock()
        .setBlock('text')
        .apply();
    },
    onKeyDown(event, data, state, editor) {
      if ((event.which != 191 && event.which != 190) || !event.metaKey) return null;

      if (event.which == 191) {
        return state.transform()
          .insertBlock('asset')
          .splitBlock()
          .setBlock('text')
          .apply();
      }

      if (event.which == 190) {
        return state.transform()
          .insertBlock('innerAsset')
          .splitBlock()
          .setBlock('text')
          .apply();
      }
    },
  };

}
