import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export const Register = () => {
  return (
    <div>
      <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto  rounded-xl py-10 ">
        <h2 className="font-bold text-center text-[2rem]">Register</h2>

        {/* Input From */}
        <div className="flex flex-col items-center gap-y-5">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <div className="flex relative items-center">
              <AiOutlineMail className="absolute text-2xl m-3" />
              <input
                type="email"
                placeholder="xxxxxxx@gmail.com"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Username</span>
            </label>
            <div className="flex relative items-center">
              <AiOutlineUser className="absolute text-2xl m-3" />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Password :</span>
            </label>
            <div className="flex relative items-center">
              <RiLockPasswordLine className="absolute text-2xl m-3" />
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Re-enter Password :</span>
            </label>
            <div className="flex relative items-center">
              <RiLockPasswordLine className="absolute text-2xl m-3" />
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Check list confirm */}
        <div className="flex justify-center mt-[1rem]">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-accent mr-6 lg:bg-white"
            />
            <span className="label-text font-bold">Agree Term & Condition</span>
          </label>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-[0.5rem]">
          <button className="btn btn-accent rounded-[1.5rem] w-[15rem]">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

