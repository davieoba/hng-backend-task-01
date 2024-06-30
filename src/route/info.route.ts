import express from "express"
import InfoController from "../controller/info.controller"

const router = express.Router()

router.get("/", InfoController.getInfo)

export default router
