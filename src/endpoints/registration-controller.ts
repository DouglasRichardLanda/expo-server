import type {Request as REQ, Response as RES} from "express";
import pool from "../bd-connect.ts";
import name_number from "../helpers/name-number.ts";
import date_number from "../helpers/date-number.ts";
import calculate_lucky_number from "../helpers/lucky-number.ts";
import {PackagePlanEnum} from "../package-enum.ts";
import nameValueContext from "../advanced-name-fn-check.ts";

let codes: { code: string, createdAt: number, email: string }[] = [];

class RegistrationController {
  async register_step1(req: REQ, res: RES) {
    try {
      const {email} = req.body;

      const [existing] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);
      // @ts-ignore
      if (existing.length > 0) {
        res.status(202).json({success: false, message: "Email already registered"});
        return
      }


      const code = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
      codes.push({code: code, createdAt: Date.now(), email: email})

      // console.log("SAVED :: ", {code: code, createdAt: Date.now(), email: email});
      console.log(codes)
      res.status(202).json({success: true})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }

  async register_step1_again(req: REQ, res: RES) {
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

      const record = codes.find((element) => {
        return element.code === usercode
      })

      if (!record) {
        res.status(500).json({success: false})
        return;
      } else {
        try {
          await pool.query(`insert into users (email)
                            values ('${record.email}')`);
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
      const {firstname, secondname, fathername, password, birthday, email, telephone, language} = req.body;

      const date = new Date(birthday)

      const today = new Date();
      const start = today.getTime(); // timestamp

      const future = new Date(today);
      future.setDate(future.getDate() + 7);
      const end = future.getTime(); // timestamp

      const ubirthdaynumber = date_number(date)
      const unamenumber = nameValueContext(`${firstname} ${secondname} ${fathername}`)
      const ulnumber = calculate_lucky_number(ubirthdaynumber, unamenumber)

      await pool.query(`UPDATE users
                        SET firstname  = ?,
                            secondname = ?,
                            fathername = ?,
                            birthday   = ?,
                            password   = ?,
                            lnnumber   = ?,
                            lbnumber   = ?,
                            lnumber    = ?,
                            package    = "TRIAL",
                            subscription_start   = ?,
                            subscription_expires    = ?,
                            telephone = ?,
                            language = ?,
                            active_account = true
                        WHERE email = ?`,
        [firstname, secondname, fathername, date, password, unamenumber, ubirthdaynumber, ulnumber, start, end, telephone, language, email]);

      // res.status(200).json({success: true, lnumber: ulnumber, lnnumber: unamenumber, lbnumber: ubirthdaynumber})
      res.status(200).json({success: true})
    } catch (e) {
      console.error(e)
      res.status(500).json({success: false})
    }
  }

  // ???????????????????????????????????????????????????????????
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
        res.status(200).json({success: false, data: undefined})
        return
      }

      res.status(200).json({
        success: true,
        data: {
          birthday: user.birthday,
          firstname: user.firstname,
          secondname: user.secondname,
          fathername: user.fathername,
          package: user.package,
          lnumber: user.lnumber,
          lnnumber: user.lnnumber,
          lbnumber: user.lbnumber,
          email: email,
          subscription_start: user.subscription_start,
          subscription_expires: user.subscription_expires
        }
      })
    } catch (e) {
      res.status(500).json({success: false, data: undefined})
    }
  }
}

export default new RegistrationController()