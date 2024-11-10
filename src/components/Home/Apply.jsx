import Navbar from "./Navbar.jsx";
import { SiGooglescholar } from "react-icons/si";
import supabase from "../supabaseClient.jsx";
import { useState, useEffect } from "react";

const Apply = () => {
  const [open, setOpen] = useState('');
  const [file, setFile] = useState("");
  const [application_letter, setApplicationLetter] = useState("");
  const [recommendation_letter, setRecommendationLetter] = useState("");
  const [itr, setITR] = useState("");
  const [copy_itr, setCopyITR] = useState("");
  const [cedula, setCedula] = useState("");
  const [voters, setVoters] = useState("");
  const [recent_card, setRecentCard] = useState("");
  const [full_name, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [gpa, setGPA] = useState("");
  const [sex, setSex] = useState("Male");
  const [mobile_number, setMobileNumber] = useState("");
  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitshowModal, setSubmitShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", 'admin@gmail.com');
        if (error) throw error;

        setOpen(data[0].is_open);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const create_application = async () => {
    const requiredFields = {
      full_name,
      address,
      sex,
      email_address,
      gpa,
      mobile_number,
      school,
      course,
      application_letter,
      recommendation_letter,
      itr,
      copy_itr,
      cedula,
      voters,
      recent_card,
    };
  
    // Collect missing fields
    const missingFields = Object.entries(requiredFields).filter(([key, value]) => value === null || value === "").map(([key]) => key);
  
    if (missingFields.length > 0) {
      // Show modal with missing fields
      setMissingFields(missingFields);
      setShowModal(true);
      return;
    }
    setSubmitShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    const requiredFields = {
      full_name,
      address,
      sex,
      email_address,
      gpa,
      mobile_number,
      school,
      course,
      application_letter,
      recommendation_letter,
      itr,
      copy_itr,
      cedula,
      voters,
      recent_card,
    };

    // Submit application to the database
    const { data, error } = await supabase.from("application").insert([
      {
        ...requiredFields,
        status: "Pending",
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      alert("Successful Application!");
      setLoading(false);
      window.location.reload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create_application(); // Initiate the modal for confirmation
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleApplicationLetter = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setApplicationLetter(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleRecommendationLetter = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setRecommendationLetter(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleITR = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setITR(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleCopyITR = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setCopyITR(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleCedula = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setCedula(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleVoters = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setVoters(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleRecord = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Applicant_Storage")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Applicant_Storage")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setRecentCard(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mb-10 px-8">
        <div className="card bg-base-100 shadow-2xl p-5 border border-gray-300 px-10 py-10">
        {open === "Yes" ? (
          <div>
            <div className="mb-6 flex justify-between">
              <span className="mt-3 lg:text-2xl sm:text-md font-semibold px-3 flex gap-2">
                <SiGooglescholar className="text-yellow-400 mt-1" />
                Scholarship Application Form
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Juan Dela Cruz"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Sex</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  required
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Permanent Address</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="text"
                  placeholder="+1 234 567 890"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Last School Attended (should not be abbreviated)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Agusan National HighSchool"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Grade Point Average (GPA)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.0"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setGPA(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Course/Strand (should not be abbreviated)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor of Science in Information Technology"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start">
              <span className="text-red-400 mt-3">*Note: Filename for images should be "LASTNAME_FIRSTNAME_FILENAME". </span>
              <span className="text-red-400 mt-3">Example. "DELACRUZ_JUAN_APPLICATIONLETTER" </span>
              </div>
              <br/>
              <div>
                <label className="label">
                  <span className="label-text">*Application Letter</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleApplicationLetter}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Recommendation Letter from Baranggay Official
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleRecommendationLetter}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Latest Income Tax Return with Annual Gross Income
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleITR}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Copy of Income Tax Return of the Applicant's Parents
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleCopyITR}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Latest Community Tax / Cedula
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleCedula}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">
                    *Voter's Registration Certificate
                  </span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleVoters}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">*Recent Scholastic Records</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleRecord}
                />
              </div>
            </div>

            <div className="modal-action mt-10">
              {/* <button
                className="btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white lg:w-1/6 w-full"
                type="submit"
                onClick={create_application}
              >
                Submit Application
              </button> */}

              <button
                className="btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white lg:w-1/6 w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-100">
                <span className="text-2xl font-semibold text-gray-600">
                  Application for Butuan Scholarship is Closed!
                </span>
                <span className="text-1xl font-semibold text-gray-600 mt-2">
                  For Updates, Visit CEBDD Facebook Page or Wait for further announcements on the Home Page. Have a great day!
                </span>
              </div>
              )}
        </div>
      </div>

      {/* Toast Notification */}
      <div
        id="toastify"
        className="toast toast-top toast-right animate-bounce"
        style={{ visibility: "hidden" }}
      >
        <div className="alert alert-success">
          <span className="text-white">
            Application Submitted Successfully!
          </span>
        </div>
      </div>

        {/* Modal for missing fields */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Please Fill out Blank Fields:</h2>
              <ul className="list-disc pl-5">
                {missingFields.map((field, index) => (
                  <li key={index}>{field.replace(/_/g, " ").toUpperCase()}</li>
                ))}
              </ul>
              <button
                className="mt-4 btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

          {/* Confirmation Modal */}
          {submitshowModal && (
  <div className="modal modal-open">
    <div className="modal-box">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Application Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <h6 className="font-semibold">Full Name:</h6>
          <h6>{full_name}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Address:</h6>
          <h6>{address}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Sex:</h6>
          <h6>{sex}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Email Address:</h6>
          <h6>{email_address}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">GPA:</h6>
          <h6>{gpa}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Mobile Number:</h6>
          <h6>{mobile_number}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Last School Attended:</h6>
          <h6>{school}</h6>
        </div>
        <div className="flex justify-between">
          <h6 className="font-semibold">Course/Strand:</h6>
          <h6>{course}</h6>
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={() => setSubmitShowModal(false)}>Cancel</button>
        <button className="btn btn-primary" onClick={handleConfirmSubmit}>
          Confirm and Submit
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Apply;
