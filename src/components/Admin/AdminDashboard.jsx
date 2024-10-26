import Sidebar from "./Sidebar.jsx";
import { IoIosAddCircle } from "react-icons/io";
import { SiGooglescholar } from "react-icons/si";

const AdminDashboard = () => {
  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <label className="input input-bordered flex items-center gap-2 lg:w-1/3 shadow-md">
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
            <button className="btn btn-primary text-white" onClick={openModal}>
              <IoIosAddCircle size={20} />
              Add Scholarship
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
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
              <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-white px-8 py-4 border-t border-gray-300">
                <span className="px-2 py-3 text-green-400 rounded-full text-md font-bold">
                  Newly Posted
                </span>
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
              <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-white px-8 py-4 border-t border-gray-300">
                <span className="px-2 py-3 text-yellow-400 rounded-full text-md font-bold">
                  3 Days Ago
                </span>
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
              <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-white px-8 py-4 border-t border-gray-300">
                <span className="px-2 py-3 text-gray-400 rounded-full text-md font-bold">
                  A Month Ago
                </span>
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
              <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-white px-8 py-4 border-t border-gray-300">
                <span className="px-2 py-3 text-gray-400 rounded-full text-md font-bold">
                  2 Months Ago
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg">Scholarship Name</span>
              </div>
              <input
                type="text"
                placeholder="e.g, DOST "
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg">
                  Scholarship Eligibility
                </span>
              </div>
              <input
                placeholder="e.g, tambay sa kilid kilid"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </label>
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary text-white" type="submit">
                Save
              </button>
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AdminDashboard;
