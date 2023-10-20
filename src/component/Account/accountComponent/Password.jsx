/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";


const Password = ({ setShowAlert, setAlertMessage }) => {
  const [oldPassowrd, setOldPassword] = useState("")
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    renew_password: ""
  })
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios
        .get("https://mock-fitness.onrender.com/user/view", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
  
          setOldPassword(response.data.password);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePassword = () => {
    const { current_password, new_password, renew_password } = password;
  
    // เพิ่มการตรวจสอบ current password และ new password
    if (!current_password || !new_password || !renew_password) {
      console.error("Please fill in all password fields.");
      return;
    }
  
    if (new_password !== renew_password) {
      console.error("New password and re-entered password do not match.");
      return;
    }
  
    // ตรวจสอบว่า current password ถูกต้อง
    if (current_password !== oldPassowrd) {
      console.error("Current password is incorrect.");
      return;
    }
  
    axios
      .put("https://mock-fitness.onrender.com/user/update", { new_password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(`Account ID : ${response.data._id} is updated password`);
        setAlertMessage("Update completed");
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error updating account: ", error);
      });
  };
  

  return (
    <div className="w-full">
      <div className="justify-between w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-20 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <form className="flex flex-col items-start w-full gap-2 py-4 text-left justify-stretch items-between">
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="current_password" className="w-1/3">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              value={password.current_password}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="new_password" className="w-1/3">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={password.new_password}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="renew_password" className="w-1/3">
              Re-New Password
            </label>
            <input
              type="password"
              name="renew_password"
              value={password.renew_password}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>
        </form>

        <div className="flex flex-row items-center w-full mt-4 mb-4 justify-evenly">
          <button
            className="btn btn-sm btn-active"
            onClick={() => console.log("cancel")}
          >
            Cancel
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={updatePassword}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
