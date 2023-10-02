import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarLoggedIn from "../NavbarLoggedIn";
import SideInformation from "../SideInformationBar";
import CardDisplay from "../Activity/CardDisplay";
import axios from "axios";

const MyActivity = () => {
  const [activities, setActivities] = useState([]);
  const [reload, setReload] = useState(false);

  // Get data
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://earth-testapi-new-com.onrender.com/activities"
      );
      setActivities(response.data);
      console.log("Got Successfully!", response);
    };
    getData();
  }, [reload]);

  // Update Data
  const updateData = async (
    _id,
    date,
    duration,
    activity_type,
    activity_name,
    activity_describe,
    image
  ) => {
    const requestData = {
      _id: _id,
      date: date,
      duration: duration,
      activity_type: activity_type,
      activity_name: activity_name,
      activity_describe: activity_describe,
      image: image,
    };
    const response = await axios.put(
      `https://earth-testapi-new-com.onrender.com/activities/${_id}`,
      requestData
    );

    if (response.status === 200) {
      setReload(!reload);
      console.log("Updated Successfully!", response);
    }
  };

  // Delete Data
  const deleteData = async (_id) => {
    const response = await axios.delete(
      `https://earth-testapi-new-com.onrender.com/activities/${_id}`
    );

    if (response.status === 200) {
      setReload(!reload);
      console.log("Deleted Successfully!", response);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen lg:bg-gray-300">
      <nav className="fixed top-0 z-[100] w-full max-w-screen-2xl">
        <NavbarLoggedIn />
      </nav>

      <main className="flex lg:bg-gray-300">
        {/* Side Profile */}
        <aside className="hidden lg:fixed mt-16 lg:max-w-[25%] bg-white px-2 lg:block ">
          <SideInformation />
        </aside>

        {/* Activity Cards Display*/}
        <section className="mt-16 lg:ml-[25%] lg:pl-4 lg:w-[75%] lg:bg-gray-300 lg:relative">
          <h1 className="text-[2rem] my-5 text-center font-bold lg:text-left lg:ml-10">
            My Activity
          </h1>

          {/* Create Button */}

          <button className="hidden lg:block btn btn-circle bg-[#1CD6CE] hover:bg-[#1CD6CE] border-none text-white text-[1.5rem] lg:absolute lg:top-6 lg:right-6 z-50">
            <AiOutlinePlus className="ml-3" />
          </button>

          {/* Card Display */}
          <article className="w-screen lg:w-full">
            <CardDisplay
              activities={activities}
              deleteData={deleteData}
              updateData={updateData}
            />
          </article>
        </section>
      </main>
    </div>
  );
};

export default MyActivity;
