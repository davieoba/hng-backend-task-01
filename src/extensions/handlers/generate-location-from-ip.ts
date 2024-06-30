import axios from "axios"
import { IP_INFO_TOKEN } from "../../config/app.keys"
import { Response } from "express"

async function getLocationFromIpAddress(res: Response, ip: string) {
  // if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127.0.0.1")) {
  //   return res.status(400).send("Unable to determine public IP address")
  // }

  // 102.88.71.154
  // `https://ipinfo.io/${ip}/json?token=${IP_INFO_TOKEN}`
  const response = await axios.get(
    ` https://ipinfo.io/102.88.71.154/json?token=3393bdb2f5c6d1`
  )

  return {
    city: response.data.city,
    lat: response.data.loc.split(",")[0],
    long: response.data.loc.split(",")[1],
  }
}

export default getLocationFromIpAddress

// https://ipinfo.io/102.88.71.154/json?token=3393bdb2f5c6d1
