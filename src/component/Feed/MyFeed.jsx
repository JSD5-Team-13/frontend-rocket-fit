import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import { useState, useEffect } from "react";
import UserIcon from "../../assets/user-icon.svg";
import { FiShare2 } from "react-icons/fi";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaCommentDots,
} from "react-icons/fa6";

const MyFeed = () => {
  const [activities, setActivities] = useState([]);
  const [reload, setReload] = useState(false);

  // Get data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://earth-testapi-new-com.onrender.com/activities"
        );

        // Filter the activities to include only those with status "share"
        const sharedActivities = response.data.filter(
          (activity) => activity.share === true
        );

        setActivities(sharedActivities);
        console.log("Got data Successfully!", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      getData();
    };
  }, [reload]);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-[100] w-full">
        <NavbarLoggedIn />
      </nav>

      <main className="flex max-w-screen-2xl mx-auto mt-[5rem]">
        {/* Side Profile */}
        <aside className="fixed mt-[5rem] top-0 z-50 w-full flex flex-col pb-3 lg:h-screen lg:max-w-[25%] lg:block bg-white 2xl:max-w-[400px] lg:border-l-2">
          <FeedProfile />
        </aside>

        {/* Section Post Display */}
        <section className="w-full mt-[13rem] md:mt-[10rem] lg:mt-0 lg:ml-[25%] lg:max-w-[75%] lg:bg-gray-300 min-h-screen">
          <h1 className="hidden lg:block text-[2rem] mt-5 ml-16 font-bold uppercase">
            My Feed
          </h1>

          {/* Post Display */}
          <div className="lg:w-[70%] lg:mx-auto flex flex-col-reverse ">
            <PostDisplay activities={activities} />
          </div>
        </section>
      </main>
    </div>
  );
};

const FeedProfile = () => {
  return (
    <div>
      {/* Header Profile */}
      <section className="flex items-center lg:flex-col lg:mt-3">
        {/* Profile Avatar */}
        <figure className="avatar m-5">
          <div className="w-[4.5rem] rounded-full bg-gray-300">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Profile Data */}
        <div className="lg:flex lg:flex-col">
          <h3 className="font-bold text-lg lg:text-center">Username</h3>
          <button className="hidden lg:block lg:mt-2 lg:mb-5 btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]">
            Edit Profile
          </button>
          <div className="flex">
            <p className="mr-3 font-semibold">
              <span className="mr-1">0</span>Following
            </p>
            <p className="font-semibold">
              <span className="mr-1">0</span>Followers
            </p>
          </div>
          <button className="lg:hidden btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]">
            Edit Profile
          </button>
        </div>
      </section>

      {/* Profile Status */}
      <section>
        <p className="hidden lg:block mt-5 mb-2 font-bold text-center">
          About Me
        </p>
        <p className="mx-5 font-semibold lg:bg-gray-300 lg:rounded-lg lg:px-3 lg:p-3">
          Let's exercise together! Lorem ipsum, dolor sit amet consectetur
          adipisicing elit.
        </p>
      </section>
    </div>
  );
};

const PostDisplay = ({ activities }) => {
  const [isHeart, setIsHeart] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const toggleHeart = () => {
    setIsHeart(!isHeart);
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <div>
      <div className="border border-black lg:mt-8 lg:border-none lg:rounded-xl flex flex-col lg:bg-white lg:shadow-xl">
        {/* Header Post */}
        <section className="flex items-center">
          {/* Post Avatar */}
          <figure className="avatar m-5">
            <div className="w-[4.5rem] rounded-full bg-gray-300">
              <img src={UserIcon} alt="Image Profile" />
            </div>
          </figure>

          {/* Post Data */}
          <article>
            <h3 className="font-bold text-lg">Username</h3>
            <div className="flex">
              <p className="mr-3 uppercase">Date</p>
              <p className="uppercase">Time</p>
            </div>
            <div className="flex max-[375px]:flex-col">
              <p className="mr-3 uppercase">Activity Type</p>
              <p className="uppercase">Duration</p>
            </div>
          </article>
        </section>

        {/* Body Post */}
        <section className="ml-5 mt-2 mb-4 lg:order-2 lg:ml-[7.5rem] lg:mt-4">
          <p className="font-semibold mb-1 uppercase">Activity Name</p>
          <p>Activity Describe</p>
        </section>

        <figure className="lg:order-1 lg:ml-[7.5rem] lg:mr-6">
          <img
            className="lg:rounded-xl w-[100%] h-[100%] object-cover"
            src="https://cdn.pixabay.com/photo/2013/02/05/15/18/landscape-78058_1280.jpg"
            alt="Image Activity"
          />
        </figure>

        {/* Bottom Post */}
        <section className="flex justify-around p-3 lg:p-4 lg:order-3 lg:ml-[7.5rem] lg:mr-6 lg:border-t-2 lg:border-[#1CD6CE]">
          <button onClick={toggleHeart}>
            {isHeart ? (
              <FaHeart size={22} color="red" />
            ) : (
              <FaRegHeart size={22} />
            )}
          </button>
          <button onClick={handleComment}>
            {showComment ? (
              <FaCommentDots size={22} color="#1CD6CE" />
            ) : (
              <FaRegCommentDots size={22} />
            )}
          </button>
          <button>
            <FiShare2 size={22} />
          </button>
        </section>
      </div>

      <div>
        {/* Comment */}
        <section>
          {showComment && (
            <div>
              <CommentDisplay />
              <CommentForm />
            </div>
          )}
        </section>
      </div>
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
        <figure className="avatar m-3">
          <div className="w-12 rounded-full bg-gray-100">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Comment */}
        <div className="w-full">
          <p className="font-semibold mb-1">Username</p>
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
        <figure className="avatar m-3">
          <div className="w-12 rounded-full bg-gray-100">
            <img src={UserIcon} alt="Image Profile" />
          </div>
        </figure>

        {/* Form*/}
        <div className="w-full">
          <p className="font-semibold mb-1">Username</p>
          <div className="flex">
            <input
              type="text"
              placeholder="write comment"
              className="input input-sm input-bordered w-full mr-2 focus:outline-none"
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
