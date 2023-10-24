import Logofull from "../../assets/logo-full.png";
import Yoga from "../../assets/homeImage/Yoga.jpg";
import Boxing from "../../assets/homeImage/Boxing.png";
import Running from "../../assets/homeImage/Running.jpeg";
import Bgcontactus from "../../assets/homeImage/Bgcontactus.jpeg";
import { VscGraph } from "react-icons/vsc";
import { HiClock } from "react-icons/hi2";
import { PiTrophyBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { GrLocation, GrShareOption } from "react-icons/gr";
import { HiOutlinePhone } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { AiOutlineFacebook } from "react-icons/ai";
import FooterHome from "./FooterHome";
import Navbar from "../navbar/NavbarNoneLoggedIn.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <section id="home" className="max-w-screen-2xl my-0 mt-[10rem] mx-auto">
        {/*Sec.1 หน้า Welcome to rocket fit */}
        <article>
          <div className="flex flex-col-reverse lg:flex lg:flex-row lg:justify-center lg:my-[5rem]">
            {/* Left Side */}
            <div className="">
              <div className="p-[2rem] lg:flex lg:flex-col lg:items-center">
                <span className="font-bold text-[2.5rem] xl:text-[3.5rem]">
                  Welcome to
                </span>
                <div className="w-[180px] mt-4 xl:w-[260px]">
                  <img className="" src={Logofull} alt="LogoRocket Fit" />
                </div>
              </div>
              <div className="px-[2rem] flex flex-col gap-y-2">
                <p className="font-bold lg:text-[1.2rem] xl:text-[1.5rem]">
                  Stronger Every Move Fitter Every Day
                </p>
                <p className="lg:text-[1rem] xl:text-[1.3rem]">
                  with our tracker site to manage your time.
                </p>
              </div>

              <div className="mt-[1.5rem] flex items-center justify-center">
                <Link
                  className="btn btn-accent text-white w-[70%] rounded-[2rem]"
                  to={"/login"}
                >
                  <button>Sign in</button>
                </Link>
              </div>

              <div>
                <p className="text-[13px] text-center mt-1 font-bold lg:m-[1rem] xl:text-[1.1rem]">
                  Doesn have an account ?
                  <Link to={"/register"}>
                    <span className="hover:cursor-pointer ml-3">
                      Register here
                    </span>
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-[100%] lg:mx-[2rem] lg:w-[50%]">
              <img className="h-[100%] w-[100%]" src={Yoga} alt="" />
            </div>
          </div>

          {/* ส่วนสีเหลืองในหน้า home */}
          <div className="lg:flex bg-yellow-300 justify-between px-[5rem] py-[2rem] hidden">
            <div className="flex flex-col items-center w-[25%]">
              <VscGraph className="text-[3rem]" />
              <p className="text-neutral text-[1.2rem] font-semibold text-center leading-[30px] mt-[10px]">
                Help you to increase efficiency for work out
              </p>
            </div>

            <div className="flex flex-col items-center w-[20%]">
              <HiClock className="text-[3rem]" />
              <p className="text-neutral text-[1.2rem] font-semibold text-center leading-[30px] mt-[10px]">
                Manage your time more easily
              </p>
            </div>

            <div className="flex flex-col items-center w-[25%]">
              <PiTrophyBold className="text-[3.4rem]" />
              <p className="text-neutral text-[1.2rem] font-semibold text-center mt-[10px]">
                Celebrate your goals
              </p>
            </div>

            <div className="flex flex-col items-center w-[25%]">
              <GrShareOption className="text-[3.4rem]" />
              <p className="text-neutral text-[1.2rem] font-semibold text-center mt-[10px]">
                Share to your friends
              </p>
            </div>
          </div>
        </article>

        {/* Sec.2 ส่วนของหน้า Manage your time */}
        <article id="about" className="my-8 lg:m-0">
          {/* ส่วนของครึ่งบน */}
          <div className="bg-[#1CD6CE] flex flex-col-reverse lg:flex-row lg:items-center lg:py-[2rem] lg:px-[3rem]">
            <p className="font-bold text-[2.5rem] md:text-[3.5rem] md:p-[3rem] text-center p-4 lg:text-[2.7rem]">
              Manage your time easily with Rocket Fit
            </p>
            <div className="w-full lg:w-[80%]">
              <img className="w-[100%]" src={Boxing} alt="" />
            </div>
          </div>
          {/* ส่วนของครึ่งล่าง */}
          <div className="lg:flex lg:items-center lg:py-[2rem] lg:px-[3rem]">
            <div className="w-full lg:w-[80%]">
              <img className="w-[100%]" src={Running} alt="" />
            </div>

            <p className="font-bold text-[2.5rem] md:text-[3.5rem] md:p-[3rem] text-center p-4 lg:text-[3.2rem]">
              Share your activity with your friends
            </p>
          </div>
        </article>

        {/* ส่วนของ Contact Us */}
        <article
          id="contact"
          className="lg:flex lg:items-center lg:justify-center lg:relative "
        >
          {/* กล่องที่ครอบ from and Contact อยู่ */}
          <div className="bg-[#D9D9D9] lg:absolute lg:flex ">
            {/* กล่อง from Left-side */}
            <form className="p-8 flex flex-col gap-y-5">
              <h2 className="font-bold text-[3rem] text-center">Contact Us</h2>
              {/* ส่วนของ Name */}
              <div className="form-control">
                <label className="input-group">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              {/* ส่วนของ Email */}
              <div className="form-control">
                <label className="input-group">
                  <span>Email</span>
                  <input
                    type="text"
                    placeholder="info@site.com"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              {/* ส่วนของ Message */}
              <div className="form-control">
                <label className="input-group input-group-vertical">
                  <span className="h-[3rem]">Massage</span>
                  <input
                    type="text"
                    placeholder="Enter your massage"
                    className="input input-bordered h-[10rem]"
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <button className="btn btn-accent w-[40%] rounded-[1rem]">
                  Send
                </button>
              </div>
            </form>

            {/* กล่องContact Right-side */}
            <div className="bg-[#1CD6CE] p-10 lg:flex lg:flex-col lg:justify-center">
              <div className="flex flex-col gap-y-8 ">
                <div className="flex text-[1.5rem]">
                  <GrLocation className="bg-white text-[3.2rem] rounded-full p-2 mr-4" />
                  <p className="">Address Thailand</p>
                </div>

                <div className="flex text-[1.5rem]">
                  <HiOutlinePhone className="bg-white text-[3.2rem] rounded-full p-2 mr-4" />
                  <p className="">+6612 345 6789</p>
                </div>

                <div className="flex text-[1.5rem]">
                  <RiMailSendLine className="bg-white text-[3.2rem] rounded-full p-2 mr-4" />
                  <p className="">rocketfit@gmail.com</p>
                </div>

                <div className="flex text-[1.5rem]">
                  <AiOutlineFacebook className="bg-white text-[3.2rem] rounded-full p-2 mr-4" />
                  <p className="">Rocket Fit</p>
                </div>

                <div className="flex text-[1.5rem]">
                  <BsInstagram className="bg-white text-[3.2rem] rounded-[15px] p-2 mr-4" />
                  <p className="">Rocket Fit</p>
                </div>
              </div>
            </div>
          </div>

          {/* รูปที่จะใช้เป็น Bg */}
          <img
            className="w-full object-cover hidden lg:flex"
            src={Bgcontactus}
            alt=""
          />
        </article>
      </section>
      <FooterHome />
    </>
  );
};

export default Home;
