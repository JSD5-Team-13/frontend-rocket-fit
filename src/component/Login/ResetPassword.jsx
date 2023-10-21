import { Link } from "react-router-dom";

export const ResetPassword = () => {
  return (
    <>
      <div>
        <section className="lg:flex lg:justify-center lg:items-center h-screen flex flex-col items-center justify-center ">
          <div className="m-[3rem] lg:bg-[#D9D9D9] lg:w-[50%] lg:flex lg:flex-col lg:mx-auto flex flex-col items-center justify-center rounded-xl py-10 ">
            <h2 className="font-bold text-center text-[2rem]">
              Reset your password
            </h2>
            {/* Input From */}
            {/* Email */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>

              <div className="flex relative items-center">
                <input
                  type="text"
                  name="username"
                  placeholder="xxxxxxx@gmail.com"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/* Back to Login */}
            <div className="forgot-password">
              <label className="label">
                <Link to={"/login"}>
                  <a href="#" className="label-text-alt link link-hover">
                    Back to Login
                  </a>
                </Link>
              </label>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-[0.5rem]">
              <button className="btn btn-accent rounded-[1.5rem] w-[15rem]">
                Reset password
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
