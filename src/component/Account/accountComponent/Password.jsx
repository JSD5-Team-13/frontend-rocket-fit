import React from "react";

const Password = () => {
  return (
    <div className="w-full">
      <div className="justify-between w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-20 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <form className="flex flex-col items-start w-full gap-2 py-4 justify-stretch items-between">
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="CurrentPassword" className="w-1/3">
              Current Password
            </label>
            <input
              type="text"
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="NewPassword" className="w-1/3">
              New Password
            </label>
            <input
              type="text"
              className="w-2/3 text-center rounded-md input input-bordered input-sm"
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2">
            <label htmlFor="ReNewPassword" className="w-1/3">
              Re-New Password
            </label>
            <input
              type="text"
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
            onClick={() => console.log("password updated")}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
