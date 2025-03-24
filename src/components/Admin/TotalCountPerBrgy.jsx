import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TotalCountPerBrgy = ({ semester, year }) => {
  const [allBarangays, setAllBarangays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  // Pagination
  const totalPages = Math.ceil(allBarangays.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentBarangays = allBarangays.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Total Count per Barangay of Scholarship Application", 14, 10);

    const tableColumn = ["Barangay", "New", "Declined", "Renewal", "Declined", "Total"];
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
            <div className="w-1/3 border-r-2 border-black py-2 px-2">{barangay.name}</div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">{barangay.new}</div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">{barangay.newDeclined}</div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">{barangay.renewal}</div>
            <div className="w-1/6 text-center border-r-2 border-black py-2">{barangay.renewalDeclined}</div>
            <div className="w-1/6 text-center py-2">{barangay.total}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded bg-white hover:bg-gray-100">
          Previous
        </button>
        <div className="flex space-x-1">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => goToPage(index + 1)} className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100">
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded bg-white hover:bg-gray-100">
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
