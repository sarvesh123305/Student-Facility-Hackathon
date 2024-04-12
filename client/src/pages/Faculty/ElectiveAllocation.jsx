import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getElectivesList } from "../../redux/actions/facultyActions";
const ElectiveAllocation = ({
  faculty: { electivesCategoryList },
  getElectivesList,
}) => {
  const [categories, setCategories] = useState([]);
  const [preferencesCount, setPreferencesCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getElectivesList();

    const student = electivesCategoryList[0];
    const findcategories = Object.keys(student.electives);
    // console.log(categories);
    setCategories(findcategories);
  }, []);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    const preferencesLength = electivesCategoryList
      ? Object.keys(electivesCategoryList[0].electives[event.target.value])
          .length
      : 0;
    setPreferencesCount(preferencesLength);
    // console.log(preferencesLength);
  };

  return (
    <div>
      <div className="m-10">
        <h1 className="m-2">Elective Students list </h1>
        {/*
      
       <button
       type="button"
       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm
       px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
       >
       Allocate All Electives
       </button>
      */}

        <form class="p-2 max-w-sm ">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            onChange={handleSelectChange}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black "
          >
            <option selected disabled={selectedOption !== ""}>
              Choose an Elective Category
            </option>
            {categories?.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </form>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-black bg-slate-950">
            <thead
              className="text-xs text-white uppercase"
              style={{ backgroundColor: "#17324E" }}
            >
              <tr>
                <th scope="col" className="px-6 py-3">
                  MIS
                </th>

                {preferencesCount > 1 &&
                  [...Array(preferencesCount)].map((_, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                      Preference {index + 1}
                    </th>
                  ))}
                <th scope="col" className="px-6 py-3">
                  CGPA
                </th>
                <th scope="col" className="px-6 py-3">
                  SGPA
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedOption
                ? electivesCategoryList?.map((student, index) => (
                    <tr className="bg-white border-b " key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black"
                      >
                        {student.mis}
                      </th>
                      {Object.values(student.electives[selectedOption]).map(
                        (preference, preferenceIndex) => (
                          <td key={preferenceIndex} className="px-6 py-4">
                            {preference}
                          </td>
                        )
                      )}
                      <td className="px-6 py-4">7.76</td>
                      <td className="px-6 py-4">7.76</td>
                    </tr>
                  ))
                : "No Data Found"}
            </tbody>
          </table>
        </div>
        {/*selectedOption ? (
          ""
        ) : (
          No Data Found
        )*/}
      </div>
    </div>
  );
};

ElectiveAllocation.propTypes = {
  getElectivesList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  faculty: state.faculty,
});
export default connect(mapStateToProps, { getElectivesList })(
  ElectiveAllocation
);
