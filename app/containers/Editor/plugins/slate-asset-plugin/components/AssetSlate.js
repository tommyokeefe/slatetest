import React from 'react';

export default class Asset extends React.Component {

  constructor(props){
    super(props);
    this.randomNum = Math.random(1,10);
  }

  render() {
    // console.log(this.props);
    // const { block } = this.props;
    // const oldNode = this.props.node;
    // const node = oldNode.merge({ parentKey: this.props.parent.key });
    const node = { parentKey: this.props.parent.key, key: this.props.node.key };
    const style = {
      border: '1px solid black',
      padding: 5,
      margin: '5px auto'
    };

    const start = (e) => {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData("text", JSON.stringify(node));
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
