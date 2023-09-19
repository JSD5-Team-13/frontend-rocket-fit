
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import Layout from "../Layout.jsx";
import SideInformation from "../SideInformationBar.jsx";
import axios from "axios";

const ActivityForm = () => {
    const [selectedType, setSelectedType] = useState("");
    const [createdTitle, setCreatedTitle] = useState("");
    const [createdDesc, setCreatedDesc] = useState("");
    const [durationTime, setDurationTime] = useState("");
    const [selectDate, setSelectDate] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const [reload, setReload] = useState(true);

    const ResetHandler = () => {
        
        setSelectedType("");
        setCreatedTitle("");
        setCreatedDesc("");
        setDurationTime("");
        setSelectedImage("");
    }

    useEffect(() => {
        setSelectedType("");
        setCreatedTitle("");
        setCreatedDesc("");
        setDurationTime("");
        setSelectDate("");
        setSelectedImage("");
        
      }, [reload]);

    
    const Alert = ({ message, onClose }) => {
        return (
          <div className="fixed inset-0 z-50 flex flex-row items-end justify-center w-[95%] mx-auto mb-10 tablet:w-4/6 laptop:w-3/6">
            {alertMessage === "Created completed" ? (
                <div className="alert alert-success flex flex-col tablet:justify-between justify-center w-full gap-2 tablet:flex-row tablet:gap-[1rem]">
                    <div className="flex flex-col items-center justify-center tablet:gap-4 tablet:flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Your create activity completed!</span>
                    </div>
                    <div classNasme="flex flex-row items-center justify-center">
                        <button onClick={onClose}>Close</button>    
                    </div>
              </div>   
            ) : alertMessage === "Created failed" ?(
                <div className="alert alert-error flex flex-col tablet:justify-between justify-center w-full gap-2 tablet:flex-row tablet:gap-[1rem]">
                     <div className="flex flex-col items-center justify-center tablet:gap-4 tablet:flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! activity failed.</span>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <button onClick={onClose}>Close</button>    
                    </div>
                </div>
            ) : (
               <div className="flex flex-col tablet:justify-between justify-center w-full gap-2 tablet:flex-row alert alert-warning tablet:gap-[1rem]">
                    <div className="flex flex-col items-center justify-center tablet:gap-4 tablet:flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{message}</span>                
                    </div> 
                    <div className="flex flex-row items-center justify-center">
                        <button onClick={onClose}>Close</button>    
                    </div>
                    
                </div>
  
            )}
           
          </div>
        );
    };
        
    const closeAlert = () => {
        setShowAlert(false); // ปิดหน้าต่างแจ้งเตือน
        setAlertMessage(''); // ล้างข้อความแจ้งเตือน
      };
      
    const CreatedHandler = async (selectedType, createdTitle, createdDesc, durationTime, selectDate, selectedImage) => {
      try {
        const errors = [];

        if (!selectedType) {
            errors.push('Invalid activity type');
        }

        if (!createdTitle) {
            errors.push('Invalid title');
        }

        if (!durationTime && typeof durationTime !== 'number') {
            errors.push('Invalid duration-time');
        }

        if (!selectDate) {
            errors.push('Invalid date');
        }

        if (errors.length > 0) {
        const errorText = errors.join(' , ');
            setAlertMessage(errorText);
            setShowAlert(true); // แสดงหน้าต่างแจ้งเตือน
        return;
        }
        
        const response = await axios.post("https://earth-testapi-new-com.onrender.com/activities", {
        "activity_type": selectedType,
        "activity_name": createdTitle,
        "activity_describe": createdDesc,
        "duration": durationTime,
        "date": selectDate,
        "image" : selectedImage,
        });
    
        console.log("Created completed", response.data);
        setAlertMessage("Created completed");
        setShowAlert(true);
    
      } catch (error) {
        console.error("Create failed ", error);
        setAlertMessage("Created failed");
        setShowAlert(true);
      }
      setReload(!reload);

    };

    return (
        <Layout>
         <div className="flex flex-row w-screen max-w-[1440px] mx-auto justify-center items-start">
        <div className="hidden w-2/6 px-2 laptop:block">
            <SideInformation />
        </div>
        
        <div className="flex flex-col items-center justify-center w-screen p-4 mx-auto tablet:w-4/6 laptop:w-auto laptop:max-w-4/6] gap-[1.5rem]">
            <h1 className="w-full text-2xl font-bold text-left">Create Activity</h1>
            <div className="w-full flex flex-col tablet:min-w-[425px] tablet:w-full tablet:max-w-[1024px] p-4 m-4 bg-white rounded-lg shadow-lg phone:w-[425px]">

                {showAlert && (
                     <Alert message={alertMessage} onClose={closeAlert} />
                 )}

                {/* top area */}
                <div 
                    className="flex flex-col items-start justify-between w-full resize-y xxs:w-full laptop:flex-row laptop:justify-center laptop:mx-auto">
                    <ActivityType selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
                
                
                {/* middle area */}
                <div className="flex flex-col justify-around w-full laptop:flex-row laptop:gap-4">
                    {/* left area    */}
                    <div className="w-full laptop:w-2/4 laptop:h-full">
                        <ActivityName createdTitle={createdTitle}  setCreatedTitle={setCreatedTitle}/>
                        <ActivityDesc  createdDesc={createdDesc} setCreatedDesc={setCreatedDesc} />
                    </div>

                    {/* right area  */}
                    <div className="flex flex-col w-full laptop:w-1/2">
                        {/* right-top  */}
                        <div className="flex flex-col justify-center w-full gap-2 phone:flex-row laptop:flex-row">
                            <ActivityDuration durationTime={durationTime}   setDurationTime={setDurationTime} />
                            <ActivityDate selectDate={selectDate}  setSelectDate={setSelectDate} />
                        </div>

                        {/* right bottom */}
                        <div className="w-full ">
                            <ActivityImage  selectedImage={selectedImage}  setSelectedImage={setSelectedImage}/>
                        </div>
                    </div>
                </div>
                
            </div>
             {/* bottom area  */}
             <div className="flex flex-row items-center justify-center w-full gap-4 mt-2">
                    {/* <button type="reset"
                        className="w-1/4 btn">
                        Cancel
                    </button> */}
                    <button className="w-1/4 btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Cancel</button>
                        <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">RESET FORM</h3>
                            <p className="py-4">Do you want to reset the data in the form?</p>
                            <div className="modal-action">
                            <form className="gap-4" method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn" onClick={ResetHandler}>Reset</button>
                                <button className="ml-4 btn">Close</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    <button type="submit"
                        className="w-2/4 btn btn-success"
                        onClick={() => CreatedHandler(
                            selectedType,
                            createdTitle,
                            createdDesc,
                            durationTime,
                            selectDate,
                            selectedImage,
                        )}>
                        Create Activity
                    </button>
                </div>
        </div>
        </div>  
        </Layout> 
    )
}


