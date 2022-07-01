import config from './config/server.config'
import express, {Express, Request, Response} from 'express'
import { connect } from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import {createStream} from 'rotating-file-stream'
import path from 'path'

// Import Routes
import { router as defaultRouter } from './routes/person.routes'

// Init
const app: Express = express()
const port = config.port ?? 5000
const accessLogStream = createStream(`access.log`, {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

// Connecting to Mongo DB Database
connect(config.mongoUri)
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

// Routing
app.use('/', defaultRouter)

// Ping route
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send({
        error: false,
        message: 'Pong!'
    })
})

// Not Found handler
app.use('/', (req: Request, res: Response) => {
    res.status(404).send({
        error: true,
        message: 'Page Not Found'
    })
})

// Server listener
app.listen(port, (): void => {
    console.log(`[server]: server running at port ${port}`)
})