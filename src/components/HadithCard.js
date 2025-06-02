import { useEffect, useState } from "react"
import { fetchingHadith } from "../FetchingData"
import Loading from "./Loading"


const HadithCard = () => {

    const [hadith, setHadith] = useState("")
    const [bookname, setBookname] = useState("")
    const [chapterID, setchapterID] = useState("")
    const [HadithID, setHadithID] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleHadith = async () => {
        try {
            setIsLoading(true)
            const result = await fetchingHadith()
            const data = result.data
            const hadithRandomNumber = Math.floor(Math.random() * data.length)
            const hadithText = data[hadithRandomNumber].hadithArabic
            const hadithBookName = data[hadithRandomNumber].book.bookName
            const HadithChapterId = data[hadithRandomNumber].chapterId
            const HadithId = data[hadithRandomNumber].id
            setHadith(hadithText)
            setBookname(hadithBookName)
            setchapterID(HadithChapterId)
            setHadithID(HadithId)
        } catch (error) {
            alert("حدث خطأ أثناء تحميل الحديث: " + error.message);
        } finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        handleHadith()
    }, [])
    if (isLoading)
        return <Loading />
    return (
        <div className="body_text">
            <p className="ayah-text">{hadith}</p>
            <p className="surah-number">{bookname} [{chapterID} : {HadithID}]</p>
            <i onClick={handleHadith} className="cursor transition fa-solid fa-rotate-right"></i>
        </div>

    )
}

export default HadithCard