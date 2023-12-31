import Profile from "../../assets/blank-profile-picture-973460_960_720.jpg";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const CreateProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState("");
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    height: "",
    weight: "",
    gender: "",
    DateOfBirth: "",
    image: "",
  });

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get("https://rocket-fit-api.onrender.com/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setNameUser(res.data);
            setUserId(res.data.id);
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
        });
    }
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("rockettoken");
      const Update = await axios.put(
        `https://rocket-fit-api.onrender.com/users/${userId}`,
        // `http://127.0.0.1:8000/users/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      if (Update.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Create Success",
        });
        setTimeout(() => {
          navigate("/main");
          window.location.reload();
        }, 2000);
      } else if (Update.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Create Not Success",
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(
          params.id,
          data.FirstName,
          data.LastName,
          data.height,
          data.weight,
          data.gender,
          data.DateOfBirth,
          data.image
        );
      } else if (result.isDenied) {
        console.log("Changes are not saved");
      }
    });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const uploadImage = async () => {
      console.log(image);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ofo3yslc");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dok87yplt/image/upload",
        formData
      );
      console.log(response.data.url);
      const images = response.data.url;
      setData({ ...data, image: images });
      console.log(data);
    };
    uploadImage();
  }, [image]);

  return (
    <div>
      <section className="flex justify-center items-center h-screen ">
        <div className="flex flex-col items-center lg:bg-[#D9D9D9] lg:w-[70%]  lg:pb-[3rem] lg:rounded-[1.5rem]">
          {/* profile picture */}
          <div className="hover:cursor-pointer max-w-xs mt-[3rem] rounded-full relative">
            <div onClick={handleImageClick}>
              <div className="relative h-[160px] w-[160px] lg:h-[200px] lg:w-[200px] rounded-full overflow-hidden">
                {image ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={Profile}
                    alt=""
                  />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  // onChange={handleImageChange}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-end pb-[20px] bg-black/[0.35] rounded-full justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-lg font-bold">
                    Edit Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="mt-5">
            {nameUser ? (
              <h2 className="font-bold text-[1.2rem]">{nameUser.username}</h2>
            ) : (
              <p className="font-bold text-[1.2rem]">Loading...</p>
            )}
          </div>

          {/*input*/}
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="grid gap-5 grid-cols-2 p-5">
              {/* First Name */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">First Name</span>
                </label>
                <input
                  type="text"
                  name="FirstName"
                  value={data.FirstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Last Name */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Last Name</span>
                </label>
                <input
                  type="text"
                  name="LastName"
                  value={data.LastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Height */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Height</span>
                </label>
                <input
                  type="number"
                  name="height"
                  value={data.height}
                  onChange={handleChange}
                  placeholder="Cm."
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>

              {/* Weight */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Weight</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  value={data.weight}
                  onChange={handleChange}
                  placeholder="Kg."
                  className="input input-bordered input-success w-full max-w-xs bg-[#D9D9D9] text-center lg:bg-white"
                />
              </div>
            </div>

            {/*Gender & DoB */}
            <div className="w-[100%] px-5 ">
              {/* Gender */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold">Gender</span>
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  className="select input input-bordered input-success bg-[#D9D9D9] lg:bg-white w-full "
                >
                  <option disabled selected>
                    None
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Lgbtq+</option>
                  <option>Not specified</option>
                </select>
              </div>

              {/* DoB */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="Date"
                  name="DateOfBirth"
                  value={data.DateOfBirth}
                  onChange={handleChange}
                  className="input input-bordered input-success bg-[#D9D9D9] lg:bg-white w-full "
                />
              </div>
            </div>
            {/* button Confirm */}
            <div className="flex justify-center mt-[2rem] ">
              <button className="btn btn-accent rounded-[1.5rem] w-[15rem]">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateProfile;
