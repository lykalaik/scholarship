import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const GenderDistributionChart = ({ semester, year }) => {
  const [data, setData] = useState({
    male: 0,
    female: 0,
  });

  const fetchData = async () => {
    const { data: scholars } = await supabase.from("scholarsData").select("gender")
    .eq("semester", semester)
    .eq("school_year", year);

    setData({
      male: scholars.filter((s) => s.gender === "Male").length,
      female: scholars.filter((s) => s.gender === "Female").length,
    });
  };

  useEffect(() => {
    fetchData();
  }, [semester, year]);

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
        Distribution of Scholars by Gender
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

export default GenderDistributionChart;
