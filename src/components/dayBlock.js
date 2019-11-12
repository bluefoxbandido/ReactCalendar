import React, { Component } from 'react';

export default class DayBlock extends Component {
    constructor(props){
        super(props);

        this.state = {

        } //End Constructor

    }
    render(){
        return (
            <div className="day-block">
                <div className="date">{this.props.date}</div>
                
                <textarea className="calendar-input" />
            </div>
        )
    }
}