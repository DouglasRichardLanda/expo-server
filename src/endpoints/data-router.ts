import express from "express";
import pool from "../bd-connect.ts";
import date_number from "../helpers/date-number.ts";
import name_number from "../helpers/name-number.ts";
import calculate_lucky_number from "../helpers/lucky-number.ts";


const DataRouter: express.Router = express.Router()

DataRouter.get('/userdata', async (req: express.Request, res: express.Response) => {
  try {
    const {email} = req.query;

    const [row]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row[0];

    res.status(200).json({success: true, data: user});
  } catch (e) {
    res.status(500).json({success: false})
  }
})
DataRouter.post('/changename', async (req: express.Request, res: express.Response) => {
  try {
    const {name, father, email} = req.body;

    const [row1]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row1[0];

    const new_nnumber = name_number(`${name} ${father}`)
    const new_lnumber = calculate_lucky_number(user.lbnumber, new_nnumber)

    const [row]: any = await pool.query(`update users set name = ?, fathername = ?, lnumber = ?, lnnumber = ? where email = ?`, [name, father, new_lnumber, new_nnumber, email])

    res.status(200).json({success: true})
  } catch (e) {
    res.status(500).json({success: false})
  }
})

export default DataRouter;