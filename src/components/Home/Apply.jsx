import Navbar from "./Navbar.jsx";
import supabase from "../supabaseClient.jsx";
import { useState, useEffect } from "react";
import { AiOutlineFileDone, AiOutlineFilePdf } from "react-icons/ai";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  const [barangay, setBarangay] = useState(null);
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
            barangay,
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

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    
    // Add header image
    const headerImg = new Image();
    headerImg.src = "header.png";
    doc.addImage(headerImg, 'PNG', 10, 10, 190, 25);
    
    // Add blue separator line
    doc.setDrawColor(0, 120, 200);
    doc.setLineWidth(0.3);
    doc.line(10, 35, 200, 35);
    
    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("BUTUANON SCHOLARSHIP PROFILE", 105, 45, { align: "center" });
    
    // Set font for form content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    // Set line color to black for all form lines
    doc.setDrawColor(0, 0, 0);
    
    // Personal Information section
    const startY = 65;
    
   // Name section with data
doc.text("Name:", 20, startY);
doc.line(65, startY, 190, startY);

// Add the actual name data above the line - adjust the positioning
if (last_name || given_name || middle_name) {
  // Center the text within their respective columns
  doc.text(`${last_name || ""}`, 80, startY - 3);
  doc.text(`${given_name || ""}`, 125, startY - 3);
  doc.text(`${middle_name || ""}`, 170, startY - 3);
}

// Labels beneath - keep these aligned with the values above
doc.setFontSize(8);
doc.text("(Last Name)", 80, startY + 5);
doc.text("(Given Name)", 125, startY + 5);
doc.text("(Middle Name)", 170, startY + 5);
doc.setFontSize(10);

// Age, DOB, and Place of Birth - adjust all value positions
const row2Y = startY + 15;
doc.text("Age:", 20, row2Y);
doc.line(35, row2Y, 50, row2Y);
if (age) doc.text(`${age}`, 40, row2Y - 3);

doc.text("Date of Birth:", 70, row2Y);
doc.line(95, row2Y, 130, row2Y);
if (date_of_birth) doc.text(`${date_of_birth}`, 95, row2Y - 3);

doc.text("Place of Birth:", 140, row2Y);
doc.line(175, row2Y, 180, row2Y);
if (place_of_birth) doc.text(`${place_of_birth}`, 160, row2Y - 3);

// Course and Year Level - adjust positions
const row3Y = row2Y + 10;
doc.text("Course:", 20, row3Y);
doc.line(40, row3Y, 140, row3Y);
if (course) doc.text(`${course}`, 45, row3Y - 3);

doc.text("Year Level:", 150, row3Y);
doc.line(180, row3Y, 190, row3Y);
if (year_level) doc.text(`${year_level}`, 175, row3Y - 3);

// Contact details - adjust all positions
const row4Y = row3Y + 10;
doc.text("Contact Number:", 20, row4Y);
doc.line(65, row4Y, 80, row4Y);
if (contact_number) doc.text(`${contact_number}`, 67, row4Y - 3);

doc.text("Email Address:", 90, row4Y);
doc.line(130, row4Y, 155, row4Y);
if (email_address) doc.text(`${email_address}`, 135, row4Y - 3);

doc.text("Sex:", 165, row4Y);
doc.line(175, row4Y, 190, row4Y);
if (sex) doc.text(`${sex}`, 177, row4Y - 3);

// Civil Service, Religion, Height, Weight - adjust positions
const row5Y = row4Y + 10;
doc.text("Civil Service:", 20, row5Y);
doc.line(55, row5Y, 70, row5Y);
if (civil_service) doc.text(`${civil_service}`, 57, row5Y - 3);

doc.text("Religion:", 80, row5Y);
doc.line(105, row5Y, 125, row5Y);
if (religion) doc.text(`${religion}`, 107, row5Y - 3);

doc.text("Height:", 135, row5Y);
doc.line(155, row5Y, 165, row5Y);
if (height) doc.text(`${height}`, 157, row5Y - 3);

doc.text("Weight (kg):", 170, row5Y);
doc.line(190, row5Y, 190, row5Y);
if (weight) doc.text(`${weight}`, 185, row5Y - 3);

