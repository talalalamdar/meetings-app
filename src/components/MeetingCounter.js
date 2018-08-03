import React, { Component } from "react"
import { getAllMeetings } from "../util";



class MeetingCounter extends Component {
    state = {
        MeetingTopicInput: "",
        topicCounter: 0
    }

    handleChange = (val) => {
        this.setState({
            MeetingTopicInput: val
        })
    }

    countMeeting = async () => {
        const { MeetingTopicInput } = this.state
        let meetings = await getAllMeetings().then(data => meetings = data)
        let findTopic = meetings.filter(meeting => meeting.topic === MeetingTopicInput)
        this.setState({
            topicCounter: findTopic.length
        })
    }

    render() {

        return (
            <div className="count-container">
                <input type="text" placeholder="topic..." className="span3" onChange={(e) => this.handleChange(e.target.value)} />
                <span id="helpBlock" className="help-block">Add a topic to get the total number of the provided topic.</span>
                <button type="button" className="btn btn-primary" onClick={this.countMeeting} ><span className="glyphicon glyphicon-dashboard"></span> Count</button> <br />
                <div className="counter-div">
                    <strong> {this.state.topicCounter} </strong>
                </div>
            </div>
        )
    }
}

export default MeetingCounter