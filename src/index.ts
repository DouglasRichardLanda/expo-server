import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import CalendarRouter from "./endpoints/calendar-router.ts";
import RegistrationRouter from "./endpoints/registration-router.ts";
import DataRouter from "./endpoints/data-router.ts";

dotenv.config()

const app = express()

// const allowedOrigins = ['http://localhost:5403']
// app.use(cors({ origin: allowedOrigins }))

app.use(cors())

app.use(express.json())
app.use('/api', CalendarRouter)
app.use('/register', RegistrationRouter)
app.use('/data', DataRouter)
app.use('/health', async (req, res) => {
  console.log("SERVER IS OPERATING")
  res.status(200).json({success: "SERVER IS OPERATING"})
})

app.listen(3000, () => {
  console.log("SERVER ON PORT:: --> :: ", 5000)
});
