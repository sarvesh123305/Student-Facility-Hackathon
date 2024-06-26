import React, { useEffect } from "react";
import { useState } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { initialLoadUser, getScholarshipRequests } from "../../redux/actions/studentSection";
import ScholarshipRequestItem from "./ScholarshipRequestItem";
import FilterDropdown from "../Student/FilterDropdown";

const ScholarshipRequests = ({
  studentsection: { scholarshipRequests },
  initialLoadUser,
  getScholarshipRequests,
}) => {

  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState(scholarshipRequests)

  useEffect(() => {
    getScholarshipRequests();
  }, [scholarshipRequests])

  useEffect(() => {
    setData(scholarshipRequests);
  }, [scholarshipRequests])

  const options = [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };
  const [toggle, setToggle] = useState(false);


  return (
    <div class="w-full p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900">
          Scholarship Approval Requests
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
          <span class="font-medium">{data && data.length > 0 && (data.length)} Requests</span>
        </div>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
        
        {selectedValue === 'All' && data && data.length > 0 && data.map(item => (
            <ScholarshipRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status} render={setData} />
          ))}

          
          {selectedValue === 'Pending' && data && data.length > 0 && data.map(item => (
            item.status === 'notApproved' ?
            <ScholarshipRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status} render={setData} />
            : null
          ))}

          {selectedValue === 'Approved' && data && data.length > 0 && data.map(item => (
            item.status === 'Approved' ?
              <ScholarshipRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status} render={setData} />
              : null
          ))}

          {selectedValue === 'Rejected' && data && data.length > 0 && data.map(item => (
            item.status === 'Rejected' ?
              <ScholarshipRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status} render={setData} />
              : null
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentsection: state.studentsection,
});

export default connect(mapStateToProps, {
  initialLoadUser,
  getScholarshipRequests,
})(ScholarshipRequests);
