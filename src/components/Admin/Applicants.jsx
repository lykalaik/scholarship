import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import supabase from "../supabaseClient";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";

const Applicants = () => {
  const [applicant, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [email, setEmail] = useState("");
  const [appstatus, setAppStatus] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [slots, setSlots] = useState("");
  const [semester, setSemester] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAcceptConfirmModal, setShowAcceptConfirmModal] = useState(false);
  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
  const [showAcceptSuccessModal, setShowAcceptSuccessModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);

  useEffect(() => {
    fetch_applicants();
    fetch_user();
  }, []);

  const fetch_applicants = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("status", "Pending");
      if (error) throw error;
      setApplicants(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_user = async () => {
    try {
      const { data, error } = await supabase
        .from("deadline")
        .select("*")
        .eq("type", "application");
      if (error) throw error;
      setStart(data[0].start);
      setEnd(data[0].end);
      setSlots(data[0].slots);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
    const modal = document.getElementById("confirm_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeConfirmModal = () => {
    const modal = document.getElementById("confirm_modal");
    if (modal) {
      modal.close();
    }
    setShowConfirmModal(false);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
    const modal = document.getElementById("success_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeSuccessModal = () => {
    const modal = document.getElementById("success_modal");
    if (modal) {
      modal.close();
    }
    setShowSuccessModal(false);
    window.location.reload();
  };

  const openAcceptConfirmModal = () => {
    setShowAcceptConfirmModal(true);
    const modal = document.getElementById("accept_confirm_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeAcceptConfirmModal = () => {
    const modal = document.getElementById("accept_confirm_modal");
    if (modal) {
      modal.close();
    }
    setShowAcceptConfirmModal(false);
  };

  const openRejectConfirmModal = () => {
    setShowRejectConfirmModal(true);
    const modal = document.getElementById("reject_confirm_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeRejectConfirmModal = () => {
    const modal = document.getElementById("reject_confirm_modal");
    if (modal) {
      modal.close();
    }
    setShowRejectConfirmModal(false);
  };

  const openAcceptSuccessModal = () => {
    setShowAcceptSuccessModal(true);
    const modal = document.getElementById("accept_success_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeAcceptSuccessModal = () => {
    const modal = document.getElementById("accept_success_modal");
    if (modal) {
      modal.close();
    }
    setShowAcceptSuccessModal(false);
    window.location.reload();
  };

  const openRejectSuccessModal = () => {
    setShowRejectSuccessModal(true);
    const modal = document.getElementById("reject_success_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeRejectSuccessModal = () => {
    const modal = document.getElementById("reject_success_modal");
    if (modal) {
      modal.close();
    }
    setShowRejectSuccessModal(false);
    window.location.reload();
  };

  const updateDate = async () => {
    try {
      const { error } = await supabase
        .from("deadline")
        .update({ start, end, slots, semester })
        .eq("type", "application");
      if (error) throw error;

      closeConfirmModal();
      openSuccessModal();
    } catch (error) {
      alert("Failed to update status.");
      console.error("Error updating status:", error.message);
      closeConfirmModal();
    }
  };

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setEmail(applicant.email_address);
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
  };

  const openApplicationModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  const closeApplicationModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.close();
    }
    setIsPreviewOpen(false);
    setSelectedImageIndex(0);
    setSelectedApplicant(null);
  };

  const rejected = () => {
    openRejectConfirmModal();
  };

  const confirmReject = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message:
        "Thank you so much for taking interest in applying on this scholarship. Unfortunately, we regret to inform you that your application has not been shortlisted.",
      credentials: "Appreciate the time you spent, once again Thankyou!",
      reply_to: "scholarship@gmail.com",
    };

    closeRejectConfirmModal();
    emailjs
      .send(
        "service_yqldzap",
        "template_4emktjz",
        templateParams,
        "O8tmt76KsU3QTOJKz"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        updateReject();
        closeModal();
        openRejectSuccessModal();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again later.");
      });
  };

  const updateReject = async () => {
    try {
      const { data } = await supabase
        .from("application")
        .update([
          {
            status: "Rejected",
          },
        ])
        .eq("id", selectedApplicant.id);
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const accepted = () => {
    openAcceptConfirmModal();
  };

  const confirmAccept = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message:
        "Thank you so much for taking interest in applying on this scholarship. We are glad to inform you that your application has been chosen.",
      credentials:
        "To proceed on your account, login using your email and contact number as your password",
      reply_to: "scholarship@gmail.com",
    };
    closeAcceptConfirmModal();
    emailjs
      .send(
        "service_yqldzap",
        "template_4emktjz",
        templateParams,
        "O8tmt76KsU3QTOJKz"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        updateAccept();
        closeModal();
        openAcceptSuccessModal();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again later.");
      });
  };

  const updateAccept = async () => {
    try {
      const { data } = await supabase
        .from("application")
        .update([
          {
            status: "Accepted",
          },
        ])
        .eq("id", selectedApplicant.id);
      createaccount();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const createaccount = async () => {
    const fullName =
      `${selectedApplicant.given_name} ${selectedApplicant.middle_name} ${selectedApplicant.last_name}`.trim();
    try {
      const { data } = await supabase.from("scholars").insert([
        {
          email_address: email,
          password: selectedApplicant.contact_number,
          course: selectedApplicant.course,
          school: selectedApplicant.secondary_school,
          address: selectedApplicant.barangay,
          full_name: fullName,
          status: "On-Going",
          scholarship_type: "New",
          allowed_renewal: "No",
        },
      ]);
      addScholarData();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const addScholarData = async () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const school_year = `${currentYear}-${nextYear}`;
    const fullName =
      `${selectedApplicant.given_name} ${selectedApplicant.middle_name} ${selectedApplicant.last_name}`.trim();
    try {
      const { data } = await supabase.from("scholarsData").insert([
        {
          name: fullName,
          status: "On-Going",
          category: "New",
          gender: selectedApplicant.sex,
          semester: "1st Sem",
          school_year,
          barangay: selectedApplicant.barangay,
          school: selectedApplicant.secondary_school,
        },
      ]);
      window.location.reload();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const filteredApplicants = applicant.filter(
    (app) =>
      (app.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.address || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.school || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.course || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-inter">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <div className="text-lg text-gray-700">
                  Total Number of Applicants: {filteredApplicants.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button
                className="btn btn-neutral"
                onClick={openApplicationModal}
              >
                Set Application Date
              </button>
            </div>
          </div>

          <div className="card rounded shadow-xl bordered p-5 bg-white">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Scholar Name</th>
                    <th>Location</th>
                    <th>Name of School</th>
                    <th>Course</th>
                    <th>Sex</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants && filteredApplicants.length > 0 ? (
                    filteredApplicants.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>
                          {`${app.given_name} ${app.middle_name || ""} ${
                            app.last_name
                          }`.trim()}
                        </td>
                        <td>{app.address}</td>
                        <td>{app.secondary_school}</td>
                        <td>{app.course}</td>
                        <td>{app.sex}</td>
                        <td className="flex gap-2">
                          <button
                            className="btn btn-sm btn-neutral text-white"
                            onClick={() => openModal(app)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Applicant Documents Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Applicant's Data</h3>
          <div className="divider"></div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          {selectedApplicant && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Last Name:</strong> {selectedApplicant.last_name}
                </p>
                <p>
                  <strong>Given Name:</strong> {selectedApplicant.given_name}
                </p>
                <p>
                  <strong>Middle Name:</strong> {selectedApplicant.middle_name}
                </p>
                <p>
                  <strong>Age:</strong> {selectedApplicant.age}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedApplicant.date_of_birth}
                </p>
                <p>
                  <strong>Place of Birth:</strong>{" "}
                  {selectedApplicant.place_of_birth}
                </p>
                <p>
                  <strong>Course:</strong> {selectedApplicant.course}
                </p>
                <p>
                  <strong>Year Level:</strong> {selectedApplicant.year_level}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Sex:</strong> {selectedApplicant.sex}
                </p>
                <p>
                  <strong>Civil Service:</strong>{" "}
                  {selectedApplicant.civil_service}
                </p>
                <p>
                  <strong>Religion:</strong> {selectedApplicant.religion}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {selectedApplicant.contact_number}
                </p>
                <p>
                  <strong>Email Address:</strong>{" "}
                  {selectedApplicant.email_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Height:</strong> {selectedApplicant.height}
                </p>
                <p>
                  <strong>Weight:</strong> {selectedApplicant.weight}
                </p>
              </div>

              <p>
                <strong>Address:</strong> {selectedApplicant.address}
              </p>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Number of Family Members:</strong>{" "}
                  {selectedApplicant.number_family_members}
                </p>
                <p>
                  <strong>Ethnicity:</strong> {selectedApplicant.ethnicity}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Name:</strong>{" "}
                  {selectedApplicant.father_name}
                </p>
                <p>
                  <strong>Father's Address:</strong>{" "}
                  {selectedApplicant.father_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Contact:</strong>{" "}
                  {selectedApplicant.father_number}
                </p>
                <p>
                  <strong>Father's Occupation:</strong>{" "}
                  {selectedApplicant.father_occupation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Name:</strong>{" "}
                  {selectedApplicant.mother_name}
                </p>
                <p>
                  <strong>Mother's Address:</strong>{" "}
                  {selectedApplicant.mother_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Contact:</strong>{" "}
                  {selectedApplicant.mother_number}
                </p>
                <p>
                  <strong>Mother's Occupation:</strong>{" "}
                  {selectedApplicant.mother_occupation}
                </p>
              </div>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Elementary School:</strong>{" "}
                  {selectedApplicant.elementary_school}
                </p>
                <p>
                  <strong>Elementary Year:</strong>{" "}
                  {selectedApplicant.elementary_year}
                </p>
                <p>
                  <strong>Elementary Awards:</strong>{" "}
                  {selectedApplicant.elementary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Secondary School:</strong>{" "}
                  {selectedApplicant.secondary_school}
                </p>
                <p>
                  <strong>Secondary Year:</strong>{" "}
                  {selectedApplicant.secondary_year}
                </p>
                <p>
                  <strong>Secondary Awards:</strong>{" "}
                  {selectedApplicant.secondary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Availed Scholarship:</strong>{" "}
                  {selectedApplicant.availed_scholarship}
                </p>
                <p>
                  <strong>Scholarship Year:</strong>{" "}
                  {selectedApplicant.scholarship_year}
                </p>
                <p>
                  <strong>Scholarship Name:</strong>{" "}
                  {selectedApplicant.scholarship_name}
                </p>
              </div>

              {/* PDF Viewer Section */}
              {selectedApplicant?.docs &&
                typeof selectedApplicant.docs === "string" && (
                  <div className="mt-4">
                    <h4 className="font-bold text-md mb-2">
                      Applicant Documents:
                    </h4>
                    <div className="card bordered bg-base-100 shadow-md">
                      <div className="card-body p-2">
                        <object
                          data={selectedApplicant.docs}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                          className="border border-gray-300 rounded-md"
                        >
                          <p className="text-center py-4">
                            Unable to display PDF file.
                            <a
                              href={selectedApplicant.docs}
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
          <div className="divider"></div>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={rejected} className="btn btn-error text-white">
              Reject
            </button>
            <button onClick={accepted} className="btn btn-neutral text-white">
              Accept
            </button>
          </div>
        </div>
      </dialog>

      {/* Reject Confirmation Modal */}
      <dialog id="reject_confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl tracking-wider">
            Confirm Rejection
          </h3>
          <div className="divider"></div>
          <p>Are you sure you want to reject this applicant?</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-outline"
              onClick={closeRejectConfirmModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-white"
              onClick={confirmReject}
            >
              Confirm Reject
            </button>
          </div>
        </div>
      </dialog>

      {/* Reject Success Modal */}
      <dialog id="reject_success_modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-center">
              Applicant Rejected
            </h3>
            <p className="text-center mt-2">
              The applicant has been rejected and notified via email.
            </p>
            <button
              className="btn btn-error mt-6 w-full"
              onClick={closeRejectSuccessModal}
            >
              OK
            </button>
          </div>
        </div>
      </dialog>

      {/* Accept Confirmation Modal */}
      <dialog id="accept_confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl tracking-wider">
            Confirm Acceptance
          </h3>
          <div className="divider"></div>
          <p>Are you sure you want to accept this applicant?</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-outline"
              onClick={closeAcceptConfirmModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-success text-white"
              onClick={confirmAccept}
            >
              Confirm Accept
            </button>
          </div>
        </div>
      </dialog>

      {/* Accept Success Modal */}
      <dialog id="accept_success_modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-center">
              Applicant Accepted
            </h3>
            <p className="text-center mt-2">
              The applicant has been accepted and notified via email.
            </p>
            <button
              className="btn btn-neutral mt-6 w-full"
              onClick={closeAcceptSuccessModal}
            >
              OK
            </button>
          </div>
        </div>
      </dialog>

      {/* Application Date Setting Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Set Application Date</h3>
          <div className="divider"></div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeApplicationModal}
          >
            ✕
          </button>

          {/* Calendar Selection */}
          <div className="flex flex-col md:flex-row justify-between">
            {/* Date Inputs */}
            <div className="w-full bg-gray-900 p-4 rounded-lg text-white">
              <label className="block mb-1">From:</label>
              <input
                type="datetime-local"
                className="w-full p-2 rounded bg-gray-700"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />

              <label className="block mt-2 mb-1">To:</label>
              <input
                type="datetime-local"
                className="w-full p-2 rounded bg-gray-700"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />

              <label className="block mt-2 mb-1">Number of Slots:</label>
              <input
                type="number"
                placeholder="e.g. 123"
                className="w-full p-2 rounded bg-gray-700"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
              />

              <label className="block mt-2 mb-1">Semester:</label>
              <select
                className="w-full p-2 rounded bg-gray-700"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Select Semester</option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
              </select>

              <div className="flex justify-center mt-7">
                <button
                  className="btn bg-white w-1/4"
                  onClick={openConfirmModal}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {/* Confirmation Modal */}
      <dialog id="confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Changes</h3>
          <div className="divider"></div>
          <p>Are you sure you want to update the application date and slots?</p>

          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p>
              <span className="font-bold">From:</span>{" "}
              {new Date(start).toLocaleString()}
            </p>
            <p>
              <span className="font-bold">To:</span>{" "}
              {new Date(end).toLocaleString()}
            </p>
            <p>
              <span className="font-bold">Available Slots:</span> {slots}
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn btn-outline" onClick={closeConfirmModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={updateDate}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="font-bold text-xl text-center">
              Updated Successfully!
            </h3>
            <p className="text-center mt-2">
              The application date and slot information have been updated.
            </p>

            <button
              className="btn btn-primary mt-6 w-full"
              onClick={closeSuccessModal}
            >
              OK
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Applicants;