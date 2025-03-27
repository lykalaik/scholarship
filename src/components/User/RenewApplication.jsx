import { FaGoogleScholar } from "react-icons/fa6";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";

const RenewApplication = () => {
  const scholarName = sessionStorage.getItem("scholarData");
  const email = sessionStorage.getItem("email");
  const [userData, setUserData] = useState([]);
  const [renewalDocURL, setRenewalDocURL] = useState("");
  const [renewalstatus, setRenewalStatus] = useState("");

  useEffect(() => {
    fetch_data();
    fetch_renewal();
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
      console.error("Error during fetching scholar data:", error.message);
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
      console.error("Error during fetching renewal:", error.message);
    }
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.close();
  };

  const handleFileUpload = async (e) => {
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

        console.log("Uploaded File URL:", publicURL.publicUrl);
        setRenewalDocURL(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file: " + error.message);
      }
    }
  };

  const renew_application = async () => {
    if (!renewalDocURL) {
      alert("Please upload the renewal document.");
      return;
    }

    const { error } = await supabase.from("renewals").insert([
      {
        full_name: scholarName,
        renewal_docs: renewalDocURL,
        status: "Pending",
        email,
      },
    ]);

    if (error) {
      console.error("Error inserting renewal:", error);
      alert("Error inserting renewal");
    } else {
      console.log("Renewal submitted successfully");
      update_account();
    }
  };

  const update_account = async () => {
    try {
      await supabase
        .from("scholars")
        .update({
          status: "Pending",
          scholarship_type: "Renewal",
        })
        .eq("full_name", scholarName);
      window.location.reload();
    } catch (error) {
      alert("Error updating scholar status.");
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
                        renewalstatus === "Pending"
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

      {/* Modal */}
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
          {renewalDocURL && (
            <p className="text-green-600 mt-2">File uploaded successfully!</p>
          )}

          <div className="modal-action">
            <button
              className="btn bg-green-600 hover:bg-green-500 text-white"
              onClick={renew_application}
            >
              Submit
            </button>
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RenewApplication;