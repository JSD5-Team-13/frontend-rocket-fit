import Navbar from "../navbar/NavbarNoneLoggedIn";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/Fa";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const LogIn = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        userData
      );
      console.log(response.status);

      if (response.status === 200) {
        localStorage.setItem("rockettoken", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Login Success",
        });
        if (response.data.isCreatedProfile === true) {
          navigate("/main")
          window.location.reload();
        } else {
          navigate("/create_profile");
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid password or email",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid password or email",
        });
      }
      // Handle any network or other errors here
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
    const userData = {
      email: value.email,
      password: value.password,
    };
    login(userData);
  };

  return (
    <div>
      <Navbar />
      <section className="flex flex-col items-center justify-center h-screen lg:flex lg:justify-center lg:items-center ">
        <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto flex flex-col items-center justify-center rounded-xl py-10 ">
          <h2 className="font-bold text-center text-[2rem]">Login</h2>
          {/* Input From */}
          {/* Email */}
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="font-bold label-text">Email</span>
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute m-3 text-2xl" />
              <input
                type="email"
                value={value.email}
                onChange={handleInputChange}
                name="email"
                placeholder="xxxxxxx@gmail.com"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="font-bold label-text">Password :</span>
            </label>
            <div className="relative flex items-center">
              <RiLockPasswordLine className="absolute m-3 text-2xl" />
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
