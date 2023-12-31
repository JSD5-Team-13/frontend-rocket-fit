/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { userContext } from "../context/userContext";

const Connection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userId, setUserId] = useState("");
  const { userData, setUserData } = useContext(userContext);
  const [activeTab, setActiveTab] = useState("following");
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  //get followers data
  useEffect(() => {
    // Check if userData.followers is available
    if (userData.followers && userData.followers.length > 0) {
      const token = localStorage.getItem("rockettoken");
      const fetchFollowersData = async () => {
        try {
          const followersPromises = userData.followers.map((userId) =>
            axios.get(`https://rocket-fit-api.onrender.com/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );

          const followersResponses = await Promise.all(followersPromises);

          const followersData = followersResponses.map((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              console.error("Error fetching followers data");
              return null; // Handle the error case here
            }
          });

          setFollowersData(followersData.filter((user) => user));
        } catch (error) {
          console.error("Error fetching followers data", error);
        }
      };
      fetchFollowersData();
    }
  }, [userData.followers]); // Use userId as a dependency

  //following data
  useEffect(() => {
    // Check if userData.following is available
    if (userData.following && userData.following.length > 0) {
      const token = localStorage.getItem("rockettoken");
      const fetchFollowingData = async () => {
        try {
          const followingPromises = userData.following.map((userId) =>
            axios.get(`https://rocket-fit-api.onrender.com/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );

          const followingResponses = await Promise.all(followingPromises);

          const followingData = followingResponses.map((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              console.error("Error fetching following data");
              return null; // Handle the error case here
            }
          });

          setFollowingData(followingData.filter((user) => user));
        } catch (error) {
          console.error("Error fetching following data", error);
        }
      };
      fetchFollowingData();
    }
  }, [userData.following]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    performSearch(query);
  };

  const performSearch = (query) => {
    if (query) {
      const token = localStorage.getItem("rockettoken");
      axios
        .get(`https://rocket-fit-api.onrender.com/all?firstname=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((searchResponse) => {
          if (searchResponse.status === 200) {
            setSearchResults(searchResponse.data);
          } else {
            console.error("Error fetching search results");
          }
        })
        .catch((error) => {
          console.error("Error fetching search results", error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleFollow = (user) => {
    const token = localStorage.getItem("rockettoken");
    const userId = user._id;

    // Check if the user is already being followed
    if (userData.following.includes(userId)) {
      // If the user is already being followed, send an unfollow request
      axios
        .post(
          `https://rocket-fit-api.onrender.com/connection/unfollow/${userId}`,
          { userid: userData.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Update your UI or user data as needed to reflect that the user is now unfollowed
            // Example: setUserData({ ...userData, following: userData.following.filter(id => id !== userId) });
            setUserData({
              ...userData,
              following: userData.following.filter((id) => id !== userId),
            });
          } else {
            console.error("Failed to unfollow user");
          }
        })
        .catch((error) => {
          console.error("Error unfollowing user", error);
        });
    } else {
      // If the user is not being followed, send a follow request
      axios
        .post(
          `https://rocket-fit-api.onrender.com/connection/follow/${userId}`,
          { userid: userData.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Update your UI or user data as needed to reflect that the user is now being followed
            // Example: setUserData({ ...userData, following: [...userData.following, userId] });
            setUserData({
              ...userData,
              following: [...userData.following, userId],
            });
          } else {
            console.error("Failed to follow user");
          }
        })
        .catch((error) => {
          console.error("Error following user", error);
        });
    }
  };

  return (
    <>
      <NavbarLoggedIn />
      <div className="max-w-screen-xl m-auto h-[80vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center mt-[110px] mb-4 lg:mb-[2rem] lg:self-start gap-4">
            <h1 className="text-[2rem] font-bold uppercase">Connection</h1>
            <form className="flex relative items-center justify-end">
              <button className="absolute text-2xl m-3">
                <AiOutlineSearch />
              </button>
              <input
                placeholder="Search"
                className="input input-ghost input-sm w-full max-w-xl bg-[#D9D9D9] text-center rounded-2xl"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {isSearching && searchResults && searchResults.length > 0 && (
            <div className="w-[90%] lg:w-[70%] flex flex-col items-center bg-base-300 p-4 my-4 rounded-xl">
              <div>
                <h2 className="text-xl font-bold my-2">
                  Search Results: {searchResults.length}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {searchResults.map((user, index) => (
                    <div
                      key={index}
                      className="card w-[80%] lg:w-[100%] max-w-[425px] bg-base-100 shadow-xl my-4"
                    >
                      <div className="card-body">
                        <div className="flex flex-row items-center">
                          <img
                            src={user.image}
                            alt="profile"
                            className="rounded-full w-[72px] h-[72px] mr-4 object-cover"
                          />
                          <div className="flex flex-col">
                            <h1 className="font-bold text-lg my-2">
                              <a href={`/myfeed/${user._id}`}>
                                {user.FirstName} {user.LastName}
                              </a>
                            </h1>
                          </div>
                          <button
                            className="p-2 btn btn-sm btn-accent rounded-full ml-auto"
                            onClick={() => handleFollow(user)}
                          >
                            {userData.following.includes(user._id)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              className={`mr-2 p-2 rounded-lg ${
                activeTab === "following"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
            <button
              className={`p-2 rounded-lg ${
                activeTab === "followers"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("followers")}
            >
              Followers
            </button>
          </div>
          {activeTab === "following" &&
            followingData.length > 0 && (
              <div>
                <h2 className="text-xl font-bold my-2">
                  Following: {followingData.length}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {followingData.map((user, index) => (
                    <div
                      key={index}
                      className="card w-[425px] bg-base-100 shadow-xl my-4"
                    >
                      <div className="card-body">
                        <div className="flex flex-row items-center">
                          <img
                            src={user.image}
                            alt="profile"
                            className="rounded-full w-[72px] h-[72px] mr-4 object-cover"
                          />
                          <div className="flex flex-col">
                            <h1 className="font-bold text-lg my-2">
                              <a href={`/myfeed/${user._id}`}>
                                {user.FirstName} {user.LastName}
                              </a>
                            </h1>
                            {/* Add more user details here */}
                          </div>
                          <button
                            className="p-2 btn btn-sm btn-accent rounded-full ml-auto"
                            onClick={() => handleFollow(user)}
                          >
                            {userData.following.includes(user._id)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {activeTab === "followers" &&
            followersData.length > 0 && (
              <div>
                <h2 className="text-xl font-bold my-2">
                  Followers: {followersData.length}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {followersData.map((user, index) => (
                    <div
                      key={index}
                      className="card w-[425px] bg-base-100 shadow-xl my-4"
                    >
                      <div className="card-body">
                        <div className="flex flex-row items-center">
                          <img
                            src={user.image}
                            alt="profile"
                            className="rounded-full w-[72px] h-[72px] mr-4 object-cover"
                          />
                          <div className="flex flex-col">
                            <h1 className="font-bold text-lg my-2">
                              <a href={`/myfeed/${user._id}`}>
                                {user.FirstName} {user.LastName}
                              </a>
                            </h1>
                            {/* Add more user details here */}
                          </div>
                          <button
                            className="p-2 btn btn-sm btn-accent rounded-full ml-auto"
                            onClick={() => handleFollow(user)}
                          >
                            {userData.followers.includes(user._id)
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Connection;
