import { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <aside className="bg-neutral text-white p-6 lg:fixed lg:h-full lg:w-64 w-full">
        <img
          src="butuan.png"
          alt="butuan-logo"
          className="hidden lg:block w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 object-contain"
        />

        <div className="flex justify-between items-center lg:block">
          <h1 className="hidden lg:block text-2xl font-bold mb-2 lg:mb-10">
            Butuanon Online Scholarship
          </h1>
          <img
            src="butuan.png"
            alt="butuan-logo"
            className="block lg:hidden w-1/6 sm:w-1/8 md:w-1/10 object-contain"
          />
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <nav
          className={`flex flex-col lg:flex ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="space-y-2">
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer hover:translate-y-1 transition-transform">
                New Applicants
              </li>
            </NavLink>

            <NavLink
              to="/scholars"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer hover:translate-y-1 transition-transform">
                Scholars
              </li>
            </NavLink>

            <NavLink
              to="/renewals"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer hover:translate-y-1 transition-transform">
                Renewal Applicants
              </li>
            </NavLink>
            <NavLink
              to="/archive"
              className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
            >
              <li className="p-2 hover:bg-gray-700 rounded cursor-pointer hover:translate-y-1 transition-transform">
                Archive
              </li>
            </NavLink>
          </ul>
          <button
            onClick={() => openModal()}
            className="hidden lg:flex items-center text-sm hover:bg-gray-700 cursor-pointer rounded p-2 mt-10"
          >
            <span className="mr-2">
              <RiLogoutBoxRFill size={18} />
            </span>
            Logout
          </button>
        </nav>
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
          <h3 className="font-bold text-lg">Confirm Action</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="flex justify-end content-end">
            <button className="btn btn-error text-white">
              <RiLogoutCircleRLine />
              Log Out
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Sidebar;
