import "./DashBoard.css";
import NavbarLoggedIn from "./NavbarLoggedIn";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { BiSolidMoon } from "react-icons/bi";
import { HiMiniFire } from "react-icons/hi2";
import SideInformation from "./SideInformationBar";

export const DashBoard = () => {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const BarChartData = {
    labels: labels,
    datasets: [
      {
        label: "My Duation (min.)",
        data: [65, 59, 80, 81, 56, 55, 40],
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
    labels: ["Run", "Swim", "Weigth", "Bike", "Yoga"],
    datasets: [
      {
        label: "# of Votes",
        data: [4, 0, 1, 0, 1],
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
      <div className="dashboard object-cover">
        {/* SideInformation */}
        <div className="user-profile">
          <SideInformation />
        </div>
        {/* dashboard */}
        <div className="data-dashboard  bg-gray-100">
          <h1>
            <strong> DASHBOARD</strong>
          </h1>
          <h3>
            <strong>WEEKLY OVERVIEW</strong>
          </h3>
          {/* Card sleep & cal */}
          <div className="summarize-sleep-cal">
            <div className="data-sleep ">
              <div className="card bg-base-300 ">
                <div className="card-body">
                  <p>4.25</p>
                  <h2 className="card-title">Hours</h2>
                  <div className="card-actions justify-end">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                    <BiSolidMoon />
                  </div>
                </div>
              </div>
            </div>
            <div className="data-calories">
              <div className="card bg-base-300">
                <div className="card-body">
                  <p>300</p>
                  <h2 className="card-title">Calories</h2>
                  <div className="card-actions justify-end">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                    <HiMiniFire />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="data-chart">
            <div className="bar-chart-activity-duration ">
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
            <div className="pie-chart-activity-type ">
              <Pie
                data={PieChartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Your Activity Type In The Week",
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
