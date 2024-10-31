import { FaGoogleScholar } from "react-icons/fa6";
import supabase from "../supabaseClient";
import { useState,  useEffect } from "react";

const RenewApplication = () => {
  const scholarName = sessionStorage.getItem("scholarData");
  const email = sessionStorage.getItem("email");
  const [userData, setUserData] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [final_grades, setFinalGrades] = useState('');
  const [evaluation_sheet, setEvaluationSheet] = useState('');
  const [scholarship_contract, setScholarshipContract] = useState('');
  const [study_load, setStudyLoad] = useState('');
  const [clearance, setClearance] = useState('');
  const [file, setFile] = useState('');
  const [renewalstatus, setRenewalStatus] = useState('');

  useEffect(() => {
    fetch_data();
    fetch_renewal();
  }, []);

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
      .from('scholars')
      .select('*')
      .eq('full_name', scholarName);
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };

  const fetch_renewal = async () => {
    try {
      const { data, error } = await supabase
      .from('renewals')
      .select('*')
      .eq('full_name', scholarName);

      setRenewalStatus(data[0].status);
    } catch (error) {
      console.error('Error during renewal:', error.message);
    }
  };
  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.close();
    }
  };

  const handleRecommendation = async (e) => {
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
            setRecommendation(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };

  const handleGrades = async (e) => {
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
            setFinalGrades(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };

  const handleEvaluation = async (e) => {
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
            setEvaluationSheet(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };
  const handleScholarship = async (e) => {
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
            setScholarshipContract(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };
  const handleStudyLoad = async (e) => {
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
            setStudyLoad(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };

  const handleClearance = async (e) => {
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
            setClearance(publicURL.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
        }
    }
  };

  const renew_application = async () => {
    // Check for null values in required fields
    if (
      !recommendation || 
      !final_grades || 
      !evaluation_sheet || 
      !scholarship_contract || 
      !study_load || 
      !clearance
    ) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Proceed with submission if all fields are valid
    const { data, error } = await supabase
      .from('renewals')
      .insert([
        {
          full_name: scholarName,
          recommendation,
          final_grades,
          evaluation_sheet,
          scholarship_contract,
          study_load,
          clearance,
          status: 'Pending',
          email,
        },
      ]);
  
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted successfully:', data);
      update_account();
    }
  };
  

  const update_account = async() =>{
    try{
        const {data} = await supabase
        .from('scholars')
        .update([
          {
           status : 'Pending',
           scholarship_type: 'Renewal'
          }
        ])
        .eq('full_name', scholarName);
    window.location.reload();
      }
      catch (error) {
        alert("Error Saving Data.")
    }
  }

  return (
    <>
      <div className="flex justify-between mb-5 mt-20">
        <h1 className="text-2xl flex gap-2 font-bold">
          <FaGoogleScholar className="mt-1" />
          Scholarship
        </h1>
        {renewalstatus && (
        <h1 className="text-2xl flex gap-2 font-bold">
          Renewal Status: {renewalstatus}
        </h1>
      )}
      </div>
      <div className="card rounded shadow-xl bordered mb-10 p-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Scholarship Type</th>
                <th>Scholarship Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {userData.map((user) => (
              <tr>
                <td>{user.scholarship_type}</td>
                <td>{user.status}</td>
                <td>
                <button
                className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
                onClick={openModal}
                disabled={user.allowed_renewal === "No" || renewalstatus === "Pending"}
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

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-semibold text-lg">
            Upload the following Documents:
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Recommendation from Baranggay Official */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Recommendation from Baranggay Official
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload recommendation from Baranggay Official"
              onChange={handleRecommendation}
            />
          </div>

          {/* Final Grades for Previous Semester */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Final Grades for Previous Semester
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload final grades for previous semester"
              onChange={handleGrades}
            />
          </div>

          {/* Evaluation Sheet issued by School */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">
                Evaluation Sheet issued by School
              </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload evaluation sheet issued by school"
              onChange={handleEvaluation}
            />
          </div>

          {/* Scholarship Contract */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Scholarship Contract</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload scholarship contract"
              onChange={handleScholarship}
            />
          </div>

          {/* Study Load */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Study Load</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload study load"
              onChange={handleStudyLoad}
            />
          </div>

          {/* Clearance LGUSF */}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Clearance LGUSF</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              placeholder="Upload clearance LGUSF"
              onChange={handleClearance}
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-action">
            <button className="w-full btn btn-primary text-white" onClick={renew_application}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RenewApplication;
