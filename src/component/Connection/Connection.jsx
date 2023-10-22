import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const Connection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState([
    { name: "John Doe", image: "john-doe.jpg", isFollowing: false },
    { name: "Jane Smith", image: "jane-smith.jpg", isFollowing: false },
    { name: "Alice Johnson", image: "alice-johnson.jpg", isFollowing: false },
    // Add more connection objects here with 'name' and 'image' properties.
  ]);
  const [activeTab, setActiveTab] = useState("following"); // 'following' or 'followers'
  const [isSearching, setIsSearching] = useState(false); // Track if a search is active
  const [isFollowing, setIsFollowing] = useState(false); // Track if a user is followed or unfollowed
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            setUserId(response.data.id);
            try {
              const userDataResponse = await axios.get(
                `http://127.0.0.1:8000/users/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (userDataResponse.status === 200) {
                setUserData(userDataResponse.data);
              } else {
                console.log("fetch user data error");
              }
            } catch (error) {
              console.log("Error fetching user data from the database", error);
            }
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log("Error fetching user data from the database", error);
        });
    }
  }, [userId]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true); // A search is active
  };

  const toggleFollow = (index) => {
    const updatedConnections = [...connections];
    updatedConnections[index].isFollowing =
      !updatedConnections[index].isFollowing;
    setConnections(updatedConnections);
    setIsFollowing(true); // A user has been followed/unfollowed
  };

  const filteredConnections = connections.filter((connection) => {
    return connection.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Create a list of all connection names for the datalist
  const connectionNames = connections.map((connection) => connection.name);

  return (
    <>
      <NavbarLoggedIn />
      <div className="max-w-screen-xl m-auto h-[80vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center mt-[110px] mb-4 lg:mb-[2rem] lg:self-start gap-4 ">
            <h1 className="text-[2rem] font-bold uppercase">Connection</h1>
            <form className="flex relative items-center justify-end ">
              <button className="absolute text-2xl m-3">
                <AiOutlineSearch />
              </button>
              <input
                placeholder="Search"
                className="input input-ghost input-sm w-full max-w-xl bg-[#D9D9D9] text-center rounded-2xl"
                value={searchQuery}
                onChange={handleSearchInputChange}
                list="connectionsList" // Link the input to the datalist
              />
              {/* Create a datalist with options for connection names */}
              <datalist id="connectionsList">
                {connectionNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </form>
          </div>

          <div className="flex">
            {isSearching && (
              <button
                className={`${
                  activeTab === "following"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } py-2 px-4 rounded-l-xl`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            )}
            {isSearching && (
              <button
                className={`${
                  activeTab === "followers"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } py-2 px-4 rounded-r-xl`}
                onClick={() => setActiveTab("followers")}
              >
                Followers
              </button>
            )}
          </div>

          <div className="w-[90%] lg:w-[70%] flex flex-col items-center lg:grid lg:grid-cols-2 lg:justify-items-center bg-base-300 p-4 my-4 rounded-xl">
            {activeTab === "following" && isSearching && (
              <>
                {filteredConnections.map((connection, index) => (
                  <div
                    key={index}
                    className="card w-[95%] bg-base-100 shadow-xl my-4"
                  >
                    <div className="card-body">
                      <div className="flex flex-row items-center">
                        <img
                          src={connection.image}
                          alt="profile"
                          className="rounded-full w-24 h-24 mr-4"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-bold text-lg my-2">
                            {connection.name}
                          </h1>
                          <button
                            className={`btn btn-sm btn-accent rounded-2xl ${
                              connection.isFollowing ? "bg-red-500" : ""
                            }`}
                            onClick={() => toggleFollow(index)}
                          >
                            {connection.isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "followers" && isSearching && (
              <>
                {filteredConnections.map((connection, index) => (
                  <div
                    key={index}
                    className="card w-[95%] bg-base-100 shadow-xl my-4"
                  >
                    <div className="card-body">
                      <div className="flex flex-row items-center">
                        <img
                          src={connection.image}
                          alt="profile"
                          className="rounded-full w-24 h-24 mr-4"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-bold text-lg my-2">
                            {connection.name}
                          </h1>
                          <button
                            className={`btn btn-sm btn-accent rounded-2xl ${
                              connection.isFollowing ? "bg-red-500" : ""
                            }`}
                            onClick={() => toggleFollow(index)}
                          >
                            {connection.isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Connection;
