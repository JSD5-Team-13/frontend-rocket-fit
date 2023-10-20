import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Navbar from "../navbar/NavbarNoneLoggedIn";

import { useState } from "react";
// import axios from "axios";

// const api = "http://localhost:8000/";

export const Register = () => {
  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.email || !value.username || !value.password) {
      alert("Please fill out the information completely.");
      return;
    }
    if (value.password !== value.confirmPassword) {
      alert("Password not match");
    } else {
      console.log(value);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="lg:flex lg:justify-center lg:items-center h-screen flex flex-col items-center justify-center ">
        <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto flex flex-col items-center justify-center rounded-xl py-10 ">
          <h2 className="font-bold text-center text-[2rem]">Register</h2>

          {/* Input From */}
          <form className="flex flex-col items-center gap-y-5">
            {/* Email */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <div className="flex relative items-center">
                <AiOutlineMail className="absolute text-2xl m-3" />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="xxxxxxx@gmail.com"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/* Username */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Username</span>
              </label>
              <div className="flex relative items-center">
                <AiOutlineUser className="absolute text-2xl m-3" />
                <input
                  name="username"
                  onChange={handleChange}
                  placeholder="Type here"
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
                  onChange={handleChange}
                  placeholder="Your password"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/* Re-enter Password */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">
                  Re-enter Password :
                </span>
              </label>
              <div className="flex relative items-center">
                <RiLockPasswordLine className="absolute text-2xl m-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Your password"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-[0.5rem]">
              <button
                onClick={handleSubmit}
                disabled={value.password.length < 8}
                className="btn btn-accent rounded-[1.5rem] w-[15rem]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
