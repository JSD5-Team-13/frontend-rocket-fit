import "./DashBoard.css";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import { Bar, Pie } from "react-chartjs-2";
import { BiSolidMoon } from "react-icons/Bi";
import { HiMiniFire } from "react-icons/hi2";
import SideInformation from "../navbar/SideInformationBar.jsx";
import { CategoryScale, Chart, registerables } from "chart.js";

export const DashBoard = () => {
  Chart.register(CategoryScale);
  Chart.register(...registerables);
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
      <div className="dashboard object-cover max-w-screen-2xl mx-auto my-0">
        {/* SideInformation */}
        <div className="user-profile z-0">
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
          <div className="summarize-sleep-cal -z-1">
            <div className="data-sleep ">
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
            <div className="data-calories">
              <div className="card bg-base-300">
                <div className="card-body">
                  <p>300</p>
                  <h2 className="card-title">Calories</h2>
                  <div className="card-actions justify-end">
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
