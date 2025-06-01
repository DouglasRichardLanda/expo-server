import express from "express";
import pool from "../bd-connect.ts";


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

    const [row]: any = await pool.query(`update users set name = ?, fathername = ? where email = ?`, [name, father, email])

    res.status(200).json({success: true})
  } catch (e) {
    res.status(500).json({success: false})
  }
})

export default DataRouter;