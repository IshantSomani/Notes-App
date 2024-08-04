import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import Avtar from "../../assets/images/avtar.png";

const Navbar = ({ userInfo, onSearchNotes, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between gap-4 py-2 px-4 drop-shadow">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-indigo-600">Notes</h1>
        </Link>
      </div>

      {userInfo && (
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search notes"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        {userInfo ? (
          <>
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={Avtar}
                alt={userInfo.fullName}
              />
            </div>
            <div className="ml-3 hidden sm:block">
              <div className="text-base font-medium text-gray-800">
                {userInfo.fullName}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {userInfo.email}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <HiOutlineLogout className="h-6 w-6" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
