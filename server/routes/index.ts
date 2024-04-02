import { Router } from 'express'
import {transactionRouter} from "../routes/transaction"
import {userRouter} from "../routes/user"

export const router = Router()

router.use("/transaction", transactionRouter)
router.use("/user", userRouter)