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
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('');
  const navigate = useNavigate();

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

  const signin = async () => {
    try {
      if (role === 'Scholar') {
        const { data, error } = await supabase
          .from('scholars')
          .select('*')
          .eq('email_address', email)
          .single();

       if (data && data.password === password && data.email_address === email){
          sessionStorage.setItem("scholarData", data.full_name);
          sessionStorage.setItem("email", data.email_address)
          navigate("/user");
       }
       else{
        alert("Invalid Credentials");
       }
    
      } else {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

          if (data && data.password === password && data.email === email){
            navigate("/admin");
           }
           else{
            alert("Invalid Credentials");
           }
   
      }
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during registration:', error.message);
    }
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
              <div className="mt-6">
                <div className="mb-4">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="example@gmail.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
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

                <div className="flex gap-3">
                  <select className="select select-bordered max-w-xs"  onChange={(e) => setRole(e.target.value)}>
                    <option disabled selected>
                      Login as:
                    </option>
                    <option>Scholar</option>
                    <option>Admin</option>
                  </select>
                  <button
                    className="w-full py-3 font-medium text-white bg-blue-800 border-blue-800 hover:bg-blue-700 rounded-lg"
                    onClick={signin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
