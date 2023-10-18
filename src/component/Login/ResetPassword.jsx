export const ResetPassword = () => {
  return (
    <div>
      <div className="forgot-passd">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col">
            {/* title-Reset-your-password */}
            <div className="text-center lg:text-top">
              <h1 className="text-5xl font-bold">Reset your password</h1>
            </div>
            {/* input-Reset-password-card */}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                {/* input-email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                {/* reset-password-button */}
                <div className="form-control mt-6">
                  <button className="btn bg-[#1CD6CE]">Reset password</button>
                </div>
                {/* back-to-login */}
                <label className="label center">
                  <a href="#" className="label-text-alt link link-hover">
                    Back to Login
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
