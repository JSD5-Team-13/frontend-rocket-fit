import { MdPeopleAlt } from "react-icons/md";

const CreateProfile = () => {
  return (
    <section className="lg:flex lg:justify-center lg:items-center lg:h-screen">
      <div className="flex flex-col items-center lg:bg-[#D9D9D9] lg:w-[70%]  lg:pb-[3rem] lg:rounded-[1.5rem]">
        {/* profile picture */}
        <div className="lg:bg-white bg-[#D9D9D9] h-[12rem] w-[12rem] mt-[3rem] rounded-full flex flex-col justify-center items-center">
          <MdPeopleAlt className="text-[5rem] text-black" />
          <div>
            <input type="file" id="files" className="hidden" />
            <label htmlFor="files" className="font-bold">
              Upload Profile Picture
            </label>
          </div>
        </div>

        {/* Username */}
        <div className="mt-5">
          <h2 className="font-bold text-[1.2rem]">Username</h2>
        </div>

        <div>
          {/*input Height Weight */}
          <div className="grid gap-4 grid-cols-2 p-5">
            <div className="form-control w-full max-w-xs">
              {" "}
              {/* Height */}
              <label className="label">
                <span className="label-text">Height</span>
              </label>
              <input
                type="number"
                placeholder="Cm."
                className="input bg-[#D9D9D9] lg:bg-white w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              {" "}
              {/* Weight */}
              <label className="label">
                <span className="label-text">Weight</span>
              </label>
              <input
                type="number"
                placeholder="Kg."
                className="input bg-[#D9D9D9] lg:bg-white w-full max-w-xs"
              />
            </div>

            {/* <div>
               Bmi & Status 
              <div className="form-control w-full max-w-xs">
                 BMI 
                <label className="label">
                  <span className="label-text">BMI</span>
                </label>
                <div className="input bg-[#D9D9D9] lg:bg-white w-full max-w-xs"></div>
              </div>
              <div>  Status </div>
            </div> */}
          </div>

          {/*Gender & DoB */}
          <div className="w-[100%] px-5 ">
            <div className="form-control w-full ">
              {" "}
              {/* Gender */}
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select className="select bg-[#D9D9D9] lg:bg-white w-full ">
                <option disabled selected>
                  None
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Lgbtq+</option>
                <option>Not specified</option>
              </select>
            </div>

            <div className="form-control w-full ">
              {" "}
              {/* DoB */}
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="Date"
                className="input bg-[#D9D9D9] lg:bg-white w-full "
              />
            </div>
          </div>
        </div>

        {/* button Confirm */}
        <div className="mt-[2rem] ">
          <button className="btn btn-accent text-white px-[5rem]">
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;
