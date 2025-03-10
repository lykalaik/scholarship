import Navbar from "./Navbar.jsx";
import { SiGooglescholar } from "react-icons/si";
import supabase from "../supabaseClient.jsx";
import { useState, useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";

const Apply = () => {
  const [open, setOpen] = useState("");
  const [file, setFile] = useState("");
  const [docs, setDocs] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idnumber, setIDNumber] = useState("");
  const [submitshowModal, setSubmitShowModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [last_name, setLastName] = useState(null);
  const [given_name, setGivenName] = useState(null);
  const [middle_name, setMiddleName] = useState(null);
  const [age, setAge] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [place_of_birth, setPlaceOfBirth] = useState(null);
  const [course, setCourse] = useState(null);
  const [year_level, setYearLevel] = useState(null);
  const [contact_number, setContactNumber] = useState(null);
  const [email_address, setEmailAddress] = useState(null);
  const [sex, setSex] = useState(null);
  const [civil_service, setCivilService] = useState(null);
  const [religion, setReligion] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [address, setAddress] = useState(null);
  const [number_family_members, setNumberFamilyMembers] = useState(null);
  const [ethnicity, setEthnicity] = useState(null);
  const [father_name, setFatherName] = useState(null);
  const [father_occupation, setFatherOccupation] = useState(null);
  const [mother_name, setMotherName] = useState(null);
  const [mother_occupation, setMotherOccupation] = useState(null);
  const [father_address, setFatherAddress] = useState(null);
  const [father_number, setFatherNumber] = useState(null);
  const [mother_address, setMotherAddress] = useState(null);
  const [mother_number, setMotherNumber] = useState(null);
  const [elementary_school, setElementarySchool] = useState(null);
  const [elementary_awards, setElementaryAwards] = useState(null);
  const [elementary_year, setElementaryYear] = useState(null);
  const [secondary_school, setSecondarySchool] = useState(null);
  const [secondary_awards, setSecondaryAwards] = useState(null);
  const [secondary_year, setSecondaryYear] = useState(null);
  const [availed_scholarship, setAvailedScholarship] = useState(null);
  const [scholarship_year, setScholarshipYear] = useState(null);
  const [scholarship_name, setScholarshipName] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [slots, setSlots] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("deadline")
          .select("*")
          .eq("type", "application")
          .single();
  
        if (error) throw error;
        if (data) {
          setStart(data.start);
          setEnd(data.end);
          setSlots(data.slots);
          const today = new Date().toISOString().split("T")[0];
          setOpen(data.start <= today && data.end >= today ? "Yes" : "No");
          fetchScholars(data.slots);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    const fetchScholars = async (slots) => {
      try {
        const { data, error } = await supabase.from("scholars").select("*");
  
        if (error) throw error;
        setTotal(slots - data.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  
  const handleConfirmSubmit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("application")
        .insert([
          {
            last_name,
            given_name,
            middle_name,
            age,
            date_of_birth,
            place_of_birth,
            course,
            year_level,
            contact_number,
            email_address,
            sex,
            civil_service,
            religion,
            height,
            weight,
            address,
            number_family_members,
            ethnicity,
            father_address,
            father_name,
            father_number,
            father_occupation,
            mother_address,
            mother_name,
            mother_number,
            mother_occupation,
            elementary_awards,
            elementary_school,
            elementary_year,
            secondary_awards,
            secondary_school,
            secondary_year,
            availed_scholarship,
            scholarship_year,
            scholarship_name,
            docs,
            status: "Pending",
          },
        ])
        .select();
        
      setSubmitShowModal(false);
      if (error) {
        console.error("Error submitting application:", error);
        alert("Error submitting application: " + error.message);
      } else {
        setIDNumber(data[0].id);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitShowModal(true);
  };

  const handleFileSubmit = async (e) => {
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
        setDocs(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading file: " + error.message);
      }
    }
  };

  const showid = () => {
    setShowModal(false);
    window.location.reload();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-5 mb-5">
        <div className="card bg-base-100 shadow-2xl p-5 border border-gray-300 px-10 py-10">
          {open === "Yes" ? (
            <div>
              <div className="mb-6 flex justify-between">
                <span className="mt-3 lg:text-2xl sm:text-md font-semibold px-3 flex gap-2">
                  <SiGooglescholar className="text-yellow-400 mt-1" />
                  Scholarship Application Form
                </span>
                <span className="mt-2 lg:text-lg sm:text-md font-semibold px-3 flex gap-2">
                  Number of Slots: {total}
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Given Name"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setGivenName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Place of Birth"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Course"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setCourse(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Year Level"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setYearLevel(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <select
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Civil Service"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setCivilService(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Religion"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setReligion(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Height"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered border-gray-300 w-full mb-4"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="number"
                    placeholder="No. of Family Members"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setNumberFamilyMembers(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Ethnicity"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setEthnicity(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Father's Name"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Father's Occupation"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setFatherOccupation(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Father's Address"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setFatherAddress(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Father's Contact Number"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setFatherNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Mother's Name"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Mother's Occupation"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setMotherOccupation(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <input
                    type="text"
                    placeholder="Mother's Address"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setMotherAddress(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Mother's Contact Number"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setMotherNumber(e.target.value)}
                  />
                </div>

                <div className="divider"></div>

                <h3 className="text-xl font-semibold mb-5 mt-8">
                  Educational Attainment
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Elementary School"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setElementarySchool(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Elementary Awards"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setElementaryAwards(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Elementary Year"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setElementaryYear(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="High School"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setSecondarySchool(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="High School Awards"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setSecondaryAwards(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="High School Year"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setSecondaryYear(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setAvailedScholarship(e.target.value)}
                  >
                    <option value="">
                      Have you availed any scholarship grants?
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <input
                    type="text"
                    placeholder="If yes, what year?"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setScholarshipYear(e.target.value)}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Name of Scholarship Program"
                  className="input input-bordered border-gray-300 w-full mb-4"
                  required
                  onChange={(e) => setScholarshipName(e.target.value)}
                />

                <div className="divider"></div>

                <div className="flex flex-col items-start">
                  <span className="text-red-500 text-sm sm:text-base mt-3">
                    *Note: Submit the following in 1 PDF Format.
                  </span>
                  <span className="text-red-500 text-sm sm:text-base mt-1">
                    Application Letter, 1x1 Picture, Latest Community Tax / Cedula, Recent Scholastic Records, <br/>
                    Recommendation Letter,  Copy of Income Tax of Applicant's Parents and Voter's Registration Certificate <br/>
                    Filename format : "LastName_Documents".
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      label: "Submit PDF here.",
                      handler: handleFileSubmit,
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <label className="label">
                        <span className="label-text">{item.label}</span>
                      </label>
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={item.handler}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-end mt-5 gap-3">
                  <button
                    type="submit"
                    className="btn btn-neutral w-full sm:w-1/6"
                  >
                    <AiOutlineFileDone size={20} />
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-100">
              <span className="text-2xl font-semibold text-gray-600">
                Application for Butuan Scholarship is Closed!
              </span>
              <span className="text-1xl font-semibold text-gray-600 mt-2">
                For Updates, Visit CEBDD Facebook Page or Wait for further
                announcements on the Home Page. Have a great day!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <div
        id="toastify"
        className="toast toast-top toast-right"
        style={{ visibility: "hidden" }}
      >
        <div className="alert alert-success">
          <span className="text-white">
            Application Submitted Successfully!
          </span>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex flex-col items-center mb-4">
              <div className="text-green-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center">Application Submitted Successfully!</h2>
            </div>
            <p className="text-center mb-4">
              Your application has been successfully submitted and is now being processed.
            </p>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4">
              <h3 className="text-xl font-semibold text-center mb-2">
                Application Number
              </h3>
              <p className="text-2xl font-bold text-center text-blue-600">{idnumber}</p>
              <p className="text-sm text-center text-gray-500 mt-2">
                Please save this number to track your application status.
              </p>
            </div>
            <button
              className="w-full btn bg-blue-700 border-blue-700 hover:bg-blue-600 text-white"
              onClick={showid}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {submitshowModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Please Confirm Your Information
            </h2>
            <p className="text-center mb-6 text-gray-600">
              Are you sure with the information you have provided? Please review before submitting.
            </p>
            <div className="overflow-y-auto max-h-96 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2 border-b pb-1">Personal Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {last_name}, {given_name} {middle_name}
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {age}
                    </div>
                    <div>
                      <span className="font-medium">Date of Birth:</span> {formatDate(date_of_birth)}
                    </div>
                    <div>
                      <span className="font-medium">Place of Birth:</span> {place_of_birth}
                    </div>
                    <div>
                      <span className="font-medium">Sex:</span> {sex}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {address}
                    </div>
                    <div>
                      <span className="font-medium">Contact:</span> {contact_number}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {email_address}
                    </div>
                    <div>
                      <span className="font-medium">Religion:</span> {religion}
                    </div>
                    <div>
                      <span className="font-medium">Ethnicity:</span> {ethnicity}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2 border-b pb-1">Educational Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Course:</span> {course}
                    </div>
                    <div>
                      <span className="font-medium">Year Level:</span> {year_level}
                    </div>
                    <div>
                      <span className="font-medium">Elementary School:</span> {elementary_school}
                    </div>
                    <div>
                      <span className="font-medium">Elementary Year:</span> {elementary_year}
                    </div>
                    <div>
                      <span className="font-medium">High School:</span> {secondary_school}
                    </div>
                    <div>
                      <span className="font-medium">High School Year:</span> {secondary_year}
                    </div>
                    <div>
                      <span className="font-medium">Previous Scholarship:</span> {availed_scholarship}
                    </div>
                    {availed_scholarship === "Yes" && (
                      <>
                        <div>
                          <span className="font-medium">Scholarship Year:</span> {scholarship_year}
                        </div>
                        <div>
                          <span className="font-medium">Scholarship Name:</span> {scholarship_name}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2 border-b pb-1">Family Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Father's Name:</span> {father_name}
                    </div>
                    <div>
                      <span className="font-medium">Father's Occupation:</span> {father_occupation}
                    </div>
                    <div>
                      <span className="font-medium">Father's Address:</span> {father_address}
                    </div>
                    <div>
                      <span className="font-medium">Father's Contact:</span> {father_number}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Mother's Name:</span> {mother_name}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Occupation:</span> {mother_occupation}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Address:</span> {mother_address}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Contact:</span> {mother_number}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2 border-b pb-1">Documents</h3>
                <div>
                  <span className="font-medium">Uploaded Files:</span> {file ? file.name : "No file uploaded"}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
              <button 
                className="btn btn-outline"
                onClick={() => setSubmitShowModal(false)}
              >
                Go Back & Edit
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  "Confirm & Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Apply;