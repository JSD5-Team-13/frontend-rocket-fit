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

  useEffect(() => {
    if (activity) {
      setId(activity._id);
      setDate(activity.date);
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
      <div className="modal-box flex flex-col justify-center items-center">
       
        <h3 className="font-bold text-lg mb-4">Edit Your Activity!</h3>

        {/* card */}
        <div className="card card-compact w-[90%] max-h-fit overflow-y-auto bg-gray-300 shadow-xl mx-auto">
          <main className="card-body">
            {/* Card Header */}
            <div className="card-title uppercase bg-base-100 rounded-lg p-3 justify-center">
              <input
                className="input input-sm w-full uppercase text-center"
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
                <select
                  className="select select-sm w-full uppercase mb-1"
                  name="activity_type"
                  id="activity_type"
                  value={activity_type}
                  onChange={(e) => setActivity_type(e.target.value)}
                >
                  <option disabled value="">
                    Choose Activity
                  </option>
                  <option value="running">Running</option>
                  <option value="walking">Walking</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="hiking">Hiking</option>
                  <option value="weight training">Weight Training</option>
                  <option value="yoga">Yoga</option>
                  <option value="surfing">Surfing</option>
                  <option value="basketball">Basketball</option>
                  <option value="football">Football</option>
                  <option value="badminton">Badminton</option>
                  <option value="tennis">Tennis</option>
                  <option value="volleyball">Volleyball</option>
                </select>

                <input
                  className="input input-sm w-full uppercase mb-1"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <label className="input-sm flex mb-2">
                  DURATION:
                  <input
                    className="input input-sm mx-2 w-[50%] min-[450px]:w-[60%] uppercase"
                    type="number"
                    // placeholder="DURATION"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <span className="max-[350px]:hidden block">MINS</span>
                </label>

                <input
                  className="input input-bordered input-sm w-full mb-2 focus:outline-none"
                  type="text"
                  placeholder="ACTIVITY DESCRIBE"
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
                    className="rounded-xl w-[100%] h-[100%] object-cover"
                  />
                </figure>
              )}

              <input
                className="input input-bordered input-sm w-full mb-2 focus:outline-none"
                type="url"
                placeholder="IMAGE URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

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
              <div className="flex">
                <label
                  className="flex justify-center items-center w-1/2 input input-bordered input-sm cursor-pointer hover:text-[#1CD6CE] mr-2"
                  id="file-input-label"
                  htmlFor="file-input"
                >
                  <BsImages size={22} />{" "}
                  <span className="hidden min-[465px]:block min-[425px]:ml-2">
                    Add Image
                  </span>
                </label>
                <button
                  className="flex justify-center items-center input input-bordered input-sm w-1/2 hover:text-red-500 focus:outline-none"
                  onClick={() => setImage(null)}
                >
                  <AiOutlineDelete size={22} />{" "}
                  <span className="hidden min-[465px]:block min-[425px]:ml-2">
                    Delete Image
                  </span>
                </button>
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
