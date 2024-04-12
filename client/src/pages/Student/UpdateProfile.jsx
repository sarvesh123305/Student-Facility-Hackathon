import React from 'react'
import { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import FamilyDetails from './FamilyDetails';

const UpdateProfile = () => {
    const [selectedItem, setSelectedItem] = useState('Personal Details');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log(item)
  };
    return (
        <div className="p-3">

            <div  class="block max-w-full p-6 bg-white border border-gray-300 rounded-lg grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 p-10 text-md shadow hover:bg-gray-100">

              <div className="w-full object-contain whitespace-normal">
                <b> MIS Number </b>: 142203002
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Name of Student</b>: KULKARNI SARVESH ANANT
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Department </b>:{" "} Computer Engineering
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Branch/Course </b>:{" "} B Tech
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Course Level</b>:{" "} Third Year
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Date Of Admission</b>:{" "} 2022
              </div>
              <div className="w-full object-contain whitespace-normal overflow-wrap break-word max-w-full">
                <b>Coep Email </b>: kulkarnisa22.comp@coeptech.ac.in
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>G-Merit-No</b> :50
              </div>
            </div>

            <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select your country</label>
                <select id="tabs" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Personal Details</option>
                    <option>Contact Details</option>
                    <option>Family Details</option>
                </select>
            </div>
            <ul class=" mt-10 hidden text-md font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li class="w-full focus-within:z-10" onClick={() => handleItemClick('Personal Details')}>
                    <a href="#" class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300  focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Personal Details</a>
                </li>
                <li class="w-full focus-within:z-10" onClick={() => handleItemClick('Contact Details')}>
                    <a href="#" class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Contact Details</a>
                </li>
                <li class="w-full focus-within:z-10" onClick={() => handleItemClick('Family Details')}>
                    <a href="#" class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Family Details</a>
                </li>
            </ul>

           
            {/* <div className="container w-full bg-gray-300 justify-self-center"> */}
                    {selectedItem === 'Personal Details' && <PersonalDetails/>}
                    {selectedItem === 'Contact Details' && <ContactDetails/>}
                    {selectedItem === 'Family Details' && <FamilyDetails/>}
            {/* </div> */}


        </div>
    )
}

export default UpdateProfile