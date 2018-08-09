"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/api.js");
const app = express();
const port = 8080;
mongoose.connect("mongodb://localhost/meetings-app");
//mongoose.Promise = global.Promise
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api", routes);
app.use(function (err, req, res, next) {
    res.status(422);
    res.send({ error: err.message });
});
app.listen(port, () => {
    console.log("listening on port", port);
});
//# sourceMappingURL=index.js.map