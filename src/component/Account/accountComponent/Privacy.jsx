import React from "react";

const Privacy = () => {
  return (
    <div className="w-full">
      <div className="justify-between w-auto px-4 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
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
  );
};

export default Privacy;
