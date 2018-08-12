import * as express from "express"
import { Response, Request} from "express"
import * as bodyParser from "body-parser"
import * as mongoose from "mongoose"
import * as cors from "cors"
import  Meeting  from "./models/meetings"

mongoose.connect("mongodb://localhost/meetings-app")
//mongoose.Promise = global.Promise

class App {
    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    public app: express.Application

    private config(): void {
        this.app.use(cors())

        this.app.use(express.static('public'))

        this.app.use(bodyParser.json())

        this.app.use(function (err, req, res, next) {
            res.status(422)
            res.send({ error: err.message })
        })
    }

    private routes(): void {
        const router = express.Router()

        router.get("/meetings", (req: Request, res: Response, next) => {
            Meeting.find({})
                .then((data) => res.send(data))
                .catch(next)
        })

        router.post("/meetings/add", (req: Request, res: Response, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            Meeting.create(req.body)
                .then(meeting => {
                    res.send(meeting)
                })
                .catch(next)
        })

        router.delete("/meetings/delete", (req: Request, res: Response, next) => {
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

        this.app.use("/api", router)
    }
}


export default new App().app
