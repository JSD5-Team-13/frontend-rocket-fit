import MockupProfile from "../assets/blank-profile-picture-973460_960_720.jpg"

const SideInformation = () => {
    return (
        <div className="w-1/4 h-[100vh] border-solid border-2 flex-col items-center hidden lg:flex">
            <div className="avatar">
                <div className="w-32 h-32 my-6 rounded-full">
                    <img src={MockupProfile} />
                </div>
            </div>
            <div className="mb-6">
                <p>Your Name</p>
            </div>
            <div className="flex flex-row w-[100%] justify-around mb-6">
                <div className="flex flex-col ">
                    <label htmlFor="height">Height</label>
                    <p id="height" className="badge badge-accent ">Height</p>
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="weight">Weight</label>
                    <p id="weight" className="badge badge-accent">Weight</p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="age">Age</label>
                    <p id="age" className="badge badge-accent">Age</p>
                </div>
            </div>
            <h2 className="self-start mx-7">Lastest Activity</h2>
            <div className="card card-compact w-[90%] bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
            <div className="card card-compact w-[90%] bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
            </div>
        </div>
    )
}

export default SideInformation