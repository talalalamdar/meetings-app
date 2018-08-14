import React, { Component } from "react"

import moment from "moment";

class PersonSearch extends Component {
    state = {
        meetings: [],
        personName: "",
        nextMeetingDate: "",
        startAt: "",
        nextMeetingTopic: ""
    }

    handleChange = (val) => {
        this.setState({
            personName: val
        })
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            meetings: nextProps.meetings
        }
    }

    handlePersonSearch = () => {
        const { personName, meetings } = this.state
         // eslint-disable-next-line
        let findFirstMeeting = meetings.find(meeting => {  // to find only the first next meeting for a person
            if (moment(`${meeting.date} ${meeting.startTime}`, "YYYY-MM-DD HH:mm").isAfter() && meeting.peopleAttending.indexOf(personName) >= 0) {
                return meeting
            }
        })
        if (findFirstMeeting) {
            this.setState({
                nextMeetingDate: findFirstMeeting.date,
                startAt: findFirstMeeting.startTime,
                nextMeetingTopic: findFirstMeeting.topic
            }) 
        }
    }

    render() {
        const { personName, nextMeetingDate, nextMeetingTopic, startAt} = this.state

        return (
            <div className="search-person-container">
                <span id="helpBlock" className="help-block">Add a person name to look up his next meeting</span>
                <input type="text" onChange={((e) => this.handleChange(e.target.value))} />
                <button type="button" className="btn btn-primary" onClick={() => this.handlePersonSearch()}><span className="glyphicon glyphicon-search"></span> Search</button> <br />
                <div className="search-result">
                    {this.state.nextMeetingDate ? `${personName} next meeting is on ${nextMeetingDate}, topic of the meeting: ${nextMeetingTopic}, starts at ${startAt}` : ""}
                </div>
            </div>
        )
    }
}

export default PersonSearch