import { Router } from 'express'
import { addTransaction, getData } from '../controllers/transactionController'

export const transactionRouter = Router()

transactionRouter.get('/', getData)
