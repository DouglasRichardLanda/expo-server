import digit_normaliser from "../helpers/digit-normaliser";
import date_number from "../helpers/date-number.ts";
import type {Request as REQ, Response as RES} from "express";
import COMPARISON_MATRIX from "../tables/comparison-matrix.ts";
import {HUMAN_ENTITY1} from "../local-db/users-dto.ts";
import comperer from "../helpers/matrix-comperer.ts"
import matrix_distributor from "../helpers/matrix-distributor.ts";
import days_advanced_counter from "../helpers/days-advanced-counter.ts";
import pool from "../bd-connect.ts";

class CalendarController {
  async calendar_report_week(req: REQ, res: RES) {
    const {current, email} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB

    const today = new Date(current as string)
    const next7Days = days_advanced_counter(today, 7)

    let report: {full: string, first: string, second: string}[] = []

    const [row1]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row1[0];

    next7Days.forEach((unit: Date)=> matrix_distributor(unit, {luckynumber: user.lnumber, namenumber: user.lnnumber, birthdaynumber: user.lbnumber}, report))
    res.status(200).json({report})
  }

  async calendar_report_month(req: REQ, res: RES) {
    const {current, email} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB

    const today = new Date(current as string)

    const next30Days = days_advanced_counter(today, 30)
    let report: {full: string, first: string, second: string}[] = []

    const [row1]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row1[0];

    next30Days.forEach((unit: Date)=> matrix_distributor(unit, {luckynumber: user.lnumber, namenumber: user.lnnumber, birthdaynumber: user.lbnumber}, report))

    res.status(200).json({report})
  }

  async any_date_report(req: REQ, res: RES) {
    const {email, date} = req.query; // current is the date, we receive it from user because users may have different time zones. ID for future DB
    const specificdate = new Date(date as string)

    const [row1]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row1[0];


    let fullDayResult: string = comperer(COMPARISON_MATRIX.get(Number(user.lnumber)) as number[][], date_number(specificdate))
    let firstHalfResult: string = comperer(COMPARISON_MATRIX.get(Number(user.lnnumber)) as number[][], digit_normaliser(specificdate.getDate()))
    let secondHalfResult: string = comperer(COMPARISON_MATRIX.get(Number(user.lbnumber)) as number[][], date_number(specificdate))

    res.status(200).json({firstHalfResult, secondHalfResult, fullDayResult})
  }
}

export default new CalendarController()