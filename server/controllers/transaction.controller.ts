import { Request, Response } from "express";
import { prisma } from "../models/index";

export const getData = (req : Request, res : Response) => {
  res.send("Hello Transaction Controller")
}

export const addData = (req : Request, res : Response) => {
}
