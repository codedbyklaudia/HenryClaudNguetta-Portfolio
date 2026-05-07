import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import fs from 'fs'
import contactRoute from './contactRoute.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'https://henryclaudnguetta.co.uk'
}))
app.use(express.json())

// TEMP - replace the router with a direct route
app.post('/api/contact', async (req, res) => {
  console.log('Direct route hit!')
  res.json({ ok: true })
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.get('/test', (req, res) => {
  res.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    clientUrl: process.env.CLIENT_URL,
    nodeEnv: process.env.NODE_ENV
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})