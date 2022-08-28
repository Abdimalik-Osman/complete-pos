import express from 'express'
import {createBill, deleteBill, getBills} from '../controllers/bills.js'

const Router = express.Router()


Router.route('/').post(createBill).get(getBills)
Router.route('/:id').delete(deleteBill)


export default Router