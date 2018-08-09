import * as express from "express"
import  Meeting  from "../models/meetings.js"

const router = express.Router()

router.get("/meetings", (req: express.Request, res: express.Response, next) => {
    Meeting.find({})
        .then((data: Object[]) => res.send(data))
        .catch(next)
})

router.post("/meetings/add", (req: express.Request, res: express.Response, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    Meeting.create(req.body)
        .then(meeting => {
            res.send(meeting)
        })
        .catch(next)
})

router.delete("/meetings/delete", (req: express.Request, res: express.Response, next) => {
    Meeting.remove({}, function(err) {
        if (err) {
            console.log(err)
        } 
    })
        .then(res => {
            console.log("all meetings has been deleted", res)
        })
        .catch(next)
})



module.exports = router