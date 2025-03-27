import { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import supabase from "../supabaseClient";

const TotalCountPerBrgy = ({ semester, year }) => {
  const [allBarangays, setAllBarangays] = useState([]);

  // Fetch and process data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch NEW Applications data
      const { data: applications } = await supabase
        .from("application")
        .select("barangay, status")
        .eq("semester", semester)
        .eq("school_year", year);

      // Fetch RENEWAL Scholars data
      const { data: scholarsData } = await supabase
        .from("scholarsData")
        .select("barangay, status")
        .eq("semester", semester)
        .eq("school_year", year);

      // Extract unique barangays from both datasets
      const barangaySet = new Set([
        ...applications.map((app) => app.barangay),
        ...scholarsData.map((sch) => sch.barangay),
      ]);

      const barangayCounts = Array.from(barangaySet).map((brgy) => {
        const newAccepted = applications.filter(
          (app) => app.barangay === brgy && app.status === "Accepted"
        ).length;
        const newDeclined = applications.filter(
          (app) => app.barangay === brgy && app.status === "Rejected"
        ).length;
        const renewalAccepted = scholarsData.filter(
          (sch) => sch.barangay === brgy && sch.status === "Accepted"
        ).length;
        const renewalDeclined = scholarsData.filter(
          (sch) => sch.barangay === brgy && sch.status === "Rejected"
        ).length;

        return {
          name: brgy,
          new: newAccepted,
          newDeclined,
          renewal: renewalAccepted,
          renewalDeclined,
          total: newAccepted + newDeclined + renewalAccepted + renewalDeclined,
        };
      });

      setAllBarangays(barangayCounts);
    };

    fetchData();
  }, [semester, year]);

  // Export to Excel function
  const exportToExcel = () => {
    const exportData = allBarangays.map((barangay) => ({
      Barangay: barangay.name,
      New: barangay.new,
      Declined: barangay.newDeclined,
      Renewal: barangay.renewal,
      DeclinedRenewal: barangay.renewalDeclined,
      Total: barangay.total,
    }));

    // Create a worksheet and book
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Barangay Data");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "Total_Count_Per_Barangay.xlsx");
  };

  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-black">
        <div className="text-center font-bold text-lg border-b-2 border-black py-2 px-3 flex justify-between tracking-wide">
          Total Count per Barangay of Scholarship Application
          <button
            onClick={exportToExcel}
            className="btn btn-sm btn-success text-white"
          >
            Export to Excel
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

        {allBarangays.map((barangay, index) => (
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
      </div>
    </div>
  );
};

export default TotalCountPerBrgy;