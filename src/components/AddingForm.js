import React, { Component } from "react"
import { createMeeting } from "../util"

const defaultState = {
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    addingPerson: "",
    peopleAttending: [],
    repeatWeekly: false,
    repeatMonthly: false
}


class AddingForm extends Component {
    state = defaultState

    componentDidUpdate() {
        const addButton = document.getElementById("add-person-btn-form")
        if (addButton && this.state.peopleAttending.length >= 10) {
            addButton.setAttribute("disabled", "disabled")
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = (val, input) => {
        this.setState({
            [input]: val
        })
    }

    handleCheckboxChange = (field) => {
        this.setState({
            [field]: !this.state[field]
        })
    }

    handleAddingPerson = () => {
        let peopleAttending = [...this.state.peopleAttending]
        if (this.state.addingPerson) {
            peopleAttending = [...this.state.peopleAttending, this.state.addingPerson]
        }
        this.setState({
            peopleAttending: peopleAttending,
            addingPerson: ""
        })
    }

    createMeeting = () => {
        const { topic, date, startTime, endTime, peopleAttending } = this.state
        if (topic && date && startTime && endTime && peopleAttending) {
            const body = this.state
            createMeeting(body)
        }
        this.setState(defaultState)
    }

    render() {
        const { peopleAttending } = this.state
        let peopleAttendingItems = peopleAttending.map((person, i) => {
            return (
                <div key={person + i}>
                    <li>{person}</li> <br />
                </div>
            )
        })
        return (
            <form className="well" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <label>Topic</label>
                    <input type="text" className="span3" placeholder="Add a topic" value={this.state.topic} onChange={(e) => this.handleChange(e.target.value, "topic")} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="span3" placeholder="Date" value={this.state.date} onChange={(e) => this.handleChange(e.target.value, "date")} />
                </div>
                <div className="form-group">
                    <label>Start at</label>
                    <input type="time" className="span3" placeholder="startTime" value={this.state.startTime} onChange={(e) => this.handleChange(e.target.value, "startTime")} />
                </div>
                <div className="form-group">
                    <label>Ends at</label>
                    <input type="time" className="span3" placeholder="endTime" value={this.state.endTime} onChange={(e) => this.handleChange(e.target.value, "endTime")} />
                </div>
                <div>
                    <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox1" value="option1" checked={this.state.repeatWeekly} onChange={() => this.handleCheckboxChange("repeatWeekly")}/> Repeat weekly
                    </label>
                    <label className="checkbox-inline">
                        <input type="checkbox" id="inlineCheckbox2" value="option2" checked={this.state.repeatMonthly} onChange={() => this.handleCheckboxChange("repeatMonthly")}/> Repeat Monthly
                    </label>
                </div>
                <div className="form-group">
                    <label>People attending</label>
                    <input type="text" className="span3" placeholder="add a name" value={this.state.addingPerson} onChange={(e) => this.handleChange(e.target.value, "addingPerson")} />
                    <button type="button" id="add-person-btn-form" className="btn btn-primary" onClick={() => this.handleAddingPerson()}> Add person</button>
                    {peopleAttendingItems}
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={() => this.createMeeting()}><span className="glyphicon glyphicon-plus"></span> Create meeting</button>
                </div>
            </form>
        )
    }
}

export default AddingForm