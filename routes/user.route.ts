import express from "express";
const authRouter = express.Router()
import authController from "../controller/auth.controller"
import authScehma from "../schema/auth.schema"
const { celebrate, Joi, errors, Segments } = require('celebrate');


authRouter.post("/signup", celebrate(authScehma.SignupSchema),authController.postRegister)
authRouter.post("/signin", celebrate(authScehma.SigninSchema),authController.postLogin)


export default authRouter