import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import creditRouter from './routes/credit.route.mjs'
import relayRouter from './routes/relay.route.mjs'

dotenv.config()

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.131.59:3000'}))

// Routes
app.use('/calc-credit', creditRouter)
app.use('/relay', relayRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
const HOST = '192.168.131.59'
const PORT = 5000
app.listen(PORT, HOST, () => {
  console.log(`Relayer Node is running on http://${HOST}:${PORT}`)
})