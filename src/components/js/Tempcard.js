import React, { useEffect, useState } from 'react'
import "../css/temp-card.css"

const Tempcard = ({ tempinfo }) => {

    const { temp, humidity, pressure, weathermood, name, speed, country, sunset, lon, lat } = tempinfo;
    const [video, setvideo] = useState(require('../../assets/bg.jpg'))
    let sec = sunset
    let date = new Date(sec * 1000)
    let timeStr = `${date.getHours()}: ${date.getMinutes()}`
    const [wState, setwState] = useState('')
    useEffect(() => {
        switch (weathermood) {
            case "Clouds":
                setwState("wi-day-cloudy")
                setvideo(require('../../assets/clouds.mp4'))
                break;
            case "Haze":
                setwState("wi-fog")
                setvideo(require('../../assets/haze.mp4'))
                break
            case "Rain":
                setwState("wi-rain")
                setvideo(require('../../assets/rain.mp4'))
                break;
            case "Clear":
                setwState("wi-day-sunny")
                setvideo(require('../../assets/clear.mp4'))
                break;
            case "Mist":
                setwState("wi-dust")
                setvideo(require('../../assets/mist.mp4'))
                break;
            case "Thunderstorm":
                setwState("wi-thunderstorm")
                setvideo(require('../../assets/thunderstorm.mp4'))
                break;
            default:
                setwState("wi-day-sunny")
                setvideo(require('../../assets/clear.mp4'))

                break;
        }
    }, [weathermood])
    return (
        <>
            <video src={video} autoPlay loop></video>

            <div className='w-icon'>
                <i className={`wi ${wState}`}></i>
            </div>

            <div className='w-temp'>
                <h2>{temp}&deg;C</h2>
                <div>
                    <p>{weathermood}</p>
                    <p>{name}, {country}</p>
                </div>
                <div>
                    <p>lon. {lon}</p>
                    <p>lat. {lat}</p>
                </div>
            </div>
            <p className='w-date'>{new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>

            <div className="w-info">
                <div className='info'>
                    <i className={'wi wi-sunset'} style={{ color: 'red' }}></i>
                    <div>
                        <p>{timeStr}</p>
                        <p>sunset</p>
                    </div>
                </div>
                <div className='info'>
                    <i className={'wi wi-humidity'} style={{ color: '#00d5ff' }}></i>
                    <div>
                        <p>{humidity}</p>
                        <p>humidity</p>
                    </div>
                </div>
                <div className='info'>
                    <i className={'wi wi-strong-wind'}></i>
                    <div>
                        <p>{speed}</p>
                        <p>speed</p>
                    </div>
                </div>
                <div className='info'>
                    <i className={'wi wi-rain'} style={{ color: 'yellow' }}></i>
                    <div>
                        <p>{pressure}</p>
                        <p>pressure</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Tempcard
