import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import { Bar, Pie } from "react-chartjs-2";
import { BiSolidMoon } from "react-icons/Bi";
import SideInformation from "../navbar/SideInformationBar.jsx";
import { CategoryScale, Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Colors } from "chart.js";

//setup chart
Chart.register(CategoryScale);
Chart.register(...registerables);
Chart.register(Colors);

// const activityType = {
//   Running: "running",
//   Walking: "walking",
//   Cycling: "cycling",
//   Swimming: "swimming",
//   Hiking: "hiking",
//   WeightTraining: "weight_training",
//   Yoga: "yoga",
//   Surfing: "surfing",
//   Basketball: "basketball",
//   Football: "football",
//   Badminton: "badminton",
//   Tennis: "tennis",
//   Volleyball: "volleyball",
// };

const initialDashboardData = {
  durationPerDay: [
    {
      day: "sun",
      value: 0,
    },
    {
      day: "mon",
      value: 0,
    },
    {
      day: "tue",
      value: 0,
    },
    {
      day: "wed",
      value: 0,
    },
    {
      day: "thu",
      value: 0,
    },
    {
      day: "fri",
      value: 0,
    },
    {
      day: "sat",
      value: 0,
    },
  ],
  activityPerWeek: [],
};

export const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  //get data
  useEffect(() => {
    const getDashboardData = async () => {
      const url = "http://localhost:8000";
      return await axios
        //get all
        .get(url + `/dashboard`)
        //get buy user id
        // .get(url + `/dashboard/${id}`)

        .then((res) => setDashboardData(res.data));
    };

    getDashboardData();
  }, []);
  //map item like initialDashboardData
  const BarChartData = {
    labels: dashboardData.durationPerDay.map((item) => item.day),
    datasets: [
      {
        label: "My Duration (min.)",
        data: dashboardData.durationPerDay.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const PieChartData = {
    labels: dashboardData.activityPerWeek.map((item) => item.activityType),
    datasets: [
      {
        label: "# of Votes",
        data: dashboardData.activityPerWeek.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        borderAlign: "center",
      },
    ],
  };

  return (
    <>
      <NavbarLoggedIn />
      <div
        id="dashboard"
        className="object-cover max-w-screen-2xl mx-auto flex flex-row mt-[0px]"
      >
        {/* SideInformation */}
        <div id="user-profile" className=" z-0 w-1/4 lg:block hidden">
          <SideInformation />
        </div>

        {/* dashboard */}
        <div
          id="data-dashboard"
          className=" lg:w-3/4 lg:p-[30px] justify-center text-start bg-gray-100 w-full "
        >
          <h1 className="pl-0 m-4">
            <strong> DASHBOARD</strong>
          </h1>
          <h3 className="pl-0 m-4">
            <strong>WEEKLY OVERVIEW</strong>
          </h3>

          <div
            id="card_sleep_BMI"
            className=" -z-1 flex lg:flex-row lg:justify-around lg:py-[30px] flex-col justify-around gap-y-5 pt-[30px] m-10"
          >
            <div id="card-sleep" className=" lg:w-[45%] items-center w-full ">
              <div className="card bg-base-300">
                <div className="card-body">
                  <p>4.25</p>
                  <h2 className="card-title">Hours</h2>
                  <div className="card-actions justify-end">
                    <BiSolidMoon />
                  </div>
                </div>
              </div>
            </div>

            <div
              id="card-BMI"
              className="lg:w-[45%] items-center w-full pb-[30px]"
            >
              <div className="card bg-base-300">
                <div className="card-body">
                  <p>16.65</p>
                  <h2 className="card-title">BMI</h2>
                  <div className="flex justify-center">
                    {/* <ul className="">
                      <li className="">underweight</li>
                      <li className="">normal</li>
                      <li className="">overweight</li>
                      <li className="">obese</li>
                      <li className="">extremly obese</li>
                    </ul> */}
                  </div>
                  <div className="flex  justify-end">
                    <svg
                      width="16px"
                      height="16px"
                      viewBox="0 -0.5 17 17"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="si-glyph si-glyph-wieght"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>1010</title> <defs> </defs>{" "}
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          {" "}
                          <path
                            d="M16,6.079 L16,5 L14.045,5 L14.045,8 L4,8 L4,5.041 L2,5.041 L2,6.052 L1.039,6.052 L1.039,11.958 L2,11.958 L2,12.955 L4,12.955 L4,10 L14.045,10 L14.045,12.996 L16,12.996 L16,11.958 L17,11.958 L17,6.079 L16,6.079 Z"
                            fill="#000000"
                            class="si-glyph-fill"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* chart */}
          <div
            id="data-chart"
            className=" flex lg:flex-row lg:justify-around lg:p-[30px] flex-col justify-around gap-y-5 m-10"
          >
            <div
              id="bar-chart-activity-duration"
              className=" bg-base-300 p-3 rounded-lg h-[300px] lg:w-2/4 lg:mr-[15px] flex justify-center items-center w-full"
            >
              <Bar
                data={BarChartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Activity Duration",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>

            <div
              id="pie-chart-activity-type"
              className=" bg-base-300 p-3 rounded-lg m-auto h-[300px] lg:w-2/4 lg:ml-[15px] flex justify-center items-center w-full"
            >
              <Pie
                data={PieChartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Your Activity Type In The Week",
                    },
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
