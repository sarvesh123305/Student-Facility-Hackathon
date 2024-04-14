import React, { useContext, useEffect } from "react";
import AuthContext from "../../components/context/auth/authContext";
import Avatar from "../../components/Avatar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialLoadUser } from "../../redux/actions/logActions";
import { useState } from "react";
import NotificationDialog from "../../pages/Student/NotificationDialog";
import LogoutDropDown from "../../pages/Student/LogoutDropDown";
import SearchDropdown from "../../pages/Student/SearchDropdown";
const Navbar = ({ student, initialLoadUser }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [toggle, setToggle] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const result = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        // console.log(result)
        setResults(result);
      });
  };

  function searchDatabase(obj, input) {
    setResults([]);
    function searchInObject(currentObj, input) {
      for (const key in currentObj) {
        if (typeof currentObj[key] === "object") {
          searchInObject(currentObj[key], input); // Recursive call for nested objects
        } else {
          if (
            String(key).toLowerCase().includes(input.toLowerCase()) ||
            String(currentObj[key]).toLowerCase().includes(input.toLowerCase())
          ) {
            results.push({ key, value: currentObj[key] });
          }
        }
      }
    }

    searchInObject(obj, input);

    return results;
  }

  const handleChange = (value) => {
    setInput(value);
    const result = searchDatabase(student, value);
    console.log(result);
    setResults(result);
    // console.log(student)
    // console.log("On change called")
  };

  return (
    <div className="flex flex-row  p-2 bg-white justify-between items-center">
      {/*  <div className="">
        <input
          type="search"
          className="relative m-0 block  min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-black-800 dark:placeholder:text-black-200 dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Type a Search"
        />
      </div>
      */}
      {toggle ? <NotificationDialog /> : ""}
      {logoutToggle ? <LogoutDropDown /> : ""}
      {results && results.length > 0 && <SearchDropdown results={results} />}
      {/* {searchToggle ? <SearchDropdown/> : ""} */}

      <div></div>
      {/*      
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}

      <form className=" flex items-center sm:w-1/2 max-w-md mx-auto p-1 ">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full m-1 ">
          <input
            type="text"
            id="simple-search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5   "
            placeholder="Search Anything"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          <svg
            className="w-4 h-4 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="flex items-center">
        <button
          id="dropdownNotificationButton"
          onClick={() => setToggle(!toggle)}
          data-dropdown-toggle="dropdownNotification"
          className="relative  inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:outline-none "
          type="button"
        >
          <svg
            className="w-7 h-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>

          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5"></div>
        </button>

        <div
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="flex ml-5"
        >
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              className="w-8 mr-2 rounded-full"
              alt="Avatar"
            />
          </div>
          <button
            className="relative group hover:bg-transparent"
            onClick={() => setLogoutToggle(!logoutToggle)}
          >
            {/* <Avatar/> */}
            <h3 className="mr-2 mt-1 font-medium">{user && user.name}</h3>
            {/* <div
              className="z-10 hidden absolute shadow w-32 group-focus:block 
            top-full right-0"
            >
              <ul className=" text-sm bg-black rounded-lg text-white">
                <div className="w-32 py-2" onClick={handleLogout}>
                  Logout
                </div>
              </ul>
            </div> */}
          </button>
          <div
            id="dropdown"
            className="z-10 hidden absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  initialLoadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, { initialLoadUser })(Navbar);
