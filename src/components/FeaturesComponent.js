import React, { Component } from "react"
import AveragePeople from "./AveragePeople"
import MeetingCounter from "./MeetingCounter"
import PersonSearch from "./PersonSearch"
import { deleteAllMeetings, getAllMeetings, createRandomMeetings } from "../util";

import moment from "moment"

const defaultState = {
    meetings: [],
    totalMeetings: 0,
    averagePerMonth: 0,
    givenTopic: "",
    givenStartDate: "",
    givenEndDate: "",
    givenAttendingPeople: [],
    addingPerson: ""
}


class FeaturesComponent extends Component {
    state = defaultState

    componentDidUpdate() {
        const addButton = document.getElementById("add-person-btn")
        if (addButton && this.state.givenAttendingPeople.length >= 10) {
            addButton.setAttribute("disabled", "disabled")
        }
    }

    async componentWillMount() {
        await this.getTotalMeetings()
        this.getAverage()
    }

    getTotalMeetings = async () => {
        let newState = 0
        await getAllMeetings().then(data => {
            newState = data.length
            this.setState({
                totalMeetings: newState,
                meetings: data
            })
        })
    }

    getAverage = () => {
        const { meetings } = this.state
        let currentMonthQuery = moment().format('YYYY-MM-DD')
        let filteredMeetings = meetings.filter(meeting => moment(currentMonthQuery).isSame(meeting.date, "year"))
        let avg = filteredMeetings.length / 12
        this.setState({
            averagePerMonth: Math.ceil(avg)
        })
    }

    handleDeleteAll = () => {
        deleteAllMeetings()
        window.location.reload()
    }

    handleCreateRandom = async () => {
        const { givenTopic, givenStartDate, givenEndDate, givenAttendingPeople } = this.state
        if (givenTopic && givenStartDate && givenEndDate && givenAttendingPeople) {
            await createRandomMeetings(givenTopic, givenStartDate, givenEndDate, givenAttendingPeople)
            this.setState(defaultState)
        }
        window.location.reload()
    }

    handleChange = (val, field) => {
        this.setState({
            [field]: val
        })
    }

    handleAddingPerson = () => {
        let peopleAttending = [...this.state.givenAttendingPeople]
        if (this.state.addingPerson) {
            peopleAttending = [...this.state.givenAttendingPeople, this.state.addingPerson]
        }
        this.setState({
            givenAttendingPeople: peopleAttending,
            addingPerson: ""
        })
    }

    render() {
        const { givenAttendingPeople, totalMeetings, averagePerMonth } = this.state
        let peopleAttendingItems = givenAttendingPeople.map((person, i) => {
            return (
                <div key={person + i}>
                    <li>{person}</li> <br />
                </div>
            )
        })
        return (
            <div className="features-container">
                <div className="meetings-amount-container">
                    There are {totalMeetings} meetings in total <br /> <br />
                    The average amount of meetings per month {averagePerMonth} <br /> <br />
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteAll}>Delete all meetings</button>
                </div>
                <div className="random-meeting-container">
                    <span id="helpBlock" className="help-block">To generate 5000 meetings with a given topic with random dates</span>
                    <button type="button" className="btn btn-warning" onClick={this.handleCreateRandom}>Create 5000 random meetings</button>
                    <input type="text" className="span1" placeholder="Give a topic" value={this.state.givenTopic} onChange={(e) => this.handleChange(e.target.value, "givenTopic")} />
                    <div className="form-group">
                        <label>Start date</label>
                        <input type="date" className="span1" placeholder="Date" value={this.state.givenStartDate} onChange={(e) => this.handleChange(e.target.value, "givenStartDate")} />
                    </div>
                    <div className="form-group">
                        <label>End date</label>
                        <input type="date" className="span1" placeholder="Date" value={this.state.givenEndDate} onChange={(e) => this.handleChange(e.target.value, "givenEndDate")} />
                    </div>
                    <div className="form-group">
                        <label>People attending</label>
                        <input type="text" className="span3" placeholder="add a name" value={this.state.addingPerson} onChange={(e) => this.handleChange(e.target.value, "addingPerson")} />
                        <button type="button" id="add-person-btn" className="btn btn-primary" onClick={() => this.handleAddingPerson()}> Add person</button> <br />
                        <div>
                            {peopleAttendingItems}
                        </div>
                    </div>
                </div>
                <AveragePeople />
                <MeetingCounter />
                <PersonSearch />
            </div>
        )
    }
}

export default FeaturesComponent;

