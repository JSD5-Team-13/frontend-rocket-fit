/* eslint-disable react/no-unknown-property */
import LogoFull from '../assets/logo-full.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Logo from '../assets/logo.png'

const NavbarLoggedIn = () => {
    return (
        <div className="navbar bg-neutral">
            {/* Navigation Bar Start */}
            <div className="navbar-start">
                <img src={LogoFull} alt='logo' className='hidden lg:block w-auto h-10 mx-4' />
                <img src={Logo} alt='logo' className='lg:hidden w-auto h-10 mx-4' />
            </div>
            {/* Navigation Bar End */}
            <div className="navbar-end">
                <div className="hidden lg:block">
                    <div className="dropdown dropdown-hover dropdown-end px-4">
                        <label tabIndex={0} className="text-white">Connection</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a>Connection</a></li>
                            <li><a>My Feed</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover dropdown-end px-4">
                        <label tabIndex={0} className="text-white">Training Tab</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a>Training Tab</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover dropdown-end px-4">
                        <label tabIndex={0} className="text-white">My Activity</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a>My Activity</a></li>
                            <li><a>Dashboard</a></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover dropdown-end px-4">
                        <label tabIndex={0} className="text-white">Profile</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                            <li><a>Setting</a></li>
                            <li><a>Log Out</a></li>
                        </ul>
                    </div>
                </div>
                {/* Mobile Navigation Bar */}
                <div className="drawer-end">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="drawer-button">
                            <GiHamburgerMenu className='text-white w-6 h-6 mx-4' />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <p className='underline'>Connection</p>
                            <li><a>Connection</a></li>
                            <li><a>My Feed</a></li>
                            <p className='underline'>Training Tab</p>
                            <li><a>Training Tab</a></li>
                            <p className='underline'>My Activity</p>
                            <li><a>My Activity</a></li>
                            <li><a>Dashboard</a></li>
                            <p className='underline'>Profile</p>
                            <li><a>Setting</a></li>
                            <li><a>Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarLoggedIn