import RenewApplication from "./RenewApplication";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { MdManageAccounts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]); 
  const scholarName = sessionStorage.getItem("scholarData");
  const scholarEmail = sessionStorage.getItem("email")
  const [profileModal, setProfileModalOpen] = useState(false);
  const [profileData, setrProfileData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  
  const [school, setSchool] = useState("");
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [changeSchoolModal, setChangeSchoolModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openChangePasswordModal = () => setChangePasswordModal(true);
  const openChangeSchoolModal = () => setChangeSchoolModal(true);
  const closeChangeSchoolModal = () => setChangeSchoolModal(false); 
  const closeChangePasswordModal = () => setChangePasswordModal(false);

  useEffect(() => {
    fetch_data();
    fetch_profile();
    fetch_renewals();
  }, []);

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
        .from("scholarsData")
        .select("*")
        .eq("name", scholarName);
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Check if match
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      // current
      const { data, error } = await supabase
        .from("scholars")
        .select("password")
        .eq("full_name", scholarName)
        .single();
      if (error) throw error;

      // Compare
      if (data.password !== currentPassword) {
        alert("Current password is incorrect!");
        return;
      }

      // Update
      const { error: updateError } = await supabase
        .from("scholars")
        .update({ password: newPassword })
        .eq("full_name", scholarName);
      if (updateError) throw updateError;
      alert("Password updated successfully!");
      closeChangePasswordModal();
    } catch (err) {
      console.error("Error updating password:", err.message);
      alert("Failed to update password.");
    }
  };

  const handleChangeSchool = async () => {
    try {
      const { data } = await supabase
        .from("scholarsData")
        .update([
          {
            school,
          },
        ])
        .eq("name", scholarName)
        .eq("semester", "1st Sem")
        .eq("category", "New");
 window.location.reload();
    } catch (error) {
      alert("Error Saving Data.");
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
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_profile = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("email_address", scholarEmail)
        .single();
      if (error) throw error;
      console.log(data);
      setrProfileData(data);
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_announcements = async () => {
    try {
      const { data, error } = await supabase.from("announcements").select("*");
      if (error) throw error;
      setAnnouncements(data); // Store fetched announcements
    } catch (error) {
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
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.close();
    }
  };
  const closeAModal = () => {
    setModalOpen(false);
  };

  const openPModal = async () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
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
          <div className="flex justify-between gap-5">
          <button
            className="btn btn-sm btn-neutral"
            onClick={openChangeSchoolModal}
          >
            Add School
          </button>
          <button
            className="btn btn-sm btn-neutral"
            onClick={openChangePasswordModal}
          >
            <RiLockPasswordFill />
            Change Password
          </button>
          </div>
          
        </div>
        <div className="card rounded shadow-xl border p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Date Funded</th>
                  <th>Amount Disbursed</th>
                  <th>Scholarship Type</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{formatDate(user.created_at)}</td>
                    <td>₱{user.fund}</td>
                    <td>{user.category}</td>
                    <td>{user.semester}</td>
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
                onClick={closeAModal}
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

      {/* Scholar Documents Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Scholar's Data</h3>
          <div className="divider"></div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          {profileData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Last Name:</strong> {profileData.last_name}
                </p>
                <p>
                  <strong>Given Name:</strong> {profileData.given_name}
                </p>
                <p>
                  <strong>Middle Name:</strong> {profileData.middle_name}
                </p>
                <p>
                  <strong>Age:</strong> {profileData.age}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {profileData.date_of_birth}
                </p>
                <p>
                  <strong>Place of Birth:</strong>{" "}
                  {profileData.place_of_birth}
                </p>
                <p>
                  <strong>Course:</strong> {profileData.course}
                </p>
                <p>
                  <strong>Year Level:</strong> {profileData.year_level}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Sex:</strong> {profileData.sex}
                </p>
                <p>
                  <strong>Civil Service:</strong>{" "}
                  {profileData.civil_service}
                </p>
                <p>
                  <strong>Religion:</strong> {profileData.religion}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {profileData.contact_number}
                </p>
                <p>
                  <strong>Email Address:</strong>{" "}
                  {profileData.email_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Height:</strong> {profileData.height}
                </p>
                <p>
                  <strong>Weight:</strong> {profileData.weight}
                </p>
              </div>

              <p>
                <strong>Address:</strong> {profileData.address}
              </p>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Number of Family Members:</strong>{" "}
                  {profileData.number_family_members}
                </p>
                <p>
                  <strong>Ethnicity:</strong> {profileData.ethnicity}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Name:</strong>{" "}
                  {profileData.father_name}
                </p>
                <p>
                  <strong>Father's Address:</strong>{" "}
                  {profileData.father_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Contact:</strong>{" "}
                  {profileData.father_number}
                </p>
                <p>
                  <strong>Father's Occupation:</strong>{" "}
                  {profileData.father_occupation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Name:</strong>{" "}
                  {profileData.mother_name}
                </p>
                <p>
                  <strong>Mother's Address:</strong>{" "}
                  {profileData.mother_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Contact:</strong>{" "}
                  {profileData.mother_number}
                </p>
                <p>
                  <strong>Mother's Occupation:</strong>{" "}
                  {profileData.mother_occupation}
                </p>
              </div>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Elementary School:</strong>{" "}
                  {profileData.elementary_school}
                </p>
                <p>
                  <strong>Elementary Year:</strong>{" "}
                  {profileData.elementary_year}
                </p>
                <p>
                  <strong>Elementary Awards:</strong>{" "}
                  {profileData.elementary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Secondary School:</strong>{" "}
                  {profileData.secondary_school}
                </p>
                <p>
                  <strong>Secondary Year:</strong>{" "}
                  {profileData.secondary_year}
                </p>
                <p>
                  <strong>Secondary Awards:</strong>{" "}
                  {profileData.secondary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Availed Scholarship:</strong>{" "}
                  {profileData.availed_scholarship}
                </p>
                <p>
                  <strong>Scholarship Year:</strong>{" "}
                  {profileData.scholarship_year}
                </p>
                <p>
                  <strong>Scholarship Name:</strong>{" "}
                  {profileData.scholarship_name}
                </p>
              </div>

              {/* PDF Viewer Section */}
              {profileData?.docs &&
                typeof profileData.docs === "string" && (
                  <div className="mt-4">
                    <h4 className="font-bold text-md mb-2">
                      Applicant Documents:
                    </h4>
                    <div className="card bordered bg-base-100 shadow-md">
                      <div className="card-body p-2">
                        <object
                          data={profileData.docs}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                          className="border border-gray-300 rounded-md"
                        >
                          <p className="text-center py-4">
                            Unable to display PDF file.
                            <a
                              href={profileData.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-link"
                            >
                              Download
                            </a>{" "}
                            instead.
                          </p>
                        </object>
                      </div>
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </dialog>

      {changePasswordModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div className="mt-4 relative">
                <label className="block font-semibold">Current Password</label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? "👁️" : "🔒"}
                </button>
              </div>

              <div className="mt-4 relative">
                <label className="block font-semibold">New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "👁️" : "🔒"}
                </button>
              </div>

              <div className="mt-4 relative">
                <label className="block font-semibold">
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "🔒"}
                </button>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={closeChangePasswordModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-neutral">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

        {changeSchoolModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">Update School</h2>
            <form>
              <div className="mt-4 relative">
                <label className="block font-semibold">
                  Insert School Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  required
                />
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={closeChangeSchoolModal}
                  >
                    Cancel
                  </button>
                  <button onClick={handleChangeSchool} className="btn btn-neutral">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;