// eslint-disable-next-line react/prop-types
export const ActivityType = ({selectedType, setSelectedType}) => {
    
    const HandleTypeChange = (event) => {
        const selectedOption = event.target.value;

        if (selectedOption !== "") {
            setSelectedType(selectedOption);
        }
        return (
            console.log("type: " + selectedType) 
        )
        
    }

    return (
        <div className="w-full laptop:w-2/4">
            <label htmlFor="activityType"
                className="font-medium uppercase text-md">
                Activity Type
            </label>
            <br />
            <select className="w-full px-3 text-[1rem] rounded-md select select-bordered mt-1 mb-4 text-center"
                value={selectedType}
                onChange={HandleTypeChange}>
                <option value="" disabled>Choose your activity</option>
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
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export const ActivityName = ({createdTitle, setCreatedTitle}) => {
    const HandleTitleChange = (event) => {
        setCreatedTitle(event.target.value)

        return (
            console.log("title: " + createdTitle)
        )
    }

    return (
        <div>
            <label htmlFor="activityTitle"
                className="font-medium uppercase text-md">
                Title
            </label>
            <br />
            <input type="text" 
                className="w-full p-2 px-4 mt-1 mb-4 rounded-md input input-bordered"
                placeholder="your title here"
                value={createdTitle}
                required
                onChange={HandleTitleChange}/>
        </div>            
    )
}

// eslint-disable-next-line react/prop-types
export const ActivityDesc = ({createdDesc, setCreatedDesc}) => {
    const HandleDescChange = (event) => {
        setCreatedDesc(event.target.value)

        return (
            console.log("description: " + createdDesc)
        )
    }

    return (
        <div className="h-auto resize-y laptop:h-full">
            <label htmlFor="activityDesc"
                className="font-medium uppercase text-md">
                Description
            </label>
            <br />
            <textarea type="text"
                value={createdDesc} 
                className="textarea textarea-bordered w-full h-auto  resize-y laptop:mb-0 min-h-[86px] p-2 px-4 rounded-md mt-1 mb-4"
                placeholder="your describe here"
                onChange={HandleDescChange}/>
        </div>            
    )
}


// eslint-disable-next-line react/prop-types
export const ActivityDuration = (  {durationTime, setDurationTime} ) => {
    const HandleDurationChange = (event) => {
        setDurationTime(event.target.value)

        return (
            console.log("duration: " + durationTime)
        )
    }
    return (
        <div className="w-full phone:w-2/4 tablet:w-full laptop:w-2/4">
            <label htmlFor="activityDuration"
                className="font-medium uppercase text-md">
                Duration (min.)
            </label>
            <br />
            <input type="number"
                value={durationTime}
                className="w-full p-2 px-4 mt-1 mb-4 text-center rounded-md input input-bordered tablet:mb-2"
                placeholder="00" required
                onChange={HandleDurationChange}/>
        </div>           
    )
}

// eslint-disable-next-line react/prop-types
export const ActivityDate = ({selectDate, setSelectDate}) => {
    // const currentDate = new Date().toISOString().slice(0, 10);
    
    const HandleDateChange = (event) => {
        setSelectDate(event.target.value)

        return (
            console.log("date: " + selectDate)
        )
    }
    return (
        <div className="w-full phone:w-2/4 tablet:w-full laptop:w-2/4">
            <label htmlFor="activityDate"
                className="font-medium uppercase text-md">
                Date
            </label>
            <br />
            <input type="date"
                // defaultValue={currentDate}
                value={selectDate}
                className="w-full p-2 px-4 mt-1 mb-4 text-center rounded-md input input-bordered"
                required
                onChange={HandleDateChange}/>
        </div>         
    )
}


// eslint-disable-next-line react/prop-types
export const ActivityImage =({selectedImage, setSelectedImage}) => {
    const [imageOption, setImageOption] = useState("")

    const handleImageChange = (event) => {
        const file = event.target.files[0];
      
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
          } else {
            setSelectedImage(null);
          }
    };

    const handleImageChangeURL = (event) => {
        event.preventDefault();
        const imageUrl = event.target.value;
      
        if (imageUrl !== null) {
          setSelectedImage(imageUrl);
        }
    };

    return (
      <div className="w-full">
        <label htmlFor="activityImage" 
            className="font-medium uppercase text-md">
            Image
        </label>

        <div className="flex flex-row items-center justify-center w-full gap-4 p-2">
            <button className="btn btn-xs"
                onClick={() => setImageOption("URL")}>
                Image URL
            </button> 
            <button className="btn btn-xs"
                 onClick={() => setImageOption("UPLOAD")}>
                Upload image
            </button>
            <button
                className="btn btn-xs"
                onClick={() => setSelectedImage("")}
                >
                Reset image
            </button>
        </div>
        
            {imageOption === "URL" ? (
                
                <div className="flex flex-col justify-center px-2 pt-2 pb-2 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                    {selectedImage && (
                        <div className="w-full h-auto ">
                            <img
                            src={selectedImage}
                            alt="preview-image"
                            className="object-cover w-full laptop:max-h-[250px] mb-4 rounded-md "
                            />
                        </div>
                        )}
                    <div className="w-full ">
                        <input type="text" 
                            className="w-full input input-bordered"
                            placeholder="URL" 
                            value={selectedImage}
                            onChange={handleImageChangeURL}/>
                    </div>
                </div>
            ) : null}
            
             {imageOption === "UPLOAD" ? (
                 <div className="flex justify-center w-full px-2 pt-2 pb-2 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="w-full space-y-1 text-center ">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" className="mb-4 rounded-md w-full object-cover laptop:max-h-[250px]" />
                        ):(  
                                
                            <svg className="w-12 h-12 mx-auto text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        
                        <div className="flex justify-center text-sm text-gray-600">
                        <label htmlFor="file-upload" 
                            className="relative px-2 font-medium text-center text-blue-600 bg-teal-100 rounded-md cursor-pointer hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" 
                                className="sr-only" 
                                accept="image/*"
                                onChange={handleImageChange}/>
                        </label>
                        <p className="pl-1 ml-1 text-black"> or drag and drop</p>
                        </div>
                        <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            ) : null}
        
      </div>
    );
  }
  

export default ActivityForm;