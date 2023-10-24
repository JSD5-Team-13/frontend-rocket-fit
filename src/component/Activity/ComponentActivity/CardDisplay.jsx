import CardFunction from "./CardFunction";
import axios from "axios";
import Swal from "sweetalert2";

const CardDisplay = ({ activities, deleteData, updateData }) => {
  const handleShare = async (
    _id,
    activity_type,
    activity_name,
    activity_describe,
    duration,
    image
  ) => {
    const newPost = {
      _id,
      activity_type,
      activity_name,
      activity_describe,
      duration,
      image,
    };
    try {
      const response = await axios.post("https://rocket-fit-api.onrender.com/post/", newPost);
      if (response.status === 200) {
        console.log("Post created successfully", response);
        Swal.fire({
          icon: "success",
          title: "Your activity has been shared!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div>
      <div className="mx-3 flex flex-col-reverse justify-center items-center">
        {activities.map((activity) => {
          return (
            <div
              className="card card-compact w-[75%] bg-gray-300 lg:bg-base-100 shadow-xl mb-10"
              key={activity._id}
            >
              <main className="card-body">
                {/* Card Header */}
                <h2 className="card-title uppercase bg-base-100 lg:bg-gray-200 rounded-lg p-3 justify-center">
                  {activity.activity_name}
                </h2>

                {/* Card Body */}
                <section className="relative bg-base-100 lg:bg-gray-200 rounded-lg p-4 text-[1rem]">
                  {/* Edit and Delete Dropdown Btn */}
                  <CardFunction
                    activity={activity}
                    updateData={updateData}
                    deleteData={deleteData}
                  />

                  {/* Card Data */}
                  <div className="px-1">
                    <p className="uppercase mb-0.5">{activity.activity_type}</p>
                    <p className="uppercase mb-0.5">
                      {new Date(activity.date).toLocaleDateString("en-GB")}
                    </p>
                    <p className="uppercase mb-0.5">
                      DURATION: {activity.duration} Mins
                    </p>
                    <p className="my-3">{activity.activity_describe}</p>
                  </div>

                  {/* Card Image with condition rendering */}
                  {activity.image && (
                    <figure className="py-4 px-1">
                      <img
                        src={activity.image}
                        alt="Image Activity"
                        className="rounded-xl w-[100%] h-[100%] object-cover"
                      />
                    </figure>
                  )}

                  {/* Share Card */}
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-sm bg-gray-300 lg:bg-white hover:bg-[#1CD6CE]"
                      onClick={() =>
                        handleShare(
                          activity._id,
                          activity.activity_type,
                          activity.activity_name,
                          activity.activity_describe,
                          activity.duration,
                          activity.image
                        )
                      }
                    >
                      Share to your feed
                    </button>
                  </div>
                </section>
              </main>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
