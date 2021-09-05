import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () =>{
  //range of numbers between 1 to 98 
  let min =1;
  let max =98;
  //coordinates of snake's food
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

//object
const initialState = {
 
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',   
   // represent the snake as an Array of the Arrays
  // when each Array is a set of coordinates on X and Y axis
  snakeDots: [
    [0,0],
    [2,0],
  ]
}

class App extends Component {

  // save the snake position in the state
  state = initialState;

  //once componentDidMount then listen to the on-key-down event
  //bring snake to life and make it move
  componentDidMount() {

    //will trigger moveSnake method (at the bottom) every 500ms
    setInterval(this.moveSnake, this.state.speed); 
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders()
    //this.checkIfTouch() //checks if the snake touch itself 
    this.checkIfEat()
  }

  onKeyDown = (e) =>{
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1]; //the head is the last item of an array

    switch (this.state.direction) { //using switch to check the current direction and update the head
      case 'RIGHT':
        head = [head[0] + 2, head[1]]; //jumping by 2 in X axis
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]; // X axis
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]; //jumping by 2 in Y axis
        break;
      case 'UP':
        head = [head[0], head[1] - 2]; // Y axis
        break;
    }
    dots.push(head); //saving (adding) new head to body
    dots.shift(); // remove the first item from the array
    this.setState({ 
      snakeDots: dots
    })
  }

  //to make sure the snake game will start over when touch the borders (out of the game-area)
  // we will call this method (checkIfOutOfBorders) on each state update 
  checkIfOutOfBorders() {
    //head=finding the last item of the snake's array
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      //alert to the user 
      this.onGameOver();
    }
  }

  // //checks if the snake touch itself
  // checkIfTouch() {
  //   //getting the current position of the snake
  //   let snake = [...this.state.snakeDots];
  //   let head = snake[snake.length - 1];
  //   snake.pop();
  //   snake.forEach(dot => {
  //     if (head[0] == dot[0] && head[1] == dot[1]) {
  //       this.onGameOver();
  //     }
  //   })
  // }

  //checks if the snake eat the food
  checkIfEat() {
    //head=finding the last item of the snake's array
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    //food=finding the food state
    let food = this.state.food;

    //if true - the snake touch the food and update the new food position
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.increaseSnake(); //increase the snake size
    }
  }

  //copying the snake from the state, adding new item to the tail with unshift method
  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]) //adding new item to the tail (and delete another item from the tail)
    this.setState({
      snakeDots: newSnake //saving the new snake to the state 
    })
  }

  //the alert GAME OVER and shows the snake's length
  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    //reset the game
    this.setState(initialState)
  }

  render(){
    return (
      <div className="game-area">
        <Snake snakeDots = {this.state.snakeDots}/>
        <Food dot = {this.state.food}/>
        
      </div>
    );
  }
}
  
export default App;