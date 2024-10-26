import RenewApplication from "./RenewApplication";
import { RiFundsBoxFill } from "react-icons/ri";
import { MdAnnouncement } from "react-icons/md";
import { NavLink } from "react-router-dom";

const UserDashboard = () => {
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
          <div className="flex gap-3">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                School Year:
              </option>
              <option>School Year 1</option>
              <option>School Year 2</option>
            </select>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Semester:
              </option>
              <option>1st</option>
              <option>2nd</option>
            </select>
            <button className="btn btn-primary text-white">Search</button>
          </div>
        </div>
        <div className="card rounded shadow-xl bordered p-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Availed Scholarships</th>
                  <th>Semester</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>School Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CHED</td>
                  <td>1st</td>
                  <td>$21,000</td>
                  <td>05/05/2024</td>
                  <td>2020 - 2024</td>
                </tr>
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
