import React, { Component } from 'react';

import Weekday from './weekday';
import DayBlock from './dayBlock';

export default class App extends Component {
  renderDays = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days.map(day => <Weekday day={day} />)
  }
  render() {
    return (
      <div className='app'>
        <div className="header">
            <button>Previous Month</button>
            <h1>November</h1>
            <button>Next Month</button>
        </div>
        <div className="calendar-wrapper">
            <div className="days-wrapper">
                {this.renderDays()}
            </div>
            <div className="blocks-wrapper">
                <DayBlock date="27" />
            </div>
        </div>
        <div className="footer">
            <h1>2019</h1>
        </div>
      </div>
    );
  }
}
