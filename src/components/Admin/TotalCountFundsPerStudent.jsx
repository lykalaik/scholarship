import { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import supabase from "../supabaseClient";

const TotalCountFundsPerStudent = ({ semester, year }) => {
  const [students, setStudents] = useState([]);

  // Fetch scholars data from Supabase
  useEffect(() => {
    const fetchScholars = async () => {
      const { data, error } = await supabase
        .from("scholarsData")
        .select("name, category, fund")
        .eq("semester", semester)
        .eq("school_year", year);

      if (error) {
        console.error("Error fetching scholars:", error);
      } else {
        // Assign numbering and format funds
        const formattedData = data.map((student, index) => ({
          number: index + 1,
          ...student,
          funds: `₱${parseFloat(student.fund || 0).toLocaleString()}`,
        }));
        setStudents(formattedData);
      }
    };

    fetchScholars();
  }, [semester, year]);

  // Calculate total funds
  const totalFunds = students.reduce(
    (sum, student) => sum + parseFloat(student.fund || 0),
    0
  );

  // Export to Excel function
  const exportToExcel = () => {
    // Prepare the data for export
    const exportData = students.map((student) => ({
      No: student.number,
      Name: student.name,
      Category: student.category,
      Funds: student.funds,
    }));

    // Create a worksheet and book
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Data");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "Total_Count_Funds_Per_Student.xlsx");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="tracking-wide text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Scholarship Funds per Student
          <button
            onClick={exportToExcel}
            className="btn btn-sm btn-success text-white"
          >
            Export to Excel
          </button>
        </div>

        <div className="flex border-b-2 border-black">
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
            No.
          </div>
          <div className="w-1/3 font-bold text-center border-r-2 border-black py-2">
            Name
          </div>
          <div className="w-1/4 font-bold text-center border-r-2 border-black py-2">
            Category
          </div>
          <div className="w-1/4 font-bold text-center py-2">Funds</div>
        </div>

        {students.map((student, index) => (
          <div key={index} className="flex border-b-2 border-black">
            <div className="w-1/6 text-center border-r-2 border-black py-2">
              {student.number}
            </div>
            <div className="w-1/3 border-r-2 border-black py-2 px-2">
              {student.name}
            </div>
            <div className="w-1/4 text-center border-r-2 border-black py-2">
              {student.category}
            </div>
            <div className="w-1/4 text-center py-2">{student.funds}</div>
          </div>
        ))}

        {/* Total Schools and Total Funds */}
        <div className="flex">
          <div className="w-1/2 border-r-2 border-black py-2 px-2">
            <span className="font-bold">Total Schools</span>
            <span className="float-right mr-8">{students.length}</span>
          </div>
          <div className="w-1/2 py-2 px-2">
            <span className="font-bold">Total Funds</span>
            <span className="float-right mr-8">
              ₱{totalFunds.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCountFundsPerStudent;