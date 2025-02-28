import Navbar from "./Navbar.jsx";
import { SiGooglescholar } from "react-icons/si";
import supabase from "../supabaseClient.jsx";
import { useState, useEffect } from "react";

const Apply = () => {
  const [open, setOpen] = useState("");
  const [file, setFile] = useState("");
  const [application_letter, setApplicationLetter] = useState("");
  const [recommendation_letter, setRecommendationLetter] = useState("");
  const [itr, setITR] = useState("");
  const [copy_itr, setCopyITR] = useState("");
  const [cedula, setCedula] = useState("");
  const [voters, setVoters] = useState("");
  const [recent_card, setRecentCard] = useState("");
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
          .from("users")
          .select("*")
          .eq("email", "admin@gmail.com")
          .single();

        if (error) throw error;

        if (data) {
          setStart(data.start);
          setEnd(data.end);
          setSlots(data.slots);
          const today = new Date().toISOString().split("T")[0];
          if (data.start <= today && data.end >= today) {
            setOpen("Yes");
          } else {
            setOpen("No");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const fetchScholars = async () => {
      try {
        const { data, error } = await supabase.from("scholars").select("*");

        const scholars = data.length;
        setTotal(parseInt(slots) - scholars);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
    fetchScholars();
  }, []);
  const handleConfirmSubmit = async () => {
    const requiredFields = {
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
      status,
      application_letter,
      recommendation_letter,
      itr,
      copy_itr,
      cedula,
      voters,
      recent_card,
    };
    const { data, error } = await supabase
      .from("application")
      .insert([
        {
          ...requiredFields,
          status: "Pending",
        },
      ])
      .select();
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      setSubmitShowModal(false);
      setIDNumber(data[0].id);
      setLoading(false);
      setShowModal(true);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitShowModal(true);
  // };

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

  const showid = () => {
    setShowModal(false);
    window.location.reload();
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
                <span className="mt-3 lg:text-2xl sm:text-md font-semibold px-3 flex gap-2">
                  Number of Slots:{total}
                </span>
              </div>
              <form onSubmit={handleConfirmSubmit}>
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
                  <input
                    type="text"
                    placeholder="Sex"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setSex(e.target.value)}
                  />
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
                  <input
                    type="text"
                    placeholder="Have you availed any scholarship grants?"
                    className="input input-bordered border-gray-300 w-full"
                    required
                    onChange={(e) => setAvailedScholarship(e.target.value)}
                  />
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
                    *Note: Filename for images should be
                    "LASTNAME_FIRSTNAME_FILENAME".
                  </span>
                  <span className="text-red-500 text-sm sm:text-base mt-1">
                    Example: "DELACRUZ_JUAN_1x1Picture"
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      label: "*Application Letter",
                      handler: handleApplicationLetter,
                    },
                    {
                      label: "*Recommendation Letter from Baranggay Official",
                      handler: handleRecommendationLetter,
                    },
                    {
                      label: "*1x1 Picture",
                      handler: handleITR,
                    },
                    {
                      label:
                        "*Copy of Income Tax Return of the Applicant's Parents",
                      handler: handleCopyITR,
                    },
                    {
                      label: "*Latest Community Tax / Cedula",
                      handler: handleCedula,
                    },
                    {
                      label: "*Voter's Registration Certificate",
                      handler: handleVoters,
                    },
                    {
                      label: "*Recent Scholastic Records",
                      handler: handleRecord,
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
                  <button className="btn btn-error text-white w-full sm:w-1/5">
                    Save as PDS
                  </button>
                  <button
                    type="submit"
                    className="btn btn-neutral w-full sm:w-1/5"
                  >
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Your application has been successfully submitted!
            </h2>
            <h3 className="text-xl mb-4">
              Use this Application Number to track your status. Thank you for
              your interest!
            </h3>
            <h3 className="text-xl font-semibold mb-4">
              Application Number: {idnumber}
            </h3>
            <button
              className="mt-4 btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white"
              onClick={showid}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {/* {submitshowModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-semibold mb-4">
              Confirm Your Application Details
            </h2>
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
              <button className="btn" onClick={() => setSubmitShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmSubmit}>
                Confirm and Submit
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Apply;
