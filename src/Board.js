import React from 'react';
import Snake from './Snake';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { finished } from 'stream';

// constants
const boardSize = 720;
const cellSize = boardSize / 30;
const bgdColor = '#c2c2c2';
const snakeColor = '#03699c';
const foodColor = '#edda4a';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            snake: {
                head: {
                x: 15,
                y: 15
                },
                tail: {
                x: 15,
                y: 15
                },
                // randomize direction: Up, Down, Left, or Right
                direction: '',
                body: [{x:15, y:15}],
                running: false,
                alive: true,
                speed: 1,
                
                food: {}
            }
        }
    }

    drawGrid() {
        const {ctx} = this.state
        
        // field vs function
        ctx.strokeStyle = '#fae8ff'
        ctx.fillStyle = bgdColor
        ctx.fillRect(0, 0, boardSize, boardSize)

        // horizontal gridlines
        for (var vertical = cellSize; vertical < boardSize; vertical += cellSize){
          ctx.beginPath();
          ctx.moveTo(vertical, 0);
          ctx.lineTo(vertical, boardSize);
          ctx.stroke();
        }
      
        // vertical gridlines
        for (var horizontal = cellSize; horizontal < boardSize; horizontal += cellSize){
          ctx.beginPath();
          ctx.moveTo(0, horizontal);
          ctx.lineTo(boardSize ,horizontal);
          ctx.stroke();
        }
    }

    // Fill cell
    drawRect(x, y, l, h) {
        const {ctx} = this.state
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
    }

    // Check for food overlap with Snake body
    exists(pos) {
        const{snake} = this.state;

        for (var cord in snake.body) {
            if(pos.x === cord.x && pos.y === cord.y) {
                return true;
            }
            return false;
        }
    }

    // Draw food
    drawFood() {
        const {ctx, snake} = this.state;
        ctx.fillStyle = foodColor;

        var position = {
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 30)
        }

        while (this.exists(position)) {
            position.x = Math.floor(Math.random() * 30);
            position.y = Math.floor(Math.random() * 30);
        }
        
        this.setState({
            food: position
        })

        this.drawRect(position.x, position.y,1,1);
    }

    // Snake states
    drawSnake(){
        const {ctx, snake} = this.state
        ctx.fillStyle = snakeColor;
        snake.body.forEach(cord => {
        ctx.fillRect(cord.x * cellSize, cord.y * cellSize, 1 * cellSize, 1 * cellSize);
        })
    }

    //add snake body once food is eaten
    addBody() {
        const{ctx,snake} = this.state;
        var newTail = {};
        switch (snake.direction) {
            case 'up':
                newTail = {x: snake.tail.x, y: snake.tail.y - 1}
                break;
            case 'down':
                newTail = {x: snake.tail.x, y: snake.tail.y + 1}
                break;
            case 'left':
                newTail = {x: snake.tail.x - 1, y: snake.tail.y}
                break;
            case 'right':
                newTail = {x: snake.tail.x + 1, y: snake.tail.y}
                break;
            default:
                break;
        }

        snake.body.push(newTail);
        snake.tail = newTail;
        
    }

    // Speed up and down 
    // UP: once food is eaten
    speedUp(){
        let newState = Object.assign({}, this.state);
        newState.snake.speed = this.state.snake.speed + 2;        
        this.setState(newState);
    }

    speedDown(){
        let newState = Object.assign({}, this.state);
        newState.snake.speed = this.state.snake.speed / 2;        
        this.setState(newState);
    }

    // moves snake:  remove tail and color the head
    canvasMoveSnake(){
        const {ctx, snake,food} = this.state
        ctx.fillStyle = bgdColor;
        this.drawRect(snake.tail.x,snake.tail.y,1,1);
        ctx.fillStyle = snakeColor;
        this.drawRect(snake.head.x,snake.head.y,1,1);

        if (snake.head.x === food.x && snake.head.y === food.y) {
            this.addBody();
            this.drawFood();
            this.speedUp();
        }

        if (snake.alive === false && snake.running === false){
            this.endGame();
        }

        
    }

    changeDirection (direction) {
        let newState = Object.assign({}, this.state);
        newState.snake.direction = direction;
        this.setState(newState);
        this.canvasMoveSnake();
    }

    // End Game UI
    endGame(){
        const {ctx} = this.state

        let newState = Object.assign({}, this.state);
        newState.snake.running = false;
        newState.snake.alive = false;
        this.setState(newState);

        //Horizonal Lines
        ctx.fillStyle = 'black';
        this.drawRect(5,9,4,1);
        this.drawRect(5,13,4,1);
        this.drawRect(6,16,2,1);
        this.drawRect(6,20,2,1);
        this.drawRect(11,9,2,1);
        this.drawRect(11,12,2,1);
        this.drawRect(17,16,3,1);
        this.drawRect(17,18,3,1);
        this.drawRect(17,20,3,1);
        this.drawRect(22,9,3,1);
        this.drawRect(22,11,3,1);
        this.drawRect(22,13,3,1);
        this.drawRect(22,16,2,1);
        this.drawRect(22,18,2,1);

        //Vertical Lines
        this.drawRect(5,10,1,3);
        this.drawRect(5,17,1,3);
        this.drawRect(8,17,1,3);
        this.drawRect(10,16,1,3);
        this.drawRect(10,10,1,4);
        this.drawRect(13,10,1,4);
        this.drawRect(14,16,1,3);
        this.drawRect(15,9,1,5);
        this.drawRect(16,16,1,5);
        this.drawRect(19,9,1,5);
        this.drawRect(21,9,1,5);
        this.drawRect(21,16,1,5);
        this.drawRect(24,19,1,2);

        //Dots
        this.drawRect(7,11,1,1);
        this.drawRect(8,12,1,1);
        this.drawRect(11,19,1,1);
        this.drawRect(12,20,1,1);
        this.drawRect(13,19,1,1);
        this.drawRect(16,10,1,1);
        this.drawRect(17,11,1,1);
        this.drawRect(18,10,1,1);
        this.drawRect(24,17,1,1);
    }

    drawBoard() {
        var canvas = this.refs.gameBoard
        var ctx = canvas.getContext('2d')

        // shortcut to setState
        this.setState(
            {
                canvas: canvas,
                ctx: ctx
            }, 
            // board presets
            function () {
                this.drawGrid();
                this.drawSnake();
                this.drawFood();
            }   
        )  
    }

    resetBoard() {

        this.setState({
            snake: {
                head: {
                x: 15,
                y: 15
                },
                tail: {
                x: 15,
                y: 15
                },
                // randomize direction: Up, Down, Left, or Right
                direction: '',
                body: [{x:15, y:15}],
                running: false,
                alive: true,
                speed: 1,
                
                food: {}
            }
        });

        // redraw board
        this.drawBoard();
    }

    // React automatically draws board after initiation
    componentDidMount() {
        this.drawBoard();
    }

    render() {
        return (
            <div id='gameContainer' className='container-fluid'>
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
                
                <KeyboardEventHandler
                    handleKeys={['r', 'esc']}
                    onKeyEvent={(key, e) => {

                        if(key === 'r'){
                            this.resetBoard();
                        }
                        
                        if(key === 'esc'){
                            this.endGame();
                        }
                    }}
                 />

                <Snake snake={this.state.snake}
                    changeDirection={this.changeDirection.bind(this)}
                 />

            </div>
        )
    }
}

export default Board