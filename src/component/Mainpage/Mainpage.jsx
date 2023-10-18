import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx"
import SideInformation from "../navbar/SideInformationBar.jsx"
import { useState } from "react";
import {HiOutlinePlusSm,HiOutlinePresentationChartLine,HiOutlineMoon} from 'react-icons/hi'
import MockupProfile from "../../assets/blank-profile-picture-973460_960_720.jpg"

function getDate() {
    const today = new Date();
    const month = today.getMonth() +1 ;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
}

const Mainpage = () => {

    // eslint-disable-next-line no-unused-vars
    const [currentDate, setCurrentDate] = useState(getDate());
    const username = "username";

    return (
        <>
            <NavbarLoggedIn />
            <div className="flex flex-row max-w-screen-2xl my-0 mx-auto md:m-auto">
                
                <aside className="lg:w-1/4 hidden lg:block shadow-lg">
                <SideInformation />
                </aside>
                
                <div className="lg:w-2/4 flex flex-col bg-gray-100 items-center">
                    
                    <div className="m-6 self-start">
                    <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
                    <p className="">{currentDate}</p>
                    </div>
                    <img src="https://images.pexels.com/photos/12169236/pexels-photo-12169236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="banner" className="w-[80%] h-[20%]" />
                    
                    {/* Form Area */}
                    {/* Crete Activity Area */}
                    <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
                        <figure className="w-[20%] avatar">
                        <HiOutlinePlusSm className="w-[70%] h-[60%] rounded-full"/>
                        </figure>
                        <div className="card-body">
                            <p className="font-bold">Create you activity</p>
                            <p>Add your new activity here</p>
                            <button className="btn btn-sm btn-accent rounded-full w-[40%]">Create Activity</button>
                        </div>
                    </div>
                    {/* Dashboard Area */}
                    <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
                        <figure className="w-[20%] avatar">
                        <HiOutlinePresentationChartLine className="w-[55%] h-[60%] rounded-full"/>
                        </figure>
                        <div className="card-body">
                            <p className="font-bold">Dashboard checkout</p>
                            <p>Let`s see how much times you spent on your exercise</p>
                            <button className="btn btn-sm btn-accent rounded-full w-[40%]">Dashboard</button>
                        </div>
                    </div>
                    {/* Sleep Time Area */}
                    <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] my-4">
                        <figure className="w-[20%] avatar">
                        <HiOutlineMoon className="w-[55%] h-[60%] rounded-full"/>
                        </figure>
                        <div className="card-body w-[80%]">
                            <p className="font-bold">Sleep Time</p>
                            <p>How was your night ? Enter your sleep and wake up time to track your sleeping</p>
                            <div className="flex flex-row">
                                <label htmlFor="sleep" className="self-center mr-2">Sleep Time:</label>
                                <input id="sleep"type="time" className="input input-bordered input-sm w-[40%] max-w-xs" />
                            </div>
                            <div className="flex flex-row">
                                <label htmlFor="wakeup" className="self-center mr-2">Wake Up:</label>
                                <input id="wakeup"type="time"className="input input-bordered input-sm w-[40%] max-w-xs" />
                            </div>
                            <button className="btn btn-sm btn-accent rounded-full w-[40%]">Save</button>
                        </div>
                    </div>
                    {/* Edit Sleep Time Area */}
                    <div className="card card-side card-compact bg-base-300 shadow-xl w-[80%] mt-4 mb-6">
                        <figure className="w-[20%] avatar">
                        <HiOutlineMoon className="w-[55%] h-[60%] rounded-full"/>
                        </figure>
                        <div className="card-body">
                            <p className="font-bold">Sleep Time</p>
                            <div className="flex flex-row">
                                <label htmlFor="sleep" className="self-center mr-2">Edit:</label>
                                <input id="sleep"type="time" className="input input-bordered input-sm w-[40%] max-w-xs" />
                                <button className="btn btn-sm btn-accent rounded-full w-[30%] mx-4">Save</button>
                            </div>
                        </div>
                    </div>
                    {/* End Form Area */}
                </div>
                <div className="hidden lg:flex flex-col lg:w-1/4 shadow-md">
                    <div className="m-6 self-start">
                    <h1 className="text-3xl font-semibold">Connection</h1>
                    </div>
                    <div className="mx-6 my-4 grid grid-rows-3 grid-flow-col gap-10 ">
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    <img src={MockupProfile} className="w-[72px] rounded-full"/>
                    </div>
                    <a className="self-end mx-4">More</a>
                </div>
            </div>
        </>
    )
}

export default Mainpage