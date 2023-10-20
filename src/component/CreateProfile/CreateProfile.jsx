import { MdPeopleAlt } from "react-icons/md";

const CreateProfile = () => {
  return (
    <div>
      <section className="lg:flex lg:justify-center lg:items-center h-screen">
        <div className="flex flex-col items-center lg:bg-[#D9D9D9] lg:w-[70%]  lg:pb-[3rem] lg:rounded-[1.5rem]">
          {/* profile picture */}
          <div className="lg:bg-white bg-[#D9D9D9] h-[12rem] w-[12rem] max-w-xs mt-[3rem] rounded-full flex flex-col justify-center items-center ">
            <MdPeopleAlt className="text-[5rem] text-black" />
            <div>
              <input type="file" id="files" className="hidden" />
              <label htmlFor="files" className="font-bold hover:text-red-500">
                Upload Profile Picture
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="mt-5">
            <h2 className="font-bold text-[1.2rem]">Username</h2>
          </div>

          {/*input*/}
          <form className="flex flex-col items-center">
            <div className="grid gap-5 grid-cols-2 p-5">
              {/* First Name */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Last Name */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Height */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Height</span>
                </label>
                <input
                  type="number"
                  placeholder="Cm."
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Weight */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Weight</span>
                </label>
                <input
                  type="number"
                  placeholder="Kg."
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/*Gender & DoB */}
            <div className="w-[100%] px-5 ">
              {/* Gender */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold">Gender</span>
                </label>
                <select className="select input input-bordered input-success bg-[#D9D9D9] lg:bg-white w-full ">
                  <option disabled selected>
                    None
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Lgbtq+</option>
                  <option>Not specified</option>
                </select>
              </div>

              {/* DoB */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="Date"
                  className="input input-bordered input-success bg-[#D9D9D9] lg:bg-white w-full "
                />
              </div>
            </div>
          </form>

          {/* button Confirm */}
          <div className="flex justify-center mt-[2rem] ">
            <button className="btn btn-accent rounded-[1.5rem] w-[15rem]">
              Confirm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProfile;
