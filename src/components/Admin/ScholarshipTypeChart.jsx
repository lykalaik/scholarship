import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const ScholarshipTypeChart = () => {
  const [data, setData] = useState({
    renewal: 0,
    newScholars: 0,
  });

  const fetchData = async () => {
    const { data: scholars } = await supabase
      .from("scholars")
      .select("scholarship_type");

    setData({
      renewal: scholars.filter((s) => s.scholarship_type === "Renewal").length,
      newScholars: scholars.filter((s) => s.scholarship_type === "New").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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

export default ScholarshipTypeChart;
