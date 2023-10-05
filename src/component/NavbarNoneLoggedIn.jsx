/* eslint-disable react/no-unknown-property */
import LogoFull from '../assets/logo-full.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <div className="navbar bg-neutral h-[7rem]">
            <div className="navbar-start">
                <img src={LogoFull} alt='logo' className='hidden lg:block w-auto h-10 mx-4' />
                <img src={Logo} alt='logo' className='lg:hidden w-auto h-10 mx-4' />
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1 text-white hidden lg:flex">
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Contact Us</a></li>
                    <li><a>Register</a></li>
                </ul>
                <a className="btn bg-accent btn-sm lg:mx-4">Sign In</a>
                <div className="drawer-end lg:hidden">
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
                            <li><a>Home</a></li>
                            <li><a>About</a></li>
                            <li><a>Contact Us</a></li>
                            <li><a>Register</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar