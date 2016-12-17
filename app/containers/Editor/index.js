import React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

import EditorWrapper from '../../components/EditorWrapper';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(editorState) {
        // console.group();
        // console.log('editor state changed');
        // console.dir(editorState);
        this.props.dispatch(Actions.editorStateChanged(editorState));
    }

    render() {
        return (
            <EditorWrapper
                editorState={this.props.editor.editorState}
                onChange={this.onChange}
            />
        );
    }
}

function mapStateToProps(state) {
    const editor = state.get('editor');
    return { editor };
}

export default connect(mapStateToProps)(Editor);