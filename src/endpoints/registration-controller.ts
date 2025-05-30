import type {Request as REQ, Response as RES} from "express";
import pool from "../bd-connect.ts";

const codes: {code: string, createdAt: number, email: string}[] = [];

class RegistrationController {
  async register_step1 (req: REQ, res: RES) {
    try {
      const {email} = req.body;

      const code = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
      codes.push({code: code, createdAt: Date.now(), email: email})
      console.log("SAVED :: ", {code: code, createdAt: Date.now(), email: email});

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
          await pool.query(`insert `);
        } catch (e) {

        }
        // TODO:: save the user in DB
        // TODO:: clean the queue
      }

      res.status(202).json({success: true, id: 123})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }
}

export default new RegistrationController()