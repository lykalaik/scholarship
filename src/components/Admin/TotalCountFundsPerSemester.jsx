import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import supabase from "../supabaseClient";

const TotalCountFundsPerSemester = () => {
  const [fundsData, setFundsData] = useState([]);

  const fetchFundsData = async () => {
    try {
      const { data, error } = await supabase
        .from("scholarsData")
        .select("school_year, semester, fund, barangay, school, name");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      // Group data by academic_year
      const groupedData = {};
      data.forEach((item) => {
        const year = item.school_year;
        if (!groupedData[year]) {
          groupedData[year] = {
            nameSet: new Set(),
            barangaysSet: new Set(),
            schoolsSet: new Set(),
            firstSem: 0,
            secondSem: 0,
            totalFund: 0,
          };
        }

        groupedData[year].nameSet.add(item.name); 
        groupedData[year].barangaysSet.add(item.barangay);
        groupedData[year].schoolsSet.add(item.school);

        if (item.semester === "1st sem") {
          groupedData[year].firstSem += Number(item.fund) || 0;
        } else if (item.semester === "2nd sem") {
          groupedData[year].secondSem += Number(item.fund) || 0;
        }
        
        groupedData[year].totalFund += Number(item.fund) || 0;
      });

      const finalData = Object.entries(groupedData).map(([year, value]) => ({
        academicYear: year,
        scholars: value.nameSet.size,
        barangays: value.barangaysSet.size,
        schools: value.schoolsSet.size,
        firstSem: value.firstSem,
        secondSem: value.secondSem,
        total: value.totalFund,
      }));

      setFundsData(finalData.sort((a, b) => b.academicYear.localeCompare(a.academicYear)));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFundsData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Total Count of Funds per Semester", 14, 15);

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
      `₱${row.firstSem.toLocaleString()}`,
      `₱${row.secondSem.toLocaleString()}`,
      `₱${row.total.toLocaleString()}`,
      row.academicYear,
    ]);

    doc.autoTable({
      startY: 20,
      head: [columns],
      body: rows,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    doc.save("Total_Funds_Report.pdf");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Funds per Semester
          <button onClick={generatePDF} className="btn btn-sm btn-error text-white">
            Save as PDF
          </button>
        </div>

        {/* Table Header */}
        <div className="flex border-b-2 border-black">
          {["Scholars", "Barangays", "Schools", "1st Sem", "2nd Sem", "Total", "Academic Year"].map((header, i) => (
            <div key={i} className={`flex-1 font-bold text-center ${i < 6 ? "border-r-2 border-black" : ""} py-2`}>
              {header}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {fundsData.map((row, index) => (
          <div key={index} className={`flex ${index < fundsData.length - 1 ? "border-b-2 border-black" : ""}`}>
            <div className="flex-1 text-center border-r-2 border-black py-2">{row.scholars}</div>
            <div className="flex-1 text-center border-r-2 border-black py-2">{row.barangays}</div>
            <div className="flex-1 text-center border-r-2 border-black py-2">{row.schools}</div>
            <div className="flex-1 text-center border-r-2 border-black py-2">₱{row.firstSem.toLocaleString()}</div>
            <div className="flex-1 text-center border-r-2 border-black py-2">₱{row.secondSem.toLocaleString()}</div>
            <div className="flex-1 text-center border-r-2 border-black py-2">₱{row.total.toLocaleString()}</div>
            <div className="flex-1 text-center py-2">{row.academicYear}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCountFundsPerSemester;
