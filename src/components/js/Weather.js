import React, { useEffect, useState } from 'react'
import '../css/weather.css'
import Tempcard from './Tempcard'

function Weather() {

    const [searchValue, setSearchValue] = useState("jaipur")
    const [tempInfo, setTempInfo] = useState({})
    async function getWeather() {
        try {
            let apiKey = 'bde0b3ebb530c5020ec33020cac92a34';
            let API = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
            &units=metric&appid=${apiKey}`

            const res = await fetch(API),
                data = await res.json();

            const { lon, lat } = data.coord;
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name, timezone } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            // make a new obj from extected data
            const myWeather = { temp, humidity, pressure, weathermood, name, speed, country, sunset, lon, lat, timezone };
            setTempInfo(myWeather)
        }
        catch (error) {
            alert('invalid City Name')
        }
    }

    useEffect(() => {
        getWeather();
        // console.log("run")
    }, [])

    //ener key
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    };
    return (
        <div className='weather-box'>
            <h1>weather app</h1>
            <div className='search-box'>
                <input type="search"
                    value={searchValue}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='search your city..' />
                {/* <button className='search-btn' onClick={getWeather}>check</button> */}
            </div>
            <Tempcard tempinfo={tempInfo} />
        </div>
    )
}

export default Weather