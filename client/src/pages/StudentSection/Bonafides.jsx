import React, { useState, useEffect } from "react";
import axios from "axios";

const Bonafides = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/studentsection/bonafideApplications");
        setApplications(res.data);
      } catch (error) {
        console.log("Error fetching application:", error);
      }
    };

    fetchData();
  }, []);

  const submitStatusN = async (record) => {
    try {
      const res = await axios.put("/api/studentsection/bonafideApproval", {
        mis: record.mis,
        status: "Rejected",
      });
    } catch (error) {
      console.log("Error fetching application:", error);
    }
  };

  const submitStatusY = async (record) => {
    try {
      console.log("Button clicked:", record.mis);
      const res = await axios.put("/api/studentsection/bonafideApproval", {
        mis: record.mis,
        status: "Approved",
      });
    } catch (error) {
      console.log("Error fetching application:", error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                MIS
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Dept
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="px-6 py-4">{application.mis}</td>
                <td className="px-6 py-4">{application.name}</td>
                <td className="px-6 py-4">{application.dept}</td>
                <td className="px-6 py-4">{application.dept}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => submitStatusY(application)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => submitStatusN(application)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bonafides;
