import React, { Component } from 'react';

export default class App extends Component {
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

            </div>
            <div className="blocks-wrapper">

            </div>
        </div>
        <div className="footer">
            <h1>2019</h1>
        </div>
      </div>
    );
  }
}
