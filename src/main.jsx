import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./component/Home/Home.jsx";
import Register from "./component/Register/Register.jsx";
import { LogIn } from "./component/Login/LogIn.jsx";
import Mainpage from "./component/Mainpage/Mainpage.jsx";
import ActivityForm from "./component/Activity/CreateActivity.jsx";
import MyActivity from "./component/Activity/MyActivity.jsx";
import MyFeed from "./component/Feed/MyFeed.jsx";
import { DashBoard } from "./component/Dashboard/DashBoard.jsx";
import CalendarMain from "./component/Calandar/Calendar.jsx";
import AccountSetting from "./component/Account/AccountSetting.jsx";
import { ResetPassword } from "./component/Login/ResetPassword";
import CreateProfile from "./component/CreateProfile/CreateProfile";
import Connection from "./component/Connection/Connection.jsx";
import { UserProvider } from "./component/context/userContext";
import ProtectRoute from "./component/ProtectRoute.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/forget_password",
    element: <ResetPassword />,
  },
  {
    path: "/create_profile",
    element: 
    <ProtectRoute>
    <CreateProfile />
    </ProtectRoute>
  },
  {
    path: "/main",
    element: 
    <ProtectRoute>
    <Mainpage />
    </ProtectRoute>
  },
  {
    path: "/create_activity",
    element: 
    <ProtectRoute>
    <ActivityForm />
    </ProtectRoute>,
  },
  {
    path: "/activity",
    element: 
    <ProtectRoute>
    <MyActivity />
    </ProtectRoute>,
  },
  {
    path: "/myfeed/:userId",
    element: 
    <ProtectRoute>
    <MyFeed />
    </ProtectRoute>,
  },
  {
    path: "/dashboard",
    element: 
    <ProtectRoute>
    <DashBoard />
    </ProtectRoute>,
  },
  {
    path: "/calendar",
    element: 
    <ProtectRoute>
    <CalendarMain />
    </ProtectRoute>,
  },
  {
    path: "/account",
    element: 
    <ProtectRoute>
    <AccountSetting />
    </ProtectRoute>,
  },
  {
    path: "/connection",
    element: 
    <ProtectRoute>
    <Connection />
    </ProtectRoute>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
