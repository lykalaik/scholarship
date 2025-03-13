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
import ScholarRoute from "./components/ScholarRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Unauthorized from "./components/Unathorized.jsx";
import Tabs from "./components/Admin/Tabs.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/track" element={<Track />} />

        <Route element={<ScholarRoute />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/archive" element={<Archive />} />
          <Route path="/admin" element={<Applicants />} />
          <Route path="/scholars" element={<Scholars />} />
          <Route path="/renewals" element={<Renewal />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/news" element={<News />} />
          <Route path="/analytics" element={<Tabs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
