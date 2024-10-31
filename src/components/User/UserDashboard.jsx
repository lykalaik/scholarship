import RenewApplication from "./RenewApplication";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { NavLink } from "react-router-dom";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const scholarName = sessionStorage.getItem("scholarData");

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase
      .from('funding')
      .select('*')
      .eq('full_name', scholarName);
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content font-mono p-3">
        <div className="flex-1">
          <div className="btn btn-ghost text-2xl font-extrabold">
            <img src="butuan.png" alt="butuan logo" height={50} width={55} />
            Butuanon Online Scholarship
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal text-lg font-bold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "hover:translate-y-1 transition-transform"
                }
              >
                <MdAnnouncement />
                Announcements
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 p-5">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl flex gap-2 font-bold">
            <RiFundsBoxFill className="mt-1" />
            Track Fundings
          </h1>
        </div>
        <div className="card rounded shadow-xl bordered p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Date Funded</th>
                  <th>Amount</th>
                  <th>Scholarship Type</th>
                </tr>
              </thead>
              <tbody>
              {userData.map((user) => (
                <tr>
                  <td>{user.date_funded}</td>
                  <td>${user.amount}</td>
                  <td>{user.scholarship_type}</td>
                </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <RenewApplication />
      </div>
    </>
  );
};

export default UserDashboard;
