import React, { useContext, useEffect } from "react";
import UserContext from "../../components/context/user/userContext";
const ScholarshipQueries = () => {
  const userContext = useContext(UserContext);
  // const { contacts, filtered, getContacts, loading } = contactContext;
  const { getQueries, queries, sendQuery } = userContext;
  useEffect(() => {
    console.log(queries);
    getQueries();
    //eslint-disable-next-line
  }, []);
  const helper = () => {
    // console.log("done done done");
    // sendQuery(); to be prepared here
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-15 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-4">
        <div className="md:col-span-12">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-s pan-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={helper}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
      <div>
        <h1>All Present Queries :</h1>
      </div>
    </div>
  );
};

export default ScholarshipQueries;
