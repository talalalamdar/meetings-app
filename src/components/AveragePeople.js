import React, { Component } from "react"

import moment from "moment"

class AveragePeople extends Component {
    state = {
        nextTwentyMeetings: [],
        average: 0
    }

    static getDerivedStateFromProps(nextProps) {
        // getting only the upcoming meetings 
        let filteredMeetings = nextProps.meetings.filter(meeting => moment(meeting.date + " " + meeting.startTime).isAfter())
        // pushing the first twenty meetings
        let nextTwenty = []
        for (let i = 0; i < 20; i++) {
            nextTwenty.push(filteredMeetings[i])
        }

        // calculate how many people are attending in the next 20 meetings 
        let counter = 0
        nextTwenty.forEach(meeting => {
            if (meeting) {
                counter += meeting.peopleAttending.length
            }
        })
        const avg = Math.ceil(counter / 20)

        return {
            nextTwentyMeetings: nextTwenty,
            average: avg
        }
    }

    render() {
        return (
            <div className="average-container">
                The average amount of people in the next 20 meetings: {this.state.average}
            </div>
        )
    }
}

export default AveragePeople;