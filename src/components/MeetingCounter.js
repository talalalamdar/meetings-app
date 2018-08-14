import React, { Component } from "react"

class MeetingCounter extends Component {
    state = {
        meetings: [],
        MeetingTopicInput: "",
        topicCounter: 0
    }

    handleChange = (val) => {
        this.setState({
            MeetingTopicInput: val
        })
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            meetings: nextProps.meetings
        }
    }

    countMeeting = async () => {
        const { MeetingTopicInput, meetings } = this.state
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