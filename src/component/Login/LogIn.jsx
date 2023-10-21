import Navbar from "../navbar/NavbarNoneLoggedIn";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/Fa";
import { useState } from "react";
import axios from "axios";

export const LogIn = () => {
  const [value , setValue] = useState({
    username : "",
    password : ""
})
  const navigate = useNavigate();

  const login = async (userData) => {
    const response = await axios.post("http://127.0.0.1:8000/login", userData);
    if (response.status === 200) {
      localStorage.setItem('rockettoken',response.data.token)
      alert("login successfully");
      if (response.data.isCreatedProfile === true) {
      navigate("/main") }
      else {
      navigate("/create_profile")
      }
    } else if (response.status === 401) {
      alert("username already exist");
    } else {
      console.log("error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log(value);
    const userData = {
      username: value.username,
      password: value.password,
    };
    console.log(userData);
    login(userData);
  };

  return (
    <div>
      <Navbar />
      <section className="lg:flex lg:justify-center lg:items-center h-screen flex flex-col items-center justify-center ">
        <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto flex flex-col items-center justify-center rounded-xl py-10 ">
          <h2 className="font-bold text-center text-[2rem]">Login</h2>
          {/* Input From */}
          {/* Email */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <div className="flex relative items-center">
              <FaUser className="absolute text-2xl m-3" />
              <input
                type="text"
                value={value.username}
                onChange={handleInputChange}
                name="username"
                placeholder="xxxxxxx@gmail.com"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Password :</span>
            </label>
            <div className="flex relative items-center">
              <RiLockPasswordLine className="absolute text-2xl m-3" />
              <input
                type="password"
                name="password"
                value={value.password}
                onChange={handleInputChange}
                placeholder="Your password"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          {/* Forgot password */}
          <div className="forgot-password">
            <label className="label">
              <Link to={"/forget_password"}>
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </Link>
            </label>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-[0.5rem]">
            <button
              className="btn btn-accent rounded-[1.5rem] w-[15rem]"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
