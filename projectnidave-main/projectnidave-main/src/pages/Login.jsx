import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalSeparator from "../components/VerticalSeparator";
import { PiUserCircleFill } from "react-icons/pi";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // Temporary Only
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to log in user");
      }

      if (data.user && data.username) navigate("/home");
    } catch (err) {
      setErrors({ message: "Incorrect Username or Password" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <header>
        <div className="flex justify-between pt-3 pb-3 px-10 w-full bg-[#011425]">
          <p className="text-5xl font-semibold text-[#FFFFFF]">FEEL BEAT</p>
        </div>
      </header>
      <div className="bg-aqua-wave h-full w-screen mt-44 flex justify-center items-center text-white">
        <div>
          <div className="text-3xl md:text-7xl font-bold text-center text-placebo-turquoise drop-shadow-title">
            <h1 className="text-white">Login</h1>
          </div>
          <br />
          <br />
          <br />
          <div className="my-6"></div>
          <form
            className="flex flex-col items-center px-10 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center border border-enamelled-jewel p-2 rounded-10px w-full h-12 md:h-14 bg-slate-50">
              <PiUserCircleFill className="text-4xl text-black" />
              <VerticalSeparator />
              <div className="w-full">
                <input
                  className="w-full bg-slate-50 text-xl text-black focus:outline-none"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            <br />
            <div className="flex items-center border border-enamelled-jewel p-2 rounded-10px w-full h-12 md:h-14 bg-slate-50">
              <MdLock className="text-black text-4xl" />
              <VerticalSeparator />
              <div className="w-full flex">
                <input
                  className="w-full bg-slate-50 text-xl text-black focus:outline-none"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                />

                {showPassword ? (
                  <MdVisibility
                    className="text-enamelled-jewel cursor-pointer mt-1 ml-2 text-xl"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <MdVisibilityOff
                    className="text-black-mana cursor-pointer mt-1 ml-2 text-xl"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <div className="my-2 text-enamelled-jewel underline">
              {errors && (
                <div className="bg-red-500 text-white p-3 rounded-lg font-semibold mt-3">
                  {errors.message}
                </div>
              )}
            </div>
            <div className="my-6"></div>
            <button
              className="text-2xl bg-transparent text-white font-semibold border w-40 h-14 border-enamelled-jewel text-enamelled-jewel transition ease-in duration-150 hover:shadow-custom hover:bg-green-500 hover:text-black"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
            <br />
            <button
              className="text-2xl bg-transparent font-semibold border w-40 h-14 border-enamelled-jewel text-enamelled-jewel transition ease-in duration-150 hover:shadow-custom hover:bg-green-500 hover:text-black"
              type="submit"
              onClick={(e) => navigate("/signup")}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
