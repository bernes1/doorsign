import express, {Request, Response} from "express";
import * as mqtt from "mqtt";
const app: express.Application = express()
const port = 3000
let client = mqtt.connect(`mqtt://localhost`)

app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send('HI')
})

app.post("/msg", (req:Request, res:Response) => {
    console.log(req.body.msg)
    let data = req.body.msg
    client.publish("/test", data)
    res.end()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
