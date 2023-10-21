/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Layout from "../Layout.jsx";



//import component
import Account from "./accountComponent/Account.jsx";
import Password from "./accountComponent/Password.jsx";
import Privacy from "./accountComponent/Privacy.jsx";
import axios from "axios";

const AccountSetting = () => {
  const [option, setOption] = useState("ACCOUNT");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState("");
  
  const showOption = (option) => {
    switch (option) {
      case "ACCOUNT":
        return <Account setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} />;

      case "PASSWORD":
        return <Password setShowAlert={setShowAlert} setAlertMessage={setAlertMessage}/>;

      case "DELETE ACCOUNT":
        return <Privacy />;
      default:
        return null;
    }
  };

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
          const userDataFromAPI = response.data.username;
          setUserData(userDataFromAPI);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);


  const Alert = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex flex-row items-end justify-center max-w-[95%] mx-auto mb-10 md:w-4/6 lg:w-3/6">
        {alertMessage === "Update completed" ? (
          <div className="alert alert-success flex flex-col md:justify-between justify-center w-full gap-2 md:flex-row lg:gap-[1rem]">
            <div className="flex flex-col items-center justify-center md:gap-4 md:flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your update completed!</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        ) : alertMessage === "Password not correct" ? (
          <div className="alert alert-error flex flex-col md:justify-between justify-center w-full gap-2 md:flex-row md:gap-[1rem]">
            <div className="flex flex-col items-center justify-center md:gap-4 md:flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Current password is not correct</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:justify-between justify-center w-full gap-2 md:flex-row alert alert-warning md:gap-[1rem]">
            <div className="flex flex-col items-center justify-center md:gap-4 md:flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{message}</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const closeAlert = () => {
    setShowAlert(false); // ปิดหน้าต่างแจ้งเตือน
    setAlertMessage(""); // ล้างข้อความแจ้งเตือน
  };


  return (
    <Layout className="max-w-[1440px] flex items-center">

    {showAlert && <Alert message={alertMessage} onClose={closeAlert} />}

      {/* mobile mode  */}
      <div className="flex flex-col justify-between flex-grow w-full h-[95vh]  lg:hidden">
        <div>
          {/* title head */}
          <div className="flex flex-col items-center justify-center w-5/6 p-4 mx-auto md:w-5/6 lg:max-w-5/6 gap-[1.5rem]">
            <p className="w-full text-[2rem] font-bold text-left uppercase">
              Account Setting
            </p>
          </div>

          <div>
            {/* profile  */}
            <div className="flex flex-col items-center justify-center w-full mx-auto">
              <Profile userData={userData} />
            </div>

            <div
              id="accountMobile"
              className="flex flex-col justify-center gap-0 mx-2 my-4 md:mx-auto items:center md:min-w-[640px] md:w-4/6 lg:hidden lg:border lg:rounded-lg"
            >
              {/* account setting */}
              <div className="flex flex-col items-start justify-start">
                <div
                  tabIndex={0}
                  className="flex flex-row items-center h-10 collapse collapse-arrow"
                  onClick={() => setOption("ACCOUNT")}
                >
                  <div className="text-xl font-medium collapse-title">
                    Account
                  </div>
                </div>

                {option === "ACCOUNT" ? showOption(option): null}
              </div>

              {/* password */}
              <div className="flex flex-col items-start justify-start">
                <div
                  tabIndex={0}
                  className="flex flex-row items-center h-10 collapse collapse-arrow"
                  onClick={() => setOption("PASSWORD")}
                >
                  <div className="text-xl font-medium lowercase collapse-title">
                    Password
                  </div>
                </div>

                {option ==="PASSWORD" ? showOption(option): null}
              </div>

              {/* Privacy */}
              <div className="flex flex-col items-start justify-start">
                <div
                  tabIndex={0}
                  className="flex flex-row items-center h-10 collapse collapse-arrow"
                  onClick={() => setOption("DELETE ACCOUNT")}
                >
                  <div className="text-xl font-medium lowercase collapse-title">
                    Privacy
                  </div>
                </div>

                {option ==="DELETE ACCOUNT" ? showOption(option): null}
              </div>
            </div>
          </div>

          {/* log out */}
          <div className="py-4 md:min-w-[640px] w-full md:w-4/6 mx-auto">
            <Logout />
          </div>
        </div>
      </div>

      {/* desktop mode */}
      <div className="hidden lg:block">
      <div className="flex-col p-[2rem] flex justify-center mx-auto items-center w-full max-w-[1440px]">
        <div className="w-full text-[2rem] font-bold text-left uppercase">
          <h2>Account Setting</h2>
        </div>


        <div className="flex flex-row justify-between items-center max-w-[1440px] min-h-[75vh] rounded-2xl w-5/6 m-[2rem] border-4">

          {/* left area */}
          <div className="w-2/5 max-w-[1440px] border-r-2 h-full">
            <Profile userData={userData} />
            <div className="flex flex-col justify-start">
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-2xl hover:bg-slate-100 font-bold"
                onClick={() => setOption("ACCOUNT")} // เมื่อคลิกเลือก "Account"
              >
                <h3>Account</h3>
              </div>
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-2xl hover:bg-slate-100 font-bold"
                onClick={() => setOption("PASSWORD")} // เมื่อคลิกเลือก "Password"
              >
                <h3>Password</h3>
              </div>
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-2xl hover:bg-slate-100 font-bold"
                onClick={() => setOption("DELETE ACCOUNT")} // เมื่อคลิกเลือก "Security & Privacy"
              >
                <h3>Delete Account</h3>
              </div>
            </div>
            <div className="w-full flex items-center h-[4rem] pl-10 text-2xl hover:bg-slate-100 font-bold">
              <h3>Log out</h3>
            </div>
          </div>


          {/* right area */}
          <div className="flex flex-col items-center justify-center w-3/5 h-full text-center">
          <div className="w-full h-[60vh]">
          <h4 className="text-5xl font-medium lowercase h-1/3">
            {option}
          </h4>
          
          <div className="h-1/3">
            {showOption(option)}             
          </div>
           
          </div>

          </div>
        </div>
      </div>        
      </div>

    </Layout>
  );
};




const Profile = ({ userData }) => {
  return (
    <div className="flex flex-col items-center w-full gap-4 px-2 py-4">
      <div className="w-48 h-48 overflow-hidden rounded-full">
        <img
          src="https://img.freepik.com/free-photo/front-view-man-posing-with-sunglasses_23-2149415775.jpg?size=626&ext=jpg&ga=GA1.1.300391043.1686214159&semt=sph"
          alt="profile-picture"
          className="object-cover"
        />
      </div>
      <div className="text-3xl font-semibold text-center">
      <h2>@{userData}</h2>
      </div>
    </div>
  );
};



const Logout = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 mb-4">
      <button className="w-full py-4 text-lg font-bold rounded-lg btn-ghost">
        Log out
      </button>
    </div>
  );
};

export default AccountSetting;
