const BASE_URL = "http://localhost:8080/api/meetings"


const moment = require("moment")
const momentRandom = require("moment-random")

export async function createMeeting(body) {           // create meeting function
    await fetch(`${BASE_URL}/add`, {
        method: "POST",     
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(body)
    })
}

export async function getAllMeetings() {    // get all meetings in the database
    let res = await fetch(BASE_URL)
    return res.json()
}

export async function deleteAllMeetings() {     // delete all meetings in the database 
    await  fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
    })
}

export async function getSortedMeetings() {         // to sort the meetings in the database by date 
    let sortedArray = await getAllMeetings().then(data => data.sort(function (a, b) {
        if ((a.date + " " + a.startTime) > (b.date + " " + b.startTime)) return 1
        if ((a.date + " " + a.startTime) < (b.date + " " + b.startTime)) return -1
        return 0
    }))
    return sortedArray
}

export async function createRandomMeetings(givenTopic, givenStartDate, givenEndDate, givenAttendingPeople) {
     for (let i = 1; i <= 5000; i++) {                       // loop 5000 times to create 5000 random meetings
        let randomDate = moment(momentRandom(givenEndDate ,givenStartDate)).format("YYYY-MM-DD")

        // setting start time and end time randomly with 8 hours as max duration
        let randomStatTime = moment(momentRandom()).format("HH:mm")
        let randomEndTime = moment(randomStatTime, "HH:mm").add(Math.floor(Math.random() * 8) + 1, "hours").format("HH:mm")

        let body = {
            topic: givenTopic,
            date: randomDate,               // defining the body of the request
            startTime:  randomStatTime,
            endTime: randomEndTime,
            peopleAttending: []
        }

        let peopleAmount = body.peopleAttending.length
        let randomNumber =  Math.floor(Math.random() * (givenAttendingPeople.length + 1))  // random number for random amount of people 
       
        for (let j = 0;   j <= randomNumber &&  peopleAmount <= 10 ; j++) {
            let randomInsertedNumber =  Math.floor(Math.random() * (randomNumber + 1))      // random number to insert from the given people array
            if (body.peopleAttending.indexOf(givenAttendingPeople[randomInsertedNumber]) === -1) {
                body.peopleAttending.push(givenAttendingPeople[randomInsertedNumber])
            }
        } 
        // requesting to create random meeting
         await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(body)
        })
         
    }
   
}

