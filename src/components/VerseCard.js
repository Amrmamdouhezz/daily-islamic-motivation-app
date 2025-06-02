import { useEffect, useRef, useState } from "react"
import { fetchingRandomQuranSurahNumber, fetchingAyahAudio } from "../FetchingData"
import Loading from "./Loading"
const VerseCard = () => {
    const [ayah, setAyah] = useState("")
    const [ayahNumber, setayahNumber] = useState("")
    const [surahName, setSurahName] = useState("")
    const [surahNumber, setSurahNumber] = useState("")
    const [audio, setAudio] = useState("")
    const audioRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isplaying, setIsPlaying] = useState(false)
    const getِAyahDetails = async () => {
        try {
            setIsLoading(true)
            setIsPlaying(false)
            setAudio("")
            const result = await fetchingRandomQuranSurahNumber()
            const surahNumber = result.data.number
            const surahName = result.data.name
            const randomAyahNumber = Math.floor(Math.random() * result.data.ayahs.length)
            const ayahObject = result.data.ayahs[randomAyahNumber]
            setSurahNumber(surahNumber)
            setSurahName(surahName)
            setAyah(ayahObject.text)
            setayahNumber(randomAyahNumber)
        } catch (error) {
            alert("حدث خطأ أثناء تحميل الآية: " + error.message);
        }
        finally {
            setIsLoading(false)
        }
    }
    const playAudio = async () => {
        if (!audio) {
            try {
                const result = await fetchingAyahAudio(surahNumber, ayahNumber + 1)
                const audioUrl = result.data.audio
                setAudio(audioUrl)
                if (audioRef.current) {
                    audioRef.current.src = audioUrl
                    audioRef.current.play()
                    setIsPlaying(true)

                    audioRef.current.onended = () => setIsPlaying(false)
                }
            } catch (error) {
                alert("حدث خطأ أثناء تشغيل الصوت: " + error.message);
                setIsPlaying(false)
            }
        } else {
            if (audioRef.current) {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }

    }
    useEffect(() => {
        getِAyahDetails()
    }, [])
    if (isLoading)
        return <Loading />
    return (
        <div className="body_text">
            <p className="ayah-text">{ayah}</p>
            <p className="surah-number">{surahName} [{surahNumber} : {ayahNumber}]</p>
            <div className="Ayah-box-buttons">
                <i onClick={getِAyahDetails} className="cursor transition fa-solid fa-rotate-right"></i>
                <i onClick={isplaying ? () => {
                    audioRef.current.pause()
                    setIsPlaying(false)
                } : playAudio} className={`cursor transition fa-solid ${isplaying ? "fa-pause" : "fa-play"}`}></i>
            </div>
            <audio ref={audioRef}></audio>
        </div>

    )
}

export default VerseCard