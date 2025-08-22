import express from "express";
import RegistrationController from "./registration-controller.ts";


const RegistrationRouter: express.Router = express.Router()

RegistrationRouter.post('/first', RegistrationController.register_step1)
RegistrationRouter.post('/second', RegistrationController.register_step2)
RegistrationRouter.post('/third', RegistrationController.register_step3)

RegistrationRouter.post('/login', RegistrationController.login)

export default RegistrationRouter;