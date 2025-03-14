import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const GenderDistributionChart = () => {
  const [data, setData] = useState({
    male: 0,
    female: 0,
  });

  const fetchData = async () => {
    const { data: scholars } = await supabase.from("scholars").select("sex");

    setData({
      male: scholars.filter((s) => s.sex === "Male").length,
      female: scholars.filter((s) => s.sex === "Female").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [data.female, data.male],
        backgroundColor: ["#FB80F7", "#73D3F5"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        display: true, // Show data labels directly on the chart
        color: "#fff", // Text color
        font: {
          size: 14, // Text size
          weight: "bold", // Text weight
        },
        formatter: (value) => `${value}`, // Display just the value
      },
      tooltip: {
        enabled: false, // Disable hover tooltip
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default GenderDistributionChart;
