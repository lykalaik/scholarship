import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TotalCountPerBrgy = () => {
  // Sample data
  const allBarangays = [
    {
      name: "Ampayon",
      new: 23,
      newDeclined: 0,
      renewal: 14,
      renewalDeclined: 1,
      total: 38,
    },
    {
      name: "De Oro",
      new: 21,
      newDeclined: 0,
      renewal: 12,
      renewalDeclined: 0,
      total: 33,
    },
    {
      name: "Lumbocan",
      new: 18,
      newDeclined: 2,
      renewal: 20,
      renewalDeclined: 2,
      total: 38,
    },
    {
      name: "Pagatpatan",
      new: 16,
      newDeclined: 1,
      renewal: 33,
      renewalDeclined: 1,
      total: 41,
    },
    {
      name: "Tungao",
      new: 14,
      newDeclined: 2,
      renewal: 16,
      renewalDeclined: 3,
      total: 39,
    },
    {
      name: "San Vicente",
      new: 12,
      newDeclined: 1,
      renewal: 15,
      renewalDeclined: 2,
      total: 30,
    },
    {
      name: "Baan",
      new: 19,
      newDeclined: 0,
      renewal: 21,
      renewalDeclined: 1,
      total: 41,
    },
    {
      name: "Libertad",
      new: 15,
      newDeclined: 3,
      renewal: 18,
      renewalDeclined: 0,
      total: 36,
    },
    {
      name: "Mahogany",
      new: 20,
      newDeclined: 1,
      renewal: 22,
      renewalDeclined: 2,
      total: 45,
    },
    {
      name: "Villa Kananga",
      new: 17,
      newDeclined: 2,
      renewal: 19,
      renewalDeclined: 1,
      total: 39,
    },
    {
      name: "Obrero",
      new: 22,
      newDeclined: 1,
      renewal: 24,
      renewalDeclined: 2,
      total: 49,
    },
    {
      name: "Ambago",
      new: 13,
      newDeclined: 0,
      renewal: 17,
      renewalDeclined: 1,
      total: 31,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(allBarangays.length / rowsPerPage);

  // Get current rows for the page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentBarangays = allBarangays.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const totalSchools = 11;
  const totalApplications = 467;

  // Function to export table to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Count per Barangay of Scholarship Application", 14, 10);

    const tableColumn = [
      "Barangay",
      "New",
      "Declined",
      "Renewal",
      "Declined",
      "Total",
    ];
    const tableRows = allBarangays.map((barangay) => [
      barangay.name,
      barangay.new,
      barangay.newDeclined,
      barangay.renewal,
      barangay.renewalDeclined,
      barangay.total,
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
      `Total Applications: ${totalApplications}`,
      14,
      doc.autoTable.previous.finalY + 20
    );

    doc.save("Total_Count_Per_Brgy.pdf");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count per Barangay of Scholarship Application
          <button
            onClick={exportToPDF}
            className="btn btn-sm btn-error text-white"
          >
            Export to PDF
          </button>
        </div>

        <div className="flex border-b-2 border-black">
          <div className="w-1/3 font-bold text-center border-r-2 border-black py-2">
            Barangay
          </div>
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
            New
          </div>
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
            Declined
          </div>
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
            Renewal
          </div>
          <div className="w-1/6 font-bold text-center border-r-2 border-black py-2">
            Declined
          </div>
          <div className="w-1/6 font-bold text-center py-2">Total</div>
        </div>

        {currentBarangays.map((barangay, index) => (
          <div key={index} className="flex border-b-2 border-black">
            <div className="w-1/3 border-r-2 border-black py-2 px-2">
              {barangay.name}
            </div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">
              {barangay.new}
            </div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">
              {barangay.newDeclined}
            </div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">
              {barangay.renewal}
            </div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">
              {barangay.renewalDeclined}
            </div>
            <div className="w-1/6 text-center py-2">{barangay.total}</div>
          </div>
        ))}

        <div className="flex">
          <div className="w-1/2 border-r-2 border-black py-2 px-2">
            <span className="font-bold">Total Schools</span>
            <span className="float-right mr-8">{totalSchools}</span>
          </div>
          <div className="w-1/2 py-2 px-2">
            <span className="font-bold">Total Applications</span>
            <span className="float-right mr-8">{totalApplications}</span>
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
              className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100"
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

export default TotalCountPerBrgy;
