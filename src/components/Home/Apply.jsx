import Navbar from "./Navbar.jsx";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { SiGooglescholar } from "react-icons/si";

const Apply = () => {
  const openModal = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    showToast();
  };

  const showToast = () => {
    const toast = document.getElementById("toastify");
    if (toast) {
      toast.style.visibility = "visible";
      setTimeout(() => {
        toast.style.visibility = "hidden";
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mb-10">
        <div className="mb-6 flex justify-between">
          <span className="mt-3 text-2xl font-semibold px-3 flex gap-2">
            <SiGooglescholar className="text-yellow-400 mt-1" />
            List of Offered Scholarships
          </span>
          <label className="input input-bordered flex items-center gap-2 lg:w-1/4 shadow-md">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-8 pb-16 mb-10">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Ayala Foundation Educational Grants
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Eligibility: Mga tambay ras gedli
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <SiGooglescholar className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-white px-8 py-4 border-t border-gray-300">
              <span className="px-2 py-3 text-green-400 rounded-full text-md font-bold">
                Newly Posted
              </span>
              <button
                className="btn bg-blue-800 border-blue-800 hover:bg-blue-700 text-white w-1/3"
                onClick={openModal}
              >
                <BsFillBookmarkCheckFill />
                Apply
              </button>
            </div>
          </div>
          <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-8 pb-16 mb-10">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    DOST-SEI Undergraduate Scholarship
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Eligibility: Mga tambay ras gedli
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <SiGooglescholar className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-white px-8 py-4 border-t border-gray-300">
              <span className="px-2 py-3 text-yellow-400 rounded-full text-md font-bold">
                3 Days Ago
              </span>
              <button
                className="btn bg-blue-800 border-blue-800 hover:bg-blue-700 text-white w-1/3"
                onClick={openModal}
              >
                <BsFillBookmarkCheckFill />
                Apply
              </button>
            </div>
          </div>
          <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-8 pb-16 mb-10">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Landbank Gawad Patnubay Scholarship
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Eligibility: Mga tambay ras gedli
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <SiGooglescholar className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-white px-8 py-4 border-t border-gray-300">
              <span className="px-2 py-3 text-gray-400 rounded-full text-md font-bold">
                A Month Ago
              </span>
              <button
                className="btn bg-blue-800 border-blue-800 hover:bg-blue-700 text-white w-1/3"
                onClick={openModal}
              >
                <BsFillBookmarkCheckFill />
                Apply
              </button>
            </div>
          </div>
          <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="p-8 pb-16 mb-10">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Mayor Marc Gerasmio's Scholar ng Gedli
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Eligibility: Mga tambay ras gedli
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <SiGooglescholar className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-white px-8 py-4 border-t border-gray-300">
              <span className="px-2 py-3 text-gray-400 rounded-full text-md font-bold">
                2 Months Ago
              </span>
              <button
                className="btn bg-blue-800 border-blue-800 hover:bg-blue-700 text-white w-1/3"
                onClick={openModal}
              >
                <BsFillBookmarkCheckFill />
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl p-10">
          <h2 className="font-bold text-2xl mb-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-8 h-8 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            Personal Information Form
          </h2>
          <form onSubmit={handleSubmit}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Marc Dominic Gerasmio"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* <div>
                <label className="label">
                  <span className="label-text">Birthdate</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  required
                />
              </div> */}
              {/* <div>
                <label className="label">
                  <span className="label-text">Place of Birth</span>
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="input input-bordered w-full"
                  required
                />
              </div> */}
              <div>
                <label className="label">
                  <span className="label-text">Sex</span>
                </label>
                <select className="select select-bordered w-full" required>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              {/* <div>
                <label className="label">
                  <span className="label-text">Civil Status</span>
                </label>
                <select className="select select-bordered w-full" required>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                </select>
              </div> */}
              <div>
                <label className="label">
                  <span className="label-text">Permanent Address</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* <div>
                <label className="label">
                  <span className="label-text">Zip Code</span>
                </label>
                <input
                  type="text"
                  placeholder="12345"
                  className="input input-bordered w-full"
                  required
                />
              </div> */}
              <div>
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="text"
                  placeholder="+1 234 567 890"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* <div>
                <label className="label">
                  <span className="label-text">Height (cm)</span>
                </label>
                <input
                  type="number"
                  placeholder="170"
                  className="input input-bordered w-full"
                  required
                />
              </div> */}
              {/* <div>
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  placeholder="70"
                  className="input input-bordered w-full"
                  required
                />
              </div> */}
              {/* <div>
                <label className="label">
                  <span className="label-text">Blood Type</span>
                </label>
                <select className="select select-bordered w-full" required>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                </select>
              </div> */}
              <div>
                <label className="label">
                  <span className="label-text">Last School Attended</span>
                </label>
                <input
                  type="text"
                  placeholder="School Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    Highest Educational Attainment
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bachelor's Degree"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">*Application Letter</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Recommendation Letter from Baranggay Official
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Latest Income Tax Return with Annual Gross Income
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Copy of Income Tax Return of the Applicant's Parents
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Latest Community Tax / Cedula
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Voter's Registration Certificate
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">*Recent Scholastic Records</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white w-1/4"
                type="submit"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Toast Notification */}
      <div
        id="toastify"
        className="toast toast-bottom toast-end animate-bounce"
        style={{ visibility: "hidden" }}
      >
        <div className="alert alert-success">
          <span className="text-white">
            Application Submitted Successfully!
          </span>
        </div>
      </div>
    </>
  );
};

export default Apply;
