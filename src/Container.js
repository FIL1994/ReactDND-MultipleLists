import React, {Component} from 'react';
import update from 'immutability-helper';
import Card from './Card';
import {DropTarget} from 'react-dnd';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: props.list};

    this.pushCard = this.pushCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  pushCard(card) {
    this.setState(update(this.state, {
      cards: {
        $push: [ card ]
      }
    }));
  }

  removeCard(index) {
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const {cards} = this.state;
    const {canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;
    const style = {
      width: "200px",
      height: "404px",
      border: "1px dashed gray"
    };

   const backgroundColor = isActive ? "lightgreen" : "#FFF";

   return connectDropTarget(
     <div style={{...style, backgroundColor}}>
       {
         cards.map((card, i) =>
           <Card
            key={card.id}
            index={i}
            listId={this.props.id}
            card={card}
            removeCard={this.removeCard}
            moveCard={this.moveCard}
           />)
       }
     </div>
   );
  }
}

const cardTarget = {
  /* Analyses if the container's id is different from the container's id of the object being dropped.
   * If positive then push the element. don't need to push elements when the containers are the same
   */
  drop(props, monitor, component) {
    const {id} = props;
    const sourceObj = monitor.getItem();
    if(id !== sourceObj.listId) {
      component.pushCard(sourceObj.card);
    }
    return {
      listId: id
    }
  }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container);