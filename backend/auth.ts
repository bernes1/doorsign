import * as dotenv from 'dotenv';
import * as jwt from "jsonwebtoken"; 
import express, {Request, Response} from "express";
let app: express.Application = express()
let port = 3001
dotenv.config();

app.use(express.json())


function genToken (username: any) {
    return jwt.sign(username , process.env.TOKEN_SECRET, { expiresIn: "1880s"});
}

app.post("/gentoken", (req: Request, res: Response) => {
    const token = genToken({ username: req.body.username })
    res.json(token)
})

app.listen(port, () => {
    console.log(`litening at port ${port}`)
})
