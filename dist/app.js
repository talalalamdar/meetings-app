"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const meetings_1 = require("./models/meetings");
mongoose.connect("mongodb://localhost/meetings-app");
//mongoose.Promise = global.Promise
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(function (err, req, res, next) {
            res.status(422);
            res.send({ error: err.message });
        });
    }
    routes() {
        const router = express.Router();
        router.get("/meetings", (req, res, next) => {
            meetings_1.default.find({})
                .then((data) => res.send(data))
                .catch(next);
        });
        router.post("/meetings/add", (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            meetings_1.default.create(req.body)
                .then(meeting => {
                res.send(meeting);
            })
                .catch(next);
        });
        router.delete("/meetings/delete", (req, res, next) => {
            meetings_1.default.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            })
                .then(res => {
                console.log("all meetings has been deleted", res);
            })
                .catch(next);
        });
        this.app.use("/api", router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map