import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../const";

//createContext
// สร้าง userContextt สำหรับเก็บ state
//เป็นตัวสร้างContext Objectขึ้นมาเพื่อเก็บข้อมูลที่ต้องการใช้ร่วมกัน
export const userContext = createContext({});

//สร้าง UserProvider เพื่อใช้เป็นที่เก็บ State และ Action ต่างๆของ Context
export const UserProvider = ({ children }) => {
  //สร้างStateขึ้นมาเพื่อใช้เป็นที่เก็บข้อมูลต่างๆที่ต้องการใช้ร่วมกัน
  //และสร้างAction Fucntionต่างๆที่เราจะอนุญาตให้ Component ปลายทางสามารถทำได้
  const [userData, setUserData] = useState({});
  

  //get user Data from "/users"
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
          } else {
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.log(`Error fetching user data from the database`, error);
        });
    }
  }, []);

  return (
    //ส่งค่า userData, setUserData ไปให้ {children}
    <userContext.Provider value={{ userData, setUserData}}>
      {children}
    </userContext.Provider>
  );
};
