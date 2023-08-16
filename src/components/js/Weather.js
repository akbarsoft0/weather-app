import React, { useEffect, useState, useCallback } from 'react'
import '../css/weather.css'
import Tempcard from './Tempcard'

function Weather() {

    const [searchValue, setsearchValue] = useState("jaipur")
    const [tempinfo, setTempInfo] = useState({})

    // const getweather = async () => {
    //     try {

    //         let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
    //         &units=metric&appid=bde0b3ebb530c5020ec33020cac92a34`

    //         const res = await fetch(url),
    //             data = await res.json();

    //         const { lon, lat } = data.coord,
    //             { temp, humidity, pressure } = data.main,
    //             { main: weathermood } = data.weather[0],
    //             { name, timezone } = data,
    //             { speed } = data.wind,
    //             { country, sunset } = data.sys;

    //         const myWeather = { temp, humidity, pressure, weathermood, name, speed, country, sunset, lon, lat, timezone };
    //         setteminfo(myWeather)



    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    const getweather = useCallback(async () => {
        try {
            // const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bde0b3ebb530c5020ec33020cac92a34`
            const res = await fetch(url);
            const data = await res.json();

            const { coord, main, weather, name, wind, sys, timezone } = data;
            const { lon, lat } = coord;
            const { temp, humidity, pressure } = main;
            const { main: weatherMood } = weather[0];
            const { speed } = wind;
            const { country, sunset } = sys;

            const myWeather = { temp, humidity, pressure, weatherMood, name, speed, country, sunset, lon, lat, timezone };
            setTempInfo(myWeather);
        } catch (error) {
            console.log(error);
        }
    }, [searchValue])

    useEffect(() => {
        getweather();
        console.log("run")
    }, [getweather])
    return (
        <div className='weather-box'>
            <h1>weather app</h1>
            <div className='search-box'>
                <input type="search" value={searchValue} onChange={(e) => setsearchValue(e.target.value)} placeholder='search your city..' />
                <button className='search-btn' onClick={getweather}>check</button>
            </div>
            <Tempcard tempinfo={tempinfo} />
        </div>
    )
}

export default Weather