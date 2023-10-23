/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = ({ userId, userData, setUserData, setShowAlert, setAlertMessage}) => {
  const serverUrl = "http://127.0.0.1:8000"
  const token = localStorage.getItem("rockettoken");

  // useEffect(() => {
  //   if (token) {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axios.get(serverUrl + "/users/setting/" + userId, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  
  //         const user = response.data;
  
  //         // Create a new object with properties in the desired order
  //         const orderedUserData = {
  //           username: user.username,
  //           FirstName: user.FirstName,
  //           LastName: user.LastName,
  //           email: user.email,
  //           // phone: user.phone,
  //           // location: user.location,
  //         };
  
  //         setUserData(orderedUserData);
  //       } catch (error) {
  //         console.error("Error fetching user data", error);
  //       }
  //     };
  //     fetchUserData();
  //   }
  // }, []);
  


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
          <div className="flex flex-row items-center justify-between w-full gap-2">
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
          </div>
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
          {/* mock input */}
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
            />
          </div>
          {/* mock input */}
          {/* <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="phone" className="w-1/3">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="xxx-xxx-xxxx"
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div> */}
          {/* mock input */}
          {/* <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="location" className="w-1/3">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div> */}
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