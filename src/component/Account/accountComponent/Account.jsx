/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = ({ userId, userData, setUserData, setShowAlert, setAlertMessage}) => {
  const serverUrl = "https://rocket-fit-api.onrender.com"
  const token = localStorage.getItem("rockettoken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateAccount = async () => {

    try {
      const response = await axios.put(serverUrl + "/users/setting/account/" + userData.userId, userData, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log(`Account ID : ${userId} is updated information`);
        setAlertMessage({ text: response.data.message, status: 'success' });
        setShowAlert(true);
      } else {
        console.log(response.data.error);
        setAlertMessage({ text: response.data.error, status: 'error' });
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage({ text: error.response.data.message, status: 'error' });
      setShowAlert(true);
      console.error("Error updating account: ", error);
    }
  };
  const resetForm = () => {
    
    if (token) {
      axios.get(serverUrl + "/users/setting/" + userData.userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        })
        .then((response) => {
          const userDataFromAPI = response.data;
          setUserData(userDataFromAPI);
          console.log("reset form")
          console.log(userData)
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  };

  return (
    <div className={`w-full`}>
      <div className="justify-between w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <form className="flex flex-col items-start w-full gap-2 py-4 text-left justify-stretch items-between">
          {/* username */}
          {/* <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="username" className="w-1/3">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
              disabled
            />
          </div> */}

          {/* first name */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="FirstName" className="w-1/3">
              First name
            </label>
            <input
              type="text"
              name="FirstName"
              value={userData.FirstName || ""}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          {/* last name  */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="LastName" className="w-1/3">
              Last name
            </label>
            <input
              type="text"
              name="LastName"
              value={userData.LastName || ""}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          {/* email */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="email" className="w-1/3">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
              disabled
            />
          </div>
          {/* mock input */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="bmi" className="w-1/3">
              Weight & Height
            </label>
            <div className="flex flex-row w-2/3 text-center rounded-md justify-evenly">
              <div className="w-1/2 gap-4">
                <label htmlFor="weight" className="w-1/3 pr-2">
                  W:
                </label>
                <input
                  type="number"
                  name="weight"
                  value={userData.weight}
                  onChange={handleInputChange}
                  className="w-2/3 text-center rounded-md input input-bordered input-sm"
                  // placeholder={userData.DateOfBirth}
                />
              </div>

              <div className="w-1/2 gap-4">
                <label htmlFor="height" className="w-1/3 pr-2">
                  H:
                </label>
                <input
                  type="number"
                  name="height"
                  value={userData.height}
                  onChange={handleInputChange}
                  className="w-2/3 text-center rounded-md input input-bordered input-sm"
                  // placeholder={userData.DateOfBirth}
                />
              </div>
            </div>
          </div>
          {/* mock input */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="gender" className="w-1/3">
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>

        <div className="flex flex-row items-center w-full mt-4 mb-4 justify-evenly">
          <button
            className="duration-300 ease-in-out btn btn-sm btn-active hover:scale-105 "
            onClick={resetForm}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="duration-300 ease-in-out btn btn-success btn-sm hover:scale-105"
            onClick={updateAccount}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;