import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getFormattedDate } from '../FetchingData'
import Loading from "./Loading"
const PrayerTimeCard = () => {
    const [location, setLocation] = useState({
        city: '',
        country: '',
        error: ''
    })
    const [response, setResponse] = useState("")
    const [time, setTime] = useState({ hours: "", minutes: "", seconds: "" })
    const getPrayerTimesDetails = () => {
        /*get user coordinate*/
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const currenttime = new Date(pos.timestamp)
                const hours = String(currenttime.getHours()).padStart(2, '0')
                const minutes = String(currenttime.getMinutes()).padStart(2, '0')
                const seconds = String(currenttime.getSeconds()).padStart(2, '0')
                const timeObj = {
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                }
                setTime(timeObj)
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    )
                    console.log('result = ', res.data)
                    const data = res.data
                    const city = data.address.city || data.address.town || data.address.village || ''
                    const country = data.address.country || ''
                    setLocation({ city, country, error: '' })
                    const queryAddress = `${city},${country}`
                    const date = getFormattedDate()
                    console.log('date', date)
                    const prayerData = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/
                        ${date}
                        ?address=${queryAddress}`)
                    setResponse(prayerData.data)
                    console.log('prayerData', prayerData.data)
                } catch (err) {
                    setLocation({ city: '', country: '', error: 'error getting location' })
                    console.log('err', err)
                }
            }, (err) => {
                setLocation({ city: '', country: '', error: err })
                console.log('err', err)
            });
        } else {
            setLocation({ city: '', country: '', error: 'Geolocation not supported' });
            console.log('Geolocation not supported')
        }
    }
    useEffect(() => {
        getPrayerTimesDetails()

    }, [])
    return (
        <div className="prayer-times-body">
            {
                response ? (
                    <div className='w-100 d-flex flex-column justify-content-around align-items-center'>
                        <div className='Date-Time'>
                            <p className='DateTime'>{response.data.date.readable}</p>
                            <p className='DateTime'>{time.hours}:{time.minutes}:{time.seconds}</p>
                        </div>
                        <div className='prayerTimes'>
                            <div className='prayer-name-and-time'>
                                <p className='fw-bolder'>الفجر</p>
                                <p className='fw-medium'>{response.data.timings.Fajr}</p>
                            </div>
                            <div className='prayer-name-and-time'>
                                <p className='fw-bolder'>الظهر</p>
                                <p className='fw-medium'>{response.data.timings.Dhuhr}</p>
                            </div>
                            <div className='prayer-name-and-time'>
                                <p className='fw-bolder'>العصر</p>
                                <p className='fw-medium'>{response.data.timings.Asr}</p>
                            </div>
                            <div className='prayer-name-and-time'>
                                <p className='fw-bolder'>المغرب</p>
                                <p className='fw-medium'>{response.data.timings.Maghrib}</p>
                            </div>
                            <div className='prayer-name-and-time'>
                                <p className='fw-bolder'>العشاء</p>
                                <p className='fw-medium'>{response.data.timings.Isha}</p>
                            </div>
                        </div>
                        <p className='location'>{location.city} - {location.country}</p>
                        <i onClick={getPrayerTimesDetails} className="cursor transition fa-solid fa-rotate-right"></i>
                    </div>
                ) : (
                    <Loading />
                )
            }
        </div>

    )
}


export default PrayerTimeCard