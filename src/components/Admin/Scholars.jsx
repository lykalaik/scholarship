import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const Scholars = () => {
  const [scholars, setScholars] = useState([]);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [amount, setAmount] = useState("");
  const [scholarshipType, setScholarshipType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch_scholars();
  }, []);

  const fetch_scholars = async () => {
    try {
      const { data, error } = await supabase
        .from("scholars")
        .select("*")
        .neq("status", "Completed");
      if (error) throw error;
      setScholars(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during data fetch:", error.message);
    }
  };

  const validateAmount = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMessage("Amount must be greater than 0");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const initiateConfirmation = () => {
    if (!validateAmount()) return;
    
    setShowConfirmModal(true);
    closeInputModal();
  };

  const funding = async () => {
    if (!validateAmount()) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.from("funding").insert([
        {
          full_name: selectedScholar.full_name,
          date_funded: formattedDate,
          amount,
          scholarship_type: selectedScholar.scholarship_type,
        },
      ]);
      
      if (error) throw error;
      
      await status_update();
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage("Error Adding Fund: " + error.message);
      setIsLoading(false);
    }
  };

  const status_update = async () => {
    try {
      const { data, error } = await supabase
        .from("scholars")
        .update([{ status: "Completed" }])
        .eq("id", selectedScholar.id);
      
      if (error) throw error;
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setErrorMessage("Error updating status: " + error.message);
      setIsLoading(false);
      return false;
    }
  };

  const openInputModal = (applicant) => {
    const modal = document.getElementById("input_modal");
    if (modal) {
      modal.showModal();
      setSelectedScholar(applicant);
      setAmount("");
      setErrorMessage("");
    }
  };

  const closeInputModal = () => {
    const modal = document.getElementById("input_modal");
    if (modal) {
      modal.close();
    }
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const filteredScholars = scholars.filter(
    (scholar) =>
      ((!scholarshipType || scholar.scholarship_type === scholarshipType) &&
        scholar.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      scholar.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholar.scholarship_type?.toLowerCase().trim() ===
        searchQuery.toLowerCase().trim()
  );

  const formatAmount = (value) => {
    // Remove non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format with commas
    if (digitsOnly) {
      return new Intl.NumberFormat('en-US').format(parseInt(digitsOnly));
    }
    return digitsOnly;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-inter">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
          <div className="lg:flex lg:justify-between mb-3">
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <div className="text-lg text-gray-700">
                  Total Number of Scholars: {filteredScholars.length}
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered lg:w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="card rounded shadow-xl bordered p-5 bg-white">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-left">Name of Scholar</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Scholarship Type</th>
                    <th className="text-left">Renew</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScholars && filteredScholars.length > 0 ? (
                    filteredScholars.map((applicant) => (
                      <tr key={applicant.id}>
                        <td>{applicant.full_name}</td>
                        <td>{applicant.status}</td>
                        <td>{applicant.scholarship_type}</td>
                        <td>{applicant.allowed_renewal}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-neutral text-white"
                            onClick={() => openInputModal(applicant)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
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

      {/* Input Modal */}
      <dialog id="input_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Send Scholar's Funding</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeInputModal}
          >
            ✕
          </button>
          <div className="flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2">
              Amount:
              <input
                type="text"
                className="grow w-full"
                placeholder="e.g, 21,000 (don't include peso sign)"
                value={amount}
                onChange={(e) => setAmount(formatAmount(e.target.value))}
              />
            </label>

            {errorMessage && (
              <div className="text-error text-sm mt-1">{errorMessage}</div>
            )}

            <div className="flex justify-center mt-3">
              <button
                className="btn btn-neutral w-1/3 text-white"
                onClick={initiateConfirmation}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Funding</h3>
            <div className="py-4">
              <p>Are you sure you want to send ₱{amount} to {selectedScholar?.full_name}?</p>
              <p className="text-sm text-gray-600 mt-2">
                This action will mark the scholarship as "Completed".
              </p>
            </div>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={closeConfirmModal}>
                Cancel
              </button>
              <button 
                className="btn btn-neutral text-white" 
                onClick={funding}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-bold text-center">Fund Sent Successfully!</h3>
            <p className="py-4 text-center">
              ₱{amount} has been successfully sent to {selectedScholar?.full_name}.
            </p>
            <div className="modal-action justify-center">
              <button className="btn btn-neutral text-white" onClick={closeSuccessModal}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Scholars;