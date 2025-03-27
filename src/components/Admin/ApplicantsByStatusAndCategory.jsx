import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import supabase from "../supabaseClient";
import { jsPDF } from "jspdf"; // Ensure you have jsPDF installed

const ApplicantsByStatusAndCategory = ({ semester, year }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({
    maleNew: 0,
    femaleNew: 0,
    othersNew: 0,
    maleRenewal: 0,
    femaleRenewal: 0,
    othersRenewal: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch new applicants from 'applications' table
      const { data: newApplicants, error: newError } = await supabase
        .from("application")
        .select("sex")
        .eq("status", "Accepted")
        .eq("semester", semester)
        .eq("school_year", year);

      // Fetch renewal applicants from 'scholarsData' table
      const { data: renewalApplicants, error: renewalError } = await supabase
        .from("scholarsData")
        .select("gender")
        .eq("category", "Renewal")
        .eq("status", "Accepted")
        .eq("semester", semester)
        .eq("school_year", year);

      if (newError || renewalError) {
        console.error("Error fetching data:", newError || renewalError);
        return;
      }

      // Count New Applicants
      let maleNew = 0,
        femaleNew = 0,
        othersNew = 0;
      newApplicants.forEach((app) => {
        if (app.sex === "Male") maleNew++;
        else if (app.sex === "Female") femaleNew++;
        else othersNew++;
      });

      // Count Renewal Applicants
      let maleRenewal = 0,
        femaleRenewal = 0,
        othersRenewal = 0;
      renewalApplicants.forEach((app) => {
        if (app.gender === "Male") maleRenewal++;
        else if (app.gender === "Female") femaleRenewal++;
        else othersRenewal++;
      });

      setChartData({
        maleNew,
        femaleNew,
        othersNew,
        maleRenewal,
        femaleRenewal,
        othersRenewal,
      });
    };

    fetchData();
  }, [semester, year]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["New Applicant", "Renewal Applicant"],
        datasets: [
          {
            label: "Male",
            data: [chartData.maleNew, chartData.maleRenewal],
            backgroundColor: "#4285F4",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Female",
            data: [chartData.femaleNew, chartData.femaleRenewal],
            backgroundColor: "#EA4335",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Others",
            data: [chartData.othersNew, chartData.othersRenewal],
            backgroundColor: "#9E9E9E",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 12 } },
            border: { color: "#E0E0E0" },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 2, font: { size: 12 } },
            grid: { color: "#E0E0E0" },
            border: { color: "#E0E0E0" },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              boxWidth: 12,
              padding: 15,
              font: { size: 11 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#333",
            bodyColor: "#333",
            borderColor: "#ccc",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [chartData]);

  const exportToPDF = async () => {
    try {
      // Validate chart container
      const canvas = chartRef.current;
      if (!canvas) {
        throw new Error("Canvas element not found");
      }

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title
      pdf.setFontSize(16);
      pdf.text(
        `Scholarship Applications by Status and Applicant Category (${semester} ${year})`,
        10,
        10
      );

      // Add chart image to PDF (centered, adjusted width)
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20; // Keep some margin
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add the chart image, starting 20mm from the top and 10mm from the left
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth, pdfHeight);

      // Save PDF with the filename including the semester and year
      pdf.save(
        `Scholarship_Applications_By_Status_and_Category_${semester}_${year}.pdf`
      );
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert(`Failed to export PDF: ${err.message}`);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between mb-2">
        <p className="text-center text-2xl font-semibold tracking-wide">
          Distribution of Scholarship Applications <br /> by Status and
          Applicant Category
        </p>
        <button className="btn btn-error btn-outline" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>
      <div className="bg-white rounded-lg p-4 h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default ApplicantsByStatusAndCategory;