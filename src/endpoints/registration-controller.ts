import type {Request as REQ, Response as RES} from "express";
import pool from "../bd-connect.ts";
import name_number from "../helpers/name-number.ts";
import date_number from "../helpers/date-number.ts";
import calculate_lucky_number from "../helpers/lucky-number.ts";
import {PackagePlanEnum} from "../package-enum.ts";

let codes: { code: string, createdAt: number, email: string }[] = [];

class RegistrationController {
  async register_step1(req: REQ, res: RES) {
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

  async register_step2(req: REQ, res: RES) {
    try {
      const {usercode} = req.body;
      console.log("USER CODE: ", usercode)

      const record = codes.find((element) => {
        return element.code === usercode
      })
      console.log(record)

      if (!record) {
        res.status(500).json({success: false})
        return;
      } else {
        try {
          await pool.query(`insert into users (email, roll)
                            values ('${record.email}', 'user')`);
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

  async register_step3(req: REQ, res: RES) {
    try {
      const {name, father, password, birthday, email} = req.body;

      const date = new Date(birthday)

      const ubirthdaynumber = date_number(date)
      const unamenumber = name_number(`${name} ${father}`)
      const ulnumber = calculate_lucky_number(ubirthdaynumber, unamenumber)

      await pool.query(`UPDATE users
                        SET name       = ?,
                            fathername = ?,
                            birthday   = ?,
                            password   = ?,
                            lnnumber   = ?,
                            lbnumber   = ?,
                            lnumber    = ?
                        WHERE email = ?`,
        [name, father, date, password, ulnumber, ubirthdaynumber, ulnumber, email]);

      res.status(200).json({success: true, lnumber: ulnumber, lnnumber: unamenumber, lbnumber: ubirthdaynumber})
    } catch (e) {
      console.error(e)
      res.status(500).json({success: false})
    }
  }

  async register_step4(req: REQ, res: RES) {
    try {
      const {email, pack} = req.body;

      let name: string;
      let start: string;
      let end: string;

      const today = new Date();
      start = today.toISOString().slice(0, 10); // YYYY-MM-DD

      if (pack === "Базовый") {
        name = PackagePlanEnum.basic
        const future = new Date(today);
        future.setDate(future.getDate() + 14); // 2 weeks
        end = future.toISOString().slice(0, 10);
      } else if (pack === "Стандартный") {
        name = PackagePlanEnum.standard
        const future = new Date(today);
        future.setMonth(future.getMonth() + 1); // 1 month
        end = future.toISOString().slice(0, 10);
      } else if (pack === "Премиум") {
        name = PackagePlanEnum.premium
        const future = new Date(today);
        future.setMonth(future.getMonth() + 3); // 3 months
        end = future.toISOString().slice(0, 10);
      } else {
        console.log("unexpected package")
        throw new Error("Something went wrong with the package")
      }

      if (!name || !start || !end) throw new Error("no package was chosen")

      await pool.query(`UPDATE users
                        SET package    = ?,
                            subscriptiondate   = ?,
                            subscriptionexpiresdate    = ?
                        WHERE email = ?`,
        [name, start, end, email]);

      res.status(202).json({success: true, start: start, end: end, pack: name})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }

  async login(req: REQ, res: RES) {
    try {
      const {email, password} = req.body;

      const [row]: any = await pool.query('select * from users where email = ? and password = ?', [email, password])
      const user = row[0];

      if (!user) {
        res.status(200).json({success: true, data: undefined})
        return
      }

      res.status(200).json({
        success: true,
        data: {birthday: user.birthday, name: user.name, fathername: user.fathername, package: user.package, lnumber: user.lnumber, lnnumber: user.lnnumber, lbnumber: user.lbnumber, email: email, password: user.password}
      })
    } catch (e) {
      res.status(500).json({success: false, data: undefined})
    }
  }
}

export default new RegistrationController()