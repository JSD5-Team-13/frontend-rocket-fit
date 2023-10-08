import React, { useState } from "react";
import Layout from "../Layout.jsx";



//import component
import Account from "./accountComponent/Account.jsx";
import Password from "./accountComponent/Password.jsx";
import Privacy from "./accountComponent/Privacy.jsx";

const AccountSetting = () => {
  const [option, setOption] = useState("ACCOUNT");

  const showOption = (option) => {
    switch (option) {
      case "ACCOUNT":
        return <Account />;

      case "PASSWORD":
        return <Password />;

      case "PRIVACY":
        return <Privacy />;
      default:
        return null;
    }
  };

  return (
    <Layout className="max-w-[1440px] flex items-center">
      {/* mobile mode  */}
      <div className="flex flex-col justify-between flex-grow w-full h-[95vh]  lg:hidden">
        <div>
          {/* title head */}
          <div className="flex flex-col items-center justify-center w-5/6 p-4 mx-auto md:w-5/6 lg:max-w-5/6 gap-[1.5rem]">
            <h1 className="w-full text-2xl font-bold text-left uppercase">
              Account Setting
            </h1>
          </div>

          <div>
            {/* profile  */}
            <div className="flex flex-col items-center justify-center w-full mx-auto">
              <Profile />
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
                  <div className="text-xl font-medium lowercase collapse-title">
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
                  onClick={() => setOption("PRIVACY")}
                >
                  <div className="text-xl font-medium lowercase collapse-title">
                    Privacy
                  </div>
                </div>

                {option ==="PRIVACY" ? showOption(option): null}
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
        <div className="w-full text-3xl font-extrabold text-left uppercase">
          <h2>Account Setting</h2>
        </div>


        <div className="flex flex-row justify-between items-center max-w-[1440px] min-h-[75vh] rounded-2xl w-5/6 m-[2rem] border-4">

          {/* left area */}
          <div className="w-2/5 max-w-[1440px] border-r-2 h-full">
            <Profile />
            <div className="flex flex-col justify-start">
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-3xl hover:bg-slate-100 font-bold lowercase"
                onClick={() => setOption("ACCOUNT")} // เมื่อคลิกเลือก "Account"
              >
                <h3>Account</h3>
              </div>
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-3xl hover:bg-slate-100 font-bold lowercase"
                onClick={() => setOption("PASSWORD")} // เมื่อคลิกเลือก "Password"
              >
                <h3>Password</h3>
              </div>
              <div
                className="w-full flex items-center h-[4rem] pl-10 text-3xl hover:bg-slate-100 font-bold lowercase"
                onClick={() => setOption("PRIVACY")} // เมื่อคลิกเลือก "Security & Privacy"
              >
                <h3>Security & Privacy</h3>
              </div>
            </div>
            <div className="w-full flex items-center h-[4rem] pl-10 text-3xl hover:bg-slate-100 font-bold lowercase">
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




const Profile = () => {
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
        <h3>John Doh</h3>
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
