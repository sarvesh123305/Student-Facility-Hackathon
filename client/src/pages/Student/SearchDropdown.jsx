import React from "react";
import { Link } from "react-router-dom";

const SearchDropdown = ({ results }) => {
  return (
    <div
      id="dropdownDivider"
      class="z-10  absolute bg-gray-200 top-14 md:left-1/2 lg:left-1/2 transform -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/3 "
    >
      <ul
        class="py-2 text-lg text-gray-700 "
        aria-labelledby="dropdownDividerButton"
      >
        {/* <li>
            <Link
                to={"/"}
                class="block px-4 py-1 hover:bg-gray-100 "
            >
                Profile
            </Link>
        </li>
        <li>
            <Link
                to={"/Academics/AcademicProfile"}
                class="block px-4  py-1 hover:bg-gray-100 "
            >
                Academic Profile
            </Link>
        </li> */}

        {results.map((result, id) => {
          return (
            <li id={id}>
              <Link
                to={"/"}
                class="block px-4 py-1 border border-gray-100 hover:bg-gray-100 "
              >
                {result.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchDropdown;
