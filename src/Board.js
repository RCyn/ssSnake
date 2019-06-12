import React from 'react'

// constants
const boardSize = 720
const cellSize = boardSize / 30

class Board extends React.Component {
    constructor(props){
        super(props);
    }

    drawGrid() {
        const {ctx} = this.state
        
        // field vs function
        ctx.strokeStyle = '#fae8ff'
        ctx.fillStyle = '#4b4959'
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
            }   
        )
    }

    // React automatically draws board after initiation
    componentDidMount() {
        this.drawBoard()
    }

    render() {
        return (
            <div id='gameContainer' className='container-fluid'>
                <canvas id='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
            </div>
        )
    }
}

export default Board