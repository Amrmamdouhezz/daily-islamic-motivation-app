import React from 'react'
import ThemeToggler from "../components/ThemeToggler"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className='header-div d-flex flex-column justify-content-around align-items-center'>
            <div className='header-title'>
                <h1>متابعة دينية يومية</h1>
                <div className='header-paragraph'>
                    <p>ايات قرانية , أحاديث , أوقات الصلاة</p>
                </div>
                <div className='header-icon'>
                    <ThemeToggler />
                </div>


            </div>
            <div className='header-cards'>

                <Link className='header-card' as={Link} to={"/VerseCard"}>
                    <p>قران</p>
                </Link>
                <Link className='header-card' as={Link} to={"/HadithCard"}>
                    <p>حديث</p>
                </Link>
                <Link className='header-card' as={Link} to={"/PrayerTimeCard"}>
                    <p>أوقات الصلاة</p>
                </Link>
            </div>
        </div>
    )
}

export default Header