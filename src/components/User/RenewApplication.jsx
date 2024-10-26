import { FaGoogleScholar } from "react-icons/fa6";

const RenewApplication = () => {
  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <div className="flex justify-between mb-5 mt-20">
        <h1 className="text-2xl flex gap-2 font-bold">
          <FaGoogleScholar className="mt-1" />
          Scholarship Renewal
        </h1>
        <div className="flex gap-3">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              School Year:
            </option>
            <option>School Year 1</option>
            <option>School Year 2</option>
          </select>
          <button className="btn btn-primary text-white">Search</button>
        </div>
      </div>
      <div className="card rounded shadow-xl bordered mb-10 p-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Availed Scholarships</th>
                <th>Scholarship Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DOST-SEI Undergraduate Scholarship</td>
                <td className="text-green-600">Completed</td>
                <td>
                  <button
                    className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
                    onClick={openModal}
                  >
                    Renew
                  </button>
                </td>
              </tr>

              <tr>
                <td>DOST-SEI Undergraduate Scholarship</td>
                <td className="text-yellow-500">On-going</td>
                <td>
                  <button
                    className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
                    disabled
                  >
                    Renew
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-semibold text-lg">
            Upload the following Documents:
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Recommendation from Baranggay Official */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Recommendation from Baranggay Official
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload recommendation from Baranggay Official"
            />
          </div>

          {/* Final Grades for Previous Semester */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Final Grades for Previous Semester
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload final grades for previous semester"
            />
          </div>

          {/* Evaluation Sheet issued by School */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Evaluation Sheet issued by School
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload evaluation sheet issued by school"
            />
          </div>

          {/* Scholarship Contract */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Scholarship Contract</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload scholarship contract"
            />
          </div>

          {/* Study Load */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Study Load</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload study load"
            />
          </div>

          {/* Clearance LGUSF */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Clearance LGUSF</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload clearance LGUSF"
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button className="w-full btn btn-primary text-white" type="submit">
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RenewApplication;
