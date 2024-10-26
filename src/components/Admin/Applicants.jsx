import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaUserFriends } from "react-icons/fa";
import { FiMail, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";

const Applicants = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Sample data
  const applicants = [
    {
      id: 1,
      name: "Marc Gerasmio",
      location: "Butuan City",
      contact: "09090909090",
      school: "CSU",
      course: "BSIT",
      sex: "LGBTQ++",
      yearLevel: "4th yr.",
      firstSem: "1.00",
      secondSem: "1.00",
      images: [
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
        "/butuan.png",
      ],
    },
  ];

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
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
    if (newIndex < 0) newIndex = selectedApplicant.images.length - 1;
    if (newIndex >= selectedApplicant.images.length) newIndex = 0;
    setSelectedImageIndex(newIndex);
  };

  const handleAction = (action) => {
    console.log(`Action selected: ${action} for applicant:`, selectedApplicant);
    // Implement the actual logic for handling accept, reject, and email actions here
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <h1 className="text-2xl mt-2 font-bold flex gap-2">
              <FaUserFriends size={30} />
              List of New Applicants
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
                    <th>Location</th>
                    <th>Contact No.</th>
                    <th>Name of School</th>
                    <th>Course</th>
                    <th>Sex</th>
                    <th>Year Level</th>
                    <th>1st Sem</th>
                    <th>2nd Sem</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>{applicant.name}</td>
                      <td>{applicant.location}</td>
                      <td>{applicant.contact}</td>
                      <td>{applicant.school}</td>
                      <td>{applicant.course}</td>
                      <td>{applicant.sex}</td>
                      <td>{applicant.yearLevel}</td>
                      <td>{applicant.firstSem}</td>
                      <td>{applicant.secondSem}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary text-white"
                          onClick={() => openModal(applicant)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Applicant's Uploaded Documents
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
                    src={selectedApplicant.images[selectedImageIndex]}
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
                  {selectedApplicant.images.map((src, index) => (
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
          <div className="flex justify-between space-x-2 mt-4">
            <button
              onClick={() => handleAction("email")}
              className="btn btn-info text-white"
            >
              <FiMail /> Send an Email
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction("accept")}
                className="btn btn-primary text-white"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction("reject")}
                className="btn btn-error text-white"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Applicants;
