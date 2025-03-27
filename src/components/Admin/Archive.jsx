import Sidebar from "./Sidebar";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import supabase from "../supabaseClient";

const Archive = () => {
  const [scholars, setScholars] = useState([]);
  const [scholarshipType, setScholarshipType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetch_scholars();
  }, []);

  const fetch_scholars = async () => {
    try {
      const { data, error } = await supabase.from("scholars").select("*");
      if (error) throw error;
      setScholars(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching scholars:", error.message);
    }
  };

  const toggleAllowedRenewal = async (applicantId, currentStatus) => {
    const newStatus = currentStatus === "Yes" ? "No" : "Yes";
    try {
      const { error } = await supabase
        .from("scholars")
        .update({ allowed_renewal: newStatus })
        .eq("id", applicantId);
      if (error) throw error;

      setScholars((prevScholars) =>
        prevScholars.map((applicant) =>
          applicant.id === applicantId
            ? { ...applicant, allowed_renewal: newStatus }
            : applicant
        )
      );
    } catch (error) {
      alert("Error updating renewal status.");
      console.error("Error updating renewal status:", error.message);
    }
  };

  const exportToExcel = () => {
    const filteredData = scholars.filter((scholar) =>
      scholarshipType ? scholar.scholarship_type === scholarshipType : true
    );
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scholars");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileBlob = new Blob([fileBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileBlob, "scholars.xlsx");
  };

  const filteredScholars = scholars.filter(
    (scholar) =>
      (!scholarshipType || scholar.scholarship_type === scholarshipType) &&
      (
        scholar.scholarship_type?.toLowerCase().trim() ===
          searchQuery.toLowerCase().trim() ||
        scholar.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholar.school.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewClick = async (scholar) => {
    setSelectedScholar(scholar);

    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("email_address", scholar.email_address);

      if (error) throw error;

      const applicationData = data && data[0];
      setSelectedScholar((prevScholar) => ({
        ...prevScholar,
        ...applicationData,
      }));

      const modal = document.getElementById("my_modal_4");
      if (modal) {
        modal.showModal();
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching application data:", error.message);
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.close();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-inter">
      <Sidebar />
      <main className="flex-1 lg:p-8 lg:ml-64 transition-all duration-300 overflow-x-auto">
        <div className="flex flex-wrap justify-between mb-5 gap-4">
          <div className="flex gap-2 items-center w-full lg:w-auto">
            <div className="text-lg text-gray-700">
              Total Number of Scholars: {filteredScholars.length}
            </div>
          </div>

          <div className="flex gap-2 w-full lg:w-auto items-center">
            <input
              type="text"
              className="input input-bordered w-full sm:w-48 lg:w-64"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-success text-white"
              onClick={exportToExcel}
            >
              <RiFileExcel2Fill size={20} /> Export as Excel
            </button>
          </div>
        </div>

        <div className="card w-full rounded shadow-xl bordered p-5 bg-white">
          <div className="overflow-x-auto max-w-full">
            <table className="table min-w-full table-auto">
              <thead>
                <tr>
                  <th>Name of Scholar</th>
                  <th>Status</th>
                  <th>Scholarship Type</th>
                  <th>Allow Renewal?</th>
                  <th>Attachments</th>
                </tr>
              </thead>
              <tbody>
                {filteredScholars.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>{applicant.full_name}</td>
                    <td>{applicant.status}</td>
                    <td>{applicant.scholarship_type}</td>
                    <td>
                      <button
                        className={`btn btn-sm text-white ${
                          applicant.allowed_renewal === "Yes"
                            ? "btn-primary"
                            : "btn-error"
                        }`}
                        onClick={() =>
                          toggleAllowedRenewal(
                            applicant.id,
                            applicant.allowed_renewal
                          )
                        }
                      >
                        {applicant.allowed_renewal === "Yes" ? "Yes" : "No"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm text-white btn-neutral"
                        onClick={() => handleViewClick(applicant)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applicant Documents Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Applicant's Data</h3>
          <div className="divider"></div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5"
            onClick={closeModal}
          >
            ✕
          </button>
          {selectedScholar && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Last Name:</strong> {selectedScholar.last_name}
                </p>
                <p>
                  <strong>Given Name:</strong> {selectedScholar.given_name}
                </p>
                <p>
                  <strong>Middle Name:</strong> {selectedScholar.middle_name}
                </p>
                <p>
                  <strong>Age:</strong> {selectedScholar.age}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedScholar.date_of_birth}
                </p>
                <p>
                  <strong>Place of Birth:</strong>{" "}
                  {selectedScholar.place_of_birth}
                </p>
                <p>
                  <strong>Course:</strong> {selectedScholar.course}
                </p>
                <p>
                  <strong>Year Level:</strong> {selectedScholar.year_level}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Sex:</strong> {selectedScholar.sex}
                </p>
                <p>
                  <strong>Civil Service:</strong>{" "}
                  {selectedScholar.civil_service}
                </p>
                <p>
                  <strong>Religion:</strong> {selectedScholar.religion}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {selectedScholar.contact_number}
                </p>
                <p>
                  <strong>Email Address:</strong>{" "}
                  {selectedScholar.email_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Height:</strong> {selectedScholar.height}
                </p>
                <p>
                  <strong>Weight:</strong> {selectedScholar.weight}
                </p>
              </div>

              <p>
                <strong>Address:</strong> {selectedScholar.address}
              </p>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Number of Family Members:</strong>{" "}
                  {selectedScholar.number_family_members}
                </p>
                <p>
                  <strong>Ethnicity:</strong> {selectedScholar.ethnicity}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Name:</strong>{" "}
                  {selectedScholar.father_name}
                </p>
                <p>
                  <strong>Father's Address:</strong>{" "}
                  {selectedScholar.father_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Father's Contact:</strong>{" "}
                  {selectedScholar.father_number}
                </p>
                <p>
                  <strong>Father's Occupation:</strong>{" "}
                  {selectedScholar.father_occupation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Name:</strong>{" "}
                  {selectedScholar.mother_name}
                </p>
                <p>
                  <strong>Mother's Address:</strong>{" "}
                  {selectedScholar.mother_address}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong>Mother's Contact:</strong>{" "}
                  {selectedScholar.mother_number}
                </p>
                <p>
                  <strong>Mother's Occupation:</strong>{" "}
                  {selectedScholar.mother_occupation}
                </p>
              </div>

              <div className="divider"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Elementary School:</strong>{" "}
                  {selectedScholar.elementary_school}
                </p>
                <p>
                  <strong>Elementary Year:</strong>{" "}
                  {selectedScholar.elementary_year}
                </p>
                <p>
                  <strong>Elementary Awards:</strong>{" "}
                  {selectedScholar.elementary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Secondary School:</strong>{" "}
                  {selectedScholar.secondary_school}
                </p>
                <p>
                  <strong>Secondary Year:</strong>{" "}
                  {selectedScholar.secondary_year}
                </p>
                <p>
                  <strong>Secondary Awards:</strong>{" "}
                  {selectedScholar.secondary_awards}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <p>
                  <strong>Availed Scholarship:</strong>{" "}
                  {selectedScholar.availed_scholarship}
                </p>
                <p>
                  <strong>Scholarship Year:</strong>{" "}
                  {selectedScholar.scholarship_year}
                </p>
                <p>
                  <strong>Scholarship Name:</strong>{" "}
                  {selectedScholar.scholarship_name}
                </p>
              </div>

              {/* PDF Viewer Section */}
              {selectedScholar?.docs &&
                typeof selectedScholar.docs === "string" && (
                  <div className="mt-4">
                    <h4 className="font-bold text-md mb-2">
                      Applicant Documents:
                    </h4>
                    <div className="card bordered bg-base-100 shadow-md">
                      <div className="card-body p-2">
                        <object
                          data={selectedScholar.docs}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                          className="border border-gray-300 rounded-md"
                        >
                          <p className="text-center py-4">
                            Unable to display PDF file.
                            <a
                              href={selectedScholar.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-link"
                            >
                              Download
                            </a>{" "}
                            instead.
                          </p>
                        </object>
                      </div>
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </dialog>
      </main>
    </div>
  );
};

export default Archive;