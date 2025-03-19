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
      legend: {
        display: false, // Hide the legend at the top of the chart
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-3">
        Distribution of Scholars by Categories
      </h1>
      <div className="w-full flex justify-center items-center p-4">
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-6 space-y-6 sm:space-y-0 w-full">
          {/* Chart Container */}
          <div
            className="w-full sm:w-2/3 flex justify-center"
            style={{ height: "500px" }}
          >
            <Pie data={chartData} options={chartOptions} />
          </div>

          {/* Labels on the right */}
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

export default ScholarshipTypeChart;
