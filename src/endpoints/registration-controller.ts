import type {Request as REQ, Response as RES} from "express";
import pool from "../bd-connect.ts";
import name_number from "../helpers/name-number.ts";
import date_number from "../helpers/date-number.ts";
import calculate_lucky_number from "../helpers/lucky-number.ts";

let codes: {code: string, createdAt: number, email: string}[] = [];

class RegistrationController {
  async register_step1 (req: REQ, res: RES) {
    try {
      const {email} = req.body;

      const code = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
      codes.push({code: code, createdAt: Date.now(), email: email})
      // console.log("SAVED :: ", {code: code, createdAt: Date.now(), email: email});
      console.log(codes)
      res.status(202).json({success: true})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }
  async register_step2 (req: REQ, res: RES) {
    try {
      const {usercode} = req.body;

      const record = codes.find((element) => {
        return element.code === usercode
      })
      if (!record) {
        res.status(500).json({success: false})
        return;
      } else {
        try {
          await pool.query(`insert into users (email, roll) values ('${record.email}', 'user')`);
          codes = codes.filter((element) => {
            return element.code !== record.code;
          })
        } catch (e) {
          console.error("FAILED TO WRITE INTO DB :: ", e)
        }
      }

      res.status(202).json({success: true, email: record.email})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }
  async register_step3 (req: REQ, res: RES) {
    try {
      const {name, father, password, birthday, email} = req.body;

      const date = new Date(birthday)

      const ubirthdaynumber = date_number(date)
      const unamenumber = name_number(`${name} ${father}`)
      const ulnumber = calculate_lucky_number(ubirthdaynumber, unamenumber)

      await pool.query(`UPDATE users SET name = ?, fathername = ?, birthday = ?, password = ?, lnnumber = ?, lbnumber = ?, lnumber = ? WHERE email = ?`,
        [name, father, date, password, ulnumber, ubirthdaynumber, ulnumber, email]);

      res.status(200).json({success: true})
    } catch (e) {
      console.error(e)
      res.status(500).json({success: false})
    }
  }
}

export default new RegistrationController()