import { useState } from "react";
import CardFunction from "./CardFunction";

const CardDisplay = ({ activities, deleteData, updateData }) => {
  const [showShareAlert, setShowShareAlert] = useState(false);
  
  const handleShare = (_id) => {
    const activity = activities.find((activity) => activity._id === _id);

    if (activity && !activity.share) {
      updateData(_id, true)
      setShowShareAlert(true);
      setTimeout(() => {
        setShowShareAlert(false);
      }, 1500);
    } else {
      alert("This activity has already been shared.");
    }
  };

  return (
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
              <section className="relative bg-base-100 lg:bg-gray-200 rounded-lg p-4">
                {/* Edit and Delete Dropdown Btn */}
                <CardFunction
                  activity={activity}
                  updateData={updateData}
                  deleteData={deleteData}
                />

                {/* Card Data */}
                <div className="px-1">
                  <p className="uppercase mb-0.5">{activity.activity_type}</p>
                  <p className="uppercase mb-0.5">{activity.date}</p>
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
                    onClick={() => handleShare(activity._id)}
                  >
                    Share to your feed
                  </button>

                  {/* Alert Success */}
                  {showShareAlert && (
                    <div className="alert alert-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>This activity has already been shared.</span>
                    </div>
                  )}
                </div>
              </section>
            </main>
          </div>
        );
      })}
    </div>
  );
};

export default CardDisplay;
