/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const serverUrl = "https://rocket-fit-api.onrender.com";

const Profile = ({
  userId,
  userData,
  setUserData,
  setShowAlert,
  setAlertMessage,
}) => {
  const token = localStorage.getItem("rockettoken");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [upload, setUpload] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (imagePreview) {
      console.log("test use effect");
    }
  }, [imageFile, imagePreview, reload]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };
  const clearInput = () => {
    const fileInput = document.querySelector('input[name="file"]');
    fileInput.value = "";
    setImageFile(null);
    setReload(!reload);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    if (!userData.userId) {
      console.error("User ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Send a PUT request to the server to upload the image
      const response = await axios.put(
        serverUrl + "/upload/image/profile/" + userData.userId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Image uploaded successfully
        console.log("Image uploaded successfully");

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Image uploaded successfully",
          showConfirmButton: true,
        });

        setTimeout(() => {
          Swal.close();
        }, 2000);

        setReload(!reload);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error uploading image",
        showConfirmButton: true,
      });

      setTimeout(() => {
        Swal.close();
      }, 2000);
    }
  };

  const uploadSetting = () => {
    return (
      <div className="relative z-10 w-4/6 -translate-x-1/2 -translate-y-1/2 bg-white min-h-48 drop-shadow-md top-1/2 left-1/2">
        <form onSubmit={handleSubmitFile}>
          <input type="file" name="file" onChange={handleFileInputChange} />
          <button type="submit">Submit</button>
          <button type="reset" onClick={clearInput}>
            Cancel
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 px-2 py-4 justify-evenly">
        <img
          src={imageFile ? imagePreview : userData.image}
          alt="profile-picture"
          className="object-cover w-[10rem] h-[10rem]  overflow-hidden rounded-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="flex flex-row justify-center gap-4">
          <label className="block">
            <span className="btn btn-xs btn-primary">upload profile</span>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="flex flex-col text-sm sr-only text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
          {imagePreview && imageFile !== null ? (
            <div className="flex flex-row justify-center gap-4">
              <button
                type="submit"
                className="text-xs btn btn-xs btn-success"
                onClick={handleSubmitFile}
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-xs btn-warning"
                onClick={clearInput}
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center w-4/6">
          {upload ? (
            <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto bg-white min-h-48 drop-shadow-md ">
              <form className="flex flex-col items-center justify-center mx-auto">
                <label htmlFor="file">Select a File</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handleFileInputChange}
                />

                {/* button */}
                <div className="flex flex-row justify-center gap-4">
                  <button
                    type="submit"
                    className="text-xs btn btn-xs btn-success"
                    onClick={handleSubmitFile}
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-xs btn-warning"
                    onClick={clearInput}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
