import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [state, setState] = useState("Sign Up");

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   return (
      <div className="flex  items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
         <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="absolute top-5 left-5 w-28 sm:w-32 cursor-pointer sm:left-20"
         />
         <div className="bg-slate-900 text-center rounded-lg  p-10 shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
            <h2 className="text-3xl font-semibold mb-3 text-white ">
               {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>
            <p className=" text-sm mb-6">
               {state === "Sign Up"
                  ? "Create your account"
                  : "Login to your account"}
            </p>

            <form>
               {state === "Sign Up" && (
                  <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
                     <img src={assets.person_icon} alt="person" />
                     <input
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                        }}
                        className="bg-transparent outline-0 text-white"
                        type="text"
                        placeholder="Full Name"
                        required
                     />
                  </div>
               )}

               <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
                  <img src={assets.mail_icon} alt="mail" />
                  <input
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                     className="bg-transparent outline-0 text-white"
                     type="email"
                     placeholder="Email "
                     required
                  />
               </div>

               <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C] flex items-center gap-3">
                  <img src={assets.lock_icon} alt="person" />
                  <input
                     value={password}
                     onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                     className="bg-transparent outline-0 text-white"
                     type="password"
                     placeholder="Password"
                     required
                  />
               </div>

               <p
                  onClick={() => navigate("/reset-password")}
                  className="mb-4 text-left pl-2 py-1 text-indigo-500 cursor-pointer"
               >
                  Forgot Password?
               </p>

               <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white hover:from-indigo-600 hover:to-indigo-900 transition-all duration-300 cursor-pointer font-medium">
                  {state === "Sign Up" ? "Sign Up" : "Login"}
               </button>
            </form>

            {state === "Sign Up" ? (
               <p className="text-xs mt-4 text-gray-400">
                  Already have an account?{" "}
                  <span
                     onClick={() => setState("Login")}
                     className="text-indigo-500 cursor-pointer underline"
                  >
                     Login here
                  </span>
               </p>
            ) : (
               <p className="text-xs mt-4 text-gray-400">
                  Don't have an account?{" "}
                  <span
                     onClick={() => setState("Sign Up")}
                     className="text-indigo-500 cursor-pointer underline"
                  >
                     Sign Up
                  </span>
               </p>
            )}
         </div>
      </div>
   );
};

export default Login;
