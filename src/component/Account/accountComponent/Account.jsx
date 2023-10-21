import React, { useEffect, useState } from "react";
import axios from "axios";



const Account = ({ setShowAlert, setAlertMessage }) => {
  
  const [userData, setUserData] = useState(
    {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      location: "",
    }
  );

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
          const userDataFromAPI = response.data;

          // Create a new object with properties in the desired order
          const orderedUserData = {
            username: userDataFromAPI.username,
            first_name: userDataFromAPI.first_name,
            last_name: userDataFromAPI.last_name,
            email: userDataFromAPI.email,
            phone: userDataFromAPI.phone,
            location: userDataFromAPI.location,
          };
      
          setUserData(orderedUserData);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateAccount = () => {
    axios
      .put("https://mock-fitness.onrender.com/user/update", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(`Account ID : ${response.data._id} is updated information`);
        setAlertMessage(response.data.message);
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error updating account: ", error);
        
      });
  };

  const resetForm = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get("https://mock-fitness.onrender.com/user/view", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const userDataFromAPI = response.data;
          setUserData(userDataFromAPI);
          console.log("reset form")
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
            <label htmlFor="first_name" className="w-1/3">
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

            {/* last name  */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="last_name" className="w-1/3">
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>
          {/* mock input */}
          {/* <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="email" className="w-1/3">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full text-center border-2 rounded-md input input-bordered input-sm"
            />
          </div> */}
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
