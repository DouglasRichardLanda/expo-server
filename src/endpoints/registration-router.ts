import express from "express";
import RegistrationController from "./registration-controller.ts";


const RegistrationRouter: express.Router = express.Router()

RegistrationRouter.post('/first', RegistrationController.register_step1)

export default RegistrationRouter;