// Address - adjust position
    const row6Y = row5Y + 10;
    doc.text("Address:", 20, row6Y);
    doc.line(45, row6Y, 190, row6Y);
    if (address) doc.text(`${address}`, 47, row6Y - 3);
    // Family members and ethnicity
    const row7Y = row6Y + 10;
    doc.text("No. of Family Members in your Household:", 20, row7Y);
    doc.line(120, row7Y, 130, row7Y);
    if (number_family_members) doc.text(`${number_family_members}`, 122, row7Y - 3);
    
    doc.text("Ethnicity:", 140, row7Y);
    doc.line(165, row7Y, 190, row7Y);
    if (ethnicity) doc.text(`${ethnicity}`, 167, row7Y - 3);
    
    // Father's information
    const row8Y = row7Y + 10;
    doc.text("Father's Name:", 20, row8Y);
    doc.line(65, row8Y, 120, row8Y);
    if (father_name) doc.text(`${father_name}`, 67, row8Y - 3);
    
    doc.text("Occupation:", 130, row8Y);
    doc.line(165, row8Y, 190, row8Y);
    if (father_occupation) doc.text(`${father_occupation}`, 167, row8Y - 3);
    
    // Father's address and contact
    const row9Y = row8Y + 10;
    doc.text("Address:", 20, row9Y);
    doc.line(45, row9Y, 120, row9Y);
    if (father_address) doc.text(`${father_address}`, 47, row9Y - 3);
    
    doc.text("Contact Number:", 130, row9Y);
    doc.line(175, row9Y, 190, row9Y);
    if (father_number) doc.text(`${father_number}`, 177, row9Y - 3);
    
    // Mother's information
    const row10Y = row9Y + 10;
    doc.text("Mother's Name:", 20, row10Y);
    doc.line(65, row10Y, 120, row10Y);
    if (mother_name) doc.text(`${mother_name}`, 67, row10Y - 3);
    
    doc.text("Occupation:", 130, row10Y);
    doc.line(165, row10Y, 190, row10Y);
    if (mother_occupation) doc.text(`${mother_occupation}`, 167, row10Y - 3);
    
    // Mother's address and contact
    const row11Y = row10Y + 10;
    doc.text("Address:", 20, row11Y);
    doc.line(45, row11Y, 120, row11Y);
    if (mother_address) doc.text(`${mother_address}`, 47, row11Y - 3);
    
    doc.text("Contact Number:", 130, row11Y);
    doc.line(175, row11Y, 190, row11Y);
    if (mother_number) doc.text(`${mother_number}`, 177, row11Y - 3);
    
    // Educational Attainment section
    const row12Y = row11Y + 15;
    doc.setFont("helvetica", "bold");
    doc.text("Educational Attainment", 20, row12Y);
    doc.setFont("helvetica", "normal");
    
    // Table headers
    const tableHeaderY = row12Y + 10;
    doc.text("Attended", 20, tableHeaderY);
    doc.text("Name of School", 75, tableHeaderY);
    doc.text("Awards Received", 140, tableHeaderY);
    doc.text("Year", 180, tableHeaderY);
    
    // Elementary row
    const elemRowY = tableHeaderY + 10;
    doc.text("Elementary:", 20, elemRowY);
    doc.line(55, elemRowY, 120, elemRowY);
    if (elementary_school) doc.text(`${elementary_school}`, 57, elemRowY - 3);
    
    doc.line(140, elemRowY, 170, elemRowY);
    if (elementary_awards) doc.text(`${elementary_awards}`, 142, elemRowY - 3);
    
    doc.line(180, elemRowY, 190, elemRowY);
    if (elementary_year) doc.text(`${elementary_year}`, 181, elemRowY - 3);
    
    // High School row
    const hsRowY = elemRowY + 10;
    doc.text("High School:", 20, hsRowY);
    doc.line(55, hsRowY, 120, hsRowY);
    if (secondary_school) doc.text(`${secondary_school}`, 57, hsRowY - 3);
    
    doc.line(140, hsRowY, 170, hsRowY);
    if (secondary_awards) doc.text(`${secondary_awards}`, 142, hsRowY - 3);
    
    doc.line(180, hsRowY, 190, hsRowY);
    if (secondary_year) doc.text(`${secondary_year}`, 181, hsRowY - 3);
    
    // Scholarship question
    const scholarshipY = hsRowY + 15;
    doc.text("Have you avail any scholarship grants?", 20, scholarshipY);
    doc.line(115, scholarshipY, 125, scholarshipY);
    if (availed_scholarship) doc.text(`${availed_scholarship}`, 117, scholarshipY - 3);
    
    // If yes question
    const ifYesY = scholarshipY + 10;
    doc.text("If yes, what year?", 20, ifYesY);
    doc.line(65, ifYesY, 80, ifYesY);
    if (scholarship_year) doc.text(`${scholarship_year}`, 67, ifYesY - 3);
    
    doc.text("Name of Scholarship Program:", 90, ifYesY);
    doc.line(165, ifYesY, 190, ifYesY);
    if (scholarship_name) doc.text(`${scholarship_name}`, 167, ifYesY - 3);
  
    // Add footer image
    const footerImg = new Image();
    footerImg.src = "footer.png";
    doc.addImage(footerImg, 'PNG', 150, 255, 40, 20);
    
    // Footer text
    doc.setFontSize(9);
    doc.text("Phone:", 20, 265);
    doc.setFont("helvetica", "bold");
    doc.text("(085) – 225 - 6743", 40, 265);
    
    doc.setFont("helvetica", "normal");
    doc.text("Email:", 20, 270);
    doc.setFont("helvetica", "bold");
    doc.text("cedd@butuan.gov.ph", 40, 270);
    
    doc.setFont("helvetica", "normal");
    doc.text("Website:", 20, 275);
    doc.setFont("helvetica", "bold");
    
    // Save the PDF with dynamic name if form data is available
    if (typeof last_name !== 'undefined' && typeof given_name !== 'undefined') {
      doc.save(`${last_name}_${given_name}_scholarship_profile.pdf`);
    } else {
      doc.save("scholarship_profile.pdf");
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-5 mb-5">
        <div className="card bg-base-100 shadow-2xl p-5 border border-gray-300 px-10 py-10">
          {open === "Yes" ? (
            <div>
              {/* <div className="mb-6 flex justify-between">
                <span className="mt-3 lg:text-2xl sm:text-md font-semibold px-3 flex gap-2">
                  <SiGooglescholar className="text-yellow-400 mt-1" />
                  Scholarship Application Form
                </span>
                <span className="mt-2 lg:text-lg sm:text-md font-semibold px-3 flex gap-2">
                  Number of Slots: {total}
                </span>
              </div> */}
              <img
                src="header.png"
                alt="header"
                className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-auto max-w-full object-contain mb-4"
              />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered border-gray-300 w-full mb-4"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                   <input
                  type="text"
                  placeholder="Barangay"
                  className="input input-bordered border-gray-300 w-full mb-4"
                  required
                  onChange={(e) => setBarangay(e.target.value)}
                />

                </div>

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

                <img
                  src="footer.png"
                  alt="header"
                  className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-auto max-w-full object-contain mb-4"
                />

                <div className="divider"></div>

                <div className="flex flex-col items-start">
                  <span className="text-red-500 text-sm sm:text-base mt-3">
                    *Note: Submit the following in 1 PDF Format.
                  </span>
                  <span className="text-red-500 text-sm sm:text-base mt-1">
                    Application Letter, 1x1 Picture, Latest Community Tax /
                    Cedula, Recent Scholastic Records, <br />
                    Recommendation Letter, Copy of Income Tax of Applicant's
                    Parents and Voter's Registration Certificate <br />
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
                  type="button"
                  className="btn btn-primary w-full sm:w-1/6"
                  onClick={generatePDF}
                >
                  <AiOutlineFilePdf size={20} />
                  Download PDF
                </button>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center">
                Application Submitted Successfully!
              </h2>
            </div>
            <p className="text-center mb-4">
              Your application has been successfully submitted and is now being
              processed.
            </p>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4">
              <h3 className="text-xl font-semibold text-center mb-2">
                Application Number
              </h3>
              <p className="text-2xl font-bold text-center text-blue-600">
                {idnumber}
              </p>
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
              Are you sure with the information you have provided? Please review
              before submitting.
            </p>
            <div className="overflow-y-auto max-h-96 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {last_name},{" "}
                      {given_name} {middle_name}
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {age}
                    </div>
                    <div>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {formatDate(date_of_birth)}
                    </div>
                    <div>
                      <span className="font-medium">Place of Birth:</span>{" "}
                      {place_of_birth}
                    </div>
                    <div>
                      <span className="font-medium">Sex:</span> {sex}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {address}
                    </div>
                    <div>
                      <span className="font-medium">Contact:</span>{" "}
                      {contact_number}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {email_address}
                    </div>
                    <div>
                      <span className="font-medium">Religion:</span> {religion}
                    </div>
                    <div>
                      <span className="font-medium">Ethnicity:</span>{" "}
                      {ethnicity}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                    Educational Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Course:</span> {course}
                    </div>
                    <div>
                      <span className="font-medium">Year Level:</span>{" "}
                      {year_level}
                    </div>
                    <div>
                      <span className="font-medium">Elementary School:</span>{" "}
                      {elementary_school}
                    </div>
                    <div>
                      <span className="font-medium">Elementary Year:</span>{" "}
                      {elementary_year}
                    </div>
                    <div>
                      <span className="font-medium">High School:</span>{" "}
                      {secondary_school}
                    </div>
                    <div>
                      <span className="font-medium">High School Year:</span>{" "}
                      {secondary_year}
                    </div>
                    <div>
                      <span className="font-medium">Previous Scholarship:</span>{" "}
                      {availed_scholarship}
                    </div>
                    {availed_scholarship === "Yes" && (
                      <>
                        <div>
                          <span className="font-medium">Scholarship Year:</span>{" "}
                          {scholarship_year}
                        </div>
                        <div>
                          <span className="font-medium">Scholarship Name:</span>{" "}
                          {scholarship_name}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                  Family Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Father's Name:</span>{" "}
                      {father_name}
                    </div>
                    <div>
                      <span className="font-medium">Father's Occupation:</span>{" "}
                      {father_occupation}
                    </div>
                    <div>
                      <span className="font-medium">Father's Address:</span>{" "}
                      {father_address}
                    </div>
                    <div>
                      <span className="font-medium">Father's Contact:</span>{" "}
                      {father_number}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Mother's Name:</span>{" "}
                      {mother_name}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Occupation:</span>{" "}
                      {mother_occupation}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Address:</span>{" "}
                      {mother_address}
                    </div>
                    <div>
                      <span className="font-medium">Mother's Contact:</span>{" "}
                      {mother_number}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                  Documents
                </h3>
                <div>
                  <span className="font-medium">Uploaded Files:</span>{" "}
                  {file ? file.name : "No file uploaded"}
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