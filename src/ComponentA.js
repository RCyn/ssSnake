import React from 'react'

class ComponentA extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            // this is not TOO important YET
            display: 'Hello World!'
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(){
        let newState = Object.assign({}, this.state)
        
        newState.toggle = !newState.toggle
        if (newState.toggle) {
            newState.display = 'Goodbye World.'
        }else {
            newState.display = 'Hello World!'
        }
        this.setState(newState)
    }

    render(){
        return(
            <div className='ComponentA'>
                {this.state.display}
                <button onClick={this.clickHandler}>
                    {this.state.toggle ? 'ON' : 'OFF'}
                </button>
            </div>
        )
    }
}

export default ComponentA