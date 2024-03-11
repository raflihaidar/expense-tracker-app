import { Router } from 'express'
import { addTransaction, getData } from '../controller/transactionController.js'

export const transactionRouter = Router()
transactionRouter.get('/', getData())
