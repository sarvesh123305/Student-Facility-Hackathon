import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  initialLoadUser,
  fetchSemesterCreditRegistration,
  semesterCreditRegistration,
} from "../../redux/actions/logActions";

const SemesterCreditRegistration = ({
  student: { studentDetails },
  initialLoadUser,
  fetchSemesterCreditRegistration,
  semesterCreditRegistration,
}) => {
  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const formData = {
      sName: "Semester 2",
    };
    fetchSemesterCreditRegistration(formData, setData);
    console.log("Run hua kya");
    initialLoadUser();
  }, []);

  const handlePreferenceChange = (
    electiveIndex,
    preferenceIndex,
    selectedValue
  ) => {
    setSelectedPreferences((prevState) => ({
      ...prevState,
      [`${electiveIndex}-${preferenceIndex}`]: selectedValue,
    }));
  };

  const handleCheckboxChange = (subjectName, isChecked) => {
    if (isChecked) {
      setSelectedSubjects((prevState) => [...prevState, subjectName]);
    } else {
      setSelectedSubjects((prevState) =>
        prevState.filter((subject) => subject !== subjectName)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //get mis
    // Validate if subjects are selected
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }

    // Validate if all preferences are selected
    const totalPreferences = data.Electives.reduce(
      (acc, elective) => acc + elective.NoOfElectives,
      0
    );
    if (Object.keys(selectedPreferences).length !== totalPreferences) {
      alert("Please select preferences for all electives.");
      return;
    }

    const finalPreferences = {};
    Object.entries(selectedPreferences).forEach(([key, value]) => {
      const [electiveIndex, preferenceIndex] = key.split("-");
      const electiveName = data.Electives[electiveIndex].subjectName;
      if (!finalPreferences[electiveName]) {
        finalPreferences[electiveName] = {};
      }
      finalPreferences[electiveName][`preference${preferenceIndex}`] = value;
    });

    const finalData = {
      electives: finalPreferences,
      subjects: selectedSubjects,
      mis: studentDetails ? studentDetails.mis : null,
      semesterName: data.semesterName,
    };

    console.log("Final Data:", finalData);
    await semesterCreditRegistration(finalData);

    // You can further process or send 'finalData' to the server as needed
  };

  return (
    <div className="container max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Semester VI Credit Registration
      </h1>

      <h2 className="text-lg font-semibold mb-2">Subjects</h2>
      {data &&
        data.subjects &&
        data.subjects.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              id={`subject-checkbox-${index}`}
              type="checkbox"
              value={item.subjectName}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                handleCheckboxChange(item.subjectName, e.target.checked)
              }
            />
            <label
              htmlFor={`subject-checkbox-${index}`}
              className="ms-4 text-md font-medium text-gray-900 dark:text-gray-900 m-2"
            >
              {item.subjectName}
            </label>
          </div>
        ))}

      <div className="mt-8">
        {data &&
          data.Electives &&
          data.Electives.map((elective, electiveIndex) => (
            <div key={electiveIndex} className="mb-6">
              <h2 className="text-lg font-semibold">{elective.subjectName}</h2>
              <form key={`form-${electiveIndex}`}>
                {[...Array(elective.NoOfElectives)].map(
                  (_, preferenceIndex) => (
                    <div key={`preference-${preferenceIndex}`} className="mb-4">
                      <label
                        htmlFor={`preference-${electiveIndex}-${preferenceIndex}`}
                        className="block text-md font-medium text-gray-900 mb-2"
                      >
                        Preference {preferenceIndex + 1}
                      </label>
                      <select
                        id={`preference-${electiveIndex}-${preferenceIndex}`}
                        className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        onChange={(e) =>
                          handlePreferenceChange(
                            electiveIndex,
                            preferenceIndex,
                            e.target.value
                          )
                        }
                        value={
                          selectedPreferences[
                            `${electiveIndex}-${preferenceIndex}`
                          ] || ""
                        }
                      >
                        <option value="" disabled>
                          Choose Elective
                        </option>
                        {elective.Electives.map(
                          (electiveOption, optionIndex) => (
                            <option
                              key={`option-${optionIndex}`}
                              value={electiveOption}
                            >
                              {electiveOption}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )
                )}
              </form>
            </div>
          ))}
        {/* <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button> */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, {
  initialLoadUser,
  fetchSemesterCreditRegistration,
  semesterCreditRegistration,
})(SemesterCreditRegistration);
