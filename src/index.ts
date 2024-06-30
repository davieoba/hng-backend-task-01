import express from "express"
import http from "http"
import InfoRoute from "./route/info.route"
import { logger } from "./extensions/helpers/logger.helper"

const app = express()
app.use(express.json())

const route = "/api/hello"
app.use(`${route}/health`, (_req, res) => {
  res.status(200).send("Server is running.")
})
app.use(route, InfoRoute)

const server = http.createServer(app)
server.listen(5000, () => {
  logger.info(`Server running on http://localhost:5000`)
})
