import React, { useState } from "react"
import axios from "axios"
import { WEATHER_API_KEY as apiKey } from "../config"
import "./Main.css"

function Main() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation("")
    }
  }

  return (
    <div className="app">
      <div className="inputContainer">
        <input
          placeholder="Wpisz nazwę miasta"
          value={location.toLowerCase()}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        ></input>
      </div>
      {data.name ? (
        <div className="primaryInfo">
          <span className="locationName">{data.name}</span>
          <br />
          <span className="temperature">
            {Math.floor(data.main.temp - 273.15)}°C
          </span>
        </div>
      ) : null}

      {data.main ? (
        <div className="bottomInfos">
          <div className="pressure additionalInformation">
            <p>{data.main.pressure} hPa</p>
            <p>Ciśnienie</p>
          </div>
          <div className="humidity additionalInformation">
            <p>{data.main.humidity}%</p>
            <p>Wilgotność</p>
          </div>
          <div className="windSpeed additionalInformation">
            <p>{Math.floor((data.wind.speed * 3600) / 1000)} km/h</p>
            <p>Wiatr</p>
          </div>
          <div className="feelsTemperature additionalInformation">
            <p>{Math.floor(data.main.feels_like - 273.15)}°C</p>
            <p>Temp. odczuwalna</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Main
