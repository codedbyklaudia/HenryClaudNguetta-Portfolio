import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import contactRoute from './contactRoute.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'https://henryclaudnguetta.co.uk'
}))
app.use(express.json())
app.use('/api', contactRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})