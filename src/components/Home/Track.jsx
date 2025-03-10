import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import supabase from "../supabaseClient.jsx";

const Track = () => {
  const [statusData, setStatusData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("application").select("*");
        if (error) throw error;
        setStatusData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const track_status = (e) => {
    e.preventDefault();
    setHasSearched(true);
    if (name) {
      const filtered = statusData.filter(
        (app) => app.id.toString().includes(name.toString()) // Convert both to string for comparison
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(statusData);
    }
  };

  // Get status badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Application Status Tracker
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-base-content/70 max-w-xl mx-auto">
              Enter your application number below to check the current status of your submission.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={track_status} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="input input-bordered flex items-center gap-2 shadow-md w-full">
                  <input
                    type="text"
                    className="grow p-2 text-sm md:text-base"
                    placeholder="Enter Application Number"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Application ID"
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
                  type="submit"
                  className="btn btn-primary text-white w-full sm:w-auto min-w-[120px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Search Results
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {filteredData.length > 0 ? (
                  <div className="space-y-4">
                    {filteredData.map((app) => (
                      <div 
                        key={app.id} 
                        className="p-4 rounded-lg border border-base-300 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                          <div>
                            <div className="text-sm text-base-content/60 mb-1">Application ID</div>
                            <div className="font-semibold text-lg">{app.id}</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="text-sm text-base-content/60 mr-2 sm:hidden">Status:</div>
                            <span 
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(app.status)}`}
                            >
                              {app.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    {hasSearched ? (
                      <div className="space-y-2">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-12 w-12 mx-auto text-base-content/30" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                        <p className="text-base-content/60 text-lg">No applications found with ID: <span className="font-semibold">{name}</span></p>
                        <p className="text-base-content/50 text-sm">Please check your application number and try again.</p>
                      </div>
                    ) : (
                      <p className="text-base-content/50">Enter an application number to see results.</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;