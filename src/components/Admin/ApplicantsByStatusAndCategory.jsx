import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ApplicantsByStatusAndCategory = () => {
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
        labels: ["New Applicant", "Renewal Applicant"],
        datasets: [
          {
            label: "Male",
            data: [8, 12],
            backgroundColor: "#4285F4",
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
          {
            label: "Female",
            data: [3, 1],
            backgroundColor: "#EA4335",
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
              drawBorder: true,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
            border: {
              color: "#E0E0E0",
            },
          },
          y: {
            beginAtZero: true,
            max: 14,
            ticks: {
              stepSize: 2,
              font: {
                size: 12,
              },
            },
            grid: {
              color: "#E0E0E0",
            },
            border: {
              color: "#E0E0E0",
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 11,
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
        <p className="text-center text-2xl font-semibold mb-3">
          Distribution of Scholarship Applications by Approval Status and
          Applicant Category
        </p>
        <div className="bg-white rounded-lg p-4 h-[400px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default ApplicantsByStatusAndCategory;
