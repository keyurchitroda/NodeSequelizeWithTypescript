import express from "express";
const router = express.Router()
import authRouter from "./user.route"

router.use("/auth",authRouter)

export default router
