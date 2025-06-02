import React, { useState, useEffect } from 'react'

const ThemeToggler = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', 'light')
    }, [])

    const HandleLightTheme = () => {
        console.log('Entered Light theme')
        setIsDark(false)
        document.documentElement.setAttribute('data-theme', 'light')
    }

    const HandleDarkTheme = () => {
        console.log('Entered Dark theme')
        setIsDark(true)
        document.documentElement.setAttribute('data-theme', 'dark')
    }

    return (
        <div className="theme-toggler">
            <i
                onClick={HandleLightTheme}
                className={`fa-regular fa-sun ${isDark ? 'active' : 'inactive'}`}
            ></i>
            <i
                onClick={HandleDarkTheme}
                className={`fa-regular fa-moon ${!isDark ? 'active' : 'inactive'}`}
            ></i>
        </div >
    )
}

export default ThemeToggler