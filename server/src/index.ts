import express, { NextFunction, Request, Response } from 'express'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import connectDB from './config/db'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express()
connectDB()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)



// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.error(err.message);
  console.error(err.name);
  res.status(500).json({ message: "Something went wrong", error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})