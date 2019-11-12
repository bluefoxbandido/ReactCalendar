import React, { Component } from 'react';

import Weekday from './weekday';
import DayBlock from './dayBlock';

export default class App extends Component {
  constructor(props){
    super (props)

    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    this.state = {
      month : "November",
      year: "2019",
      daysInMonth: 30,
      daysInPreviousMonth: 31,
      startDay: "Friday"
    }
  }
  renderDays = () => {
    return this.days.map(day => <Weekday day={day} />)
  }

  renderBlocks = () => {
    const blocks = [];
    let fillerDate = (this.state.daysInPreviousMonth - this.days.indexOf(this.state.startDay)) + 1;

    while (fillerDate <= this.state.daysInPreviousMonth){
      blocks.push(<DayBlock date={fillerDate} />)
      fillerDate++;
    }

    for (let i = 1; i <= this.state.daysInMonth; i++){
      blocks.push(<DayBlock date={i} />)
    }

    return blocks
  }

  render() {
    return (
      <div className='app'>
        <div className="header">
            <button>Previous Month</button>
            <h1>{this.state.month}</h1>
            <button>Next Month</button>
        </div>
        <div className="calendar-wrapper">
            <div className="days-wrapper">
                {this.renderDays()}
            </div>
            <div className="blocks-wrapper">
                {this.renderBlocks()}
            </div>
        </div>
        <div className="footer">
            <h1>{this.state.year}</h1>
        </div>
      </div>
    );
  }
}
