import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
const Result = ({
  student: { studentInformation, studentDetails, academicProfile },
}) => {
  const [currentSemester, setCurrentSemester] = useState("");
  const [pdfData, setPdfData] = useState(null);

  const updateCurrentSemester = (event) => {
    setCurrentSemester(event.target.value);
  };
  const handleDownloadPdf = async (e) => {
    e.preventDefault();

    try {
      console.log("MIS", studentDetails);
      const formData = {
        mis: studentDetails.mis,
        semesterName: currentSemester,
        year: academicProfile.year,
      };
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/student/result",
        formData,
        {
          responseType: "arraybuffer",
        }
      );

      // Store the PDF content in the component state
      setPdfData(new Blob([response.data], { type: "application/pdf" }));
    } catch (error) {
      console.error("Error downloading PDF:", error.message);
    }
  };

  useEffect(() => {
    // Check if pdfData is not null and initiate download
    if (pdfData) {
      // Create a URL for the Blob object
      const pdfUrl = URL.createObjectURL(pdfData);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute(
        "download",
        `${studentDetails.mis}_Result_${currentSemester}.pdf`
      ); // Specify the file name for download
      document.body.appendChild(link);

      // Trigger the click event to start the download
      link.click();

      // Clean up by revoking the URL
      URL.revokeObjectURL(pdfUrl);
    }
  }, [pdfData]);

  const semesterOptions = [
    { label: "Semester 1" },
    { label: "Semester 2" },
    { label: "Semester 3" },
    { label: "Semester 4" },
    { label: "Semester 5" },
    { label: "Semester 6" },
    { label: "Semester 7" },
    { label: "Semester 8" },
  ];
  return (
    <div className="bg-white p-8">
      <h1 className="p-4">Student Details</h1>
      <hr className="py-4"></hr>
      <form className="w-full ">
        <div className="flex flex-wrap mx-3 gap-10 mb-6 ">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              MIS
            </label>
            <input
              className="appearance-none block w-12 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="142203012"
              disabled
            />
          </div>

          <div className="w-full md:w-1/3  mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold "
              htmlFor="grid-state"
            >
              Semester
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full border py-3 px-4 pr-8 bg-white rounded leading-tight focus:outline-none focus:bg-white "
                id="grid-state"
                onChange={updateCurrentSemester}
                value={currentSemester}
              >
                <option value="" disabled hidden>
                  Select semester
                </option>
                {semesterOptions.map((specificOption, index) => (
                  <option value={specificOption.label} key={index}>
                    {specificOption.label}
                  </option>
                ))}
                {/*<option value="Semester 2">Semester 2</option>
  <option value="Semester 3">Semester 3</option>
*/}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 mx-5">
          <button
            className="shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleDownloadPdf}
          >
            Show Result
          </button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps)(Result);
