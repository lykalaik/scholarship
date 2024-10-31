import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaUserFriends } from "react-icons/fa";
import { FiMail, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";
import supabase from "../supabaseClient";
import emailjs from '@emailjs/browser'

const Renewal = () => {
  const [applicant, setApplicants] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [email, setEmail] = useState('');
  
 
  useEffect(() => {
    fetch_renewal();
  }, []);

  const fetch_renewal = async () => {
    try {
      const { data, error } = await supabase
        .from('renewals')
        .select('*')
        .eq('status', 'Pending');
      if (error) throw error;
      setApplicants(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
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

  const rejected = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message: "Thankyou so much for reapplying on this scholarship. Unfortunately, we regret to inform you that your renewal application has not been shortlisted.",
      credentials:"Appreciate the time you spent, once again Thankyou!",
      reply_to: "katanah75@gmail.com",
    };

    emailjs
      .send(
        "service_yqldzap",
        "template_jst7w51",
        templateParams,
        "O8tmt76KsU3QTOJKz",
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

  const updateReject = async() =>{
    try{
        const {data} = await supabase
        .from('renewals')
        .update([
          {
           status: "Rejected"
          }
        ])
        .eq('id', selectedApplicant.id);
        updateRejectScholar();
      }
      catch (error) {
        alert("Error Saving Data.")
    }
  }

  const updateRejectScholar = async() =>{
    try{
        const {data} = await supabase
        .from('scholars')
        .update([
          {
           status: "Rejected",
           allowed_renewal: "No"
          }
        ])
        .eq('id', selectedApplicant.id);
        window.location.reload();
      }
      catch (error) {
        alert("Error Saving Data.")
    }
  }

  const accepted = () => {
    const templateParams = {
      from_name: "Butuan Scholarship",
      to_name: email,
      message: "Thankyou so much for reapplying on this scholarship We are glad to inform you that your renewal application has been approved.",
      credentials:"To proceed on your scholarship, just keep on visiting the system for fund updates. Thankyou!",
      reply_to: "scholarship@gmail.com",
    };

    emailjs
      .send(
        "service_yqldzap",
        "template_jst7w51",
        templateParams,
        "O8tmt76KsU3QTOJKz",
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

  const updateAccept = async() =>{
    try{
        const {data} = await supabase
        .from('renewals')
        .update([
          {
           status: "Accepted"
          }
        ])
        .eq('id', selectedApplicant.id);
        updateScholar();
      }
      catch (error) {
        alert("Error Saving Data.")
    }
  }
  const updateScholar = async() =>{
    try{
        const {data} = await supabase
        .from('scholars')
        .update([
          {
           status: "On-Going",
            allowed_renewal: "No"
          }
        ])
        .eq('full_name', selectedApplicant.full_name);
        window.location.reload();
      }
      catch (error) {
        alert("Error Saving Data.")
    }
  }

  

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <h1 className="text-2xl mt-2 font-bold flex gap-2">
              <FaUserFriends size={30} />
              List of Renewals
            </h1>
            <div className="flex gap-2">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
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
              <button className="btn btn-success text-white">
                <RiFileExcel2Fill size={20} />
                Export as Excel
              </button>
            </div>
          </div>

          <div className="card rounded shadow-xl bordered p-5 bg-white">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name of Scholar</th>
                    <th>View Submission</th>
                  </tr>
                </thead>
                <tbody>
                {applicant && applicant.length > 0 ? (
                  applicant.map((app) => (
                    <tr key={app.id}>
                      <td>{app.full_name}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary text-white"
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
            Scholar's Uploaded Documents
          </h3>
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
                    src={[
                      selectedApplicant.recommendation,
                      selectedApplicant.final_grades,
                      selectedApplicant.evaluation_sheet,
                      selectedApplicant.scholarship_contract,
                      selectedApplicant.study_load,
                      selectedApplicant.clearance,
                    ][selectedImageIndex]}
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
                    selectedApplicant.recommendation,
                    selectedApplicant.final_grades,
                    selectedApplicant.evaluation_sheet,
                    selectedApplicant.scholarship_contract,
                    selectedApplicant.study_load,
                    selectedApplicant.clearance,
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
                onClick={rejected}
                className="btn btn-error text-white"
              >
                Reject
              </button>
              <button
                onClick={accepted}
                className="btn btn-primary text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Renewal;
