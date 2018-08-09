import * as express from "express"
import * as bodyParser from "body-parser"
import * as mongoose from "mongoose"
import * as cors from "cors"

const routes = require("./routes/api.js")

const app = express()
const port = 8080

mongoose.connect("mongodb://localhost/meetings-app")
//mongoose.Promise = global.Promise

app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.json())

app.use("/api", routes)

app.use(function(err, req, res, next) {
    res.status(422)
    res.send({error: err.message})
})

app.listen( port, () => {
    console.log("listening on port", port)
})