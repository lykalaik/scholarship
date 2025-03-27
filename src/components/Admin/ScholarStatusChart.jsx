import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import supabase from "../supabaseClient";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const ScholarStatusChart = ({ semester, year }) => {
  const chartContainerRef = useRef(null);
  const [data, setData] = useState({
    accepted: 0,
    pending: 0,
    renewal: 0,
    completed: 0,
    ongoing: 0,
  });

  const fetchData = async () => {
    try {
      const { data: applications } = await supabase
        .from("scholarsData")
        .select("status")
        .eq("semester", semester)
        .eq("school_year", year);

      setData({
        accepted: applications.filter((a) => a.status === "Accepted").length,
        pending: applications.filter((a) => a.status === "Pending").length,
        renewal: applications.filter((a) => a.status === "Renewal").length,
        completed: applications.filter((a) => a.status === "Completed").length,
        ongoing: applications.filter((a) => a.status === "On-Going").length,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [semester, year]);

  const colors = [
    "rgb(255, 87, 51)", // Tomato red
    "rgb(255, 195, 0)", // Sunflower yellow
    "rgb(142, 68, 173)", // Royal purple
    "rgb(52, 152, 219)", // Bright blue
    "rgb(46, 204, 113)", // Emerald green
  ];

  const chartData = {
    labels: ["Accepted", "Pending", "Renewal", "Completed", "Ongoing"],
    datasets: [
      {
        data: [
          data.accepted,
          data.pending,
          data.renewal,
          data.completed,
          data.ongoing,
        ],
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: { size: 14, weight: "bold" },
        formatter: (value) => `${value}`,
      },
      tooltip: { enabled: true },
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
      pdf.text(`Scholar Status Distribution (${semester} ${year})`, 10, 10);

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF, centering it
      pdf.addImage(imgData, "PNG", 10, 20, pdfWidth, pdfHeight);

      // Save PDF
      pdf.save(`Scholar_Status_${semester}_${year}.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert(`Failed to export PDF: ${err.message}`);
    }
  };

  return (
    <div ref={chartContainerRef} className="w-full">
      <div className="flex justify-between mb-2">
        <h1 className="text-center text-3xl font-semibold mb-3 tracking-wider">
          Distribution of Scholar by Status
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

export default ScholarStatusChart;