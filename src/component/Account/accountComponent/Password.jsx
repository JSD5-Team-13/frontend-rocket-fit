/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";

const Password = ({ userId, userData, setUserData, setShowAlert, setAlertMessage }) => {
  
  const serverUrl = "http://127.0.0.1:8000"
  const token = localStorage.getItem("rockettoken");
  
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    renewPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const logoutAndRedirectToLogin = async () => {
    setTimeout(() => {
        localStorage.removeItem('token');
        window.location.href='/login';

    }, 1500);

  };

  const updatePassword = () => {
    const { currentPassword, newPassword, renewPassword } = password;

    if (!currentPassword || !newPassword || !renewPassword) {
      setAlertMessage({ text: 'Please fill in all password fields.', status: 'warning' });
      setShowAlert(true);
      return;
    }

    if (newPassword !== renewPassword) {
      setAlertMessage({ text: 'New passwords do not match.', status: 'warning' });
      setShowAlert(true);
      return;
    }

    axios
      .put(
        serverUrl + "/users/password/" + userId,
        { currentPassword, newPassword, renewPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAlertMessage({ text: response.data.message, status: 'success' });
        setShowAlert(true);
        logoutAndRedirectToLogin();
    
      })
      .catch((error) => {
        setAlertMessage({ text: error.response.data.message, status: 'error' });
        setShowAlert(true);
        console.error('Error updating password: ', error);
      });
  };
  

  return (
    <div className="w-full">
      <div className="justify-between w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-20 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <form className="flex flex-col items-start w-full gap-2 py-4 text-left justify-stretch items-between">
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="currentPassword" className="w-1/3">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="newPassword" className="w-1/3">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="renewPassword" className="w-1/3">
              Re-New Password
            </label>
            <input
              type="password"
              name="renewPassword"
              value={password.renewPassword}
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
