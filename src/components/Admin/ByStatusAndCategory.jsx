import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ByStatusAndCategory = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get the canvas context
    const ctx = chartRef.current.getContext("2d");

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Accepted in\nProgress",
          "Pending\nApplication",
          "Renewal\nCandidate",
          "Currently\nCompleted",
          "In Progress",
        ],
        datasets: [
          {
            label: "New",
            data: [3, 2, 10, 5, 8],
            backgroundColor: "#FFEB3B",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Renewal",
            data: [3, 1, 8, 3, 10],
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
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 12,
            ticks: {
              stepSize: 2,
              font: {
                size: 12,
              },
            },
            grid: {
              color: "#E0E0E0",
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
              },
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

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="w-full mx-auto p-4">
        <p className="text-center text-3xl font-semibold mb-3">
          Distribution of Scholars by Status and Category
        </p>
        <div className="bg-white rounded-lg p-4 h-[400px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default ByStatusAndCategory;
