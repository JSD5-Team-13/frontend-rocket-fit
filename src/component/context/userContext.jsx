import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../const";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("rockettoken");
    if (token) {
      axios
        .get(API_URL + "/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
            console.log(userData);
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
          alert("User data is not valid, Please login again");
        });
    }
  }, []);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};
