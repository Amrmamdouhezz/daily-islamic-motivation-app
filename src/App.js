import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import VerseCard from "./components/VerseCard";
import HadithCard from "./components/HadithCard";
import PrayerTimeCard from "./components/PrayerTimeCard";

function App() {
  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/VerseCard" element={<VerseCard />} />
          <Route path="/HadithCard" element={<HadithCard />} />
          <Route path="/PrayerTimeCard" element={<PrayerTimeCard />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>




  );
}

export default App;
