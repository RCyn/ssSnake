import React from 'react';
import Snake from './Snake';

// constants
const boardSize = 720;
const cellSize = boardSize / 30;
const bgdColor = '#4b4959';
const snakeColor = '#03699c';

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
              speed: 1
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

    // Snake states
    drawSnake(){
        const {ctx, snake} = this.state
        ctx.fillStyle = snakeColor;
        snake.body.forEach(cord => {
        ctx.fillRect(cord.x * cellSize, cord.y * cellSize, 1 * cellSize, 1 * cellSize);
        })
    }

    // Fill cell
    drawRect(x, y, l, h) {
        const {ctx} = this.state
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
    }

    // moves snake:  remove tail and color the head
    canvasMoveSnake(){
        const {ctx, snake} = this.state
        ctx.fillStyle = bgdColor;
        this.drawRect(snake.tail.x,snake.tail.y,1,1);
        ctx.fillStyle = snakeColor;
        this.drawRect(snake.head.x,snake.head.y,1,1);
    }

    changeDirection (direction) {
        let newState = Object.assign({}, this.state);
        newState.snake.direction = direction;
        this.setState(newState);
        this.canvasMoveSnake();
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
            }   
        )


        
    }

    // React automatically draws board after initiation
    componentDidMount() {
        this.drawBoard();
    }

    render() {
        return (
            <div id='gameContainer' className='container-fluid'>
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />

                <Snake snake={this.state.snake}
                    changeDirection={this.changeDirection.bind(this)}
                 />

            </div>
        )
    }
}

export default Board