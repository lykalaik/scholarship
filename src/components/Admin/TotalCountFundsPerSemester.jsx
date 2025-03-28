import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
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
  
      // Filter out records with null or empty semester values
      const filteredData = data.filter(item => item.semester && item.semester.trim() !== "");
  
      // Group data by academic_year
      const groupedData = {};
      filteredData.forEach((item) => {
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
  
        const fundAmount = Number(item.fund) || 0;
        if (item.semester.trim().toLowerCase() === "1st sem") {
          groupedData[year].firstSem += fundAmount;
        } else if (item.semester.trim().toLowerCase() === "2nd sem") {
          groupedData[year].secondSem += fundAmount;
        }
  
        groupedData[year].totalFund += fundAmount;
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
  
      setFundsData(
        finalData.sort((a, b) => b.academicYear.localeCompare(a.academicYear))
      );
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  

  const exportToExcel = () => {
    // Prepare the data for export
    const exportData = fundsData.slice(0, fundsData.length - 1).map((row) => ({
      Scholars: row.scholars,
      Barangays: row.barangays,
      Schools: row.schools,
      "1st Sem": `₱${row.firstSem.toLocaleString()}`,
      "2nd Sem": `₱${row.secondSem.toLocaleString()}`,
      Total: `₱${row.total.toLocaleString()}`,
      "Academic Year": row.academicYear,
    }));

    // Create a worksheet and book
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Funds Data");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "Total_Count_Funds_Per_Semester.xlsx");
  };

  useEffect(() => {
    fetchFundsData();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="tracking-wide text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Funds per Semester
          <button
            onClick={exportToExcel}
            className="btn btn-sm btn-success text-white"
          >
            Export to Excel
          </button>
        </div>

        {/* Table Header */}
        <div className="flex border-b-2 border-black">
          {[
            "Scholars",
            "Barangays",
            "Schools",
            "1st Sem",
            "2nd Sem",
            "Total",
            "Academic Year",
          ].map((header, i) => (
            <div
              key={i}
              className={`flex-1 font-bold text-center ${
                i < 6 ? "border-r-2 border-black" : ""
              } py-2`}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Table Rows */}
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
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.barangays}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              {row.schools}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              ₱{row.firstSem.toLocaleString()}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              ₱{row.secondSem.toLocaleString()}
            </div>
            <div className="flex-1 text-center border-r-2 border-black py-2">
              ₱{row.total.toLocaleString()}
            </div>
            <div className="flex-1 text-center py-2">{row.academicYear}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCountFundsPerSemester;