import React from 'react';

export default class InnerAsset extends React.Component {

  constructor(props){
    super(props);
    this.randomNum = Math.random(1,10);
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: 5,
      margin: '5px auto'
    };

    const start = (e) => {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData("text", JSON.stringify(this.props.node));
    };

    return (
      <div
        contentEditable={false}
        onDragStart={start}
        draggable="true"
        style={style}
      >
        {this.randomNum}
      </div>
    );
  }
}
