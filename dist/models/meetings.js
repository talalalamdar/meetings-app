"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let MeetingSchema = new Schema({
    topic: {
        type: String,
        required: [true, "Topic is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Date is required"]
    },
    endTime: {
        type: String,
        required: [true, "Date is required"]
    },
    repeatWeekly: {
        type: Boolean,
        default: false
    },
    repeatMonthly: {
        type: Boolean,
        default: false
    },
    peopleAttending: {
        type: [String],
        maxlength: 10
    }
});
const Meeting = mongoose.model("meeting", MeetingSchema);
exports.default = Meeting;
//# sourceMappingURL=meetings.js.map