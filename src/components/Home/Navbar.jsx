import { NavLink } from "react-router-dom";
import { HiDocumentCheck } from "react-icons/hi2";
import { FaInfoCircle } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { SiPivotaltracker } from "react-icons/si";
import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
      // setIsLogin(true);
    }
  };

  const signin = async () => {
    setLoading(true);
    try {
      if (role === "Scholar") {
        const { data } = await supabase
          .from("scholars")
          .select("*")
          .eq("email_address", email)
          .single();
        if (data && data.password === password) {
          sessionStorage.setItem("role", "Scholar");
          sessionStorage.setItem("scholarData", data.full_name);
          sessionStorage.setItem("email", data.email_address);
          navigate("/user");
        } else {
          alert("Invalid Credentials");
        }
      } else {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();
        if (data && data.password === password) {
          sessionStorage.setItem("role", "Admin");
          navigate("/admin");
        } else {
          alert("Invalid Credentials");
        }
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during registration:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content flex items-center justify-between">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="btn btn-ghost lg:text-xl font-medium flex items-center"
          >
            <img src="butuan.png" alt="butuan logo" className="h-10 w-10" />
            <span className="font-semibold tracking-wider">
              Butuanon Online Scholarship
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex space-x-4">
          <ul className="menu menu-horizontal text-base font-semibold tracking-wide">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "hover:text-yellow-300 hover:translate-y-1 transition-transform"
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
                    : "hover:text-yellow-300 hover:translate-y-1 transition-transform"
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
                    : "hover:text-yellow-300 hover:translate-y-1 transition-transform"
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
                    : "hover:text-yellow-300 hover:translate-y-1 transition-transform"
                }
              >
                <FaInfoCircle />
                About Us
              </NavLink>
            </li>
            <li className="border-r mr-5 text-neutral">.</li>
            <li className="mr-2">
              <button
                className="btn btn-sm mt-1 border-yellow-400 hover:border-yellow-400"
                onClick={openModal}
              >
                <MdManageAccounts size={22} />
                Login
              </button>
            </li>
          </ul>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral text-neutral-content p-4 flex flex-col space-y-4">
          <NavLink
            to="/"
            className="hover:text-yellow-300 flex gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <IoNewspaper className="mt-1" /> News
          </NavLink>
          <NavLink
            to="/apply"
            className="hover:text-yellow-300 flex gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HiDocumentCheck className="mt-1" /> Application
          </NavLink>
          <NavLink
            to="/track"
            className="hover:text-yellow-300 flex gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <SiPivotaltracker className="mt-1" /> Track
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-yellow-300 flex gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaInfoCircle className="mt-1" /> About Us
          </NavLink>
          <NavLink
            className="hover:text-yellow-300 flex gap-2"
            onClick={() => {
              openModal();
              setIsMobileMenuOpen(false);
            }}
          >
            <MdManageAccounts className="mt-1" /> Login
          </NavLink>
        </div>
      )}

      {/* Modal */}
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
          <h3 className="font-bold tracking-wider flex gap-2">
            <IoMdLogIn size={30} />
            Login
          </h3>
          <div className="mt-6">
            <div className="mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  className="grow"
                  required
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex gap-2">
              <select
                className="select select-bordered max-w-xs"
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled selected>
                  Login as:
                </option>
                <option>Scholar</option>
                <option>Admin</option>
              </select>
              <button
                className="w-full py-3 font-medium text-white bg-neutral hover:bg-neutral rounded-lg tracking-wide"
                onClick={signin}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
