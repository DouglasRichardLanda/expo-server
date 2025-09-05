import express from "express";
import cors from "cors";
import CalendarController from "./calendar-controller.ts"

const CalendarRouter: express.Router = express.Router()

// // Controller for a 14-day report
// CalendarRouter.post("/weekreport", CalendarController.calendar_report_week)
//
// // Controller for 56 days report ~2 months
// CalendarRouter.post("/monthreport", CalendarController.calendar_report_month)

CalendarRouter.post("/report", CalendarController.report)

// We pick a day, and we calculate for it individually
CalendarRouter.post("/anydatereport", CalendarController.any_date_report)

export default CalendarRouter