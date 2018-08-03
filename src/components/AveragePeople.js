import React, { Component } from "react"
import { getSortedMeetings } from "../util"

import moment from "moment" 

class AveragePeople extends Component {
    state = {
        nextTwentyMeetings: [],
        average: 0
    }

    async componentDidMount()  {
        await this.getNextMeetings()
         this.getAverage()
    }

    getNextMeetings = async () => {
        let meetings = []
        await getSortedMeetings().then(data => meetings = data)
        let filteredMeetings = [...meetings].filter(meeting => moment(meeting.date + " " + meeting.startTime).isAfter())
    
        let nextTwenty = []
        for (let i = 0; i < 20; i++) {
            nextTwenty.push(filteredMeetings[i])
        }
        this.setState({
            nextTwentyMeetings: nextTwenty
        })
    }

    getAverage =  () => {
        let counter = 0     
        this.state.nextTwentyMeetings.forEach(meeting => {
            if (meeting) {
                counter += meeting.peopleAttending.length 
            }     
        })
        const avg = Math.ceil(counter / 20)
        this.setState({
            average: avg
        })
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