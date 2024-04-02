import { Request, Response } from "express";
import { prisma } from "../models/index";

export const createUser = async (req : Request, res : Response) => {
  const {fullname, username, password} = req.body
  console.log(fullname)
  const user = await prisma.user.create({
    data : {
      fullname,
      username,
      password,
      report : {
        create : {
          income : 0,
          expense : 0,
          balance : 0
        }
      }
    },k
  })

  res.semd(JSON.parse(user))
}

