import 'dotenv/config.js'
import express, {Express, Request, Response} from 'express'
import { connect } from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import {createStream} from 'rotating-file-stream'
import path from 'path'

import { router as defaultRouter } from './routes/router'


const app: Express = express()
const port = process.env.PORT ?? 5000
const accessLogStream = createStream(`access.log`, {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

// Connect to database
connect(process.env.MONGO_URI!)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(error => {
    console.error('connect-mongo-error', error)
})

// Middleware
app.use(morgan('combined', {
    stream: accessLogStream
}))
app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes
app.use('/', defaultRouter)

// Ping
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send({
        error: false,
        message: 'Pong!'
    })
})

// 404
app.use('/', (req: Request, res: Response) => {
    res.status(404).send({
        error: true,
        message: 'Page Not Found'
    })
})

// Server
app.listen(port, (): void => {
    console.log(`[server]: server running at port ${port}`)
})