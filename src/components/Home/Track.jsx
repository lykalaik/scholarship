import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import supabase from "../supabaseClient.jsx";

const Track = () => {
  const [statusData, setStatusData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("application").select("*");
        if (error) throw error;
        setStatusData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const track_status = (e) => {
    e.preventDefault();
    if (name) {
      const filtered = statusData.filter((app) =>
        app.full_name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(statusData);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-center mt-6 mb-6 font-extrabold">
          <h1 className="text-xl md:text-2xl text-center">
            - Search your Application Status here -
          </h1>
        </div>
        <form className="flex flex-col md:flex-row justify-center gap-4 mb-8 px-4">
          <label className="input input-bordered flex items-center gap-2 shadow-md w-full md:max-w-md">
            <input
              type="text"
              className="grow p-2 text-sm md:text-base"
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
          <button
            className="btn btn-primary text-white w-full md:w-auto"
            onClick={track_status}
          >
            Search
          </button>
        </form>
        <hr />
        <div className="container mx-auto mt-8 px-4 md:px-20">
          {filteredData.length > 0 ? (
            filteredData.map((app) => (
              <div key={app.id} className="mb-3 p-4 rounded shadow-sm border">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h1 className="text-base md:text-lg mb-2 md:mb-0 font-semibold">
                    Applicant Name: {app.full_name}
                  </h1>
                  <h1 className="text-base md:text-lg font-semibold">
                    Application Status:{" "}
                    <span
                      className={
                        app.status === "Rejected"
                          ? "text-red-600"
                          : app.status === "Pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {app.status}
                    </span>
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p className="flex justify-center content-center text-gray-600 mt-6">
              No applications found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Track;
