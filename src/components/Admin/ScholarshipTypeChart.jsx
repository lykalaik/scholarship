import { useState, useEffect, useRef } from "react";
import supabase from "../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import jsPDF from "jspdf";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const ScholarshipTypeChart = ({ semester, year }) => {
  const chartContainerRef = useRef(null);
  const [data, setData] = useState({
    renewal: 0,
    newScholars: 0,
  });

  const fetchData = async () => {
    const { data: scholars } = await supabase
      .from("scholarsData")
      .select("category")
      .eq("semester", semester)
      .eq("school_year", year);

    setData({
      renewal: scholars.filter((s) => s.category === "Renewal").length,
      newScholars: scholars.filter((s) => s.category === "New").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, [semester, year]);

  const chartData = {
    labels: ["Renewal", "New"],
    datasets: [
      {
        data: [data.renewal, data.newScholars],
        backgroundColor: ["#FF6347", "#32CD32"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => `${value}`,
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const exportToPDF = async () => {
    try {
      // Validate chart container
      const chartContainer = chartContainerRef.current;
      if (!chartContainer) {
        throw new Error("Chart container not found");
      }

      // Find the canvas element specifically
      const canvas = chartContainer.querySelector("canvas");
      if (!canvas) {
        throw new Error("Canvas element not found");
      }

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title
      pdf.setFontSize(16);
      pdf.text(`Scholarship Type Distribution (${semester} ${year})`, 10, 10);

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF, centering it
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth, pdfHeight);

      // Save PDF
      pdf.save(`Scholarship_Type_${semester}_${year}.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert(`Failed to export PDF: ${err.message}`);
    }
  };

  return (
    <div ref={chartContainerRef} className="w-full">
      <div className="flex justify-between mb-2">
        <h1 className="text-center text-3xl font-semibold mb-3 tracking-wider">
          Distribution of Scholars by Categories
        </h1>
        <button onClick={exportToPDF} className="btn btn-error btn-outline">
          Export to PDF
        </button>
      </div>

      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full" style={{ height: "500px" }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default ScholarshipTypeChart;