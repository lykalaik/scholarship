import RenewApplication from "./RenewApplication";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { MdManageAccounts } from "react-icons/md";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // Store fetched announcements
  const scholarName = sessionStorage.getItem("scholarData");
  const [profileModal, setProfileModalOpen] = useState(false);
  const [profileData, setrProfileData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [renewalData, setRenewalData] = useState([]);

  useEffect(() => {
    fetch_data();
    fetch_profile();
    fetch_renewals();
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

  const fetch_renewals = async () => {
    try {
      const { data, error } = await supabase
        .from("renewals")
        .select("*")
        .eq("full_name", scholarName)
        .single();
      if (error) throw error;
      console.log(data);
      setRenewalData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_profile = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("full_name", scholarName)
        .single();
      if (error) throw error;
      console.log(data);
      setrProfileData(data);
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
    await fetch_announcements();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPModal = async () => {
    setProfileModalOpen(true);
  };

  const closePModal = () => {
    setProfileModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("scholarData");
    window.location.href = "/";
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content font-mono p-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="btn btn-ghost lg:text-xl font-medium flex items-center">
            <img src="butuan.png" alt="butuan logo" className="h-10 w-10" />
            <span className="font-semibold tracking-wider">
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

        <div className="hidden md:flex">
          <button
            onClick={openModal}
            className="btn btn-ghost flex items-center"
          >
            <FaBell />
            <span className="text-sm sm:text-lg md:text-l">Announcements</span>
          </button>
          <button
            onClick={openPModal}
            className="btn btn-ghost flex items-center"
          >
            <FaUser />
            <span className="text-sm sm:text-lg md:text-l">Profile</span>
          </button>
          <div className="border-r mr-5 text-neutral">.</div>
          <button
            className="btn btn-sm mt-1 border-yellow-400 hover:border-yellow-400"
            onClick={handleLogout}
          >
            <MdManageAccounts size={22} />
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

      <div className="mt-8 lg:px-10">
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
                  <th>Amount Disbursed</th>
                  <th>Scholarship Type</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.date_funded}</td>
                    <td>₱{user.amount}</td>
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
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h2 className="text-xl font-bold">Announcements</h2>
            <div className="divider"></div>
            <div>
              {announcements.length === 0 ? (
                <p>No announcements available.</p>
              ) : (
                announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="collapse collapse-plus bg-base-200 mb-2"
                  >
                    <input
                      type="radio"
                      name="my-accordion"
                      id={`announcement-${index}`}
                      defaultChecked={index === 0} // Optional: Check the first one by default
                    />
                    <div className="collapse-title text-xl font-medium">
                      {announcement.title}
                    </div>
                    <div className="collapse-content">
                      <p>{announcement.body}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-4xl">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closePModal}
              >
                ✕
              </button>
            </form>
            <h2 className="text-xl font-bold">User Profile</h2>
            <div className="divider"></div>
            {/* State for Full Image Modal */}
            {selectedImage && (
              <div className="modal modal-open">
                <div className="modal-box relative">
                  <img
                    src={selectedImage}
                    alt="Full View"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Card for Personal Details */}
            <div className="card shadow-lg border p-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  <p>
                    <strong>Name:</strong> {profileData?.full_name || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {profileData?.sex || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {profileData?.email_address || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {profileData?.mobile_number || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {profileData?.address || "N/A"}
                  </p>
                  <p>
                    <strong>Last School Attended:</strong>{" "}
                    {profileData?.school || "N/A"}
                  </p>
                  <p>
                    <strong>Course/Strand:</strong>{" "}
                    {profileData?.course || "N/A"}
                  </p>
                  <p>
                    <strong>GPA:</strong> {profileData?.gpa || "N/A"}
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {profileData?.itr ? (
                    <img
                      src={profileData.itr}
                      alt="ITR"
                      className="w-full max-w-sm h-auto object-contain rounded-lg shadow-md"
                    />
                  ) : (
                    <img src="https://placehold.co/600x400" alt="" />
                  )}
                </div>
              </div>
            </div>

            {/* Card for Submitted Images */}
            <div className="card shadow-lg border p-4">
              <h3 className="font-semibold text-lg">Uploaded Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {profileData?.application_letter && (
                  <img
                    src={profileData.application_letter}
                    alt="Application Letter"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() =>
                      setSelectedImage(profileData.application_letter)
                    }
                  />
                )}
                {profileData?.recommendation_letter && (
                  <img
                    src={profileData.recommendation_letter}
                    alt="Recommendation Letter"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() =>
                      setSelectedImage(profileData.recommendation_letter)
                    }
                  />
                )}
                {profileData?.copy_itr && (
                  <img
                    src={profileData.copy_itr}
                    alt="Copy of ITR"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(profileData.copy_itr)}
                  />
                )}
                {profileData?.cedula && (
                  <img
                    src={profileData.cedula}
                    alt="Cedula"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(profileData.cedula)}
                  />
                )}
                {profileData?.voters && (
                  <img
                    src={profileData.voters}
                    alt="Voter's ID"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(profileData.voters)}
                  />
                )}
                {profileData?.recent_card && (
                  <img
                    src={profileData.recent_card}
                    alt="Recent Card"
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(profileData.recent_card)}
                  />
                )}
                {!profileData?.application_letter &&
                  !profileData?.recommendation_letter &&
                  !profileData?.itr &&
                  !profileData?.copy_itr &&
                  !profileData?.cedula &&
                  !profileData?.voters &&
                  !profileData?.recent_card && <p>No images submitted.</p>}
              </div>
            </div>

            {/* Card for Submitted Images */}
            <div className="card shadow-lg border p-4 mt-5">
              <h3 className="font-semibold text-lg">
                Renewal Documents - {formatDate(renewalData.created_at)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {renewalData?.recommendation && (
                  <div
                    key="recommendation"
                    className="flex flex-col items-center"
                  >
                    <img
                      src={renewalData.recommendation}
                      alt="Recommendation Letter"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        setSelectedImage(renewalData.recommendation)
                      }
                    />
                    <p className="mt-2 text-sm">Recommendation Letter</p>
                  </div>
                )}
                {renewalData?.final_grades && (
                  <div
                    key="final_grades"
                    className="flex flex-col items-center"
                  >
                    <img
                      src={renewalData.final_grades}
                      alt="Final Grades"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(renewalData.final_grades)}
                    />
                    <p className="mt-2 text-sm">Final Grades</p>
                  </div>
                )}
                {renewalData?.evaluation_sheet && (
                  <div
                    key="evaluation_sheet"
                    className="flex flex-col items-center"
                  >
                    <img
                      src={renewalData.evaluation_sheet}
                      alt="Evaluation Sheet"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        setSelectedImage(renewalData.evaluation_sheet)
                      }
                    />
                    <p className="mt-2 text-sm">Evaluation Sheet</p>
                  </div>
                )}
                {renewalData?.scholarship_contract && (
                  <div
                    key="scholarship_contract"
                    className="flex flex-col items-center"
                  >
                    <img
                      src={renewalData.scholarship_contract}
                      alt="Scholarship Contract"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        setSelectedImage(renewalData.scholarship_contract)
                      }
                    />
                    <p className="mt-2 text-sm">Scholarship Contract</p>
                  </div>
                )}
                {renewalData?.clearance && (
                  <div key="clearance" className="flex flex-col items-center">
                    <img
                      src={renewalData.clearance}
                      alt="Clearance"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(renewalData.clearance)}
                    />
                    <p className="mt-2 text-sm">Clearance</p>
                  </div>
                )}
                {renewalData?.study_load && (
                  <div key="study_load" className="flex flex-col items-center">
                    <img
                      src={renewalData.study_load}
                      alt="Study Load"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(renewalData.study_load)}
                    />
                    <p className="mt-2 text-sm">Study Load</p>
                  </div>
                )}
                {/* Show a message if no images are present */}
                {!renewalData?.recommendation &&
                  !renewalData?.final_grades &&
                  !renewalData?.evaluation_sheet &&
                  !renewalData?.scholarship_contract &&
                  !renewalData?.study_load &&
                  !renewalData?.clearance && <p>No images submitted.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
