import React, { useState } from "react";
import "../../css/Allocationform.css";

const Allocationform = () => {
  const [purpose, setPurpose] = useState("");
  const [numSubjects, setNumSubjects] = useState(1);
  const [subjectNames, setSubjectNames] = useState([""]);

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleNumSubjectsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumSubjects(count);
    setSubjectNames(
      new Array(count).fill("").map((_, index) => subjectNames[index] || "")
    );
  };

  const handleSubjectNameChange = (e, index) => {
    const newSubjectNames = [...subjectNames];
    newSubjectNames[index] = e.target.value;
    setSubjectNames(newSubjectNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with purpose and subjectNames
    console.log("Purpose:", purpose);
    console.log("Subject Names:", subjectNames);
    // You can add your logic to submit the form data to backend or do any other processing here
  };

  return (
    <div className="form-container p-8">
      <h1 className="mb-8">
        <b>Electives Allocation Form</b>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={handlePurposeChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numSubjects">Number of Subjects:</label>
          <input
            type="number"
            id="numSubjects"
            min="1"
            value={numSubjects}
            onChange={handleNumSubjectsChange}
            required
          />
        </div>
        {subjectNames.map((subject, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`subject${index}`}>Subject {index + 1}:</label>
            <input
              type="text"
              id={`subject${index}`}
              value={subject}
              onChange={(e) => handleSubjectNameChange(e, index)}
              required
            />
          </div>
        ))}
        <button
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Allocationform;
