import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import CalendarRouter from "./endpoints/calendar-router.ts";

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use("/api", CalendarRouter)

app.listen(5000, () => {
  console.log("SERVER ON PORT:: --> :: ", 5000)
});
