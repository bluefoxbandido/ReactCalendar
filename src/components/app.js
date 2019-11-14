import React, { Component } from 'react';

import Weekday from './weekday';
import DayBlock from './dayBlock';

import monthData from "../../static/assets/dummyData.json"

export default class App extends Component {
  constructor(props){
    super (props)

    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.month = "November"

    this.state = monthData[this.month]
  }

  handleMonthChange(direction) {
    let currentMonthIndex = this.months.indexOf(this.month)
    
    direction === "+" ? currentMonthIndex++ : currentMonthIndex--
    
    this.month = this.months[currentMonthIndex]

    this.setState(monthData[this.month])

    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  renderDays = () => {
    return this.days.map(day => <Weekday day={day} />)
  }
  
  renderBlocks = () => {
    const blocks = [];
    let fillerDate = (this.state.daysInPreviousMonth - this.days.indexOf(this.state.startDay)) + 1;
    while (fillerDate <= this.state.daysInPreviousMonth){
      blocks.push(<DayBlock date={fillerDate} filler={true}/>)
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
        <div className="content-wrapper">
          <div className="header">
              <button onClick={() => this.handleMonthChange("-")}>Previous Month</button>
              <h1>{this.state.month}</h1>
              <button onClick={() => this.handleMonthChange("+")}>Next Month</button>
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
      </div>
    );
  }
}
