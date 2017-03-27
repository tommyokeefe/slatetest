import React from 'react';
import { Editor } from 'slate';
import RichTextMenu, { getRichTextSchema, createRichTextPlugin } from '@npr/slate-rich-text-toolbar-plugin';
import '@npr/slate-rich-text-toolbar-plugin/dist/RichTextToolbar.css';

import { storytextPrimary } from '../utils/richTextMenuConfig';
import serialzer from '../utils/slateSerializer';


export default class EditorWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.plugins = [
      createRichTextPlugin(serialzer.deserialize),
    ];
  }

  render() {
    return (
      <div>
        <Editor
          state={this.props.state.state}
          schema={getRichTextSchema()}
          plugins={this.plugins}
          onChange={this.props.onChange}
        />
        <RichTextMenu
          editorState={this.props.state.state}
          onEditorChange={this.props.onChange}
          primaryButtons={storytextPrimary}
          editorElement={this.editorElement}
        />
      </div>
    );
  }
}
