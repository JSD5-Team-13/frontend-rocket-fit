/* eslint-disable react/no-unknown-property */
import LogoFull from "../../assets/logo-full.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/logo-full.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral h-[5rem] fixed top-0 z-10">
      <div className="navbar-start">
        <img
          src={LogoFull}
          alt="logo"
          className="hidden lg:block w-auto h-10 mx-4"
        />
        <img src={Logo} alt="logo" className="lg:hidden w-auto h-10 mx-4" />
      </div>
      <div className="navbar-end z-10">
        <ul className="menu menu-horizontal px-1 text-white hidden lg:flex">
          <Link to={"/"}>
            <li>
              <a href="#home">Home</a>
            </li>
          </Link>

          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="#contact">Contact Us</a>
          </li>

          <li>
            <Link to={"/register"}>
              <a>Register</a>
            </Link>
          </li>
        </ul>
        <Link to={"/login"}>
          <a className="btn bg-accent btn-sm lg:mx-4">Sign In</a>
        </Link>

        <div className="drawer-end lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="drawer-button">
              <GiHamburgerMenu className="text-white w-6 h-6 mx-4" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <Link to={"/"}>
                <li>
                  <a href="#home">Home</a>
                </li>
              </Link>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <Link to={"/register"}>
                  <a>Register</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
