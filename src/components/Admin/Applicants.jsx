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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const updateDate = async () => {
    try {
      const { error } = await supabase
        .from("deadline")
        .update({ start, end, slots })
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

  const rejected = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message:
        "Thank you so much for taking interest in applying on this scholarship. Unfortunately, we regret to inform you that your application has not been shortlisted.",
      credentials: "Appreciate the time you spent, once again Thankyou!",
      reply_to: "scholarship@gmail.com",
    };
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
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message:
        "Thank you so much for taking interest in applying on this scholarship. We are glad to inform you that your application has been chosen.",
      credentials:
        "To proceed on your account, login using your email and contact number as your password",
      reply_to: "scholarship@gmail.com",
    };
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
    try {
      const { data } = await supabase.from("scholars").insert([
        {
          email_address: email,
          password: selectedApplicant.mobile_number,
          full_name: selectedApplicant.full_name,
          address: selectedApplicant.address,
          contact_no: selectedApplicant.mobile_number,
          school: selectedApplicant.school,
          course: selectedApplicant.course,
          sex: selectedApplicant.sex,
          status: "On-going",
          scholarship_type: "New",
          allowed_renewal: "No",
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

  const saveAsPDF = async () => {
    if (!selectedApplicant) return;

    const doc = new jsPDF();
    const documentLinks = [
      selectedApplicant.application_letter,
      selectedApplicant.recommendation_letter,
      selectedApplicant.itr,
      selectedApplicant.copy_itr,
      selectedApplicant.cedula,
      selectedApplicant.voters,
      selectedApplicant.recent_card,
    ];

    let yOffset = 10;

    doc.setFontSize(16);
    doc.text(
      `Applicant: ${selectedApplicant.given_name} ${
        selectedApplicant.middle_name || ""
      } ${selectedApplicant.last_name}`,
      10,
      yOffset
    );
    yOffset += 10;

    for (let i = 0; i < documentLinks.length; i++) {
      const imgUrl = documentLinks[i];

      try {
        const img = await fetch(imgUrl);
        const blob = await img.blob();
        const reader = new FileReader();

        reader.onload = function (event) {
          const imageData = event.target.result;
          doc.addImage(imageData, "JPEG", 10, yOffset, 180, 100);
          yOffset += 110;

          if (i < documentLinks.length - 1) {
            doc.addPage(); // Add a new page for each image
            yOffset = 10;
          }

          if (i === documentLinks.length - 1) {
            doc.save(
              `Applicant_${selectedApplicant.given_name}_${
                selectedApplicant.middle_name || ""
              }_${selectedApplicant.last_name}.pdf`
            );
          }
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
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
                    <th>Scholar Name</th>
                    <th>Location</th>
                    <th>Contact No.</th>
                    <th>Name of School</th>
                    <th>Course</th>
                    <th>Sex</th>
                    <th>GPA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplicants && filteredApplicants.length > 0 ? (
                    filteredApplicants.map((app) => (
                      <tr key={app.id}>
                        <td>
                          {`${app.given_name} ${app.middle_name || ""} ${
                            app.last_name
                          }`.trim()}
                        </td>
                        <td>{app.address}</td>
                        <td>{app.mobile_number}</td>
                        <td>{app.secondary_school}</td>
                        <td>{app.course}</td>
                        <td>{app.sex}</td>
                        <td>{app.gpa}</td>
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
          <h3 className="font-bold text-lg mb-4">
            Applicant's Uploaded Documents
          </h3>
          <div className="divider"></div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          {selectedApplicant && (
            <>
              {isPreviewOpen ? (
                <div className="relative flex items-center justify-center h-[60vh]">
                  <img
                    src={
                      [
                        selectedApplicant.application_letter,
                        selectedApplicant.recommendation_letter,
                        selectedApplicant.itr,
                        selectedApplicant.copy_itr,
                        selectedApplicant.cedula,
                        selectedApplicant.voters,
                        selectedApplicant.recent_card,
                      ][selectedImageIndex]
                    }
                    alt={`Document ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    className="btn btn-circle btn-sm absolute left-2"
                    onClick={() => navigatePreview("prev")}
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    className="btn btn-circle btn-sm absolute right-2"
                    onClick={() => navigatePreview("next")}
                  >
                    <FiChevronRight />
                  </button>
                  <button
                    className="btn btn-circle btn-sm absolute top-2 right-2"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {[
                    selectedApplicant.application_letter,
                    selectedApplicant.recommendation_letter,
                    selectedApplicant.itr,
                    selectedApplicant.copy_itr,
                    selectedApplicant.cedula,
                    selectedApplicant.voters,
                    selectedApplicant.recent_card,
                  ].map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Document ${index + 1}`}
                      className="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openPreview(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <div className="flex gap-2">
              <button
                onClick={saveAsPDF}
                className="btn btn-warning text-white"
              >
                Save as PDF
              </button>
              <button onClick={rejected} className="btn btn-error text-white">
                Reject
              </button>
              <button onClick={accepted} className="btn btn-primary text-white">
                Accept
              </button>
            </div>
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

              <div className="flex justify-center mt-7">
                <button className="btn bg-white w-1/4" onClick={openConfirmModal}>
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
            <p><span className="font-bold">From:</span> {new Date(start).toLocaleString()}</p>
            <p><span className="font-bold">To:</span> {new Date(end).toLocaleString()}</p>
            <p><span className="font-bold">Available Slots:</span> {slots}</p>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="font-bold text-xl text-center">Updated Successfully!</h3>
            <p className="text-center mt-2">
              The application date and slot information have been updated.
            </p>
            
            <button className="btn btn-primary mt-6 w-full" onClick={closeSuccessModal}>
              OK
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Applicants;