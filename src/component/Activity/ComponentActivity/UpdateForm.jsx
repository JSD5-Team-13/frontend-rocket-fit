/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BsImages } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const UpdateForm = ({ activity, updateData, onClose }) => {
  const [_id, setId] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [activity_type, setActivity_type] = useState("");
  const [activity_name, setActivity_name] = useState("");
  const [activity_describe, setActivity_describe] = useState("");
  const [image, setImage] = useState("");

  // show date with correct form YYYY-MM-DD
  const apiDate = new Date(activity.date);
  const formattedDate = apiDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  
  useEffect(() => {
    if (activity) {
      setId(activity._id);
      setDate(formattedDate);
      setDuration(activity.duration);
      setActivity_type(activity.activity_type);
      setActivity_name(activity.activity_name);
      setActivity_describe(activity.activity_describe);
      setImage(activity.image);
    }
  }, [activity]);

  const updateSubmit = () => {
    updateData(
      _id,
      date,
      duration,
      activity_type,
      activity_name,
      activity_describe,
      image
    );
    onClose();
  };

  return (
    <section className="fixed top-0 left-0 w-[100%] h-[100%] bg-black/50 flex justify-center items-center z-[100]">
      <div className="bg-white px-4 py-8 rounded-2xl mx-7 flex flex-col justify-center items-center max-h-[80%] min-[425px]:w-[36rem]">
        <h3 className="font-bold text-lg mb-4">Edit Your Activity!</h3>

        {/* card */}
        <div className="card card-compact w-[90%] max-h-fit overflow-y-auto bg-gray-300 shadow-xl mx-auto">
          <main className="card-body">
            {/* Card Header */}
            <div className="card-title bg-base-100 rounded-lg p-3 justify-center">
              {/* Activity Name */}
              <input
                className="input w-full text-center"
                type="text"
                placeholder="Activity Name"
                value={activity_name}
                onChange={(e) => setActivity_name(e.target.value)}
              />
            </div>

            {/* Card Body */}
            <section className="bg-base-100 rounded-lg p-2 md:p-4">
              {/* Card Data */}
              <section>
                {/* Activity type */}
                <label className="label" htmlFor="activity_type">
                  <span className="label-tex">Activity Type:</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  name="activity_type"
                  id="activity_type"
                  value={activity_type}
                  onChange={(e) => setActivity_type(e.target.value)}
                >
                  <option disabled value="">
                    Choose Activity
                  </option>
                  <option value="Running">Running</option>
                  <option value="Walking">Walking</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Hiking">Hiking</option>
                  <option value="Weight Training">Weight Training</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Surfing">Surfing</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Football">Football</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Volleyball">Volleyball</option>
                </select>

                {/* Date */}
                <label className="label" htmlFor="date">
                  <span className="label-tex">Date:</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                {/* Duration */}
                <label className="label" htmlFor="duration">
                  <span className="label-tex">Duration (Mins):</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  type="number"
                  id="duration"
                  placeholder="00"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />

                {/* Activity Describe */}
                <label className="label" htmlFor="activity_describe">
                  <span className="label-tex">Activity Describe:</span>
                </label>
                <input
                  className="input input-bordered w-full mb-4"
                  type="text"
                  id="activity_describe"
                  placeholder="Activity Describe"
                  value={activity_describe}
                  onChange={(e) => setActivity_describe(e.target.value)}
                />
              </section>

              {/* Card Image */}
              {image && (
                <figure className="mb-2 px-1">
                  <img
                    src={image}
                    alt="Image Activity"
                    className="rounded-lg w-[100%] h-[100%] object-cover"
                  />
                </figure>
              )}

              {/* Image URL */}
              <input
                className="input input-bordered w-full mb-2"
                type="url"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              {/* Image Upload from local */}
              <input
                className="hidden"
                id="file-input"
                name="file-input"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setImage(imageUrl);
                  }
                }}
              />

              {/* Handle Image */}
              <div className="flex">
                <label
                  className="flex justify-center items-center w-1/2 input input-bordered input-sm cursor-pointer hover:text-[#1CD6CE] mr-2"
                  id="file-input-label"
                  htmlFor="file-input"
                >
                  <BsImages size={22} />
                  <span className="hidden lg:block lg:ml-2">Add Image</span>
                </label>
                <label
                  className="flex justify-center items-center input input-bordered input-sm w-1/2 hover:text-red-500 focus:outline-none"
                  onClick={() => setImage("")}
                >
                  <AiOutlineDelete size={22} />
                  <span className="hidden lg:block lg:ml-2">Reset Image</span>
                </label>
              </div>
            </section>
          </main>
        </div>

        {/* footer modal */}
        <footer className="modal-action">
          <button className="btn w-1/2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn w-1/2 bg-[#1CD6CE] hover:bg-[#1CD6CE] hover:text-white border-none"
            onClick={updateSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </section>
  );
};

export default UpdateForm;
