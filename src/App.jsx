import "./App.css";
import { DashBoard } from "./component/DashBoard";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React from 'react';

// import NavbarLoggedIn from "./component/NavbarLoggedIn";
// import SideInformation from "./component/SideInformationBar.jsx";
Chart.register(CategoryScale);


function App() {
  return (
    <>
      {/* <NavbarLoggedIn />
      <SideInformation /> */}
      <DashBoard />
    </>
  );
}

export default App;
