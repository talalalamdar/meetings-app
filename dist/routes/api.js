"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const meetings_js_1 = require("../models/meetings.js");
const router = express.Router();
router.get("/meetings", (req, res, next) => {
    meetings_js_1.default.find({})
        .then((data) => res.send(data))
        .catch(next);
});
router.post("/meetings/add", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    meetings_js_1.default.create(req.body)
        .then(meeting => {
        res.send(meeting);
    })
        .catch(next);
});
router.delete("/meetings/delete", (req, res, next) => {
    meetings_js_1.default.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
    })
        .then(res => {
        console.log("all meetings has been deleted", res);
    })
        .catch(next);
});
module.exports = router;
//# sourceMappingURL=api.js.map