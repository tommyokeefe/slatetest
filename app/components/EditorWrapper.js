import React from 'react';

import Editor from 'draft-js-plugins-editor';

export default class EditorWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Editor
                editorState={this.props.editorState}
                onChange={this.props.onChange}
            />
        );
    }
}