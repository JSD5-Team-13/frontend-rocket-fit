/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";


const Privacy = ({ userId, setShowAlert, setAlertMessage }) => {
  const serverUrl = "http://127.0.0.1:8000"
  const token = localStorage.getItem("rockettoken");

  const [deactivate, setDeactivate] = useState();

  const handleInputChange = (event) => {
    const inputDelete = event.target.value
    setDeactivate(inputDelete);
  };

  const logoutAndRedirectToLogin = async () => {
    setTimeout(() => {
        localStorage.removeItem('rockettoken');
        window.location.href='/login';

    }, 1500);

  };

  const deactivated = async () => {
    try {
      if (!deactivate) {
        setAlertMessage({ text: 'Delete account error.', status: 'warning' });
        setShowAlert(true);
        return;
      }
  
      if (deactivate !== "delete account") {
        setAlertMessage({ text: 'Type does not match.', status: 'warning' });
        setShowAlert(true);
        return;
      }
      const response = await axios.put(
        serverUrl + "/users/deactivate/" + userId, {
          confirmToDeactivated: deactivate},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setAlertMessage({ text: response.data.message, status: 'success' });
      setShowAlert(true);
      logoutAndRedirectToLogin();
    } catch (error) {
      setAlertMessage({ text: error.response.data.message, status: 'error' });
      setShowAlert(true);
      console.error('Error updating password: ', error);
    }
  };


  return (
    <div className="w-full">
      <div className="justify-between w-auto px-4 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <div className="flex flex-col items-start w-full gap-2 py-4 text-left justify-stretch items-between">
          <div className="flex flex-col items-center justify-between w-full gap-4">
            <label htmlFor="typeConfirmDelete" className="w-full">
              To confirm, type 'delete account' in the box below
            </label>
            <input
              type="text"
              id="typeConfirmDelete"
              value={deactivate}
              onChange={handleInputChange}
              className="w-3/4 text-center text-red-700 rounded-md input input-bordered input-sm"
              placeholder="delete account"
            />
          </div>
          <div className="flex flex-row items-center w-full mt-4 mb-4 justify-evenly">
          <button
            className="btn btn-warning btn-sm"
            onClick={deactivated}
          >
            delete this account
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
