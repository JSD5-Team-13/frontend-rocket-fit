/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
const Profile = ({
  userId,
  userData,
  setUserData,
  setShowAlert,
  setAlertMessage, // รับ setAlertMessage เป็นพารามิเตอร์
}) => {
  const serverUrl = "http://127.0.0.1:8000";
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
      setImagePreview(null); // เมื่อไม่มีไฟล์ใหม่, ให้เคลียร์ imagePreview
    }
  };
  const clearInput = () => {
    const fileInput = document.querySelector('input[name="file"]');
    fileInput.value = ""; // เซ็ตค่า `value` ของ `input` เป็น `null` เพื่อล้างไฟล์ที่เลือก
    setImageFile(null);
    setReload(!reload)
    
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

        // setAlertMessage({ text: "Image uploaded successfully", status: 'success' });
        // setShowAlert(true);
        setReload(!reload);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // setAlertMessage({ text: "Error uploading image: " + error, status: "error" });
      // setShowAlert(true);
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
      <div className="flex flex-col items-center w-full gap-4 px-2 py-4">
        <div className="w-[10rem] h-[10rem]  overflow-hidden rounded-full">
          <img
            src={imageFile ? imagePreview : userData.profile_url}
            alt="profile-picture"
            className="object-cover"
          />
        </div>


      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto">
        <div className="flex flex-row justify-center gap-4">
          <label className="block">
            <span className="btn btn-xs btn-primary">upload profile</span>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="flex flex-col w-full text-sm sr-only text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
          {imagePreview && imageFile !== null ? 
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

            : null
          }
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
          ) : //     <form onSubmit={handleSubmitFile}>
          //   <input type="file" name="file" onChange={handleFileInputChange} />
          //   <button type="submit">Submit</button>
          //   <button type="reset" onClick={clearInput}>Cancel</button>
          // </form>

          null}
        </div>
      </div>
      
        {/* <div className="text-3xl font-semibold text-center">
          <h2>{userData.FirstName + " " + userData.LastName}  </h2>
        </div> */}

    </div>
  );
};


export default Profile;