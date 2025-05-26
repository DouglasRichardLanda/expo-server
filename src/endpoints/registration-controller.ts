import type {Request as REQ, Response as RES} from "express";

const codes: {code: string, createdAt: number, name: string, email: string}[] = [];

class RegistrationController {
  async register_step1 (req: REQ, res: RES) {
    try {
      const {name, email} = req.body;

      const code = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
      codes.push({code: code, createdAt: Date.now(), name: name, email: email})

      res.status(202).json({success: true})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }
  async register_step2 (req: REQ, res: RES) {
    try {
      const {usercode} = req.body;

      console.log("USERCODE: ", usercode)

      res.status(202).json({success: true})
    } catch (e) {
      res.status(500).json({success: false})
    }
  }
}

export default new RegistrationController()