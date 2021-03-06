import React from 'react';

export default class Asset extends React.Component {

  constructor(props){
    super(props);
    this.randomNum = Math.random(1,10);
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '10px',
      margin: '5px auto'
    };

    const start = (e) => {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData("text", JSON.stringify(this.props.node));
    };

    return (
      <div
        contentEditable={true}
        onDragStart={start}
        draggable="true"
        style={style}
        {...this.props.attributes}
      >
        {this.props.children}
      </div>
    );
  }
}
