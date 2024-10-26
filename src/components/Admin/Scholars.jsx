import Sidebar from "./Sidebar";
import { FaUserFriends } from "react-icons/fa";
import { FiMail, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";

const Scholars = () => {
  // Sample data
  const applicants = [
    {
      id: 1,
      name: "Marion Jotohot",
      location: "Butuan City",
      contact: "09090909090",
      school: "CSU",
      course: "BSIT",
      sex: "LGBTQ++",
      yearLevel: "4th yr.",
      firstSem: "$21,000",
      secondSem: "$21,000",
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

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-5">
            <h1 className="text-2xl mt-2 font-bold flex gap-2">
              <FaUserFriends size={30} />
              List of Scholars
            </h1>
            <div className="flex gap-2">
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Scholarship:
                </option>
                <option>DOST</option>
                <option>CHED</option>
              </select>
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
                          Add
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
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Send Applicant's Funding</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          <form className="flex flex-col gap-3">
            <select className="select select-bordered w-full">
              <option disabled selected>
                Semester:
              </option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>
            <label className="input input-bordered flex items-center gap-2">
              Amount
              <input
                type="number"
                className="grow w-full"
                placeholder="e.g, $21,000.00"
              />
            </label>
            <button className="btn btn-primary text-white">Submit</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Scholars;
