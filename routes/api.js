const express = require("express")
const router = express.Router()
const Meeting = require("../models/meetings.js")

router.get("/meetings", (req, res, next) => {
    Meeting.find({})
        .then(data => res.send(data))
        .catch(next)
})

router.post("/meetings/add", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    Meeting.create(req.body)
        .then(meeting => {
            res.send(meeting)
        })
        .catch(next)
})

router.delete("/meetings/delete", (req, res, next) => {
    Meeting.remove({}, (err, info) => {
        if (err) {
            console.log(err)
            next
        } 
    })
        .then(res => {
            console.log("all meetings has been deleted", res)
        })
        .catch(next)
})



module.exports = router