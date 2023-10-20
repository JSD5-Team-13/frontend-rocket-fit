import Navbar from "../navbar/NavbarNoneLoggedIn";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/Fa";
import { FaLock } from "react-icons/Fa";

export const LogIn = () => {
  return (
    <div>
      <Navbar />

      <div className="input-login-form">
        <div
          className="hero min-h-screen lg:flex lg:flex-col lg:justify-center "
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546749876-2088f8b19e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content flex-col w-full">
            {/* input-login-card */}
            <div className="card flex-shrink-0 w-[90%] lg:w-[50%] shadow-2xl bg-base-100">
              <div className="card-body ">
                {/* title-login */}
                <div className="text-neutral flex justify-center">
                  <h1 className="text-5xl font-bold">Login</h1>
                </div>

                {/* mobile */}
                <div className="login-for-mobile flex flex-col">
                  {/* input-username */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <label className="input-group">
                      <span>
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                  {/* input-password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <label className="input-group">
                      <span>
                        <FaLock />
                      </span>
                      <input
                        type="text"
                        placeholder="Password"
                        className="input input-bordered"
                      />
                    </label>
                  </div>
                </div>
                {/* forgot-password */}
                <div className="forgot-password">
                  <label className="label">
                    <Link to={"/forget_password"}>
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </Link>
                  </label>
                </div>

                {/* login-button */}
                <div className="flex justify-center mt-[0.5rem]">
                  <button className="btn btn-accent rounded-[1.5rem] w-[15rem]">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
