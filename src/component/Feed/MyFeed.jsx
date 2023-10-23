/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserIcon from "../../assets/user-icon.svg";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaCommentDots,
} from "react-icons/fa6";
import { HiOutlineCog } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const MyFeed = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [friendData, setFriendData] = useState();

  // Get posts for the user with their userId or friend userId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("rockettoken");
        if (token) {
          // Fetch user data
          const userResponse = await axios.get("http://127.0.0.1:8000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.status === 200) {
            setCurrentUserId(userResponse.data.id);
            setCurrentUserData(userResponse.data);

            // Fetch friend data (if userId is not the current user)
            if (userId !== currentUserId) {
              const token = localStorage.getItem("rockettoken");
              const friendResponse = await axios.get(
                `http://127.0.0.1:8000/users/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (friendResponse.status === 200) {
                setFriendData(friendResponse.data);
                console.log(friendResponse.data);
              } else {
                console.log("Failed to fetch friend data");
              }
            }

            // Use the currentUserId and userId from the route to decide which posts to fetch
            const postsResponse = await axios.get(
              `http://127.0.0.1:8000/post/${userId}`
            );

            if (postsResponse.status === 200) {
              setPosts(postsResponse.data);
            } else {
              console.log("Failed to fetch posts");
            }
          } else {
            console.log("Failed to fetch user data");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, reload, setCurrentUserId]);

  // Update a post
  const updatePost = async (_id, activity_name, activity_describe) => {
    try {
      const requestData = {
        _id,
        activity_name,
        activity_describe,
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/post/${_id}`,
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

  // Update about me
  const updateUser = async (_id, aboutMe) => {
    try {
      const requestData = {
        _id,
        aboutMe,
      };
      const token = localStorage.getItem("rockettoken");
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${userId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setReload(!reload);
        console.log("Updated Successfully!", response);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Delete a post
  const deletePost = async (_id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/post/${_id}`);

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
        <aside className="fixed mt-[5rem] top-0 z-50 w-full flex flex-col pb-3 lg:h-screen lg:max-w-[25%] lg:block bg-white 2xl:max-w-[400px] lg:border-l-2">
          {userId === currentUserId ? (
            <UserProfile userData={currentUserData} updateUser={updateUser} />
          ) : (
            <FriendProfile friendData={friendData} />
          )}
        </aside>

        {/* Section Post Display */}
        <section className="w-full mt-[13rem] md:mt-[10rem] lg:mt-0 lg:ml-[25%] lg:max-w-[75%] lg:bg-gray-300 min-h-screen">
          <h1 className="hidden lg:block text-[2rem] mt-5 ml-16 font-bold uppercase">
            Feed
          </h1>

          {/* Post Display */}
          <div className="lg:w-[70%] lg:mx-auto">
            {userId === currentUserId ? (
              <UserPost
                posts={posts}
                updatePost={updatePost}
                deletePost={deletePost}
                userData={currentUserData}
              />
            ) : (
              <FriendPost friendData={friendData} posts={posts} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const UserProfile = ({ userData, updateUser }) => {
  const [_id, setId] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (userData) {
      setId(userData._id);
      setAboutMe(userData.aboutMe);
    }
  }, [userData]);

  const handleEditAboutMe = () => {
    setIsEdit(true);
  };

  const handleSaveAboutMe = () => {
    updateUser(userData._id, aboutMe), setIsEdit(false);
  };

  return (
    <div>
      {/* Header Profile */}
      <section className="flex items-center lg:flex-col lg:mt-3">
        {/* Profile Avatar */}
        <figure className="avatar m-5">
          <div className="w-[8rem] rounded-full bg-gray-300">
            <img src={userData.image} alt="Image Profile" />
        <figure className="m-5 avatar">
          <div className="w-[4.5rem] rounded-full bg-gray-300">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Profile Data */}
        <div className="lg:flex lg:flex-col">
          <h3 className="font-bold text-lg lg:text-center">
            {userData.firstname} {userData.lastname}
          </h3>
          <h3 className="text-lg font-bold lg:text-center">Username</h3>
          <button
            className="hidden lg:block lg:mt-2 lg:mb-5 btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]"
            onClick={handleEditAboutMe}
          >
            Edit Profile
          </button>
          <div className="flex">
            <p className="mr-3 font-semibold">
              <span className="mr-1">{userData.following.length}</span>Following
            </p>
            <p className="font-semibold">
              <span className="mr-1">{userData.followers.length}</span>Followers
            </p>
          </div>
          <button
            className="lg:hidden btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]"
            onClick={handleEditAboutMe}
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* Profile Status */}
      <section>
        <p className="hidden mt-5 mb-2 font-bold text-center lg:block">
          About Me
        </p>
        {isEdit ? (
          <div className="flex flex-col justify-center mx-3">
            <textarea
              className="border-[1px]"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            ></textarea>
            <button
              className="btn btn-sm mt-2 bg-[#1CD6CE] hover:text-white hover:bg-[#1CD6CE] rounded-xl"
              onClick={handleSaveAboutMe}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="mx-5 font-semibold lg:bg-gray-300 lg:rounded-lg lg:px-3 lg:p-3">
              {userData.aboutme}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

const UserPost = ({ userData, posts, updatePost, deletePost }) => {
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  };

  return (
    <div className="flex flex-col-reverse">
      {posts.map((post) => (
        <div key={post._id} className="p-3 lg:p-0 lg:mb-5">
          <div className="relative border border-black lg:mt-8 lg:border-none lg:rounded-xl flex flex-col lg:bg-white shadow-xl">
            {/* Header Post */}
            <section className="flex items-center">
              {/* Post Avatar */}
              <figure className="avatar m-5">
                <div className="w-[4.5rem] rounded-full bg-gray-300">
                  <img src={userData.image} alt="Image Profile" />
                </div>
              </figure>

              {/* Post Function */}
              <PostFunction
                post={post}
                updatePost={updatePost}
                deletePost={deletePost}
              />

              {/* Post Data */}
              <article>
                <h3 className="font-bold text-lg">{friendData.FirstName} {friendData.LastName}</h3>
                <div className="flex">
                  <p className="mr-3 uppercase">
                    {new Date(post.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="uppercase">
                    {new Date(post.createdAt).toLocaleTimeString(
                      "en-GB",
                      timeOptions
                    )}
                  </p>
                </div>
                <div className="flex max-[375px]:flex-col">
                  <p className="mr-3 uppercase">{post.activity_type}</p>
                  <p className="uppercase">Duration {post.duration} Mins</p>
                </div>
              </article>
            </section>

            {/* Body Post */}
            <section className="ml-5 mt-2 mb-4 lg:order-2 lg:ml-[7.5rem] lg:mt-4">
              <p className="font-semibold mb-1 uppercase">
                {post.activity_name}
              </p>
              <p>{post.activity_describe}</p>
            </section>

            {post.image && (
              <figure className="lg:order-1 lg:ml-[7.5rem] lg:mr-6">
                <img
                  className="lg:rounded-xl w-[100%] h-[100%] object-cover"
                  src={post.image}
                  alt="Image Activity"
                />
              </figure>
            )}

            {/* Bottom Post */}
            <section className="flex justify-around p-3 lg:p-4 lg:order-3 lg:ml-[7.5rem] lg:mr-6 lg:border-t-2 lg:border-[#1CD6CE]">
              <HeartBtn />
              <CommentBtn />
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

const FriendProfile = ({ friendData }) => {
  if (!friendData) {
    return <div>Loading friend profile...</div>;
  }

  return (
    <div>
      {/* Header Profile */}
      <section className="flex items-center lg:flex-col lg:mt-3">
        {/* Profile Avatar */}
        <figure className="avatar m-5">
          <div className="w-[8rem] rounded-full bg-gray-300">
            <img src={friendData.image} alt="Image Profile" />
          </div>
        </figure>

        {/* Profile Data */}
        <div className="lg:flex lg:flex-col">
          <h3 className="font-bold text-lg lg:text-center">
            {friendData.FirstName} {friendData.LastName}
          </h3>
          <button className="hidden lg:block lg:mt-2 lg:mb-5 btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]">
            Following
          </button>
          <div className="flex">
            <p className="mr-3 font-semibold">
              <span className="mr-1">{friendData.following.length}</span>Following
            </p>
            <p className="font-semibold">
              <span className="mr-1">{friendData.followers.length}</span>Followers
            </p>
          </div>
          <button className="lg:hidden btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]">
            Following
          </button>
        </div>
      </section>

      {/* Profile Status */}
      <section>
        <p className="hidden lg:block mt-5 mb-2 font-bold text-center">
          About Me
        </p>
        <p className="mx-5 font-semibold lg:bg-gray-300 lg:rounded-lg lg:px-3 lg:p-3">
          {friendData.aboutMe}
        </p>
      </section>
    </div>
  );
};

const FriendPost = ({ friendData, posts }) => {
  if (!friendData) {
    return <div>Loading friend profile...</div>;
  }

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <div className="flex flex-col-reverse">
      {posts.map((post) => (
        <div key={post._id} className="p-3 lg:p-0 lg:mb-5">
          <div className="relative flex flex-col border border-black shadow-xl lg:mt-8 lg:border-none lg:rounded-xl lg:bg-white">
            {/* Header Post */}
            <section className="flex items-center">
              {/* Post Avatar */}
              <figure className="m-5 avatar">
                <div className="w-[4.5rem] rounded-full bg-gray-300">
                  <img src={friendData.image} alt="Image Profile" />
                </div>
              </figure>

              {/* Post Data */}
              <article>
                <h3 className="font-bold text-lg">Username</h3>
                <div className="flex">
                  <p className="mr-3 uppercase">
                    {new Date(post.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="uppercase">
                    {new Date(post.createdAt).toLocaleTimeString(
                      "en-US",
                      timeOptions
                    )}
                  </p>
                </div>
                <div className="flex max-[375px]:flex-col">
                  <p className="mr-3 uppercase">{post.activity_type}</p>
                  <p className="uppercase">Duration {post.duration} Mins</p>
                </div>
              </article>
            </section>

            {/* Body Post */}
            <section className="ml-5 mt-2 mb-4 lg:order-2 lg:ml-[7.5rem] lg:mt-4">
              <p className="mb-1 font-semibold uppercase">
                {post.activity_name}
              </p>
              <p>{post.activity_describe}</p>
            </section>

            {post.image && (
              <figure className="lg:order-1 lg:ml-[7.5rem] lg:mr-6">
                <img
                  className="lg:rounded-xl w-[100%] h-[100%] object-cover"
                  src={post.image}
                  alt="Image Activity"
                />
              </figure>
            )}

            {/* Bottom Post */}
            <section className="flex justify-around p-3 lg:p-4 lg:order-3 lg:ml-[7.5rem] lg:mr-6 lg:border-t-2 lg:border-[#1CD6CE]">
              <HeartBtn />
              <CommentBtn />
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

const PostFunction = ({ post, updatePost, deletePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    deletePost(post._id);
    setIsOpen(false);
    setShowDeleteConfirm(false);
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setShowDeleteConfirm(false);
    setIsOpen(false);
  };

  return (
    <div className="absolute right-3 top-3">
      {/* icon */}
      <div className="flex flex-col items-end">
        <button
          className="btn btn-sm btn-circle m-1 bg-base-100 border-none hover:bg-[#1CD6CE]"
          onClick={handleClick}
        >
          <HiOutlineCog size={24} />
        </button>

        {/* Menu Function */}
        {isOpen && (
          <div className="flex flex-col bg-gray-200 w-28 rounded-btn">
            <button
              className="flex p-2 hover:bg-[#1CD6CE] rounded-md text-start"
              onClick={handleUpdate}
            >
              <AiOutlineEdit size={22} /> <span className="ml-2">Edit</span>
            </button>
            <button
              className="flex p-2 rounded-md hover:bg-red-400 text-start"
              onClick={handleDelete}
            >
              <AiOutlineDelete size={22} /> <span className="ml-2">Delete</span>
            </button>
          </div>
        )}
        {showUpdateForm && (
          <UpdateForm
            post={post}
            updatePost={updatePost}
            onClose={handleCancel}
          />
        )}

        {showDeleteConfirm && (
          <ConfirmDeleteDialog
            onConfirm={handleDeleteConfirm}
            onClose={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

const UpdateForm = ({ post, updatePost, onClose }) => {
  const [_id, setId] = useState("");
  const [activity_name, setActivity_name] = useState("");
  const [activity_describe, setActivity_describe] = useState("");

  useEffect(() => {
    if (post) {
      setId(post._id);
      setActivity_name(post.activity_name);
      setActivity_describe(post.activity_describe);
    }
  }, [post]);

  const updateSubmit = () => {
    updatePost(_id, activity_name, activity_describe);
    onClose();
  };

  return (
    <section className="fixed top-0 left-0 w-[100%] h-[100%] bg-black/50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-2xl mx-7 md:w-[500px]">
        <h3 className="text-lg font-bold">Update Your Post!</h3>

        <div className="p-2 mt-5 md:p-7 rounded-xl">
          {/* Activity name */}
          <label className="label">
            <span className="label-tex">Activity Name:</span>
          </label>
          <input
            className="w-full mb-3 input input-bordered"
            type="text"
            placeholder="Activity Name"
            value={activity_name}
            onChange={(e) => setActivity_name(e.target.value)}
          />

          {/* Activity Describe */}
          <label className="label">
            <span className="label-tex">Activity Describe:</span>
          </label>
          <input
            className="w-full input input-bordered"
            type="text"
            placeholder="Activity Describe"
            value={activity_describe}
            onChange={(e) => setActivity_describe(e.target.value)}
          />
        </div>

        {/* Footer Modal */}
        <footer className="flex justify-center px-4 modal-action">
          <button className="w-20 btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn w-20 bg-[#1CD6CE] hover:bg-[#1CD6CE] hover:text-white border-none"
            onClick={updateSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </section>
  );
};

const ConfirmDeleteDialog = ({ onConfirm, onClose }) => {
  return (
    <section className="fixed top-0 left-0 w-[100%] h-[100%] bg-black/50 flex justify-center items-center z-[100]">
      <div className="p-8 bg-white rounded-2xl mx-7">
        <h3 className="text-lg font-bold">Delete Your Post!</h3>
        <p className="py-4 text-[1rem]">
          This post will be deleted and you won't be able to find it anymore.
        </p>

        {/* Footer Modal */}
        <footer className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="text-red-500 btn hover:bg-red-500 hover:text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
        </footer>
      </div>
    </section>
  );
};

const HeartBtn = () => {
  const [isHeart, setIsHeart] = useState(false);
  const toggleHeart = () => {
    setIsHeart(!isHeart);
  };

  return (
    <div>
      <button onClick={toggleHeart}>
        {isHeart ? <FaHeart size={22} color="red" /> : <FaRegHeart size={22} />}
      </button>
    </div>
  );
};

const CommentBtn = () => {
  const [isComment, setIsComment] = useState(false);
  const toggleComment = () => {
    setIsComment(!isComment);
  };
  return (
    <div>
      <button onClick={toggleComment}>
        {isComment ? (
          <FaCommentDots size={22} color="#1CD6CE" />
        ) : (
          <FaRegCommentDots size={22} />
        )}
      </button>
    </div>
  );
};

const CommentDisplay = () => {
  const [isHeart, setIsHeart] = useState(false);

  const toggleHeart = () => {
    setIsHeart(!isHeart);
  };

  return (
    <div className="bg-[#8DE2DF] p-2 lg:rounded-xl lg:shadow-xl border-b-2">
      <section className="flex items-center">
        {/* Avatar */}
        <figure className="m-3 avatar">
          <div className="w-12 bg-gray-100 rounded-full">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Comment */}
        <div className="w-full">
          <p className="mb-1 font-semibold">Username</p>
          <div className="flex">
            <p className="w-full mr-2">This is comment~</p>
            <button className="mr-7" onClick={toggleHeart}>
              {isHeart ? (
                <FaHeart size={22} color="red" />
              ) : (
                <FaRegHeart size={22} />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const CommentForm = () => {
  return (
    <div className="bg-[#8DE2DF] p-2 lg:rounded-xl lg:mb-3 lg:shadow-xl">
      <section className="flex items-center">
        {/* Avatar */}
        <figure className="m-3 avatar">
          <div className="w-12 bg-gray-100 rounded-full">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Form*/}
        <div className="w-full">
          <p className="mb-1 font-semibold">Username</p>
          <div className="flex">
            <input
              type="text"
              placeholder="write comment"
              className="w-full mr-2 input input-sm input-bordered focus:outline-none"
            />
            <button className="btn btn-sm mr-2 border-none bg-[#132640] text-white hover:bg-[#132640] hover:text-yellow-300">
              POST
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyFeed;
