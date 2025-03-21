import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TotalCountFundsPerStudent = () => {
  // Updated Sample Data (Per Student)
  const allStudents = [
    { number: 1, name: "Juan Dela Cruz", category: "New", funds: "₱50,000" },
    { number: 2, name: "Maria Santos", category: "Renewal", funds: "₱45,000" },
    { number: 3, name: "Jose Rizal", category: "New", funds: "₱50,000" },
    {
      number: 4,
      name: "Andres Bonifacio",
      category: "Renewal",
      funds: "₱45,000",
    },
    { number: 5, name: "Emilio Aguinaldo", category: "New", funds: "₱50,000" },
    {
      number: 6,
      name: "Gabriela Silang",
      category: "Renewal",
      funds: "₱45,000",
    },
    { number: 7, name: "Melchora Aquino", category: "New", funds: "₱50,000" },
    { number: 8, name: "Diego Silang", category: "Renewal", funds: "₱45,000" },
    { number: 9, name: "Lapu-Lapu", category: "New", funds: "₱50,000" },
    { number: 10, name: "Antonio Luna", category: "Renewal", funds: "₱45,000" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(allStudents.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentStudents = allStudents.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Calculate total funds
  const totalFunds = allStudents.reduce(
    (sum, student) =>
      sum + parseInt(student.funds.replace("₱", "").replace(",", "")),
    0
  );

  // Function to export table to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Count of Scholarship Funds per Student", 14, 10);

    const tableColumn = ["No.", "Name", "Category", "Funds"];
    const tableRows = allStudents.map((student) => [
      student.number,
      student.name,
      student.category,
      student.funds,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text(
      `Total Funds: ₱${totalFunds.toLocaleString()}`,
      14,
      doc.autoTable.previous.finalY + 10
    );

    doc.save("Total_Count_Funds_Per_Student.pdf");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Scholarship Funds per Student
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
            Name
          </div>
          <div className="w-1/4 font-bold text-center border-r-2 border-black py-2">
            Category
          </div>
          <div className="w-1/4 font-bold text-center py-2">Funds</div>
        </div>

        {currentStudents.map((student, index) => (
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

        <div className="flex">
          <div className="w-full py-2 px-2 border-t-2 border-black">
            <span className="font-bold">Total Funds</span>
            <span className="float-right mr-8">
              ₱{totalFunds.toLocaleString()}
            </span>
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
  );
};

export default TotalCountFundsPerStudent;
