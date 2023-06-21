import express from "express"
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from "cors"
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import connectDB from './config/db'

import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

const corsOption = {
	origin: ["https://localhost:3000", "http://localhost:3000"]
}

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)


if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running....')
	})
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(
	PORT,
	() => console.log(
		`Server running in ${process.env.NODE_ENV as string} mode on port ${PORT}`
	)

)