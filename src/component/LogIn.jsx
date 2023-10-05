import Navbar from "./NavbarNoneLoggedIn";
import { FaUser } from "react-icons/Fa";
import { RxAvatar } from "react-icons/Rx";
import { FaLock } from "react-icons/Fa";

export const LogIn = () => {
  return (
    <div>
      <Navbar />

      <div className="input-login-form">
        <div
          class="hero min-h-screen hidden lg:flex lg:flex-col lg:justify-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1546749876-2088f8b19e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content flex-col">
            {/* input-login-card */}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                {/* title-login */}
                <div className="text-center lg:text-top text-neutral">
                  <h1 className="text-5xl font-bold text-center">Login</h1>
                </div>
                <div className="login-destop hidden lg:block">
                  {/* input-username */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-bordered"
                    />
                  </div>
                  {/* input-password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="password"
                      className="input input-bordered"
                    />
                  </div>
                </div>

                {/* mobile */}
                <div className="login-for-mobile flex flex-col lg:hidden">
                  {/* avatar */}

                  <div className="avatar placeholder justify-center p-[8px]">
                    <div className=" bg-base-300 span-neutral-content rounded-full w-24">
                      <span>
                        <RxAvatar />
                      </span>
                    </div>
                  </div>
                  {/* input-username */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <label className="input-group">
                      <span>
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        placeholder="Username"
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
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>

                {/* login-button */}
                <div className="form-control mt-6">
                  <button className="btn bg-[#1CD6CE]">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
