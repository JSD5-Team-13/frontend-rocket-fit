/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import { AiOutlineSearch } from 'react-icons/ai';

const Connection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState([
    { name: 'John Doe', image: 'john-doe.jpg' },
    { name: 'Jane Smith', image: 'jane-smith.jpg' },
    { name: 'Alice Johnson', image: 'alice-johnson.jpg' },
    // Add more connection objects here with 'name' and 'image' properties.
  ]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredConnections = connections.filter((connection) => {
    return connection.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <NavbarLoggedIn />
      <div className="max-w-screen-xl m-auto h-[80vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center mt-[110px] mb-4 lg:mb-[2rem] lg:self-start gap-4 lg:ml-10">
            <h1 className="text-[2rem] font-bold uppercase">Connection</h1>
            <form className="flex relative items-center justify-end ">
              <button className="absolute text-2xl m-3">
                <AiOutlineSearch />
              </button>
              <input
                placeholder="Search"
                className="input input-ghost input-sm w-full max-w-xl bg-[#D9D9D9] text-center rounded-2xl"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>

          <div className="w-[90%] lg:w-[70%] flex flex-col items-center lg:grid lg:grid-cols-2 lg:justify-items-center bg-base-300 p-4 my-4 rounded-xl">
            {filteredConnections.map((connection, index) => (
              <div key={index} className="card w-[95%] bg-base-100 shadow-xl my-4">
                <div className="card-body">
                  <div className="flex flex-row items-center">
                    <img
                      src={connection.image}
                      alt="profile"
                      className="rounded-full w-24 h-24 mr-4"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg my-2">{connection.name}</h1>
                      <button className="btn btn-sm btn-accent rounded-2xl">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Connection;
