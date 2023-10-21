import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import SideInformation from "../navbar/SideInformationBar.jsx";
import CardDisplay from "./ComponentActivity/CardDisplay";
import axios from "axios";

const MyActivity = () => {
  const [activities, setActivities] = useState([]);
  const [reload, setReload] = useState(false);
  const [userId, setUserId] = useState("");

  // Get all activity cards
  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      // Fetch user data
      axios.get("http://127.0.0.1:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data.id);
          axios.get(`http://127.0.0.1:8000/activity?userId=${userId}`)
          .then((response) => {
            if (response.status === 200) {
              setActivities(response.data);
            } else {
              console.log("Failed to fetch memos");
            }
          })
          .catch((error) => {
            console.log("Error fetching memos from the database", error);
          });
        } else {
          console.log("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.log("Error fetching user data from the database", error);
      });
    }
  }, [userId]);

  // Update a activity card
  const updateData = async (
    _id,
    date,
    duration,
    activity_type,
    activity_name,
    activity_describe,
    image,
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
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/activity/${_id}`,
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

  // Delete a activity card
  const deleteData = async (_id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/activity/${_id}`
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
          <h1 className="text-[2rem] my-5 text-center uppercase font-bold lg:text-left  lg:ml-10">
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
