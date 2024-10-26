import Navbar from "./Navbar.jsx";

const Track = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5">
        <div className="flex justify-center mt-6 mb-6 font-extrabold">
          <h1 className="text-2xl">- Search your Application Status here -</h1>
        </div>

        <form className="flex justify-center gap-2 mb-8">
          <label className="input input-bordered flex items-center gap-2 shadow-md">
            <input
              type="text"
              className="grow"
              placeholder="Search your name"
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
          <label className="input input-bordered flex items-center gap-2 shadow-md">
            <input
              type="date"
              className="grow"
              placeholder="Search your name"
            />
          </label>
          <button type="submit" className="btn btn-primary text-white">
            Search
          </button>
        </form>

        <hr />

        <div className="container mx-auto w-1/2 mt-10">
          <div className="mb-3">
            <div className="flex justify-between">
              <h1 className="text-lg">Applicant Name: Marion Jotohot</h1>
              <h1 className="text-lg">
                Status: <span className="text-green-600">New</span>
              </h1>
            </div>
            <div className="p-10">
              <h1 className="flex justify-center text-lg font-semibold mb-3">
                - Scholarship/s Applied -
              </h1>
              <div className="flex justify-between">
                <p>DOST Scholarship</p>
                <p>
                  Status:
                  <span className="text-yellow-500">On-going</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p>CHED Scholarship</p>
                <p>
                  Status:
                  <span className="text-red-500">Rejected</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
