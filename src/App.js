import React, { Component } from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class App extends Component {
  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    };

    const listOne = [
      {id: 0, text: "Item 1"},
      {id: 1, text: "Item 2"}
    ];

    const listTwo = [
      {id: 2, text: "Item 3"}
    ];

    const listThree = [
      {id: 3, text: "Item 4"},
      {id: 4, text: "Item 5"},
      {id: 5, text: "Item 6"},
    ];

    return (
      <div style={{...style}}>
        <Container id={0} list={listOne} />
        <Container id={1} list={listTwo} />
        <Container id={2} list={listThree} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
