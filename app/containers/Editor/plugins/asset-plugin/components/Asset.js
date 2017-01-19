import React from 'react';

export default class Asset extends React.Component {

  constructor(props){
    super(props);
    this.randomNum = Math.random(1,10);
  }

  render() {
    const { block } = this.props;
    const key = block.getKey();
    const style = {
      border: '1px solid black',
      padding: 5,
      margin: '5px auto'
    };

    const drop = (x) => {};
    const start = (e) => {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData("text", block.key);
      // console.log(e.dataTransfer.getData("text"));
    };

    return (
      <div
        contentEditable={false}
        onDragStart={start}
        draggable="true"
        style={style}
        onDrop={drop}
        onDragEnd={drop}
      >
        {block.getText() || this.randomNum}
      </div>
    );
  }
}
