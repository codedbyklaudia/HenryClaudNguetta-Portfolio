import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoute from './contactRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'https://henryclaudnguetta.co.uk/'
}))
app.use(express.json())
app.use('/api', contactRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})