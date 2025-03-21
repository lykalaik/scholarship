import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TotalCountFundsPerSemester = () => {
  // Sample data
  const fundsData = [
    {
      scholars: 220,
      barangays: 54,
      schools: 44,
      firstSem: "₱500,000.00",
      secondSem: "₱380,000.00",
      total: "₱880,000.00",
      academicYear: "2021-2022",
    },
    {
      scholars: 204,
      barangays: 45,
      schools: 37,
      firstSem: "₱488,000.00",
      secondSem: "₱368,000.00",
      total: "₱856,000.00",
      academicYear: "2020-2021",
    },
    {
      scholars: 200,
      barangays: 39,
      schools: 30,
      firstSem: "₱464,000.00",
      secondSem: "₱344,000.00",
      total: "₱808,000.00",
      academicYear: "2019-2020",
    },
  ];

  // Function to generate and save the PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Total Count of Funds per Semester", 14, 15);

    // Define table columns and rows
    const columns = [
      "Scholars",
      "Barangays",
      "Schools",
      "1st Sem",
      "2nd Sem",
      "Total",
      "Academic Year",
    ];
    const rows = fundsData.map((row) => [
      row.scholars,
      row.barangays,
      row.schools,
      row.firstSem,
      row.secondSem,
      row.total,
      row.academicYear,
    ]);

    // Generate table
    doc.autoTable({
      startY: 20,
      head: [columns],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    // Save the PDF
    doc.save("Total_Funds_Report.pdf");
  };

  return (
    <div className="w-full mx-auto">
      {/* Table UI */}
      <div className="border-2 border-black">
        {/* Main title */}
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Funds per Semester
          <button
            onClick={generatePDF}
            className="btn btn-sm btn-error text-white"
          >
            Save as PDF
          </button>
        </div>

        {/* Table header */}
        <div className="flex border-b-2 border-black">
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            Scholars
          </div>
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            Barangays
          </div>
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            Schools
          </div>
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            1st Sem
          </div>
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            2nd Sem
          </div>
          <div className="flex-1 font-bold text-center border-r-2 border-black py-2">
            Total
          </div>
          <div className="flex-1 font-bold text-center py-2">Academic Year</div>
        </div>

        {/* Table rows */}
        {fundsData.map((row, index) => (
          <div
            key={index}
            className={`flex ${
              index < fundsData.length - 1 ? "border-b-2 border-black" : ""
            }`}
          >
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.scholars}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2 text-blue-600">
              {row.barangays}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2 text-blue-600">
              {row.schools}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.firstSem}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.secondSem}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.total}
            </div>
            <div className="flex-1 text-center py-2">{row.academicYear}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCountFundsPerSemester;
