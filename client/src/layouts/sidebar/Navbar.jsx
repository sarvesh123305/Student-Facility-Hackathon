import React, { useContext, useEffect } from "react";
import AuthContext from "../../components/context/auth/authContext";
import Avatar from "../../components/Avatar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initialLoadUser } from "../../redux/actions/logActions";
const Navbar = ({ initialLoadUser }) => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  useEffect(() => {
    // initialLoadUser();
    // eslint-disable-next-line
  }, []);
  const handleLogout = () => {
    console.log("LOgout");
    logout();
    window.location.replace('/login');
  };
  const url = "data:image/jpeg;base64,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";
  return (
    <div className="flex flex-row  p-2 bg-white justify-between ">
      {/*  <div className="">
        <input
          type="search"
          className="relative m-0 block  min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-black-800 dark:placeholder:text-black-200 dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Type a Search"
        />
      </div>
      */}

      <div></div>

      <div className="flex">

        <button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
          <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>

          <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
        </button>


        <div id="dropdownNotification" className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex-shrink-0">
                <img className="rounded-full w-11 h-11" src={url} alt="Jese image" />
                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                  <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
              </div>
            </a>
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex-shrink-0">
                <img className="rounded-full w-11 h-11" src={url} alt="Joseph image" />
                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                  <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
              </div>
            </a>
          </div>
        </div>
        <div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex ml-5">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              className="w-8 mr-2 rounded-full"
              alt="Avatar"
            />
          </div>
          <button  className="relative group hover:bg-transparent">
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
          <div id="dropdown" class="z-10 hidden absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
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
export default connect(null, { initialLoadUser })(Navbar);
