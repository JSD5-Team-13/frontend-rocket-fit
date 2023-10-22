/* eslint-disable react/no-unknown-property */
import LogoFull from '../../assets/logo-full.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState , useEffect } from 'react'
import axios from 'axios'

const NavbarLoggedIn = () => {
    const navigate = useNavigate()
    const [userId , setUserId] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("rockettoken");
        if (token) {
          axios.get("http://127.0.0.1:8000/users", {
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
    }, [userId]);
    return (
        <div className="navbar bg-neutral h-[5rem] fixed z-10">
            {/* Navigation Bar Start */}
            <div className="navbar-start">
                <a href="/main"><img src={LogoFull} alt='logo' className='hidden w-auto h-10 mx-4 lg:block' /></a>
                <a href="/main"><img src={Logo} alt='logo' className='w-auto h-10 mx-4 lg:hidden' /></a>
            </div>
            {/* Navigation Bar End */}
            <div className="navbar-end">
                <div className="hidden lg:block laptop:block">
                    <div className="px-4 dropdown dropdown-hover dropdown-end">
                        <label tabIndex={0} className="text-white">Connection</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a href='/connection'>Connection</a></li>
                            <li><a href='/myfeed'>My Feed</a></li>
                        </ul>
                    </div>
                    <div className="px-4 dropdown dropdown-hover dropdown-end">
                        <label tabIndex={0} className="text-white">Training Tab</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a href="/calendar">Training Calendar</a></li>
                        </ul>
                    </div>
                    <div className="px-4 dropdown dropdown-hover dropdown-end">
                        <label tabIndex={0} className="text-white">My Activity</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a href='/activity'>My Activity</a></li>
                            <li><a href='/dashboard'>Dashboard</a></li>
                        </ul>
                    </div>
                    <div className="px-4 dropdown dropdown-hover dropdown-end">
                        <label tabIndex={0} className="text-white">Profile</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a href='/account'>Setting</a></li>
                            <li><button
                            onClick={() => (
                                localStorage.clear(), 
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Logout Success'
                                  }).then(
                                navigate("/login")))}>Log Out</button></li>
                        </ul>
                    </div>
                </div>
                {/* Mobile Navigation Bar */}
                <div className="drawer-end lg:hidden z-10">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="drawer-button">
                            <GiHamburgerMenu className='w-6 h-6 mx-4 text-white' />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <p className='underline'>Connection</p>
                            <li><a href='/connection'>Connection</a></li>
                            <li><a href='/feed'>My Feed</a></li>
                            <p className='underline'>Training Tab</p>
                            <li><a href='/calendar'>Training Calendar</a></li>
                            <p className='underline'>My Activity</p>
                            <li><a href='/activity'>My Activity</a></li>
                            <li><a href='/dashboard'>Dashboard</a></li>
                            <p className='underline'>Profile</p>
                            <li><a href='/account'>Setting</a></li>
                            <li><a>Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarLoggedIn