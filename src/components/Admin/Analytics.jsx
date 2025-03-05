import Sidebar from "./Sidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useState, useEffect, useMemo } from "react";
import supabase from "../supabaseClient";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [data, setData] = useState({
    accepted: 0,
    pending: 0,
    renewal: 0,
    completed: 0,
    ongoing: 0,
    newScholars: 0,
    male: 0,
    female: 0,
    funding: [],
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [applications, scholars, funding] = await Promise.all([
        supabase.from("application").select("status"),
        supabase.from("scholars").select("scholarship_type, status, sex"),
        supabase.from("funding").select("full_name, amount, date_funded"),
      ]);

      if (applications.error || scholars.error || funding.error)
        throw new Error("Data fetch error");

      setData({
        accepted: applications.data.filter((a) => a.status === "Accepted")
          .length,
        pending: applications.data.filter((a) => a.status === "Pending").length,
        renewal: scholars.data.filter((s) => s.scholarship_type === "Renewal")
          .length,
        newScholars: scholars.data.filter((s) => s.scholarship_type === "New")
          .length,
        completed: scholars.data.filter((s) => s.status === "Completed").length,
        ongoing: scholars.data.filter((s) => s.status === "On-Going").length,
        male: scholars.data.filter((s) => s.sex === "Male").length,
        female: scholars.data.filter((s) => s.sex === "Female").length,
        funding: funding.data,
        totalAmount: funding.data.reduce(
          (sum, f) => sum + parseFloat(f.amount || 0),
          0
        ),
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartOptions = useMemo(
    () => ({
      plugins: { legend: { position: "left", labels: { font: { size: 18 } } } },
      maintainAspectRatio: false,
    }),
    []
  );

  const createChartData = (labels, values, colors) => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 ml-0 lg:ml-64 transition-all duration-300 overflow-y-auto">
        {[
          [
            "Distribution of Scholars by Status",
            ["Accepted", "Pending", "Renewal", "Completed", "In Progress"],
            [
              data.accepted,
              data.pending,
              data.renewal,
              data.completed,
              data.ongoing,
            ],
            ["#FF5733", "#FFC300", "#8E44AD", "#3498DB", "#2ECC71"],
          ],
          [
            "Distribution of Scholars by Gender",
            ["Female", "Male"],
            [data.female, data.male],
            ["#FB80F7", "#73D3F5"],
          ],
          [
            "Distribution of Scholars by Category",
            ["Renewal", "New"],
            [data.renewal, data.newScholars],
            ["#FF6347", "#32CD32"],
          ],
        ].map(([title, labels, values, colors], index) => (
          <div
            key={index}
            className="border border-gray-500 p-8 rounded-xl bg-white shadow-2xl h-[90vh] flex flex-col justify-center items-center mb-8"
          >
            <h2 className="text-2xl font-bold mb-8">{title}</h2>
            <div className="w-full h-[85vh] flex justify-center items-center">
              <Pie
                data={createChartData(labels, values, colors)}
                options={chartOptions}
              />
            </div>
          </div>
        ))}
        <div className="border border-gray-500 p-8 rounded-xl bg-white shadow-2xl h-[90vh] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Disbursements</h2>
            <p className="font-bold text-xl">Total: ₱{data.totalAmount}</p>
          </div>
          <div className="w-full h-[85vh] overflow-y-auto">
            <table className="table-auto w-full border-collapse border-2 border-gray-500">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border-2 border-gray-500 px-6 py-3">
                    Scholar Name
                  </th>
                  <th className="border-2 border-gray-500 px-6 py-3">Amount</th>
                  <th className="border-2 border-gray-500 px-6 py-3">
                    Date Funded
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.funding.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border-2 border-gray-500 px-6 py-3">
                      {item.full_name}
                    </td>
                    <td className="border-2 border-gray-500 px-6 py-3">
                      ₱{item.amount}
                    </td>
                    <td className="border-2 border-gray-500 px-6 py-3">
                      {item.date_funded}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
