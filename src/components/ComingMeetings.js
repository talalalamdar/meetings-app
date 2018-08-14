import React, { Component } from "react"

import moment from "moment";

class ComingMeetings extends Component {
    state = {
        meetings: []
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            meetings: nextProps.meetings
        }
    }

    componentDidUpdate() {
        this.meetingsList()
    }

    meetingsList = () => {
        let filteredMeetings = [...this.state.meetings].filter(meeting => moment(meeting.date + " " + meeting.startTime).isAfter())
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
        
        return meetingsListItems 
    }

    render() {
        return (
            <div className="meetings-container">
                <h2> Upcoming meetings: </h2><br />
                {this.meetingsList()}
            </div>
        )
    }
}


export default ComingMeetings;