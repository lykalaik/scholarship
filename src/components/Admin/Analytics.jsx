import Sidebar from "./Sidebar";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState, useEffect } from 'react';
import supabase from "../supabaseClient";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [acceptedCount, setAccepted] = useState(0);
  const [pendingCount, setPending] = useState(0);
  const [renewalCount, setRenewal] = useState(0);
  const [completedCount, setCompleted] = useState(0);
  const [ongoingCount, setOnGoing] = useState(0);
  const [newCount, setNew] = useState(0);
  const [funding, setFunding] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  const [maleCount, setMale] = useState(0);
  const [femaleCount, setFemale] = useState(0);

  const [pieData1, setPieData1] = useState({
    labels: ['Accepted', 'Pending', 'Renewal', 'Completed', 'In Progress'],
    datasets: [{
      data: [acceptedCount, pendingCount, renewalCount, completedCount, ongoingCount],
      backgroundColor: ['#FF5733', '#FFC300', '#8E44AD', '#3498DB', '#2ECC71'],
      hoverBackgroundColor: ['#FF5733', '#FFC300', '#8E44AD', '#3498DB', '#2ECC71'],
    }],
  });

  const [pieData2, setPieData2] = useState({
    labels: ['Female', 'Male',],
    datasets: [{
      data: [femaleCount, maleCount,],
      backgroundColor: ['#FB80F7', '#73D3F5',],
      hoverBackgroundColor: ['#FB80F7', '#73D3F5'],
    }],
  });

  const [pieData3, setPieData3] = useState({
    labels: ['Renewal', 'New',],
    datasets: [{
      data: [renewalCount, newCount,],
      backgroundColor: ['#FF6347', '#32CD32'],
      hoverBackgroundColor: ['#FF6347', '#32CD32'],
    }],
  });

  const [pieData4, setPieData4] = useState({
    labels: ['Region 1', 'Region 2', 'Region 3'],
    datasets: [{
      data: [7, 5, 3],
      backgroundColor: ['#FF4500', '#DAA520', '#2E8B57'],
      hoverBackgroundColor: ['#FF4500', '#DAA520', '#2E8B57'],
    }],
  });

  const fetch_applicants = async () => {
    try {
      const { data, error } = await supabase.from("application").select("*");

      if (error) throw error;

      const accepted = data.filter(applicant => applicant.status === 'Accepted').length;
      const pending = data.filter(applicant => applicant.status === 'Pending').length;

      setAccepted(accepted);
      setPending(pending);

    } catch (error) {
      console.error("Error fetching applicants:", error.message);
    }
  };

  const fetch_funding = async () => {
    try {
      const { data, error } = await supabase.from("funding").select("*");
      if (error) throw error;
      
      setFunding(data);
  
      // Calculate the total amount using reduce
      const total = data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  
      // Set the total amount
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching applicants:", error.message);
    }
  };
  

  const fetch_scholars = async () => {
    try {
      const { data, error } = await supabase.from("scholars").select("*");

      if (error) throw error;

      const renewal = data.filter(applicant => applicant.scholarship_type === 'Renewal').length;
      const news = data.filter(applicant => applicant.scholarship_type === 'New').length;
      const completed = data.filter(applicant => applicant.status === 'Completed').length;
      const ongoing = data.filter(applicant => applicant.status === 'On-Going').length;
      const male = data.filter(applicant => applicant.sex === 'Male').length;
      const female = data.filter(applicant => applicant.sex === 'Female').length;

      setRenewal(renewal);
      setCompleted(completed);
      setOnGoing(ongoing);
      setFemale(female);
      setMale(male);
      setNew(news)

    } catch (error) {
      console.error("Error fetching scholars:", error.message);
    }
  };

  useEffect(() => {
    setPieData1({
      labels: ['Accepted', 'Pending', 'Renewal', 'Completed', 'In Progress'],
      datasets: [{
        data: [acceptedCount, pendingCount, renewalCount, completedCount, ongoingCount],
        backgroundColor: ['#FF5733', '#FFC300', '#8E44AD', '#3498DB', '#2ECC71'],
        hoverBackgroundColor: ['#FF5733', '#FFC300', '#8E44AD', '#3498DB', '#2ECC71'],
      }],
    });
  }, [acceptedCount, pendingCount, renewalCount, completedCount, ongoingCount]);

  useEffect(() => {
    setPieData2({
        labels: ['Female', 'Male',],
        datasets: [{
          data: [femaleCount, maleCount,],
          backgroundColor: ['#FB80F7', '#73D3F5',],
          hoverBackgroundColor: ['#FB80F7', '#73D3F5'],
      }],
    });
  }, [femaleCount, maleCount]);

  useEffect(() => {
    setPieData3({
        labels: ['Renewal', 'New',],
        datasets: [{
          data: [renewalCount, newCount,],
          backgroundColor: ['#FF6347', '#32CD32'],
          hoverBackgroundColor: ['#FF6347', '#32CD32'],
      }],
    });
  }, [femaleCount, maleCount]);

  useEffect(() => {
    fetch_applicants();
    fetch_scholars();
    fetch_funding();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <div className="border-2 border-gray-500 p-2 rounded-lg w-full h-80 mx-auto">
            <h2 className="text-sm font-bold text-center">Distribution of Scholars by Status</h2>
            <div className="w-full h-64 flex justify-center items-center">
              <Pie data={pieData1} />
            </div>
          </div>
          <div className="border-2 border-gray-500 p-2 rounded-lg w-full h-80 mx-auto">
            <h2 className="text-sm font-bold text-center">Distribution of Scholars by Gender</h2>
            <div className="w-full h-64 flex justify-center items-center">
              <Pie data={pieData2} />
            </div>
          </div>
          <div className="border-2 border-gray-500 p-2 rounded-lg w-full h-80 mx-auto">
            <h2 className="text-sm font-bold text-center">Distribution of Scholars by Category</h2>
            <div className="w-full h-64 flex justify-center items-center">
              <Pie data={pieData3} />
            </div>
          </div>
          <div className="border-2 border-gray-500 p-2 rounded-lg w-full h-80 mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Disbursements</h2>
            <p className="font-bold">Total: ₱{totalAmount}</p>
            </div>

            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full h-60 overflow-y-auto">
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">Scholar Name</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Date Funded</th>
                    </tr>
                    </thead>
                    <tbody >
                    {funding.map((item, index) => (
                        <tr key={index}>
                        <td className="border px-4 py-2">{item.full_name}</td>
                        <td className="border px-4 py-2">₱{item.amount}</td>
                        <td className="border px-4 py-2">{item.date_funded}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Analytics;
