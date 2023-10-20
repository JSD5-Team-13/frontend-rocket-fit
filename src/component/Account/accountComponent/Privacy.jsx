import React from "react";

const Privacy = () => {
  return (
    <div className="w-full">
      <div className="justify-between w-auto px-4 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
        <div className="flex flex-col items-start w-full gap-2 py-4 text-left justify-stretch items-between">
          <div className="flex flex-col items-center justify-between w-full gap-4">
            <label htmlFor="deleteAccount" className="w-full">
              To confirm, type 'delete account' in the box below
            </label>
            <input
              type="text"
              id="deleteAccount"
              className="text-center text-red-700 rounded-md input input-bordered input-sm"
              placeholder="delete account"
            />
          </div>
          <div className="flex flex-row items-center w-full mt-4 mb-4 justify-evenly">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => console.log("password updated")}
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
