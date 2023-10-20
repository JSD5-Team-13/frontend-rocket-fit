import Navbar from "../navbar/NavbarNoneLoggedIn.jsx";
import { FaUser } from "react-icons/Fa";
import { FaLock } from "react-icons/Fa";
import { useState } from "react";
import axios from "axios";

export const LogIn = () => {
  const [value , setValue] = useState({
    username : "",
    password : ""
})

  const login = async (userData) => {
    const response = await axios.post("http://127.0.0.1:8000/login" , userData)
    if (response.status === 200) {
      localStorage.setItem('rockettoken',response.data.token)
      alert("login successfully")
    } else if (response.status === 401) {
      alert("username already exist")
    } else {
      console.log("error")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  
  const handleLogin = () => {
    console.log(value)
    const userData = {
      username: value.username,
      password: value.password
    }
    console.log(userData)
    login(userData)
  }
  
  return (
    <div>
      <Navbar />

      <div className="input-login-form">
        <div
          className="hero min-h-screen lg:flex lg:flex-col lg:justify-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546749876-2088f8b19e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content flex-col">
            {/* input-login-card */}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                {/* title-login */}
                <div className="text-neutral flex justify-center">
                  <h1 className="text-5xl font-bold">Login</h1>
                </div>
                
                {/* mobile */}
                <div className="login-for-mobile flex flex-col">

                  {/* input-username */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <label className="input-group">
                      <span>
                        <FaUser />
                      </span>
                      <input
                        name="username"
                        type="text"
                        value={value.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  {/* input-password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <label className="input-group">
                      <span>
                        <FaLock />
                      </span>
                      <input
                        name="password"
                        type="password"
                        value={value.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                </div>
                {/* forgot-password */}
                <div className="forgot-password">
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>

                {/* login-button */}
                <div className="form-control mt-6">
                  <button 
                  className="btn bg-[#80bcb9]"
                  onClick={handleLogin}
                  >Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
