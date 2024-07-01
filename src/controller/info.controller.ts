import { NextFunction, Request, Response } from "express"
import { getClientIp } from "request-ip"
import getLocationFromIpAddress from "../extensions/handlers/generate-location-from-ip"
import getCurrentWeather from "../extensions/handlers/get-current-weather"
import catchAsync from "../extensions/libs/catch-async"

// @Request ?visitor_name=James
class InfoController {
  static getInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query.visitor_name as string
      if (query && query?.length < 1) {
        return res
          .status(400)
          .send(`Bad request, seems the visitor's name is missing.`)
      }
      // Get the client ip, location and weather
      const clientIp = getClientIp(req)
      const location = await getLocationFromIpAddress(res, clientIp as string)
      if (location === null) {
        return res.status(400).json({
          message: "Bad request, error with location data",
        })
      }
      if (!location.lat || !location.long || !location.city) {
        return res.status(404).json({
          message: "Location not found",
        })
      }
      const weather = await getCurrentWeather(location.lat, location.long)
      if (!weather) {
        return res.status(400).send("No weather result!")
      }

      const greetingStr = `Hello, ${query}!, the temperature is ${weather} degree Celcius in ${location.city}`
      res.status(200).json({
        client_ip: clientIp,
        location: location.city,
        greeting: greetingStr,
      })
    }
  )
}

export default InfoController
