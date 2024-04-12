import React, { useEffect } from "react";
import { useState } from 'react'
import axios from "axios";
import NotificationItem from "./NotificationItem";
import { connect } from "react-redux";
import { initialLoadUser } from "../../redux/actions/logActions";
import FilterDropdown from "./FilterDropdown";

const Notifications = ({
  initialLoadUser,
}) => {

  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/student/notifications/142203002'
        );
        console.log('Response is ', response.data);
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const [toggle, setToggle] = useState(false);

  const options = [
    { label: 'All', value: 'All' },
    { label: 'Public', value: 'Public' },
    { label: 'Private', value: 'Private' }
  ];

  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div class="w-full p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900">
          All Notifications
        </h5>
        <button id="dropdownDefaultButton" onClick={() => setToggle(!toggle)} data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filter<svg class=" ml-2 w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
        </button>
        {toggle ? <FilterDropdown
          options={options}
          selectedValue={selectedValue}
          onValueChange={handleDropdownChange}
        /> : ""}

        <div
          class="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span class="font-medium">{data.length > 0 && (data.public.length + data.private.length)} Notifications</span>
        </div>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">

          {selectedValue === 'Public' ? data && data.public && data.public.map(item => (
            <NotificationItem mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          )) : ""}

          {selectedValue === 'Private' && data && data.private && data.private.map(item => (
            <NotificationItem mis={item.mis} message={item.message} relatedTo={item.relatedTo} />))}

          {selectedValue === 'All' && data && data.private && data.private.map(item => (
            <NotificationItem key={item._id} mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          ))}
          {selectedValue === 'All' && data && data.public && data.public.map(item => (
            <NotificationItem key={item._id} mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          ))}

          {/* <li class="py-3 sm:py-4 hover:bg-gray-100 p-3 hover:rounded-xl">
            <div class="flex items-center">
              <div class="flex-shrink-0 pr-5">
                <img
                  class="w-8 h-8 rounded-full"
                  src={imageUrl}
                  alt="Neil image"
                />
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-md font-medium text-gray-900 truncate">
                  Scholarship
                </p>
                <p class="text-md text-gray-500 truncate">
                  All the students kindly bring all documents with zerox copy
                  attached to Students Section (Timing : 11 am - 5 pm).Last Date
                  is 31st May 2024
                </p>

                <div class="flex items-start gap-2.5">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-start my-2.5 bg-gray-100  rounded-xl p-3">
                      <div class="me-2">
                        <span class="flex items-center gap-2 text-sm font-medium text-gray-900  pb-2">
                          <svg fill="none" aria-hidden="true" class="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                            <g clip-path="url(#clip0_3173_1381)">
                              <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z" />
                              <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z" />
                              <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z" />
                              <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z" />
                              <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z" />
                              <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_3173_1381">
                                <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)" />
                              </clipPath>
                            </defs>
                          </svg>
                          Flowbite Terms & Conditions
                        </span>
                        <span class="flex text-xs font-normal text-gray-500  gap-2">
                          12 Pages
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                            <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                          </svg>
                          18 MB
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                            <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                          </svg>
                          PDF
                        </span>
                      </div>
                      <div class="inline-flex self-center items-center ml-2">
                        <button class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50 " type="button">
                          <svg class="w-4 h-4 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <div class="inline-flex flex-col items-center text-base font-semibold text-gray-900">
                Apr 7
                <span className="inline-flex items-center text-sm font-normal text-gray-500 p-3 ">
                        <svg
                          className="w-2.5 h-2.5 me-1 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                          <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                          <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                        </svg>
                        Private
                      </span>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default connect(null, {
  initialLoadUser,
})(Notifications);
