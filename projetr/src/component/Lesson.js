import React, { Component } from 'react';


class Lesson extends Component{
    constructor(props){
        super(props);

        this.title = props.title;
    }
    render(){
        return(<div>
                <p>{this.title}</p>
                <button>click me</button>
            </div>
        );
    }
}

export default (Lesson);