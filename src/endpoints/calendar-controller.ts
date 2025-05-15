import express from "express";
import digit_normaliser from "../helpers/digit-normaliser";
import date_number from "../helpers/date-number.ts";
import name_number from "../helpers/name-number.ts";
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
    const {current, id} = req.query;
    const today = new Date(current as string)
    // TODO:: -> Fetching DB Info incl. Numbers

    // Format:: --> 2025-05-02T00:00:00.000Z []
    const next56Days = Array.from({length: 56}, (_, i) => {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i + 1);
      return nextDay
    });

    // we calculate 3 things: full day, first half and second half
    // full day: full sum of the day e.g. 19.02.2025 compared with Lucky number
    // first half: name number compared with only current day (calculated)
    // seconds hald: ull sum of the day e.g. 19.02.2025 compared with Birthday number

    await new Promise(resolve => setTimeout(resolve, 2000))

    let fullDayResults: string[] = []
    let firstHalfResults: string[] = []
    let secondHalfResults: string[] = []
    next56Days.forEach((unit: Date) => {
      if (!unit) return
      console.log(HUMAN_ENTITY1.luckynumber, date_number(unit))

      fullDayResults.push(comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.luckynumber) as number[][], date_number(unit)))
      firstHalfResults.push(comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.namenumber) as number[][], digit_normaliser(unit.getDate())))
      secondHalfResults.push(comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.birthdaynumber) as number[][], date_number(unit)))
    })

    res.status(200).json({firstHalfResults, secondHalfResults, fullDayResults})
  }

  async any_date_report(req: REQ, res: RES) {
    const {date, id} = req.query;
    console.log("INVOKED")
    const specificdate = new Date(date as string)

    let fullDayResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.luckynumber) as number[][], date_number(specificdate))
    let firstHalfResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.namenumber) as number[][], digit_normaliser(specificdate.getDate()))
    let secondHalfResult: string = comperer(COMPARISON_MATRIX.get(HUMAN_ENTITY1.birthdaynumber) as number[][], date_number(specificdate))

    res.status(200).json({firstHalfResult, secondHalfResult, fullDayResult})
  }

  // async calculate_lucky_numbers (req: express.Request, res: express.Response) {
  //   try {
  //     const {currentdate} = req.query;
  //     const date = new Date(currentdate as string);
  //
  //     const luckybirthdaynumber = await date_number(date)
  //     const luckynamenumber = await name_number(HUMAN_ENTITY.firstname)
  //     const luckyfathernumber = await name_number(HUMAN_ENTITY.fathername)
  //     const luckynumber = digit_normaliser(luckybirthdaynumber + luckynamenumber + luckyfathernumber)
  //
  //     res.status(200).json({luckybirthdaynumber, luckynamenumber, luckynumber})
  //     res.status(200)
  //   } catch (e) {
  //     console.error("EORROR::::::::::", e)
  //     res.status(500).json({})
  //   }
  // }
  // async calculate_date_number (req: express.Request, res: express.Response) {
  //   try {
  //     const {current} = req.query // e.g. 2025-02-26
  //     if (!current) throw new Error("")
  //     const ccurrent = new Date(current as string)
  //     const datenumber = await calculate_date_number(ccurrent)
  //
  //     console.log(datenumber)
  //
  //     res.status(200).json({datenumber})
  //   } catch (e) {
  //     res.status(500).json({})
  //   }
  // }
  // async compare_day_lucky_numbers (req: express.Request, res: express.Response) {
  //   try {
  //     const {lnumber, lbirthday, lname, specdate} = req.query;
  //     const specDate = new Date(specdate as string)
  //
  //     const datenumber = await calculate_date_number(specDate)
  //     const lnumberParsed = parseInt(lnumber as string, 10);
  //     const lbirthdayParsed = parseInt(lbirthday as string, 10);
  //     const lnameParsed = parseInt(lname as string, 10)
  //
  //
  //
  //
  //     // we calculate 3 things: full day, first half and second half
  //     // full day: full sum of the day e.g. 19.02.2025 compared with Lucky number
  //     // first half: name number compared with only current day (calculated)
  //     // seconds hald: ull sum of the day e.g. 19.02.2025 compared with Birthday number
  //
  //
  //
  //     let fullday = comperer(goodmediumbadmatrix.get(lnumberParsed) as number[][], datenumber)
  //     let firsthalf = comperer(goodmediumbadmatrix.get(lnameParsed) as number[][], digit_normaliser(specDate.getDate()))
  //     let secondhalf = comperer(goodmediumbadmatrix.get(lbirthdayParsed) as number[][], datenumber)
  //     function comperer (x: number[][], n: number): string {
  //       if (x[0].includes(n)) {
  //         return "good day"
  //       } else if (x[1].includes(n)) {
  //         return "ordinary day"
  //       } else {
  //         return "bad day"
  //       }
  //     }
  //
  //     console.log("Full day    ::",fullday)
  //     console.log("First half  ::",firsthalf)
  //     console.log("Second half ::",secondhalf)
  //
  //
  //     res.status(200).json({fullday, firsthalf, secondhalf})
  //   } catch (e) {
  //     console.error(e)
  //     res.status(500).json({})
  //   }
  // }
}

export default new CalendarController()