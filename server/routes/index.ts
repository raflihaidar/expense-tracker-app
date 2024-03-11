import { Router } from 'express'
import {transactionRouter} from "../routes/transaction.js"

export const router = Router()

router.use("/transaction", transactionRouter)