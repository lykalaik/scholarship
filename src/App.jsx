import Home from "./components/Home/Home.jsx";
import Apply from "./components/Home/Apply.jsx";
import About from "./components/Home/About.jsx";
import Track from "./components/Home/Track.jsx";
import UserDashboard from "./components/User/UserDashboard.jsx";
import Archive from "./components/Admin/Archive.jsx";
import Applicants from "./components/Admin/Applicants.jsx";
import Scholars from "./components/Admin/Scholars.jsx";
import Renewal from "./components/Admin/Renewal.jsx";
import EmailForm from "./components/Admin/Email.jsx";
import News from "./components/Admin/News.jsx";
import Analytics from "./components/Admin/Analytics.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/track" element={<Track />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/admin" element={<Applicants />} />
        <Route path="/scholars" element={<Scholars />} />
        <Route path="/renewals" element={<Renewal />} />
        <Route path="/email" element={<EmailForm />} />
        <Route path="/news" element={<News />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
};

export default App;
