import "./App.css";
// import { DashBoard } from "./component/DashBoard";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React from "react";
import { LogIn } from "./component/LogIn";
// import { ResetPassword } from "./component/ResetPassword";
// import NavbarLoggedIn from "./component/NavbarLoggedIn";
// import SideInformation from "./component/SideInformationBar.jsx";
Chart.register(CategoryScale);
// import Mainpage from './component/Mainpage/Mainpage'

function App() {
  return (
    <>
      {/* <NavbarLoggedIn />
      <SideInformation /> */}
      {/* <DashBoard /> */}
      <LogIn />
      {/* <ResetPassword /> */}
      {/* <Mainpage /> */}
    </>
  );
}

export default App;
