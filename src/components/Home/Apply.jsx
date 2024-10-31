import Navbar from "./Navbar.jsx";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { SiGooglescholar } from "react-icons/si";
import supabase from "../supabaseClient.jsx";
import { useState, useEffect } from "react";

const Apply = () => {
  const [file, setFile] = useState('');
  const [application_letter, setApplicationLetter] = useState('');
  const [recommendation_letter, setRecommendationLetter] = useState('');
  const [itr, setITR] = useState('');
  const [copy_itr, setCopyITR] = useState('');
  const [cedula, setCedula] = useState('');
  const [voters, setVoters] = useState('');
  const [recent_card, setRecentCard] = useState('');
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [gpa, setGPA] = useState('');
  const [sex, setSex] = useState('Male');
  const [mobile_number, setMobileNumber] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');

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
      recent_card
    };
  

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === null || value === undefined) {
        alert(`Please provide a valid value for ${key}`);
        return;
      }
    }
    const { data, error } = await supabase
      .from('application')
      .insert([
        {
          ...requiredFields,
          status: 'Pending'
        },
      ]);
  
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      alert('Successful Application!');
      window.location.reload();
    }
  };
  

  const openModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.close();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    showToast();
  };

  const showToast = () => {
    const toast = document.getElementById("toastify");
    if (toast) {
      toast.style.visibility = "visible";
      setTimeout(() => {
        toast.style.visibility = "hidden";
      }, 3000);
    }
  };

  const handleApplicationLetter = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
        try {
            const filePath = `${selectedFile.name}`;
            const { data, error } = await supabase.storage
                .from('Applicant_Storage')
                .upload(filePath, selectedFile);

            if (error) {
                throw error;
            }
            const { data: publicURL, error: urlError } = supabase.storage
                .from('Applicant_Storage')
                .getPublicUrl(filePath);

            if (urlError) {
                throw urlError;
            }
            console.log('Image URL:', publicURL.publicUrl);
            setApplicationLetter(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setRecommendationLetter(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setITR(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setCopyITR(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setCedula(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setVoters(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
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
              .from('Applicant_Storage')
              .upload(filePath, selectedFile);

          if (error) {
              throw error;
          }
          const { data: publicURL, error: urlError } = supabase.storage
              .from('Applicant_Storage')
              .getPublicUrl(filePath);

          if (urlError) {
              throw urlError;
          }
          console.log('Image URL:', publicURL.publicUrl);
          setRecentCard(publicURL.publicUrl)
      } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image: ' + error.message);
      }
  }
};

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mb-10">
        <div className="mb-6 flex justify-between">
          <span className="mt-3 text-2xl font-semibold px-3 flex gap-2">
            <SiGooglescholar className="text-yellow-400 mt-1" />
            Fill out Application Form
          </span>
        </div>
        {/* Card wrapping the form */}
        <div className="card bg-base-100 shadow-xl p-5 border border-gray-300">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Marc Dominic Gerasmio"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Sex</span>
                </label>
                <select className="select select-bordered w-full" required value= {sex} onChange={(e) => setSex(e.target.value)}>
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
                  <span className="label-text">Last School Attended</span>
                </label>
                <input
                  type="text"
                  placeholder="School Name"
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
                  <span className="label-text">Course</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor of Science in Information Technology"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
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
                  <span className="label-text">*Latest Community Tax / Cedula</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleCedula}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">*Voter's Registration Certificate</span>
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
            <div className="modal-action mt-4">
              <button
                className="btn bg-blue-700 border-blue-700 hover:bg-blue-500 text-white w-full"
                type="submit"
                onClick={create_application}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        id="toastify"
        className="toast toast-bottom toast-end animate-bounce"
        style={{ visibility: "hidden" }}
      >
        <div className="alert alert-success">
          <span className="text-white">
            Application Submitted Successfully!
          </span>
        </div>
      </div>
    </>
  );
};

export default Apply;
