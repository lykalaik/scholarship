import { useState } from "react";
import { RiLogoutCircleRLine, RiLogoutBoxRFill } from "react-icons/ri";
import {
  FaUserPlus,
  FaMoneyCheckAlt,
  FaRedo,
  FaUserGraduate,
  FaNewspaper,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    const modal = document.getElementById("error_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("error_modal");
    if (modal) {
      modal.close();
    }
  };

  const sessionclear = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside className="bg-neutral text-white p-6 lg:fixed lg:h-screen lg:w-64 w-full flex flex-col min-h-0 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between lg:flex-col lg:items-center lg:text-center lg:mb-10">
          <img
            src="butuan.png"
            alt="butuan-logo"
            className="w-1/6 sm:w-1/8 md:w-1/10 lg:w-1/2 xl:w-1/3 2xl:w-1/4 object-contain lg:mb-2"
          />
          <h1 className="text-base lg:text-2xl font-bold sm:text-sm">
            Butuanon Online Scholarship
          </h1>
          <button
            className="lg:hidden text-2xl ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <nav
          className={`flex flex-col flex-1 tracking-wide font-semibold ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="space-y-2">
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaUserPlus className="mr-3" /> New Applicants
              </li>
            </NavLink>
            <NavLink
              to="/scholars"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaMoneyCheckAlt className="mr-3" /> Disbursements
              </li>
            </NavLink>
            <NavLink
              to="/renewals"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaRedo className="mr-3" /> Renewal Applicants
              </li>
            </NavLink>
            <NavLink
              to="/archive"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaUserGraduate className="mr-3" /> Scholars
              </li>
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaNewspaper className="mr-3" /> Announcements
              </li>
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                <FaChartBar className="mr-3" /> Analytics
              </li>
            </NavLink>
          </ul>

          <button
            onClick={() => openModal()}
            className="flex items-center text-sm hover:bg-gray-700 cursor-pointer rounded p-2 mt-1 w-full mb-4"
          >
            <RiLogoutBoxRFill className="mr-3" size={18} />
            Logout
          </button>
        </nav>

        <footer className="pt-4 border-t border-gray-600 text-center text-sm">
          <p>&copy; 2024 Butuanon Scholarship</p>
        </footer>
      </aside>

      <dialog id="error_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <h3 className="font-medium text-base">Confirm Action</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="flex justify-end content-end">
            <button
              className="btn btn-error text-white flex items-center"
              onClick={sessionclear}
            >
              <RiLogoutCircleRLine className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Sidebar;
