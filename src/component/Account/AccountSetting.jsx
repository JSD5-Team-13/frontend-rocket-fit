/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Layout from "../Layout.jsx";
import Swal from "sweetalert2";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

//import component
import Account from "./accountComponent/Account.jsx";
import Password from "./accountComponent/Password.jsx";
import Privacy from "./accountComponent/Privacy.jsx";
import Profile from "./accountComponent/Profile.jsx";

const serverUrl = "https://rocket-fit-api.onrender.com"

const AccountSetting = () => {
  
  const [option, setOption] = useState("ACCOUNT");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");

    if (token) {
      axios
        .get(serverUrl + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            setUserId(response.data.id);
            console.log(response.data.id); // ตรวจสอบว่าได้รับค่า id ให้ถูกต้อง

            axios
              .get(serverUrl + "/users/setting/" + response.data.id, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((userResponse) => {
                if (userResponse.status === 200) {
                  const user = userResponse.data;

                  const listDataByUser = {
                    username: user.username,
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    email: user.email,
                    image: user.image,
                    userId: response.data.id,
                    DateOfBirth: user.DateOfBirth,
                    height: user.height,
                    weight: user.weight,
                    gender: user.gender,
                  };
                  console.log(response.data.id);
                  setUserData(listDataByUser);
                } else {
                  console.log("Failed to fetch user data");
                }
              })
              .catch((error) => {
                console.log(
                  "Error fetching user data from the database",
                  error
                );
              });
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log("Error fetching user data from the database", error);
        });
    }
  }, [reload]);

  const showOption = (option) => {
    switch (option) {
      case "ACCOUNT":
        return (
          <Account
            userId={userId}
            userData={userData}
            setUserData={setUserData}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            reload={reload}
            setReload={setReload}
          />
        );

      case "PASSWORD":
        return (
          <Password
            userId={userId}
            userData={userData}
            setUserData={setUserData}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            reload={reload}
            setReload={setReload}
          />
        );

      case "DELETE ACCOUNT":
        return (
          <Privacy
            userId={userId}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            reload={reload}
            setReload={setReload}
          />
        );
      default:
        return null;
    }
  };

  const Alert = ({ message }) => {
    const { text, status } = message;

    switch (status) {
      case "success":
        Swal.fire({
          position: "center",
          icon: "success",
          title: text,
          showConfirmButton: true,
        }).then(closeAlert());
        break;
      case "warning":
        Swal.fire({
          position: "center",
          icon: "warning",
          title: text,
          showConfirmButton: true,
        }).then(closeAlert());
        break;

      case "error":
        Swal.fire({
          position: "center",
          icon: "error",
          title: text,
          showConfirmButton: true,
        }).then(closeAlert());
        break;

      default:
        break;
    }
  };

  const closeAlert = () => {
    setShowAlert(false); // ปิดหน้าต่างแจ้งเตือน
    setAlertMessage(""); // ล้างข้อความแจ้งเตือน
  };

  return (
    <Layout >
    <div className="">
      {showAlert && <Alert message={alertMessage} />}

      {/* mobile mode  */}
      <div className="flex flex-col justify-between flex-grow w-auto h-[95vh]  lg:hidden">
        <div>
          {/* title head */}
          <div className="flex flex-col items-center justify-center w-5/6 p-4 mx-auto md:w-5/6 lg:max-w-5/6 gap-[1.5rem]">
            <p className="w-full text-[2rem] font-bold text-left uppercase">
              Account Setting
            </p>
          </div>

          <div className="">
            {/* profile  */}
            <div className="">
              <Profile
                userId={userId}
                userData={userData}
                setUserData={setUserData}
                setShowAlert={setShowAlert}
                setAlertMessage={setAlertMessage} // ส่ง setAlertMessage ไปยังคอมโพเนนต์ Profile
                reload={reload}
                setReload={setReload}
              />
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

                {option === "ACCOUNT" ? showOption(option) : null}
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

                {option === "PASSWORD" ? showOption(option) : null}
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

                {option === "DELETE ACCOUNT" ? showOption(option) : null}
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
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "warning",
                      title: "Confirm to logout",
                      showCancelButton: true,
                      confirmButtonText: "Confirm",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.clear();
                        setTimeout(() => {
                          window.location.href = "/login";
                        }, 3000);
                      }
                    });
                  }}
                >
                  Log out
                </button>
              </div>
            </div>

            {/* right area */}
            <div className="flex flex-col items-center justify-center w-3/5 h-full text-center">
              <div className="w-full h-[60vh]">
                <h4 className="text-5xl font-medium lowercase h-1/3">
                  {option}
                </h4>

                <div className="h-1/3">{showOption(option)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>      
    </Layout>

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
