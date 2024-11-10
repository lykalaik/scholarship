import RenewApplication from "./RenewApplication";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // Store fetched announcements
  const scholarName = sessionStorage.getItem("scholarData");

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
        .from("funding")
        .select("*")
        .eq("full_name", scholarName);
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_announcements = async () => {
    try {
      const { data, error } = await supabase.from("announcements").select("*");
      if (error) throw error;
      setAnnouncements(data); // Store fetched announcements
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching announcements:", error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = async () => {
    await fetch_announcements(); // Fetch announcements when opening modal
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("scholarData");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content font-mono p-5 flex justify-between items-center">
        <div className="flex items-center">
          <div className="btn btn-ghost lg:text-3xl font-extrabold flex items-center">
            <img
              src="butuan.png"
              alt="butuan logo"
              height={50}
              width={55}
              className="mr-2"
            />
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
              Butuanon Online Scholarship
            </span>
          </div>
        </div>

        <div className="flex-none sm:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className="flex-none hidden sm:flex items-center">
          <button
            onClick={openModal}
            className="btn btn-ghost flex items-center"
          >
            <MdAnnouncement className="text-lg sm:text-xl md:text-2xl" />
            <span className="ml-2 text-sm sm:text-lg md:text-xl">
              Announcements
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-ghost flex items-center ml-4"
          >
            Logout
          </button>
        </div>
      </div>

      <ul
        className={`menu menu-horizontal text-lg font-bold flex flex-col sm:flex-row ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex-none">
          <button
            onClick={openModal}
            className="btn btn-ghost flex items-center"
          >
            <MdAnnouncement className="text-lg sm:text-xl md:text-2xl" />
            <span className="ml-2 text-sm sm:text-lg md:text-xl">
              Announcements
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-ghost flex items-center ml-4"
          >
            Logout
          </button>
        </div>
      </ul>

      <div className="container mx-auto mt-8 p-5 lg:px-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl flex gap-2 font-bold">
            <RiFundsBoxFill className="mt-1" />
            Track Fundings
          </h1>
        </div>
        <div className="card rounded shadow-xl border p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Date Funded</th>
                  <th>Amount</th>
                  <th>Scholarship Type</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.date_funded}</td>
                    <td>${user.amount}</td>
                    <td>{user.scholarship_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <RenewApplication />
      </div>

      {/* Announcements Modal */}
      {modalOpen && (
        <div className="modal modal-open ">
          <div className="modal-box w-full max-w-4xl">
            <h2 className="text-xl font-bold">Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {announcements.length === 0 ? (
                <p>No announcements available.</p>
              ) : (
                announcements.map((announcement, index) => (
                  <div key={index} className="card shadow-lg border p-4">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p>{announcement.body}</p>
                  </div>
                ))
              )}
            </div>
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
