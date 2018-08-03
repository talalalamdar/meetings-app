const BASE_URL = "http://localhost:8080/api/meetings"


const moment = require("moment")
const momentRandom = require("moment-random")

export async function createMeeting(body) {
    await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(body)
    })
}

export async function getAllMeetings() {
    let res = await fetch(BASE_URL)
    return res.json()
}

export async function deleteAllMeetings() {
    await  fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
    })
}

export async function getSortedMeetings() {
    let sortedArray = await getAllMeetings().then(data => data.sort(function (a, b) {
        if ((a.date + " " + a.startTime) > (b.date + " " + b.startTime)) return 1
        if ((a.date + " " + a.startTime) < (b.date + " " + b.startTime)) return -1
        return 0
    }))
    return sortedArray
}

export async function createRandomMeetings(givenTopic, givenStartDate, givenEndDate, givenAttendingPeople) {
     for (let i = 1; i <= 5000; i++) {
        let randomDate = moment(momentRandom(givenEndDate ,givenStartDate)).format("YYYY-MM-DD")
        let randomStatTime = moment(momentRandom()).format("HH:MM")
        let randomEndTime = moment(randomStatTime, "HH:MM").add(Math.random() * (8 -1), "hours").format("HH:MM")

        let body = {
            topic: givenTopic,
            date: randomDate,
            startTime:  randomStatTime,
            endTime: randomEndTime,
            peopleAttending: []
        }
        for (let j = 0;   j <= Math.random() * (10- 2) &&  body.peopleAttending.length <= 10 ; j++) {
            if (body.peopleAttending.indexOf(givenAttendingPeople[j]) === -1) {
                body.peopleAttending.push(givenAttendingPeople[j])
            }
        } 
         await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(body)
        })
         
    }
   
}

