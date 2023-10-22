/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Profile = ({ userId, userData, setUserData, setShowAlert, setAlertMessage}) => {

  const serverUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("rockettoken");
  const [imageFile, setImageFile] = useState(null);
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    if (!userData.userId) {
      console.error('User ID is missing');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      // Send a PUT request to the server to upload the image
      const response = await axios.put(serverUrl + "/upload/image/profile/" + userData.userId, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Image uploaded successfully
        console.log('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
