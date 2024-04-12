import React, { useContext } from "react";
import AuthContext from "../../components/context/auth/authContext";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className="flex flex-row  p-2 bg-white justify-between ">
      <div className="">
        <input
          type="search"
          className="relative m-0 block  min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-black-800 dark:placeholder:text-black-200 dark:focus:border-primary"
          id="exampleSearch"
          placeholder="Type a Search"
        />
      </div>
      <div className="flex">
        <div className="">
          <img
            src={window.location.origin + "/images/notification.png"}
            className="w-7  rounded-full"
            alt="Avatar"
          />
        </div>
        <div className="flex ml-5">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              className="w-8 mr-2 rounded-full"
              alt="Avatar"
            />
          </div>
          <h3 className="mr-2 mt-1 font-medium">{user && user.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
