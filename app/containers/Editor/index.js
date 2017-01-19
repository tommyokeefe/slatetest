import React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

import EditorWrapper from '../../components/EditorWrapperSlate';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onAssetDropped = this.onAssetDropped.bind(this);
  }

  onEditorChange(state) {
    console.log(state.document.nodes);
    this.props.dispatch(Actions.editorStateChanged(state));
    return null;
  }

  // onAssetCreated() {
  //   this.props.dispatch(Actions.assetCreated());
  // }

  onAssetDropped(event, data, state, editor) {
    event.preventDefault();
    console.log(event);
    const node = JSON.parse(event.dataTransfer.getData('text'));
    this.props.dispatch(Actions.assetDropped(node.key, node.parentKey));
  }

  render() {
    const outerWrapperStyle = {
      width: 400,
      margin: '20px auto',
    };
    const editorWrapperStyle = {
      minHeight: 400,
      border: '1px black solid',
      padding: '5px',
    };
    const buttonStyle = {
      padding: 10,
      margin: '10px auto',
      border: '1px black solid',
    };
    return (
      <div
        style={outerWrapperStyle}
      >
        <div style={editorWrapperStyle}>
          <EditorWrapper
            state={this.props.editor}
            onChange={this.onEditorChange}
            dispatch={this.props.dispatch}
            onDropping={this.onAssetDropped}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const editor = state.get('editor');
  return { editor };
}

export default connect(mapStateToProps)(Editor);
