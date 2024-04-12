import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../../css/Academic.css";

// const SGPA = [8.05, 8.86, 6.86, 6.96, 7.65];
// const CGPA = [8.05, 8.45, 7.91, 7.65, 7.65];

const xLabels = [
  "SEM1",
  "SEM2",
  "SEM3",
  "SEM4",
  "SEM5",
  "SEM6",
  "SEM7",
  "SEM8",
];

import { connect } from "react-redux";
import { initialLoadUser } from "../../redux/actions/logActions";
const Academic = ({ student: { academicProfile }, initialLoadUser }) => {
  const CGPA = academicProfile?.semesters.map((sem) => sem.newCGPA);
  const SGPA = academicProfile?.semesters.map((sem) => sem.newSGPA);
  useEffect(() => {
    initialLoadUser();
  }, []);
  return (
    academicProfile && (
      <div className="resultBar mx-auto my-8 ">
        <h1>
          <b>Semester-Wise Performance</b>
        </h1>

        <BarChart
          className="w-160 sm:w-180"
          height={400}
          series={[
            { data: SGPA, label: "SGPA", id: "pvId" },

            { data: CGPA, label: "CGPA", id: "uvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />

        <div className="md:flex">
          <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500  md:me-4 mb-4 md:mb-0 p-4 ">
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg  w-full "
                aria-current="page"
              >
                SEMESTER I
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full "
              >
                SEMESTER II
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full"
              >
                SEMESTER III
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full "
              >
                SEMESTER IV
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full "
              >
                SEMESTER V
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 rounded-lg  w-full text-white bg-blue-700"
              >
                SEMESTER VI
              </a>
            </li>
          </ul>
          <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">SEM V</h3>

            <div className="relative overflow-x-auto overflow">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Subject Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subject Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subject Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Semester Credit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      No. of Attempt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Awarded Grade
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Awarded Grade Point
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subject Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Software Engineering Mini Project II
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10002</td>
                    <td className="px-6 py-4">3</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Design and Analysis of Algorithms
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10003</td>
                    <td className="px-6 py-4">4</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Operating System
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10003</td>
                    <td className="px-6 py-4">3</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Web Technologies
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10004</td>
                    <td className="px-6 py-4">3</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Data Science
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10005</td>
                    <td className="px-6 py-4">3</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Programmable Logic Controller
                    </th>
                    <td className="px-6 py-4">Mandatory</td>
                    <td className="px-6 py-4">CS-10006</td>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">---</td>
                    <td className="px-6 py-4">
                      <div
                        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
                        role="alert"
                      >
                        <span className="font-medium">Appearing</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { initialLoadUser })(Academic);
