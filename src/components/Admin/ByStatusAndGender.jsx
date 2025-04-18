import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import supabase from "../supabaseClient";
import { jsPDF } from "jspdf"; // Ensure you have jsPDF installed

const ByStatusAndGender = ({ semester, year }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [scholarsData, setScholarsData] = useState([]);

  const categories = [
    "In Progress",
    "Pending",
    "Renewal",
    "Completed",
    "On-Going",
  ];

  useEffect(() => {
    const fetchScholars = async () => {
      const { data: scholars, error } = await supabase
        .from("scholarsData")
        .select("status, gender")
        .eq("semester", semester)
        .eq("school_year", year);

      if (error) {
        console.error("Error fetching scholars data:", error);
        return;
      }

      setScholarsData(scholars);
    };

    fetchScholars();
  }, [semester, year]);

  useEffect(() => {
    if (!scholarsData.length) return;

    // Initialize counters for each gender per category
    const countMale = {};
    const countFemale = {};
    const countOthers = {};

    categories.forEach((status) => {
      countMale[status] = 0;
      countFemale[status] = 0;
      countOthers[status] = 0;
    });

    // Count based on gender
    scholarsData.forEach((scholar) => {
      if (categories.includes(scholar.status)) {
        if (scholar.gender === "Male") countMale[scholar.status]++;
        else if (scholar.gender === "Female") countFemale[scholar.status]++;
        else countOthers[scholar.status]++;
      }
    });

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Male",
            data: categories.map((cat) => countMale[cat]),
            backgroundColor: "#2196F3",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Female",
            data: categories.map((cat) => countFemale[cat]),
            backgroundColor: "#F44336",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Others",
            data: categories.map((cat) => countOthers[cat]),
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
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, font: { size: 12 } },
            grid: { color: "#E0E0E0" },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, padding: 20, font: { size: 12 } },
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
  }, [scholarsData]);

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
        `Scholar Distribution by Category and Gender (${semester} ${year})`,
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
        `Scholar_Distribution_By_Status_and_Gender_${semester}_${year}.pdf`
      );
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert(`Failed to export PDF: ${err.message}`);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="justify-between flex mb-2">
        <p className="text-center text-3xl font-semibold tracking-wide">
          Distribution of Scholars by Category and Gender
        </p>
        <button className="btn btn-error btn-outline" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ByStatusAndGender;