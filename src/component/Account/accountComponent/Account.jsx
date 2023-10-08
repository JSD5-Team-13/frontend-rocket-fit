



const Account = () => {
    return (
      <div className={`w-full`}>
        <div className="justify-between w-auto px-2 mx-2 my-2 border rounded-2xl border-base-300 bg-base-200 lg:flex lg:flex-col lg:items-center lg: lg:py-2 lg:border-none lg:bg-transparent ">
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
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 className=input input-bordered input-sm rounded-md text-center"
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
  
            {/* <div className="flex flex-row items-center justify-between w-full gap-2">
              <label htmlFor="Company" className="w-1/3">
                Company
              </label>
              <input
                type="text"
                className="w-2/3 className=input input-bordered input-sm rounded-md text-center"
              />
            </div> */}
  
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
    );
  };


  export default Account;