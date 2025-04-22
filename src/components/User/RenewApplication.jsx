import { FaGoogleScholar } from "react-icons/fa6";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";

const RenewApplication = () => {
  const scholarName = sessionStorage.getItem("scholarData");
  const email = sessionStorage.getItem("email");
  const [userData, setUserData] = useState([]);
  const [renewalDocURL, setRenewalDocURL] = useState("");
  const [renewalstatus, setRenewalStatus] = useState("");
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationPeriodInfo, setApplicationPeriodInfo] = useState({
    start: "",
    end: "",
    message: "Loading application period information..."
  });

  useEffect(() => {
    fetch_data();
    fetch_renewal();
    fetch_application_period();
  }, []);

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
        .from("scholars")
        .select("*")
        .eq("full_name", scholarName);
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      setUploadError("Error during fetching scholar data: " + error.message);
    }
  };

  const fetch_renewal = async () => {
    try {
      const { data, error } = await supabase
        .from("renewals")
        .select("*")
        .eq("full_name", scholarName);
      if (error) throw error;
      if (data.length > 0) setRenewalStatus(data[0].status);
    } catch (error) {
      setUploadError("Error during fetching renewal: " + error.message);
    }
  };

  const fetch_application_period = async () => {
    try {
      const { data, error } = await supabase
        .from("deadline")
        .select("*")
        .eq("type", "renewal");
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const startDate = new Date(data[0].start);
        const endDate = new Date(data[0].end);
        const currentDate = new Date();
        
        const isOpen = currentDate >= startDate && currentDate <= endDate;
        setApplicationOpen(isOpen);
        
        setApplicationPeriodInfo({
          start: formatDate(startDate),
          end: formatDate(endDate),
          message: isOpen 
            ? "Application period is open" 
            : currentDate < startDate 
              ? "Application period has not started yet" 
              : "Application period has ended"
        });
      }
    } catch (error) {
      setUploadError("Error fetching application period: " + error.message);
      setApplicationPeriodInfo({
        start: "",
        end: "",
        message: "Unable to retrieve application period information"
      });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openModal = () => {
    setUploadError("");
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.close();
  };

  const closeSuccessModal = () => {
    const modal = document.getElementById("success_modal");
    if (modal) modal.close();
    setShowSuccessModal(false);
  };

  const handleFileUpload = async (e) => {
    setUploadError("");
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const filePath = `renewal_${Date.now()}_${selectedFile.name}`;
        const { error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);

        if (error) throw error;

        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);

        if (urlError) throw urlError;

        setRenewalDocURL(publicURL.publicUrl);
      } catch (error) {
        setUploadError("Error uploading file: " + error.message);
      }
    }
  };

  const renew_application = async () => {
    if (!renewalDocURL) {
      setUploadError("Please upload the renewal document.");
      return;
    }

    setIsSubmitting(true);
    setUploadError("");

    try {
      const { error } = await supabase.from("renewals").insert([
        {
          full_name: scholarName,
          renewal_docs: renewalDocURL,
          status: "Pending",
          email,
        },
      ]);

      if (error) throw error;
      
      await update_account();
      closeModal();
      setShowSuccessModal(true);
      const successModal = document.getElementById("success_modal");
      if (successModal) successModal.showModal();
    } catch (error) {
      setUploadError("Error submitting renewal: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const update_account = async () => {
    try {
      const { error } = await supabase
        .from("scholars")
        .update({
          status: "Pending",
          scholarship_type: "Renewal",
        })
        .eq("full_name", scholarName);
        
      if (error) throw error;
    } catch (error) {
      throw new Error("Error updating scholar status: " + error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-5 mt-20">
        <h1 className="text-2xl flex gap-2 font-bold">
          <FaGoogleScholar className="mt-1" />
          Scholarship
        </h1>
        {renewalstatus && (
          <h1 className="text-lg flex gap-2 font-bold">
            Renewal Status: {renewalstatus}
          </h1>
        )}
      </div>

      {/* Application Period Information */}
      <div className={`alert ${applicationOpen ? 'alert-success' : 'alert-warning'} mb-4`}>
        <div>
          <span className="font-bold">{applicationPeriodInfo.message}</span>
          {applicationPeriodInfo.start && applicationPeriodInfo.end && (
            <p className="text-sm mt-1">
              Application Period: {applicationPeriodInfo.start} to {applicationPeriodInfo.end}
            </p>
          )}
        </div>
      </div>

      <div className="card rounded shadow-xl border mb-10 p-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Scholarship Type</th>
                <th>Scholarship Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.scholarship_type}</td>
                  <td>{user.status}</td>
                  <td>
                  <button
                      className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
                      onClick={openModal}
                      disabled={
                        user.allowed_renewal === "No" ||
                        renewalstatus === "Pending" ||
                        !applicationOpen
                      }
                    >
                      Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Upload Renewal Document</h3>
          <p className="font-semibold mb-4">Required Documents for Renewal Applicant (merge into one PDF):</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Recommendation from Barangay Official/Youth Representative</li>
            <li>Final Grades (GWA of 3.0 or higher)</li>
            <li>Evaluation Sheet from school</li>
            <li>Scholarship Contract</li>
            <li>Study Load</li>
            <li>Clearance LGUSF</li>
          </ul>
          <input
            type="file"
            accept="application/pdf,image/*"
            className="file-input w-full"
            onChange={handleFileUpload}
          />
          
          {uploadError && (
            <div className="text-red-600 text-sm mt-3 mb-2 font-semibold">
              {uploadError}
            </div>
          )}
          
          {renewalDocURL && (
            <p className="text-green-600 mt-2">File uploaded successfully!</p>
          )}

          <div className="modal-action">
            <button
              className="btn bg-green-600 hover:bg-green-500 text-white"
              onClick={renew_application}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
            <button className="btn" onClick={closeModal} disabled={isSubmitting}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col items-center justify-center">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Renewal Application Submitted!</h3>
            <p className="text-center mb-4">
              Your renewal application has been successfully submitted. 
              The scholarship committee will review your application and update your status.
            </p>
            <div className="modal-action">
              <button 
                className="btn bg-blue-600 hover:bg-blue-500 text-white" 
                onClick={() => {
                  closeSuccessModal();
                  window.location.reload();
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RenewApplication;