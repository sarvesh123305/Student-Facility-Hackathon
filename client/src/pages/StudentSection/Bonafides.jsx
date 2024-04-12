import React, { useState, useEffect } from "react";
import axios from "axios";

const Bonafides = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/studentsection/bonafideApplications');
        setApplications(res.data);
      } catch (error) {
        console.log('Error fetching application:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">MIS</th>
              <th scope="col" className="px-6 py-3">Dept</th>
              <th scope="col" className="px-6 py-3">Year</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application._id}>
                <td className="px-6 py-4">{application.name}</td>
                <td className="px-6 py-4">{application.mis}</td>
                <td className="px-6 py-4">{application.dept}</td>
                <td className="px-6 py-4">{application.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bonafides;
