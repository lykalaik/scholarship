import { NavLink } from "react-router-dom";
import { HiDocumentCheck } from "react-icons/hi2";
import { FaInfoCircle } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { SiPivotaltracker } from "react-icons/si";
import { useState } from "react";

const Navbar = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
      setIsLogin(true); //pang reset into login
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content font-mono p-3">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost text-2xl font-extrabold">
            <img src="butuan.png" alt="butuan logo" height={50} width={55} />
            Butuanon Online Scholarship
          </NavLink>
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
                <IoNewspaper />
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apply"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "hover:translate-y-1 transition-transform"
                }
              >
                <HiDocumentCheck />
                Application
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/track"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "hover:translate-y-1 transition-transform"
                }
              >
                <SiPivotaltracker />
                Track
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "hover:translate-y-1 transition-transform"
                }
              >
                <FaInfoCircle />
                About Us
              </NavLink>
            </li>
            <li>
              <button
                className="text-white btn-neutral btn border-yellow-400 hover:border-yellow-400 hover:translate-y-1 transition-transform"
                onClick={openModal}
              >
                <MdManageAccounts size={22} />
                Account
              </button>
            </li>
          </ul>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>

          {isLogin ? (
            // Login Form
            <>
              <h3 className="font-bold text-lg flex gap-2">
                <IoMdLogIn size={30} />
                Login
              </h3>
              <form className="mt-6">
                <div className="mb-4">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="example@gmail.com"
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      className="grow"
                      required
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                      className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Show Password
                  </label>
                </div>

                <div className="flex gap-3">
                  <select className="select select-bordered max-w-xs">
                    <option disabled selected>
                      Login as:
                    </option>
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 font-medium text-white bg-blue-800 border-blue-800 hover:bg-blue-700 rounded-lg"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="divider before:bg-primary/20 after:bg-primary/20">
                or
              </div>
              <button
                className="w-full py-3 font-medium text-white bg-red-600 border-red-600 hover:bg-red-500 rounded-lg"
                onClick={toggleForm}
              >
                Create an Account
              </button>
            </>
          ) : (
            // Registration Form
            <>
              <h3 className="font-bold text-lg">Register</h3>
              <form className="mt-6">
                <div className="mb-4">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="email"
                      className="grow"
                      placeholder="Email Address"
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Create a password"
                      className="grow"
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="grow"
                      required
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      onChange={() => setShowPass(!showPass)}
                      className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Show Password
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="w-full py-3 font-medium text-white bg-blue-800 border-blue-800 hover:bg-blue-700 rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="divider before:bg-primary/20 after:bg-primary/20">
                or
              </div>
              <button
                className="w-full py-3 font-medium text-white bg-red-600 border-red-600 hover:bg-red-500 rounded-lg"
                onClick={toggleForm}
              >
                Already have an account? Sign In
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
