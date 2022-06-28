import express from 'express'
import {create, read, update, clear} from '../controllers/controller'

export const router = express.Router()

router.route('/')
.get(read)
.post(create)
.put(update)
.delete(clear)