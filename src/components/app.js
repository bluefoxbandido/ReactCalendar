import React, { Component } from 'react'

import Weekday from './weekday'
import DayBlock from './dayBlock'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    this.state = {}
    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  componentDidMount() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const today = new Date()
    const date = today.getDate()
    const month = months[today.getMonth()]
    const year = today.getFullYear()

    fetch(`http://127.0.0.1:5000/month/get/${month}/${year}`, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          month: data[1],
          year: data[2],
          daysInMonth: data[3],
          daysInPreviousMonth: data[4],
          startDay: data[5],
          previousMonth: data[6],
          nextMonth: data[7],
          date: date,
          trueMonth: month
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleMonthChange(direction) {
    fetch(`http://127.0.0.1:5000/month/get/${direction === "+" ? this.state.nextMonth : this.state.previousMonth}/2019}`, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          month: data[1],
          year: data[2],
          daysInMonth: data[3],
          daysInPreviousMonth: data[4],
          startDay: data[5],
          previousMonth: data[6],
          nextMonth: data[7]
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderDays = () => {
    return this.days.map(day => <Weekday day={day} />)
  }

  renderBlocks = () => {
    const blocks = [];
    let fillerDate = (this.state.daysInPreviousMonth - this.days.indexOf(this.state.startDay)) + 1;
    while (fillerDate <= this.state.daysInPreviousMonth) {
      blocks.push(<DayBlock date={fillerDate} month={this.state.previousMonth} year={this.state.year} filler={true} />)
      fillerDate++;
    }
    for (let i = 1; i <= this.state.daysInMonth; i++) {
      blocks.push(<DayBlock date={i} month={this.state.month} year={this.state.year} active={i == this.state.date && this.state.month == this.state.trueMonth ? true : false} />)
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
