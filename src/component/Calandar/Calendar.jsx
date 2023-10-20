// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn.jsx";
import "./calendar.css";
import axios from "axios";

const CalendarMain = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [memos, setMemos] = useState([]);
  const [memoId, setMemosId] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/calendar");
      const data = response.data;
      setMemos(data);
    };
    getData();
  }, []);

  const createMemo = async (memoData) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/calendar", memoData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Create memo success',
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Create memo failed',
        }).then(() => {
          location.reload();
        });
      }
    } catch (error) {
      console.error("Error creating memo:", error);
    }
  };

  const updateMemo = async (updatedMemo , memoId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/calendar/${memoId}`, updatedMemo);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update memo success',
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Update memo failed',
        }).then(() => {
          location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating memo:", error);
    }
  };

  const deleteMemo = async (_id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/calendar/${_id}`);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Delete memo success',
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Delete memo failed',
        }).then(() => {
          location.reload();
        });
      }
    } catch (error) {
      console.error("Error deleting memo:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    activity: "Running",
    description: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleActiveStartDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toDateString();

    // Create the memo data
    const memoData = {
      date: formattedDate,
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      activity: formData.activity,
      description: formData.description,
    };

    // Create the memo
    createMemo(memoData);

    // Reset the form
    setFormData({
      title: "",
      startTime: "",
      endTime: "",
      activity: "Running",
      description: "",
    });
  };

  const updateHandler = () => {
    const formattedDate = selectedDate.toDateString();
    const updatedMemo = {
      date: formattedDate,
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      activity: formData.activity,
      description: formData.description,
    };
    console.log(updatedMemo, memoId);
    updateMemo(updatedMemo, memoId);

    // Reset the form
    setFormData({
      title: "",
      startTime: "",
      endTime: "",
      activity: "Running",
      description: "",
    });
  };

  const hasMemos = (date) => {
    return memos.some((memo) => memo.date === date.toDateString());
  };

  // Function to render the dot indicator for dates with memos
  const renderTileContent = ({ date }) => {
    if (hasMemos(date)) {
      return <div className="event-indicator" />;
    }
    return null;
  };

  return (
    <>
      <NavbarLoggedIn />
      <div className="app-container">
        <header className="flex lg:justify-start justify-center mt-[100px] mb-4 lg:mb-[2rem] gap-4 lg:ml-[149px]">
          <h1 className="text-3xl lg:text-4xl  font-sans font-bold">
            Activity Calendar
          </h1>
        </header>
        <main className="app-main">
          <div className="calendar-and-memos">
            <div className="calendar-container">
              <Calendar
                className="custom-calendar"
                tileClassName={({ date }) =>
                  date === selectedDate ? "custom-tile selected" : "custom-tile"
                }
                tileContent={renderTileContent}
                onClickDay={handleDateChange}
                defaultActiveStartDate={new Date(currentDate)}
                onActiveStartDateChange={handleActiveStartDateChange}
                defaultView="month"
                formatShortWeekday={(locale, date) => {
                  return new Intl.DateTimeFormat(locale, {
                    weekday: "short",
                  }).format(date);
                }}
                formatLongWeekday={(locale, date) => {
                  return new Intl.DateTimeFormat(locale, {
                    weekday: "long",
                  }).format(date);
                }}
                calendarClassName="centered-day-names"
              />
              <button
                onClick={() => {
                  if (selectedDate <= new Date() - 1) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Cannot create memo on the past date",
                    });
                  } else {
                    document.getElementById("my_modal_2").showModal();
                  }
                }}
                className="add-memo-button"
              >
                +
              </button>
            </div>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box w-full max-w-sm">
                <div className="modal-header">
                  <h2 className="text-xl font-bold">Create Memo</h2>
                </div>
                <div className="modal-content">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col text-base gap-2 my-4"
                  >
                    <div className="form-group">
                      <label className="font-bold">Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="input input-sm input-bordered w-full max-w-sm"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Date:</label>
                      <br />
                      <span>
                        {selectedDate
                          ? selectedDate.toDateString()
                          : "Select a date"}
                      </span>{" "}
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Start Time:</label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="input input-sm input-bordered w-full max-w-sm"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">End Time:</label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="input input-sm input-bordered w-full max-w-sm"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Select Activity:</label>
                      <select
                        name="activity"
                        value={formData.activity}
                        onChange={handleInputChange}
                        className="input input-sm input-bordered w-full max-w-sm"
                      >
                        <option value="" disabled>
                          Choose your activity
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
                    </div>
                    <div className="form-group">
                      <label className="font-bold">Description:</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered h-24 w-full max-w-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() =>
                        document.getElementById("my_modal_2").close()
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() =>
                        document.getElementById("my_modal_2").close()
                      }
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {selectedDate && memos && (
            <div className="memo-list">
              <h3>Memos for {selectedDate.toDateString()}</h3>
              <ul>
                {memos // Assuming memos is an array of objects with the 'memo' property
                  .filter((memo) => memo.date === selectedDate.toDateString())
                  .map((memo) => (
                    <li key={memo._id} className="card bg-base-300 my-2">
                      <span className="card-body">
                        <p className="text-xl font-bold">{memo.title}</p>
                        <p>
                          ({memo.startTime} - {memo.endTime})
                        </p>
                        <p className="font-bold text-xl">Activity</p>
                        <p className="text-base">{memo.activity}</p>
                        <p className="font-bold text-xl">Description</p>
                        <p className="text-base">{memo.description}</p>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            Swal.fire({
                              title: "Do you want to save the changes?",
                              showCancelButton: true,
                              confirmButtonText: "Yes",
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                deleteMemo(memo._id);
                                // Call your save function here if confirmed
                              } else if (result.isDenied) {
                                Swal.fire("Cannot delete memo");
                                // Handle not saving changes here
                              }
                            });
                          }}
                        >
                          Delete
                        </button>

                        <dialog id="my_modal_3" className="modal ">
                          <div className="modal-box w-full max-w-sm">
                            <p className="font-bold">Edit Memo</p>
                            <form className="flex flex-col text-base gap-2 my-4">
                              <label className="font-bold">Title:</label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="input input-sm input-bordered w-full max-w-sm"
                              />
                              <label className="font-bold">Date:</label>
                              <span>
                                {selectedDate
                                  ? selectedDate.toDateString()
                                  : "Select a date"}
                              </span>{" "}
                              {/* Display selected date */}
                              <label className="font-bold">Start Time:</label>
                              <input
                                type="time"
                                name="startTime"
                                onChange={handleInputChange}
                                value={formData.startTime}
                                required
                                className="input input-sm input-bordered w-full max-w-sm"
                              />
                              <label className="font-bold">End Time:</label>
                              <input
                                type="time"
                                name="endTime"
                                onChange={handleInputChange}
                                value={formData.endTime}
                                required
                                className="input input-sm input-bordered w-full max-w-sm"
                              />
                              <label className="font-bold">
                                Select Activity:
                              </label>
                              <select
                                name="activity"
                                onChange={handleInputChange}
                                value={formData.activity}
                                className="input input-sm input-bordered w-full max-w-sm"
                              >
                                <option value="" disabled>
                                  Choose your activity
                                </option>
                                <option value="Running">Running</option>
                                <option value="Walking">Walking</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Hiking">Hiking</option>
                                <option value="Weight Training">
                                  Weight Training
                                </option>
                                <option value="Yoga">Yoga</option>
                                <option value="Surfing">Surfing</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Football">Football</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Tennis">Tennis</option>
                                <option value="Volleyball">Volleyball</option>
                              </select>
                              <label className="font-bold">Description:</label>
                              <textarea
                                name="description"
                                onChange={handleInputChange}
                                value={formData.description}
                                className="textarea textarea-bordered h-24 w-full max-w-sm"
                              />
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  updateHandler(formData, setMemosId(memo._id));
                                  document.getElementById("my_modal_3").close();
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() =>
                                  document.getElementById("my_modal_3").close()
                                }
                              >
                                Cancel
                              </button>
                            </form>
                          </div>
                        </dialog>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </main>
        <footer className="app-footer">
          <p>&copy; 2023 Rocket Fit</p>
        </footer>
      </div>
    </>
  );
};

export default CalendarMain;
