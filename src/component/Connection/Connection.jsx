import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { AiOutlineSearch } from "react-icons/ai";

const Connection = () => {
  return (
    <>
      <NavbarLoggedIn />
      <div className="max-w-screen-xl m-auto h-[80vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center mt-[110px] mb-4 lg:mb-[2rem] lg:self-start gap-4 lg:ml-10">
          <h1 className="text-4xl font-bold">Connection</h1>
          <form className="flex relative items-center justify-end ">
            <AiOutlineSearch className="absolute text-2xl m-3" />
            <input
              placeholder="Search"
              className="input input-ghost input-sm w-full max-w-xl bg-[#D9D9D9] text-center rounded-2xl"
            />
          </form>
          </div>

          <div className="w-[90%] lg:w-[70%] flex flex-col items-center lg:grid lg:grid-cols-2 lg:justify-items-center bg-base-300 p-4 my-4 rounded-xl ">
            <div className="card w-[95%] bg-base-100 shadow-xl my-4">
              <div className="card-body">
                <div className="flex flex-row items-center">
                  <img
                    src="https://i.ibb.co/3Y3cQFM/IMG-20211019-123316.jpg"
                    alt="profile"
                    className="rounded-full w-24 h-24 mr-4"
                  />
                  <div className="flex flex-col ">
                    <h1 className="font-bold text-lg my-2">Name</h1>
                    <button className="btn btn-sm btn-accent rounded-2xl">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card w-[95%] bg-base-100 shadow-xl my-4">
              <div className="card-body">
                <div className="flex flex-row items-center">
                  <img
                    src="https://i.ibb.co/3Y3cQFM/IMG-20211019-123316.jpg"
                    alt="profile"
                    className="rounded-full w-24 h-24 mr-4"
                  />
                  <div className="flex flex-col ">
                    <h1 className="font-bold text-lg my-2">Name</h1>
                    <button className="btn btn-sm btn-accent rounded-2xl">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card w-[95%] bg-base-100 shadow-xl my-4">
              <div className="card-body">
                <div className="flex flex-row items-center">
                  <img
                    src="https://i.ibb.co/3Y3cQFM/IMG-20211019-123316.jpg"
                    alt="profile"
                    className="rounded-full w-24 h-24 mr-4"
                  />
                  <div className="flex flex-col ">
                    <h1 className="font-bold text-lg my-2">Name</h1>
                    <button className="btn btn-sm btn-accent rounded-2xl">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Connection;
