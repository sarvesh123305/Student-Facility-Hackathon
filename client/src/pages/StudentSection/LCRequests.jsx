import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  initialLoadUser,
  getLeavingCertificateRequests,
} from "../../redux/actions/studentSection";
import LCRequestItem from "./LCRequestItem";

const LCRequests = ({
  studentsection: { leavingCertificateRequests },
  initialLoadUser,
  getLeavingCertificateRequests,
}) => {
  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState(leavingCertificateRequests);

  // const fetchData = async () => {};
  useEffect(() => {
    getLeavingCertificateRequests();
  }, [leavingCertificateRequests]);

  useEffect(() => {
    setData(leavingCertificateRequests);
  }, [leavingCertificateRequests]);

  const options = [
    { label: "All", value: "All" },
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
  ];

  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="w-full p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          All LC Approval Requests
        </h5>

        <div
          className="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span className="font-medium">
            {data && data.length > 0 && data.length} Requests
          </span>
        </div>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <LCRequestItem
                key={item._id}
                mis={item.mis}
                name={item.name}
                remark={item.remark}
                programme={item.programme}
                ay={item.academicYear}
                dept={item.dept}
                status={item.status}
                render={setData}
              />
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
  getLeavingCertificateRequests,
})(LCRequests);
