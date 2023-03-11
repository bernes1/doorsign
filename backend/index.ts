import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import { expressjwt, ExpressJwtRequest } from "express-jwt";
import * as mqtt from "mqtt";
dotenv.config();

const app: express.Application = express()
const port = 3000
let client = mqtt.connect(`mqtt://localhost`)

app.use(express.json())
app.use("/api", jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }));

app.get('/', (req: Request, res: Response) => {
    res.send('HI')
})

app.post("/api/msg",(req: Request, res: Response) => {
    console.log(req.body.msg)
    let data = req.body.msg
    client.publish("/test", data)
    res.end()
})

app.listen(port, () => { 
    console.log(`Example app listening on port ${port}`)
})
