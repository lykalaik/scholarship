import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import supabase from "../supabaseClient";

const TotalCountFundsPerSchool = ({ semester, year }) => {
  const [schoolData, setSchoolData] = useState([]);

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

  const totalFunds = `₱${schoolData
    .reduce((sum, school) => sum + school.totalFund, 0)
    .toLocaleString()}`;

  const exportToExcel = () => {
    // Prepare the data for export
    const exportData = schoolData.map((row) => ({
      No: row.number,
      School: row.school,
      Scholars: row.scholars,
      Funds: row.funds,
    }));

    // Create a worksheet and book
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "School Data");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "Total_Count_Funds_Per_School.xlsx");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="tracking-wide text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between">
          Total Count of Scholars & Funds per School
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
            School
          </div>
          <div className="w-1/4 font-bold text-center border-r-2 border-black py-2">
            Scholars
          </div>
          <div className="w-1/4 font-bold text-center py-2">Funds</div>
        </div>

        {schoolData.map((school, index) => (
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
            <span className="float-right mr-8">{schoolData.length}</span>
          </div>
          <div className="w-1/2 py-2 px-2">
            <span className="font-bold">Total Funds</span>
            <span className="float-right mr-8">{totalFunds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCountFundsPerSchool;