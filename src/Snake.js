import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import _ from 'lodash';

class Snake extends React.Component{
    // Check for self-collision
    selfCollide() {
        const snake = this.props.snake;
        return snake.body.some(cord => _.isEqual(cord, snake.head)) || _.isEqual(snake.head, snake.tail)
    }

    run() {
        this.props.snake.running = true;
        var running = setInterval(() => {
            const snake = this.props.snake;

            switch(snake.direction){
                
                case 'up':
                    snake.head.y -= 1;
                    break;
                case 'down':
                    snake.head.y += 1;
                  break;
                case 'left':
                    snake.head.x -= 1;
                    break;
                case 'right':
                    snake.head.x += 1;
                    break;
                default:
                break;
            }

            if(this.props.snake.running === false){
                clearInterval(running);
            }
            else if (snake.head.x > 29 || snake.head.y > 29 || snake.head.x < 0 || snake.head.y < 0 || this.selfCollide()) {
              snake.running = false
              snake.alive = false
              clearInterval(running);
            }

            // store new head in body array & delete tail from array
            snake.body.unshift({x:snake.head.x, y:snake.head.y});
            snake.tail = snake.body.pop();

            

            this.props.changeDirection(snake.direction);
        }, 200 / this.props.snake.speed);
    }

    render() {
       return(
            <div id="Snake">

                <KeyboardEventHandler
                    handleKeys={['left', 'up', 'right', 'down', 'space',]}
                    onKeyEvent={(key, e) => {
                        if (!this.props.snake.running && this.props.snake.alive ){
                            this.run()
                        }

                        const direction = this.props.snake.direction;

                        if (key === 'up' && (direction === 'down' || direction === 'up')) {
                            return
                        } else if (key === 'down' && (direction === 'down' || direction === 'up')) {
                            return
                        } else if (key === 'left' && (direction === 'left' || direction === 'right')) {
                            return
                        } else if (key === 'right' && (direction === 'left' || direction === 'right')) {
                            return
                        }
                            
                        this.props.changeDirection(key)
                        
                        
                    }}
                 />

            </div>
       );
   }
}

export default Snake;