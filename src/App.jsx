import Home from "./components/Home/Home.jsx";
import Apply from "./components/Home/Apply.jsx";
import About from "./components/Home/About.jsx";
import Track from "./components/Home/Track.jsx";
import UserDashboard from "./components/User/UserDashboard.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import Applicants from "./components/Admin/Applicants.jsx";
import Scholars from "./components/Admin/Scholars.jsx";
import Renewal from "./components/Admin/Renewal.jsx";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/scholars" element={<Scholars />} />
        <Route path="/renewals" element={<Renewal />} />
      </Routes>
    </>
  );
};

export default App;
