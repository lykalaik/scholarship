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
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-3">
        Distribution of Scholar by Status
      </h1>
      <div className="w-full flex justify-center items-center p-4">
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-6 space-y-6 sm:space-y-0 w-full">
          <div
            className="w-full sm:w-2/3 flex justify-center"
            style={{ height: "500px" }}
          >
            <Pie data={chartData} options={chartOptions} />
          </div>

          <div className="w-full sm:w-1/3 h-full flex flex-col justify-center space-y-4 pl-6">
            {chartData.labels.map((label, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      chartData.datasets[0].backgroundColor[index],
                  }}
                ></div>
                <span className="font-semibold text-lg">
                  {label}:{" "}
                  <span className="text-xl">
                    {chartData.datasets[0].data[index]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

export default ScholarStatusChart;
