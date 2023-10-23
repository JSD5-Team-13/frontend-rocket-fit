import { useState, useContext } from "react";
import { userContext } from "../context/userContext";
import MockupProfile from "../../assets/blank-profile-picture-973460_960_720.jpg";

const SideInformation = () => {
  const [activity, setActivity] = useState([]);
  const maxItems = 2;
  const displayedData = activity.slice(0, maxItems);
  const { userData , eachUserData} = useContext(userContext);

  return (
    <div className="w-full laptop:w-full h-[100vh] border-solid border-2 flex-col items-center hidden laptop:flex lg:flex">
      <div className="avatar">
        <div className="w-32 h-32 my-6 rounded-full">
          <img src={MockupProfile} />
        </div>
      </div>
      <div className="mb-6">
        <p>{userData.firstname}</p>
      </div>
      <div className="flex flex-row w-[100%] justify-around mb-6">
        <div className="flex flex-col ">
          <label htmlFor="height" className="self-center">
            Height
          </label>
          <p id="height" className="badge badge-accent ">
            {userData.height}
          </p>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="weight" className="self-center">
            Weight
          </label>
          <p id="weight" className="badge badge-accent">
            {userData.weight}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="age" className="self-center">
            Age
          </label>
          <p id="age" className="badge badge-accent">
            {userData.age}
          </p>
        </div>
      </div>
      <button className="btn btn-xs btn-accent rounded-full w-[40%] mb-6">
        Edit your profile
      </button>
      <h2 className="self-start mx-7">Lastest Activity</h2>
      {displayedData.map((activity, index) => (
        <div
          key={index}
          className="card card-compact w-[90%] bg-base-300 shadow-xl my-2"
        >
          <div className="card-body">
            <h2 className="card-title">{activity.activity_name}</h2>
            <p>{activity.activity_describe}</p>
            <div className="justify-end card-actions">
              {/* Add card actions here if needed */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideInformation;
