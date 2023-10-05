import { useState } from "react";
import Layout from "../Layout.jsx";

const AccountSetting = () => {
  const [option, setOption] = useState("");

  // const optionHandler = (selectOption) => {
  //   setOption(selectOption);
  //   return
  // }

  const showOptionLaptop = (option) => {
    switch (option) {
      case "ACCOUNT":
        return <AccountLaptop />;
      default:
        return null;
    }
  };
  

  return (
    <Layout className="max-w-[1440px] flex items-center">
      <div className="flex flex-col justify-between flex-grow w-full h-[95vh]  laptop:hidden">
        <div>
          <div className="flex flex-col items-center justify-center w-5/6 p-4 mx-auto tablet:w-5/6 laptop:max-w-5/6 gap-[1.5rem]">
            <h1 className="w-full text-2xl font-bold text-left uppercase">
              Account Setting
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center w-full mx-auto">
            <Profile />
          </div>

          <div
            id="accountMobile"
            className="flex flex-col justify-center gap-0 mx-2 my-4 tablet:mx-auto items:center tablet:min-w-[640px] tablet:w-4/6 laptop:hidden tablet:border tablet:rounded-lg"
          >
            <div className="">
              <Account />
            </div>

            <div className="">
              <Password />
            </div>

            <div className="">
              <Privacy />
            </div>
          </div>
        </div>

        <div className=" py-4 tablet:min-w-[640px] w-full tablet:w-4/6 mx-auto">
          <Logout />
        </div>
      </div>
      <div className="flex flex-col p-[2rem] mobile-mode:hidden justify-center mx-auto items-center w-full max-w-[1440px]">
        <div className="w-full text-3xl font-extrabold text-left uppercase">
          <h2>
            Account Setting
          </h2>
        </div>
        <div className="flex flex-row justify-between items-center max-w-[1440px] min-h-[75vh] rounded-2xl w-5/6 m-[2rem] border-4">
          {/* left area */}
          <div className="w-2/5 max-w-[1440px] border-r-2 h-full">
            <ProfileLaptop />
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
                onClick={() => setOption("SECURITY")} // เมื่อคลิกเลือก "Security & Privacy"
              >
                <h3>Security & Privacy</h3>
              </div>
            </div>
            <div
                className="w-full flex items-center h-[4rem] pl-10 text-3xl hover:bg-slate-100 font-bold lowercase"
              >
                <h3>Log out</h3>
            </div>
          </div>

          {/* right area */}
          <div className="flex flex-col items-center justify-center w-3/5 text-center">
            {showOptionLaptop(option)}{" "}
            {/* ส่ง option ไปยังฟังก์ชัน showOptionLaptop */}
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

const Account = () => {
  const [statusAccount, setStatusAccount] = useState(false);
  const [showAccount, setShowAccount] = useState("hidden");

  const HandleShowAccount = () => {
    setStatusAccount(!statusAccount);
    setShowAccount(statusAccount ? "block" : "hidden");
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <div
        tabIndex={0}
        className="flex flex-row items-center h-10 collapse collapse-arrow"
        onClick={HandleShowAccount}
      >
        <div className="text-xl font-medium lowercase collapse-title">
          Account
        </div>
      </div>

      <div className={`w-full ${showAccount}`}>
        <div className="w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200">
          <form className="flex flex-col items-start w-full gap-2 py-4 justify-stretch items-between">
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Firstname" className="w-1/3">
                First name
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Lastname" className="w-1/3">
                Last name
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Email" className="w-1/3">
                E-mail
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Phone" className="w-1/3">
                Phone
              </label>
              <input
                type="text"
                placeholder="xxx-xxx-xxxx"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Company" className="w-1/3">
                Company
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Location" className="w-1/3">
                Location
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
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
              onClick={() => console.log("account updated")}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Password = () => {
  const [statusPassword, setStatusPassword] = useState(false);
  const [showPassword, setShowPassword] = useState("hidden");

  const HandleShowPassword = () => {
    setStatusPassword(!statusPassword);
    setShowPassword(statusPassword ? "block" : "hidden");
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <div
        tabIndex={0}
        className="flex flex-row items-center h-10 collapse collapse-arrow"
        onClick={HandleShowPassword}
      >
        <div className="text-xl font-medium lowercase collapse-title">
          Password
        </div>
      </div>

      <div className={`w-full ${showPassword}`}>
        <div className="w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200">
          <form className="flex flex-col items-start w-full gap-2 py-4 justify-stretch items-between">
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="CurrentPassword" className="w-1/3">
                Current Password
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="NewPassword" className="w-1/3">
                New Password
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="ReNewPassword" className="w-1/3">
                Re-New Password
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
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
              onClick={() => console.log("password updated")}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Privacy = () => {
  const [statusPrivacy, setStatusPrivacy] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState("hidden");

  const HandleShowPrivacy = () => {
    setStatusPrivacy(!statusPrivacy);
    setShowPrivacy(statusPrivacy ? "block" : "hidden");

    return console.log(showPrivacy + statusPrivacy);
  };

  return (
    <div className={`flex flex-col items-start justify-start`}>
      <div
        tabIndex={0}
        className="flex flex-row items-center h-10 collapse collapse-arrow"
        onClick={HandleShowPrivacy}
      >
        <div className="text-xl font-medium lowercase collapse-title">
          Security & Privacy
        </div>
      </div>

      <div className={`w-full ${showPrivacy}`}>
        <div className="w-auto px-4 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200">
          <div className="flex flex-col items-start w-full gap-2 py-4 justify-stretch items-between">
            <div className="flex flex-row items-center justify-between w-full">
              <label htmlFor="BlockedAccount" className="w-full">
                Blocked Account
              </label>
            </div>

            <div className="flex flex-row items-center justify-between w-full">
              <label htmlFor="DeactivateAccount" className="w-full">
                Deactivate Account
              </label>
            </div>
          </div>
        </div>
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

//laptop mode

const ProfileLaptop = () => {
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

const AccountLaptop = () => {
  return <div>hello world</div>;
};

export default AccountSetting;
