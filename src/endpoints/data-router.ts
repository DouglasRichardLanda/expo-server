import express from "express";
import pool from "../bd-connect.ts";
import date_number from "../helpers/date-number.ts";
import name_number from "../helpers/name-number.ts";
import calculate_lucky_number from "../helpers/lucky-number.ts";
import nameValueContext from "../advanced-name-fn-check.ts";


const DataRouter: express.Router = express.Router()

DataRouter.post('/userdata', async (req: express.Request, res: express.Response) => {
  try {
    const {email} = req.body;

    const [row]: any = await pool.query(`
        SELECT
            id,
            firstname,
            secondname,
            fathername,
            DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday,
            subscription_start,
            subscription_expires,
            package,
            email,
            telephone,
            language,
            password,
            lbnumber,
            lnnumber,
            address,
            agreement_confirm,
            lnumber,
            active_account,
            lastmodifieddate
        FROM users
        WHERE email = ?`, [email]);
    const user = row[0];

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
        subscription_expires: user.subscription_expires,
        language: user.language,
        telephone: user.telephone,
        active_account: user.active_account,
        address: user.address
      }
    })
  } catch (e) {
    res.status(500).json({success: false})
  }
})
DataRouter.post('/changename', async (req: express.Request, res: express.Response) => {
  try {
    const {name, father, email} = req.body;

    const [row1]: any = await pool.query(`select * from users where email = ?`, [email])
    const user = row1[0];

    const new_nnumber = nameValueContext(`${name} ${father}`)
    const new_lnumber = calculate_lucky_number(user.lbnumber, new_nnumber)

    console.log(new_nnumber)
    console.log(new_lnumber)

    const [row]: any = await pool.query(`update users set name = ?, fathername = ?, lnumber = ?, lnnumber = ? where email = ?`, [name, father, new_lnumber, new_nnumber, email])

    res.status(200).json({success: true, nlnumber: new_lnumber.toString(), nlnnumber: new_nnumber.toString()})
  } catch (e) {
    res.status(500).json({success: false})
  }
})
DataRouter.post('/delete/account', async (req: express.Request, res: express.Response) => {
  const {email} = req.body;
  try {
    const [result]: any = await pool.query(
      `UPDATE users SET active_account = 0 WHERE email = ?`,
      [email]
    );

    res.status(200).json({success: true})
  } catch (e) {
    res.status(200).json({success: false})
  }
})

export default DataRouter;