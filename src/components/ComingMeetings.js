import React, { Component } from "react"
import { getSortedMeetings } from "../util";

import moment from "moment";

class ComingMeetings extends Component {
    state = {
        meetings: [],
    }

    componentWillMount() {
        this.meetingsList()
    }

    meetingsList = async () => {
        let meetingsList = await getSortedMeetings().then(data => meetingsListItems = data)
        let filteredMeetings = meetingsList.filter(meeting => moment(meeting.date + " " + meeting.startTime).isAfter())
        let meetingsListItems = filteredMeetings.map(meeting => {
            return (
                <li key={meeting._id} className="meeting-item"> {meeting.topic} on {meeting.date}
                    <div>
                        starts at: {meeting.startTime} <br />
                        ends at: {meeting.endTime} <br />
                        People attending: {meeting.peopleAttending.map((person, i) => <div key={person + i} className="person-item"> {person} </div>)}
                    </div>
                </li>
            )
        }).slice(0, 5)
        
        this.setState({
            meetings: meetingsListItems
        })
    }

    render() {
        return (
            <div className="meetings-container">
                <h2> Up coming meetings: </h2><br />
                {this.state.meetings}
            </div>
        )
    }
}


export default ComingMeetings;