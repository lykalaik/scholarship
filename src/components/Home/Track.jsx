import Navbar from "./Navbar.jsx";
import supabase from "../supabaseClient.jsx";
import { useState } from "react";

const Track = () => {
  const [status, setStatus] = useState([]);
  const [full_name, setFullName] = useState([]);
  const [name, setName] = useState('');

  const track_status = async () => {
    try {
      const { data, error } = await supabase
        .from('application')
        .select('*')
        .eq('full_name', name);

      if (error) throw error;
      setStatus(data[0].status);
      setFullName(data[0].full_name);
    } catch (error) {
      alert("There is no application in this name");
      console.error('Error during registration:', error.message);
    }
  };
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
              onChange={(e) => setName(e.target.value)}
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
          <button className="btn btn-primary text-white"   onClick={(e) => {
            e.preventDefault();
            track_status();
          }}>
            Search
          </button>
        </form>
        <hr />
        <div className="container mx-auto w-3/4 mt-10">
        <div className="mb-3">
          <div className="flex justify-between">
            <h1 className="text-lg">Applicant Name: {full_name}</h1>
            <h1 className="text-lg">
              Scholarship Application Status:{" "}
              <span
                className={
                  status === "Rejected"
                    ? "text-red-600"
                    : status === "Pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {status}
              </span>
            </h1>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Track;
