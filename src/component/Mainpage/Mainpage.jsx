import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import SideInformation from "../navbar/SideInformationBar.jsx";
import { useEffect, useState } from "react";
import {
  HiOutlinePlusSm,
  HiOutlinePresentationChartLine,
  HiOutlineMoon,
} from "react-icons/hi";
import axios from "axios";
import Swal from "sweetalert2";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

const Mainpage = () => {
  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState(getDate());
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [followingData, setFollowingData] = useState([]);
  const [sleepTime, setSleepTime] = useState({
    sleepTime: "HH:MM",
    wakeTime: "HH:MM",
    date: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserId(response.data.id);
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
        });
    }
  }, [userId]);

  useEffect(() => {
    // Check if userData.following is available
    if (userData.following && userData.following.length > 0) {
      const token = localStorage.getItem("rockettoken");
      const fetchFollowingData = async () => {
        try {
          const followingPromises = userData.following.map((userId) =>
            axios.get(`http://127.0.0.1:8000/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );

          const followingResponses = await Promise.all(followingPromises);

          const followingData = followingResponses.map((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              console.error("Error fetching following data");
              return null; // Handle the error case here
            }
          });

          setFollowingData(followingData.filter((user) => user));
        } catch (error) {
          console.error("Error fetching following data", error);
        }
      };
      fetchFollowingData();
    }
  }, [userData.following]);

  const sleepTimeCreate = (sleepTimeData) => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .post(`http://127.0.0.1:8000/sleeptime`, sleepTimeData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Sleep Time Added",
            });
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
          Swal.fire({
            icon: "error",
            title: "You already add your sleep time today",
          });
        });
    }
  };

  const sleepTimeHandler = () => {
    // Parse the sleepTime and wakeTime into Date objects
    const sleepTimeDate = new Date(`2023-10-24T${sleepTime.sleepTime}`);
    const wakeTimeDate = new Date(`2023-10-24T${sleepTime.wakeTime}`);

    // Calculate the time difference in milliseconds
    const timeDifference = sleepTimeDate - wakeTimeDate;

    // Convert the time difference to hours and minutes
    const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const positiveTotalHours = Math.abs(totalHours);
    if (positiveTotalHours < 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid time",
      });
      return;
    }

    // Format the date to match ISO 8601 format (YYYY-MM-DD)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const sleepTimeData = {
      date: formattedDate, // Use the formatted date
      sleeptime: positiveTotalHours,
      userId: userData._id,
    };

    sleepTimeCreate(sleepTimeData, userId);

    setSleepTime({
      sleepTime: "HH:MM",
      wakeTime: "HH:MM",
      date: formattedDate, // Update the date in the state with the formatted date
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSleepTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className=" h-[100vh] fixed w-full">
      <div className="w-full ">
        <NavbarLoggedIn />
      </div>
      <div className="w-full ">
        <div className="flex flex-row justify-center mx-auto my-0 max-w-screen-2xl md:mx-auto">
          <aside className="top-0 hidden shadow-lg lg:w-1/4 lg:block mt-[79px]">
            <SideInformation />
          </aside>

          <div className="flex flex-col items-center overflow-scroll flex-hidden h-[100vh] pb-40 bg-gray-100 lg:w-2/4 mt-[79px]">
            <div className="self-start m-6">
              <h1 className="text-3xl font-semibold">
                Welcome, {userData.FirstName}
              </h1>
              <p className="">{currentDate}</p>
            </div>
            <img
              src="https://images.pexels.com/photos/12169236/pexels-photo-12169236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="banner"
              className="w-[80%] h-[30%]  object-cover rounded-xl"
            />

            {/* Form Area */}
            {/* Crete Activity Area */}
            <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
              <figure className="w-[20%] avatar">
                <HiOutlinePlusSm className="w-[70%] h-[60%] rounded-full" />
              </figure>
              <div className="card-body">
                <p className="font-bold">Create you activity</p>
                <p>Add your new activity here</p>
                <button className="btn btn-sm btn-accent rounded-full w-[40%]">
                  <a href="/create_activity">Create Activity</a>
                </button>
              </div>
            </div>
            {/* Dashboard Area */}
            <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
              <figure className="w-[20%] avatar">
                <HiOutlinePresentationChartLine className="w-[55%] h-[60%] rounded-full" />
              </figure>
              <div className="card-body">
                <p className="font-bold">Dashboard checkout</p>
                <p>Let`s see how much times you spent on your exercise</p>
                <button className="btn btn-sm btn-accent rounded-full w-[40%]">
                  <a href="/dashboard">Dashboard</a>
                </button>
              </div>
            </div>
            {/* Sleep Time Area */}
            <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
              <figure className="w-[20%] avatar">
                <HiOutlineMoon className="w-[55%] h-[60%] rounded-full" />
              </figure>
              <div className="card-body w-[80%]">
                <p className="font-bold">Sleep Time</p>
                <p>
                  How was your night ? Enter your sleep and wake up time to
                  track your sleeping
                </p>
                <div className="flex flex-row">
                  <label htmlFor="sleep" className="self-center mr-2">
                    Sleep Time:
                  </label>
                  <input
                    id="sleep"
                    type="time"
                    className="input input-bordered input-sm w-[40%] max-w-xs"
                    name="sleepTime"
                    onChange={handleChange}
                    value={sleepTime.sleepTime}
                  />
                </div>
                <div className="flex flex-row">
                  <label htmlFor="wakeup" className="self-center mr-2">
                    Wake Up:
                  </label>
                  <input
                    id="wakeup"
                    type="time"
                    className="input input-bordered input-sm w-[40%] max-w-xs"
                    name="wakeTime"
                    onChange={handleChange}
                    value={sleepTime.wakeTime}
                  />
                </div>
                <button
                  className="btn btn-sm btn-accent rounded-full w-[40%]"
                  onClick={sleepTimeHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="top-0 flex-col hidden shadow-md lg:flex lg:w-1/4 mt-[79px]">
            <div className="self-start m-6">
              <h1 className="text-3xl font-semibold">Connection</h1>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4 ml-4">
                {followingData.slice(0, 9).map((user, index) => (
                  <div key={index}>
                    <div className="">
                      <img
                        src={user.image}
                        alt="profile"
                        className="rounded-full w-20 h-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href="/connection" className="self-end mx-4">More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
