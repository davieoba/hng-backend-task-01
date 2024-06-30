import axios from "axios"
import { IP_INFO_TOKEN } from "../../config/app.keys"
import { Response } from "express"
import AppError from "../libs/app-error"

async function getLocationFromIpAddress(
  _res: Response,
  ip: string
): Promise<{ city: string; lat: string; long: string }> {
  if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127.0.0.1")) {
    throw new AppError("Unable to determine public IP address", 400)
  }

  const response = await axios.get(
    `https://ipinfo.io/${ip}/json?token=${IP_INFO_TOKEN}`
  )

  return {
    city: response.data.city,
    lat: response.data.loc.split(",")[0],
    long: response.data.loc.split(",")[1],
  }
}

export default getLocationFromIpAddress
