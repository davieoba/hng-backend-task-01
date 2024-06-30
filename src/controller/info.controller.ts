import { NextFunction, Request, Response } from "express"
import catchAsync from "../extensions/libs/catch-async"
import getLocationFromIpAddress from "../extensions/handlers/generate-location-from-ip"
import { getClientIp } from "request-ip"
import getCurrentWeather from "../extensions/handlers/get-current-weather"
import AppError from "../extensions/libs/app-error"

class InfoController {
  static getInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = req.query.visitor_name as string
      if (query && query?.length < 1) {
        return new AppError(
          `Bad request, seems the visitor's name is missing.`,
          400
        )
      }
      // Get the client ip, location and weather
      const clientIp = getClientIp(req)
      const location = await getLocationFromIpAddress(res, clientIp as string)
      if (!location.lat || !location.long) {
        return next(new AppError(`Location not found`, 400))
      }
      const weather = await getCurrentWeather(location.lat, location.long)
      if (!weather) {
        return new AppError("No weather result!", 400)
      }
      if (location?.city.length < 1) {
        return new AppError("Cannot find name of City", 400)
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
