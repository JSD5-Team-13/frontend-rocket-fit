import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home  from './component/Home/Home.jsx';
import Register from './component/Register/Register.jsx'
import { LogIn } from './component/Login/LogIn.jsx';
import Mainpage from './component/Mainpage/Mainpage.jsx';
import ActivityForm from './component/Activity/CreateActivity.jsx';
import MyActivity from './component/Activity/MyActivity.jsx';
import MyFeed from './component/Feed/MyFeed.jsx';
import FriendFeed from './component/Feed/FriendFeed.jsx';
import { DashBoard } from './component/Dashboard/DashBoard.jsx';
import CalendarMain from './component/Calandar/Calendar.jsx';
import AccountSetting from './component/Account/AccountSetting.jsx';
import { ResetPassword } from './component/Login/ResetPassword';
import CreateProfile from './component/CreateProfile/CreateProfile';

const router = createBrowserRouter ([
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/register",
    element : <Register />
  },
  {
    path : "/login",
    element : <LogIn />,
  },
  {
    path : "/forget_password",
    element : <ResetPassword />
  },
  {
    path : "/create_profile",
    element : <CreateProfile />
  },
  {
    path : "/main",
    element : <Mainpage />
  },
  {
    path : "/create_activity",
    element : <ActivityForm />
  },
  {
    path : "/activity",
    element : <MyActivity />
  },
  {
    path : "/myfeed",
    element : <MyFeed />
  },
  {
    path : "/friendfeed",
    element : <FriendFeed />
  },
  {
    path : "/dashboard",
    element : <DashBoard />
  },
  {
    path : "/calendar",
    element : <CalendarMain />
  },
  {
    path : "/account",
    element : <AccountSetting />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
