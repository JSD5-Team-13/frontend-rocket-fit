import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import SideInformation from "../navbar/SideInformationBar.jsx";
import CardDisplay from "./ComponentActivity/CardDisplay";
import axios from "axios";

const MyActivity = () => {
  const [activities, setActivities] = useState([]);
  const [reload, setReload] = useState(false);

  // Get data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://earth-testapi-new-com.onrender.com/activities"
        );
        setActivities(response.data);
        console.log("Got data Successfully!", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
    image,
    status
  ) => {
    try {
      const requestData = {
        _id: _id,
        date: date,
        duration: duration,
        activity_type: activity_type,
        activity_name: activity_name,
        activity_describe: activity_describe,
        image: image,
        status: status
      };
      const response = await axios.put(
        `https://earth-testapi-new-com.onrender.com/activities/${_id}`,
        requestData
      );

      if (response.status === 200) {
        setReload(!reload);
        console.log("Updated Successfully!", response);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Delete Data
  const deleteData = async (_id) => {
    try {
      const response = await axios.delete(
        `https://earth-testapi-new-com.onrender.com/activities/${_id}`
      );

      if (response.status === 200) {
        setReload(!reload);
        console.log("Deleted Successfully!", response);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-[100] w-full">
        <NavbarLoggedIn />
      </nav>

      <main className="flex max-w-screen-2xl mx-auto mt-[5rem]">
        {/* Side Profile */}
        <aside className="hidden bg-white lg:fixed lg:w-1/4 2xl:max-w-[385px] lg:block">
          <SideInformation />
        </aside>

        {/* Activity Cards Display*/}
        <section className="lg:pl-4 lg:w-3/4 lg:ml-[25%] lg:bg-gray-300 lg:relative min-h-screen">
          <h1 className="text-[2rem] my-5 text-center font-bold lg:text-left  lg:ml-10">
            My Activity
          </h1>

          {/* Create Button link */}
          <a
            href="/create_activity"
            className="hidden lg:flex btn btn-circle bg-[#1CD6CE] hover:bg-[#1CD6CE] border-none text-white text-[1.5rem] lg:absolute lg:top-6 lg:right-6 z-50"
          >
            <AiOutlinePlus />
          </a>

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
