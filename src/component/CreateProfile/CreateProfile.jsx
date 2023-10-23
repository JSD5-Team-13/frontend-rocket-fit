import { MdPeopleAlt } from "react-icons/md";
import { useEffect, useState } from "react";
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
  });

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setNameUser(res.data);
            console.log(nameUser);
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

  const updateUser = async (
    id,
    FirstName,
    height,
    weight,
    gender,
    DateOfBirth
  ) => {
    try {
      const requestData = {
        id: id,
        FirstName: FirstName,
        height: height,
        weight: weight,
        gender: gender,
        DateOfBirth: DateOfBirth,
      };
      const token = localStorage.getItem("rockettoken");
      const Update = await axios.put(
        `http://127.0.0.1:8000/users/${nameUser.id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Update.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Create Success",
        });
        navigate("/main");
      } else if (Update.status === 400) {
        // Use "else if" here
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
    updateUser(
      params.id,
      data.FirstName,
      data.height,
      data.weight,
      data.gender,
      data.DateOfBirth
    );
  };
  console.log(nameUser.id);

  return (
    <div>
      <section className="lg:flex lg:justify-center lg:items-center h-screen">
        <div className="flex flex-col items-center lg:bg-[#D9D9D9] lg:w-[70%]  lg:pb-[3rem] lg:rounded-[1.5rem]">
          {/* profile picture */}
          <div className="lg:bg-white bg-[#D9D9D9] h-[12rem] w-[12rem] max-w-xs mt-[3rem] rounded-full flex flex-col justify-center items-center ">
            <MdPeopleAlt className="text-[5rem] text-black" />
            <div>
              <input type="file" id="files" className="hidden" />
              <label htmlFor="files" className="font-bold hover:text-red-500">
                Upload Profile Picture
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="mt-5">
            {nameUser ? (
              <h2 className="font-bold text-[1.2rem]">{nameUser.username}</h2>
            ) : (
              <p>Loading...</p>
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
