import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TotalCountFundsPerSchool = () => {
  // Updated Sample Data
  const allSchools = [
    { number: 1, school: "ABC University", scholars: 120, funds: "₱1,200,000" },
    { number: 2, school: "XYZ College", scholars: 95, funds: "₱950,000" },
    { number: 3, school: "LMN Institute", scholars: 78, funds: "₱780,000" },
    { number: 4, school: "PQR Academy", scholars: 88, funds: "₱880,000" },
    { number: 5, school: "GHI University", scholars: 110, funds: "₱1,100,000" },
    { number: 6, school: "JKL College", scholars: 65, funds: "₱650,000" },
    { number: 7, school: "MNO Institute", scholars: 82, funds: "₱820,000" },
    { number: 8, school: "TUV Academy", scholars: 73, funds: "₱730,000" },
    { number: 9, school: "EFG University", scholars: 90, funds: "₱900,000" },
    { number: 10, school: "HIJ College", scholars: 105, funds: "₱1,050,000" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(allSchools.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentSchools = allSchools.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const totalSchools = allSchools.length;
  const totalFunds = "₱9,460,000"; // Example sum

  // Function to export table to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Count of Scholars & Funds per School", 14, 10);

    const tableColumn = ["No.", "School", "Scholars", "Funds"];
    const tableRows = allSchools.map((school) => [
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
      `Total Schools: ${totalSchools}`,
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
    <>
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
            <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
              No.
            </div>
            <div className="w-1/3 font-bold text-center border-r-2 border-black py-2">
              School
            </div>
            <div className="w-1/4 font-bold text-center border-r-2 border-black py-2">
              Scholars
            </div>
            <div className="w-1/4 font-bold text-center py-2">Funds</div>
          </div>

          {currentSchools.map((school, index) => (
            <div key={index} className="flex border-b-2 border-black">
              <div className="w-1/6 text-center border-r-2 border-black py-2">
                {school.number}
              </div>
              <div className="w-1/3 border-r-2 border-black py-2 px-2">
                {school.school}
              </div>
              <div className="w-1/4 text-center border-r-2 border-black py-2">
                {school.scholars}
              </div>
              <div className="w-1/4 text-center py-2">{school.funds}</div>
            </div>
          ))}

          <div className="flex">
            <div className="w-1/2 border-r-2 border-black py-2 px-2">
              <span className="font-bold">Total Schools</span>
              <span className="float-right mr-8">{totalSchools}</span>
            </div>
            <div className="w-1/2 py-2 px-2">
              <span className="font-bold">Total Funds</span>
              <span className="float-right mr-8">{totalFunds}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-white hover:bg-gray-100"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
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
            onClick={nextPage}
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
      <div className="divider"></div>
    </>
  );
};

export default TotalCountFundsPerSchool;
