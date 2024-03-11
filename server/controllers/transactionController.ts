import { Request, Response } from "express";
import { prisma } from "../models/index.js";

export const getData = (req : Response, req : Request) => {
  res.send("Hello OL")
}

export const addTransaction = (req : Request, res : Response ) => {
  res.send("Hello OL")
}
