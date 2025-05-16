import digit_normaliser from "../helpers/digit-normaliser";
import date_number from "../helpers/date-number.ts";
import type {Request as REQ, Response as RES} from "express";
import COMPARISON_MATRIX from "../tables/comparison-matrix.ts";
import {HUMAN_ENTITY1} from "../local-db/users-dto.ts";
import comperer from "../helpers/matrix-comperer.ts"
import matrix_distributor from "../helpers/matrix-distributor.ts";
import days_advanced_counter from "../helpers/days-advanced-counter.ts";

class CalendarController {
  async calendar_report_week(req: REQ, res: RES) {
    const {current, id} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB
    const today = new Date(current as string)
    const next14Days = days_advanced_counter(today, 14)
    let fullDayResults: string[] = []
    let firstHalfResults: string[] = []
    let secondHalfResults: string[] = []
    next14Days.forEach((unit: Date)=> matrix_distributor(unit, fullDayResults, firstHalfResults, secondHalfResults, HUMAN_ENTITY1))
    res.status(200).json({firstHalfResults, secondHalfResults, fullDayResults})
  }

  async calendar_report_month(req: REQ, res: RES) {
    const {current, id} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB
    const today = new Date(current as string)
    const next56Days = days_advanced_counter(today, 56)
    let fullDayResults: string[] = []
    let firstHalfResults: string[] = []
    let secondHalfResults: string[] = []
    next56Days.forEach((unit: Date)=> matrix_distributor(unit, fullDayResults, firstHalfResults, secondHalfResults, HUMAN_ENTITY1))
    res.status(200).json({firstHalfResults, secondHalfResults, fullDayResults})
  }

  async any_date_report(req: REQ, res: RES) {
    const {date, id} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB
    const specificdate = new Date(date as string)
    let fullDayResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.luckynumber) as number[][], date_number(specificdate))
    let firstHalfResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.namenumber) as number[][], digit_normaliser(specificdate.getDate()))
    let secondHalfResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.birthdaynumber) as number[][], date_number(specificdate))
    res.status(200).json({firstHalfResult, secondHalfResult, fullDayResult})
  }
}

export default new CalendarController()