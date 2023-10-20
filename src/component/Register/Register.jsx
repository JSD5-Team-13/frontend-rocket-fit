import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [value , setValue] = useState({
    email : "",
    username : "",
    password : ""
})

  const createUser = async (userData) => {
    const response = await axios.post("http://127.0.0.1:8000/register" , userData)
    if (response.status === 200) {
      alert("create user successfully")
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
  
  const handleRegister = () => {
    console.log(value)
    const userData = {
      email: value.email,
      username: value.username,
      password: value.password
    }
    console.log(userData)
    createUser(userData)
  }
  
  return (
    <div>
      <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto  rounded-xl py-10 ">
        <h2 className="font-bold text-center text-[2rem]">Register</h2>

        {/* Input From */}
        <div className="flex flex-col items-center gap-y-5">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <div className="flex relative items-center">
              <AiOutlineMail className="absolute text-2xl m-3" />
              <input
                name="email"
                type="email"
                placeholder="xxxxxxx@gmail.com"
                value={value.email}
                onChange={handleInputChange}
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Username</span>
            </label>
            <div className="flex relative items-center">
              <AiOutlineUser className="absolute text-2xl m-3" />
              <input
                name="username"
                type="text"
                placeholder="Type here"
                value={value.username}
                onChange={handleInputChange} 
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Password :</span>
            </label>
            <div className="flex relative items-center">
              <RiLockPasswordLine className="absolute text-2xl m-3" />
              <input
              name="password"
                type="password"
                placeholder="Your password"
                value={value.password}
                onChange={handleInputChange}
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          {/* <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Re-enter Password :</span>
            </label>
            <div className="flex relative items-center">
              <RiLockPasswordLine className="absolute text-2xl m-3" />
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div> */}
        </div>

        {/* Check list confirm */}
        <div className="flex justify-center mt-[1rem]">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-accent mr-6 lg:bg-white"
            />
            <span className="label-text font-bold">Agree Term & Condition</span>
          </label>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-[0.5rem]">
          <button 
          className="btn btn-accent rounded-[1.5rem] w-[15rem]"
          onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

