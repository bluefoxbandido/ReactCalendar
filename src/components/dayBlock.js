import React, { Component } from 'react';

export default class DayBlock extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: "",
            noteExists: false
        } //End Constructor
        this.handleChange = this.handleChange.bind(this)
        this.handleLoseFocus = this.handleChange.bind(this)
    }
    componentDidMount() {
        fetch(`http://127.0.0.1:5000/note/get/${this.props.date}/${this.props.month}/${this.props.year}`, {
            headers: { "content-type": "application/json" }
        })
        .then(request => request.json())
        .then(data => {
            if (data) {
                this.setState({
                    text: data[0],
                    noteExists: true
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleChange = () => {
        this.setState({
            text: event.target.value
        })
    }
    handleLoseFocus = () => {
        if (!this.state.noteExists && this.state.text !== ""){
            fetch(`http://127.0.0.1:5000/note/input/`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    day: this.props.date,
                    month: this.props.month,
                    year: this.props.year,
                    text:this.state.text
                })
            })
            .then(response => {
                this.setState({
                    noteExists: true
                })
            })
            .catch(error => {
                console.log(error)
            })
        } else if (this.state.noteExists && this.state.text !== ""){
            fetch(`http://127.0.0.1:5000/note/update/${this.props.date}/${this.props.month}/${this.props.year}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    text: this.state.text
                })
            })
            .catch(error => {
                console.log(error)
            })
        } else if(this.state.noteExists && this.state.text === ""){
            
            fetch(`http://127.0.0.1:5000/note/get/${this.props.date}/${this.props.month}/${this.props.year}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" }
            })
            .then(response => {
                this.setState({
                    noteExists: false
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    render(){
        return (
            <div className={`day-block${this.props.filler ? " filler" : ""}`} style={{border: this.props.active ? "2px solid navy" : "none"}}>
                <div className="date">{this.props.date}</div>
                <textarea className="calendar-input" onChange={this.handleChange} onBlur={this.handleLoseFocus} value={this.state.text} disabled={this.props.filler ? true : false} />
            </div>
        )
    }
}