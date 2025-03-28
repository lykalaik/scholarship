import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import supabase from "../supabaseClient";
import emailjs from "@emailjs/browser";

const Renewal = () => {
  const [applicant, setApplicants] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [slots, setSlots] = useState("");
  const [semester, setSemester] = useState("");
  const [showAcceptConfirmModal, setShowAcceptConfirmModal] = useState(false);
  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
  const [showAcceptSuccessModal, setShowAcceptSuccessModal] = useState(false);
  const [showRejectSuccessModal, setShowRejectSuccessModal] = useState(false);

  useEffect(() => {
    fetch_renewal();
    fetch_user();
  }, []);

  const fetch_renewal = async () => {
    try {
      const { data, error } = await supabase
        .from("renewals")
        .select("*")
        .eq("status", "Pending");
      if (error) throw error;
      setApplicants(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const fetch_scholarData = async () => {
    try {
      const { data, error } = await supabase
        .from("scholarsData")
        .select("*")
        .eq("name", selectedApplicant.full_name)
        .single();
      if (error) throw error;
      addScholarData(data);
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
        .eq("type", "renewal");
      if (error) throw error;
      setStart(data[0].start);
      setEnd(data[0].end);
      setSlots(data[0].slots);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    }
  };

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setEmail(applicant.email);
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
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

  const openPreview = (index) => {
    setSelectedImageIndex(index);
    setIsPreviewOpen(true);
  };

  const navigatePreview = (direction) => {
    if (!selectedApplicant) return;
    let newIndex =
      direction === "next" ? selectedImageIndex + 1 : selectedImageIndex - 1;
    const documentLinks = [
      selectedApplicant.application_letter,
      selectedApplicant.recommendation_letter,
      selectedApplicant.itr,
      selectedApplicant.copy_itr,
      selectedApplicant.cedula,
      selectedApplicant.voters,
      selectedApplicant.recent_card,
    ];
    if (newIndex < 0) newIndex = documentLinks.length - 1;
    if (newIndex >= documentLinks.length) newIndex = 0;
    setSelectedImageIndex(newIndex);
  };

  const handleAction = (action) => {
    console.log(`Action selected: ${action} for applicant:`, selectedApplicant);
    closeModal();
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

  const rejected = () => {
    openRejectConfirmModal();
  };

  const confirmReject = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message:
        "Thankyou so much for reapplying on this scholarship. Unfortunately, we regret to inform you that your renewal application has not been shortlisted.",
      credentials: "Appreciate the time you spent, once again Thankyou!",
      reply_to: "katanah75@gmail.com",
    };
    closeRejectConfirmModal();
    emailjs
      .send(
        "service_yqldzap",
        "template_jst7w51",
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
        .from("renewals")
        .update([
          {
            status: "Rejected",
          },
        ])
        .eq("id", selectedApplicant.id);
      updateRejectScholar();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const updateRejectScholar = async () => {
    try {
      const { data } = await supabase
        .from("scholars")
        .update([
          {
            status: "Rejected",
            allowed_renewal: "No",
          },
        ])
        .eq("id", selectedApplicant.id);
      window.location.reload();
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
        "Thankyou so much for reapplying on this scholarship We are glad to inform you that your renewal application has been approved.",
      credentials:
        "To proceed on your scholarship, just keep on visiting the system for fund updates. Thankyou!",
      reply_to: "scholarship@gmail.com",
    };
    closeAcceptConfirmModal();
    emailjs
      .send(
        "service_yqldzap",
        "template_jst7w51",
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
        .from("renewals")
        .update([
          {
            status: "Accepted",
          },
        ])
        .eq("id", selectedApplicant.id);
      updateScholar();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };
  const updateScholar = async () => {
    try {
      const { data } = await supabase
        .from("scholars")
        .update([
          {
            status: "On-Going",
            allowed_renewal: "No",
          },
        ])
        .eq("full_name", selectedApplicant.full_name);
      fetch_scholarData();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const addScholarData = async (scholar) => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const school_year = `${currentYear}-${nextYear}`;
    try {
      const { data } = await supabase.from("scholarsData").insert([
        {
          name: selectedApplicant.full_name,
          status: "On-Going",
          category: "Renewal",
          gender: scholar.gender,
          semester: "2nd Sem",
          school_year,
          barangay: scholar.barangay,
          school: scholar.school,
        },
      ]);
      window.location.reload();
    } catch (error) {
      alert("Error Saving Data.");
    }
  };

  const filteredApplicants = applicant.filter((app) =>
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const updateDate = async () => {
    try {
      const { error } = await supabase
        .from("deadline")
        .update({ start, end, slots, semester })
        .eq("type", "renewal");
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert("Failed to update status.");
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-inter">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <div className="text-lg text-gray-700">
                  Total Number of Renewals: {filteredApplicants.length}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
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
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name of Scholar</th>
                    <th className="text-right">View Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants && filteredApplicants.length > 0 ? (
                    filteredApplicants.map((app) => (
                      <tr key={app.id}>
                        <td className="text-left">{app.full_name}</td>
                        <td className="text-right">
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
                      <td colSpan="2" className="text-center">
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

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Scholar's Uploaded Renewal Docs
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          {selectedApplicant?.renewal_docs &&
            typeof selectedApplicant.renewal_docs === "string" && (
              <div className="mt-6">
                <h4 className="font-bold text-md mb-2">
                  Renewal Documents (PDF):
                </h4>
                <div className="card bordered bg-base-100 shadow-md">
                  <div className="card-body p-2">
                    <object
                      data={selectedApplicant.renewal_docs}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                      className="border border-gray-300 rounded-md"
                    >
                      <p className="text-center py-4">
                        Unable to display PDF file.
                        <a
                          href={selectedApplicant.renewal_docs}
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
          <div className="divider"></div>
          <div className="flex justify-end space-x-2 mt-4">
            <div className="flex gap-2">
              <button onClick={rejected} className="btn btn-error text-white">
                Reject
              </button>
              <button onClick={accepted} className="btn btn-neutral text-white">
                Accept
              </button>
            </div>
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
                <button className="btn bg-white w-1/4" onClick={updateDate}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Renewal;