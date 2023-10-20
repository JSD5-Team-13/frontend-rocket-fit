import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import UserIcon from "../../assets/user-icon.svg";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaCommentDots,
} from "react-icons/fa6";

const MyFeed = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);

  // Get all posts
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/post/");
        setPosts(response.data);
        console.log("Got data Successfully!", response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
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
            Feed
          </h1>

          {/* Post Display */}
          <div className="lg:w-[70%] lg:mx-auto">
            <PostDisplay posts={posts} />
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
          <h3 className="font-bold text-lg lg:text-center">Friend's Username</h3>
          <button className="hidden lg:block lg:mt-2 lg:mb-5 btn btn-sm mt-1 rounded-full bg-gray-300 border-none hover:bg-[#1CD6CE]">
            Following
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
          Friend's status
        </p>
      </section>
    </div>
  );
};

const PostDisplay = ({ posts }) => {
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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
                  <img src={UserIcon} alt="Image Profile" />
                </div>
              </figure>

              {/* Post Data */}
              <article>
                <h3 className="font-bold text-lg">Friend's Username</h3>
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

export default MyFeed;
