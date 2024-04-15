import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  initialLoadUser,
  getAllQueries,
} from "../../redux/actions/studentSection";
import QueryItem from "./QueryItem";
import FilterDropdown from "../Student/FilterDropdown";

const LCRequests = ({
  studentsection: { queries },
  initialLoadUser,
  getAllQueries,
}) => {
  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState(queries);

  // const fetchData = async () => {};
  useEffect(() => {
    getAllQueries();
  }, [queries]);

  useEffect(() => {
    console.log(queries)
    setData(queries);
  }, [queries]);

  const options = [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Replied', value: 'Replied' },
    { label: 'Rejected', value: 'Rejected' }
  ];

  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };

  const [toggle, setToggle] = useState(false);
 

  return (
    <div className="w-full p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          All Queries
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
          className="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span className="font-medium">
            {data && data.length > 0 && data.length} Queries
          </span>
        </div>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {selectedValue === 'All' && data && data.length > 0 && data.map(item => (
            <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} />
            ))}

          {selectedValue === 'Pending' && data && data.length > 0 && data.map(item => (
            item.status === 'Pending' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} />

              : null
          ))}

          {selectedValue === 'Replied' && data && data.length > 0 && data.map(item => (
            item.status === 'Replied' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} />

              : null
          ))}

          {selectedValue === 'Rejected' && data && data.length > 0 && data.map(item => (
            item.status === 'Rejected' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} />

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
  getAllQueries,
})(LCRequests);
