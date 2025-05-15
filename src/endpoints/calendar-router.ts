import express from "express";
import cors from "cors";
import CalendarController from "./calendar-controller.ts"

const CalendarRouter: express.Router = express.Router()

CalendarRouter.get("/weekreport", cors(), CalendarController.calendar_report_week)
CalendarRouter.get("/monthreport", cors(), CalendarController.calendar_report_month)
CalendarRouter.get("/anydatereport", cors(), CalendarController.any_date_report)

// CalendarRouter.get("/luckynumbers", cors(), CalendarController.calculate_lucky_numbers)
// CalendarRouter.get("/datenumber", cors(), CalendarController.calculate_date_number)
// CalendarRouter.get("/compare", cors(), CalendarController.compare_day_lucky_numbers)

export default CalendarRouter