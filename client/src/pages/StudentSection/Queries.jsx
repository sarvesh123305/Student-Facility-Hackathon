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
  const [modalToggle, setModalToggle] = useState(false);
  const [text, setText] = useState("")
  
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const sendQuery = () => {
    console.log(text)
  }

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

        {
          modalToggle ?    <div id="popup-modal" tabindex="-1" class=" z-10 absolute top-1/3 right-1/3 justify-center items-center  ">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow p-6 ">
              <button type="button" onClick={() => setModalToggle(!modalToggle)} class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
              <div class="p-4 md:p-5 text-center ">

                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your Reply</label>
                <textarea value={text} onChange={handleChange} id="message" rows="4" class="block p-2.5 mb-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>

                <button data-modal-hide="popup-modal" type="button" onClick={sendQuery} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Send
                </button>
                <button data-modal-hide="popup-modal" type="button" onClick={() => setModalToggle(!modalToggle)} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Close</button>
              </div>
            </div>
          </div>
        </div> : null 
        }


      
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
            <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} show={setModalToggle}/>
          ))}


          {selectedValue === 'Pending' && data && data.length > 0 && data.map(item => (
            item.status === 'Pending' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} show={setModalToggle}/>

              : null
          ))}

          {selectedValue === 'Replied' && data && data.length > 0 && data.map(item => (
            item.status === 'Replied' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} show={setModalToggle}/>

              : null
          ))}

          {selectedValue === 'Rejected' && data && data.length > 0 && data.map(item => (
            item.status === 'Rejected' ?
              <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} show={setModalToggle}/>

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
