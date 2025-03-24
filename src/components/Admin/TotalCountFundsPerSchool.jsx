import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import supabase from "../supabaseClient";

const TotalCountFundsPerSchool = ({semester, year}) => {
  const [schoolData, setSchoolData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchSchoolData();
  }, [semester, year]);

  const fetchSchoolData = async () => {
    const { data, error } = await supabase
    .from("scholarsData")
    .select("school, fund")
    .eq("semester", semester)
    .eq("school_year", year);

    if (error) {
      console.error("Error fetching scholarsData:", error);
      return;
    }

    // Group by school and sum funds
    const grouped = {};
    data.forEach((row) => {
      if (row.school) {
        if (!grouped[row.school]) {
          grouped[row.school] = { scholars: 0, totalFund: 0 };
        }
        grouped[row.school].scholars += 1;
        grouped[row.school].totalFund += Number(row.fund) || 0;
      }
    });

    // Convert grouped object to array with numbering
    const result = Object.entries(grouped).map(([school, values], index) => ({
      number: index + 1,
      school,
      scholars: values.scholars,
      funds: `₱${values.totalFund.toLocaleString()}`,
      totalFund: values.totalFund,
    }));

    setSchoolData(result);
  };

  const totalPages = Math.ceil(schoolData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentSchools = schoolData.slice(indexOfFirstRow, indexOfLastRow);

  const totalFunds = `₱${schoolData
    .reduce((sum, school) => sum + school.totalFund, 0)
    .toLocaleString()}`;

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Count of Scholars & Funds per School", 14, 10);

    const tableColumn = ["No.", "School", "Scholars", "Funds"];
    const tableRows = schoolData.map((school) => [
      school.number,
      school.school,
      school.scholars,
      school.funds,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text(
      `Total Schools: ${schoolData.length}`,
      14,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Total Funds: ${totalFunds}`,
      14,
      doc.autoTable.previous.finalY + 20
    );

    doc.save("Total_Count_Funds_Per_School.pdf");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Scholars & Funds per School
          <button
            onClick={exportToPDF}
            className="btn btn-sm btn-error text-white"
          >
            Export to PDF
          </button>
        </div>

        <div className="flex border-b-2 border-black">
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">No.</div>
          <div className="w-1/3 font-bold text-center border-r-2 border-black py-2">School</div>
          <div className="w-1/4 font-bold text-center border-r-2 border-black py-2">Scholars</div>
          <div className="w-1/4 font-bold text-center py-2">Funds</div>
        </div>

        {currentSchools.map((school, index) => (
          <div key={index} className="flex border-b-2 border-black">
            <div className="w-1/6 text-center border-r-2 border-black py-2">{school.number}</div>
            <div className="w-1/3 border-r-2 border-black py-2 px-2">{school.school}</div>
            <div className="w-1/4 text-center border-r-2 border-black py-2">{school.scholars}</div>
            <div className="w-1/4 text-center py-2">{school.funds}</div>
          </div>
        ))}

        <div className="flex">
          <div className="w-1/2 border-r-2 border-black py-2 px-2">
            <span className="font-bold">Total Schools</span>
            <span className="float-right mr-8">{schoolData.length}</span>
          </div>
          <div className="w-1/2 py-2 px-2">
            <span className="font-bold">Total Funds</span>
            <span className="float-right mr-8">{totalFunds}</span>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
        >
          Previous
        </button>
        <div className="flex space-x-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default TotalCountFundsPerSchool;
