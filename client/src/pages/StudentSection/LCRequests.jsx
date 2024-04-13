import React, { useEffect } from "react";
import { useState } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { initialLoadUser } from "../../redux/actions/studentSection";
import LCRequestItem from './LCRequestItem'

const LCRequests = ({
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
          'http://localhost:5000/api/studentsection/getLCRequests'
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
          All Scholarship Approval Requests
        </h5>

        <div
          class="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span class="font-medium">{data.length > 0 && (data.length)} Notifications</span>
        </div>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
          {console.log(data)}
          {/* {selectedValue === 'Public' ? data && data.public && data.public.map(item => (
            <NotificationItem mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          )) : ""}

          {selectedValue === 'Private' && data && data.private && data.private.map(item => (
            <NotificationItem mis={item.mis} message={item.message} relatedTo={item.relatedTo} />))}

          {selectedValue === 'All' && data && data.private && data.private.map(item => (
            <NotificationItem key={item._id} mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          ))}
          {selectedValue === 'All' && data && data.public && data.public.map(item => (
            <NotificationItem key={item._id} mis={item.mis} message={item.message} relatedTo={item.relatedTo} />
          ))} */}
          {data && data.length > 0 && data.map(item => (
            <LCRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status}/>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default connect(null, {
  initialLoadUser,
})(LCRequests);
