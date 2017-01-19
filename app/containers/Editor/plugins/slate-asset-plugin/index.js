import Asset from './components/AssetSlate';
import * as Actions from './actions/actions';
import keycode from 'keycode';

export default function createAssetPlugin(props) {

  return {
    onKeyDown(event, data, state) {
      if (event.which != 191 || !event.metaKey) return null;

      props.dispatch(Actions.assetCreated());
    },
  };

}
