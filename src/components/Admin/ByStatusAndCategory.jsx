import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import supabase from "../supabaseClient";

const ByStatusAndCategory = ({ semester, year }) => {
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
        .select("category, status") // Make sure you have status field
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

    // Initialize counts per status per category
    const countNew = {};
    const countRenewal = {};

    categories.forEach((status) => {
      countNew[status] = 0;
      countRenewal[status] = 0;
    });

    // Count scholars based on status and category
    scholarsData.forEach((scholar) => {
      if (categories.includes(scholar.status)) {
        if (scholar.category === "New") {
          countNew[scholar.status]++;
        } else if (scholar.category === "Renewal") {
          countRenewal[scholar.status]++;
        }
      }
    });

    // Prepare chart data
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "New",
            data: categories.map((cat) => countNew[cat]),
            backgroundColor: "#FFEB3B",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Renewal",
            data: categories.map((cat) => countRenewal[cat]),
            backgroundColor: "#FF9800",
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [scholarsData]);

  return (
    <div className="w-full mx-auto p-4">
      <p className="text-center text-3xl font-semibold mb-3">
        Distribution of Scholars by Status and Category
      </p>
      <div className="bg-white rounded-lg p-4 h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default ByStatusAndCategory;
