import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import supabase from "../supabaseClient";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const ScholarStatusChart = () => {
  const [data, setData] = useState({
    accepted: 0,
    pending: 0,
    renewal: 0,
    completed: 0,
    ongoing: 0,
  });

  const fetchData = async () => {
    const { data: applications } = await supabase
      .from("application")
      .select("status");

    setData({
      accepted: applications.filter((a) => a.status === "Accepted").length,
      pending: applications.filter((a) => a.status === "Pending").length,
      renewal: applications.filter((a) => a.status === "Renewal").length,
      completed: applications.filter((a) => a.status === "Completed").length,
      ongoing: applications.filter((a) => a.status === "Ongoing").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        backgroundColor: [
          "#FF5733",
          "#FFC300",
          "#8E44AD",
          "#3498DB",
          "#2ECC71",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable the default aspect ratio and give flexibility
    plugins: {
      datalabels: {
        display: true, // Enable data labels to be shown
        color: "#fff", // Text color for the data labels
        font: {
          size: 14, // Size of the text
          weight: "bold",
        },
        formatter: (value) => `${value}`, // Formatter to show just the value (you can customize this)
      },
      tooltip: {
        enabled: false, // Disable the hover tooltip
      },
    },
  };

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScholarStatusChart;
