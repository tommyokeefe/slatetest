import React from 'react';

import { Editor } from 'slate';

import createAssetPlugin from '../containers/Editor/plugins/slate-asset-plugin';

const onDropDead = (event) => {
  event.preventDefault();
  return null;
};

export default class EditorWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.plugins = [
      createAssetPlugin(props),
    ];
  }

  render() {
    return (
      <div
        className="pickle"
        onDrop={this.props.onDropping}
      >
        <Editor
          state={this.props.state.state}
          schema={this.props.state.schema}
          plugins={this.plugins}
          onChange={this.props.onChange}
          contentEditable={true}
          onDrop={onDropDead}
          onDragEnd={onDropDead}
        />
      </div>
    );
  }
}
