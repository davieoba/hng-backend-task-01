import axios from "axios"
import { OPEN_WEATHER_API } from "../../config/app.keys"

async function getCurrentWeather(lat: string, long: string) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_API}&units=metric`
  )

  return Math.ceil(response.data.main.temp)
}

export default getCurrentWeather
