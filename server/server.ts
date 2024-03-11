import express from 'express'
// import {router} from './routes/index'
import { Request, Response } from "express";

const app = express()
const port = 3000

// app.use(router)

app.get("/", (req : Request, res : Response) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
