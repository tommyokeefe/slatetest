import React from 'react';
import { connect } from 'react-redux';

import * as Actions from './actions';

import EditorWrapper from '../../components/EditorWrapperSlate';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(state) {
    this.props.dispatch(Actions.editorStateChanged(state));
    return null;
  }

  render() {
    const outerWrapperStyle = {
      width: 400,
      margin: '100px auto',
    };
    const editorWrapperStyle = {
      minHeight: 400,
      border: '1px black solid',
      padding: '5px',
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
