import express from 'express'
import {create, read, update, clear} from '../controllers/person.controller'

export const router = express.Router()

router.route('/')
.get(read)
.post(create)
.put(update)
.delete(clear)

// CRUD -> RCUD