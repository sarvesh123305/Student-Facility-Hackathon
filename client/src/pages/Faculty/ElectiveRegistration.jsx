import React, { useState } from "react";
import "../../css/Allocationform.css";

const ElectiveRegistration = () => {
  const [purpose, setPurpose] = useState("");
  const [credits, setCredits] = useState("");
  const [numSubjects, setNumSubjects] = useState(1);
  const [numElectiveCategories, setNumElectiveCategories] = useState(1);

  const [numElectiveSubjects, setElectiveNumSubjects] = useState(1);
  const [electives, setElectives] = useState([{ name: "" }]);
  const [subjects, setSubjects] = useState([
    { name: "", code: "", credits: "" },
  ]);
  const [electivesCateory, setElectivesCategory] = useState([
    {
      numberofElectives: "",
      nameOfElectiveCategory: "",
      credits: "",
    },
  ]);
  const [nameOfElectiveCategory, setNameOfElectiveCategory] = useState("");

  const handleNameCategoryChange = (e) => {
    setNameOfElectiveCategory(e.target.value);
  };
  //handleNumElectiveChange
  const handleNumElectiveChange = (e) => {
    const count = parseInt(e.target.value);
    setNumElectiveCategories(count);
    const newElectives = Array.from({ length: count }, () => ({
      numberofElectives: "",
      nameOfElectiveCategory: "",
      credits: "",
    }));
    setElectivesCategory(newElectives);
  };
  const handleNumSubjectsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumSubjects(count);
    const newElectives = Array.from({ length: count }, () => ({
      name: "",
      code: "",
      credits: "",
    }));
    setSubjects(newElectives);
  };
  const handleElectiveNumSubjectsChange = (e) => {
    const count = parseInt(e.target.value);
    setElectiveNumSubjects(count);
    const newElectives = Array.from({ length: count }, () => ({
      name: "",
      code: "",
      credits: "",
    }));
    setElectives(newElectives);
  };
  const handleSubjectChange = (e, index, field) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = e.target.value;
    setSubjects(newSubjects);
  };
  const handleElectiveChange = (e, index, field) => {
    const newElectives = [...electives];
    newElectives[index][field] = e.target.value;
    setElectives(newElectives);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Purpose:", purpose);
    console.log("Credits:", credits);
    console.log("Electives:", electives);
  };

  return (
    <div className="form-container p-8">
      <h1 className="mb-8">
        <b>Subject Credit Registration Form</b>
      </h1>
      <i className="text-red-600">
        *Note: Form is divided into 2 sections : Subjects & Electives
      </i>
      <form onSubmit={handleSubmit}>
        <h1 className="p-2">Section 1 : Subjects</h1>
        <hr className="py-2" />
        {/*
        
        <div className="form-group">
          <label htmlFor="purpose">Elective Name</label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={handlePurposeChange}
            required
          />
        </div>
         
        <div className="form-group">
          <label htmlFor="credits">Elective Credits</label>
          <input
            type="text"
            id="credits"
            value={credits}
            onChange={handleCreditChange}
            required
          />
        </div>
        */}
        <div className="form-group">
          <label htmlFor="numSubjects">Number of Subjects</label>
          <input
            type="number"
            id="numSubjects"
            min="1"
            value={numSubjects}
            onChange={handleNumSubjectsChange}
            required
          />
        </div>
        {subjects.map((subject, index) => (
          <div key={index}>
            <div className="form-group">
              <label htmlFor={`electiveName${index}`}>
                Subject {index + 1} Name
              </label>
              <input
                type="text"
                id={`electiveName${index}`}
                value={subject.name}
                onChange={(e) => handleSubjectChange(e, index, "name")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`electiveCode${index}`}>
                Subject {index + 1} Code
              </label>
              <input
                type="text"
                id={`electiveCode${index}`}
                value={subject.code}
                onChange={(e) => handleSubjectChange(e, index, "code")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`electiveCredits${index}`}>
                Subject {index + 1} Credits
              </label>
              <input
                type="text"
                id={`electiveCredits${index}`}
                value={subject.credits}
                onChange={(e) => handleSubjectChange(e, index, "credits")}
                required
              />
            </div>
          </div>
        ))}
        <h1 className="p-2">Section 2 : Electives</h1>
        <hr className="py-2" />
        <div className="form-group">
          <label htmlFor="numCategories">Number of Elective Categories</label>
          <input
            type="number"
            id="numCategories"
            min="1"
            value={numElectiveCategories}
            onChange={handleNumElectiveChange}
            required
          />
        </div>
        {
          //testing
          // console.log(electivesCateory)
          electivesCateory.map((category, index) => {
            //   <h1 key={index}>Test</h1>;
            <div key={index}>
              {console.log(electivesCateory)}
              <div className="form-group">
                <label htmlFor="numSubjects">Number of Electives</label>
                <input
                  type="number"
                  id="numSubjects"
                  min="1"
                  value={numElectiveSubjects}
                  onChange={handleElectiveNumSubjectsChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="numSubjects">Name of Elective category</label>
                <input
                  type="text"
                  id="nameOfElectiveCategory"
                  value={nameOfElectiveCategory}
                  onChange={handleNameCategoryChange}
                  required
                />
              </div>
              {electives.map((elective, index) => (
                <div key={index}>
                  <div className="form-group">
                    <label htmlFor={`electiveName${index}`}>
                      Subject {index + 1} Name
                    </label>
                    <input
                      type="text"
                      id={`electiveName${index}`}
                      value={elective.name}
                      onChange={(e) => handleElectiveChange(e, index, "name")}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>;
          })
        }
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

export default ElectiveRegistration;
