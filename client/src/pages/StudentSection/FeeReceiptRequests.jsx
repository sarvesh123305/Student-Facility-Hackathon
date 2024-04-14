import React, { useEffect } from "react";
import { useState } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import { initialLoadUser } from "../../redux/actions/studentSection";
import LCRequestItem from './LCRequestItem'
import FeeReceiptRequestItem from "./FeeReceiptRequestItem";

const FeeRecieptRequests = ({
  initialLoadUser,
}) => {

  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState([])

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
  useEffect(() => {
    fetchData();
  }, [])

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
          Fee Receipt Approval Requests
        </h5>

        <div
          class="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span class="font-medium">{data && data.length > 0 && (data.length)} Requests</span>
        </div>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
          {data && data.length > 0 && data.map(item => (
            <FeeReceiptRequestItem key={item._id} mis={item.mis} name={item.name} remark={item.remark} programme={item.programme} ay={item.academicYear} dept={item.dept} status={item.status} render={setData}/>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default connect(null, {
  initialLoadUser,
})(FeeRecieptRequests);
