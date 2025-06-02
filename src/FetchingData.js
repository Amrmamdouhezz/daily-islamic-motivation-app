import axios from "axios";
let quranSurahEndpoint = "http://api.alquran.cloud/v1/surah/"
let quranAyahAudioEndpoint = " http://api.alquran.cloud/v1/ayah/"
let recitationSheikh = "/ar.alafasy"
let Hadith_Api_key = "$2y$10$7lkEbcyOnWWpD1ihYGHTGmqgACRW7SkTi4VChuosdvOAwa4PRi"
let hadithURL = "https://hadithapi.com/public/api/hadiths?apiKey="
const quranSurahsNumber = 114

const fetchingRandomQuranSurahNumber = async () => {
    const randomQuranSurahNumber = Math.floor(Math.random() * quranSurahsNumber) + 1
    const result = await axios.get(`${quranSurahEndpoint}${randomQuranSurahNumber}`)
    return result.data
}

const fetchingAyahAudio = async (surahNumber, AyahNumber) => {
    const result = await axios.get(`${quranAyahAudioEndpoint}${surahNumber}:${AyahNumber}${recitationSheikh}`)
    console.log('completePath', result.data)
    return result.data

}

const fetchingHadith = async () => {
    const result = await axios.get(`${hadithURL}${Hadith_Api_key}`)
    return result.data.hadiths
}


const getFormattedDate = () => {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${day}-${month}-${year}`
}
export { fetchingRandomQuranSurahNumber, fetchingAyahAudio, fetchingHadith, getFormattedDate }