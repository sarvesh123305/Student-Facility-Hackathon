import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LeavingCertificateDownload } from "../../redux/actions/logActions";
const LeavingCertificateForm = ({
  student: { studentInformation, studentDetails, leavingcertificateStatus },
  LeavingCertificateDownload,
}) => {
  // Initialize state for form values
  const [formData, setFormData] = useState({
    FullName: "",
    Religion: "",
    Caste: "",
    Nationality: "",
    DateOfBirth: "",
    PlaceOfBirth: "",
    LastSchoolAttended: "",
    DateOfAdmission: "",
    Progress: "",
    Conduct: "",
    DateOfLeaving: "",
    Remarks: "",
    // Add more fields as needed
  });
  const [pdfData, setPdfData] = useState(null);

  // Function to handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  useEffect(() => {
    if (pdfData) {
      const pdfUrl = URL.createObjectURL(pdfData);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute(
        "download",
        `${studentDetails.mis}_LeavingCertificate.pdf`
      );
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(pdfUrl);
    }
  }, [pdfData]);
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].getAttribute(value))
    // Create an object containing form data
    // const formDataObject = {
    //     FullName: formData.FullName,
    //     year: formData.year,
    //     MobileNumber: formData.MobileNumber,
    //     MIS: formData.MIS,
    //     branch: formData.branch,
    //   category: formData.category,
    //     DateOfPayment: formData.DateOfPayment,
    //     TutionFee: formData.TutionFee,
    //     // Add more fields as needed
    // };
    console.log("Hellloooooooo");
    // Do something with formDataObject, like sending it to an API
    console.log(formData);
  };
  const handleDownload = async () => {
    const formData = {
      FullName: "Kulkarni Sarvesh Anant",
      Religion: "Hindu",
      Caste: "Brahmin",
      Nationality: "Indian",
      PlaceOfBirth: "Mahad",
      DateOfBirth: "17/06/2003",
      LastAttended: "Institute of Petrochemical Engineering, Lonere",
      DateOfAdmission: "28/11/2022",
      Progress: "Good",
      Conduct: "Good",
      DateofLeave: "15/06/2025",
      Remarks: "No Dues",
    };
    // const res = await axios.post(
    //   "http://localhost:5000/api/student/LeavingCertificate",
    //   {
    //     formData,
    //   }
    // );
    LeavingCertificateDownload(formData, setPdfData);

    // console.log(res.data);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-lg text-white px-5 py-2 ml-2 rounded-lg hover:bg-blue-600"
        onClick={handleDownload}
      >
        {" "}
        Download Fee Receipt
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-2 p-10">
          <div>
            <label
              for="FullName"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Full Name
            </label>
            <input
              type="text"
              id="FullName"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              for="Religion"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Religion
            </label>
            <input
              type="text"
              id="Religion"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="Caste"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Caste
            </label>
            <input
              type="text"
              id="Caste"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="Nationality"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Nationality
            </label>
            <input
              type="text"
              id="Nationality"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="DateOfBirth"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="DateOfBirth"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="PlaceOfBirth"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Place Of Birth
            </label>
            <input
              type="text"
              id="PlaceOfBirth"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="LastSchoolAttended"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Last School Attended
            </label>
            <input
              type="text"
              id="LastSchoolAttended"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="DateOfAdmission"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Date Of Admission
            </label>
            <input
              type="date"
              id="DateOfAdmission"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="Progress"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Progress
            </label>
            <input
              type="text"
              id="Progress"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="Conduct"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Conduct
            </label>
            <input
              type="text"
              id="Conduct"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="DateOfLeaving"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Date Of Leaving
            </label>
            <input
              type="date"
              id="DateOfLeaving"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="Remarks"
              className="block mb-2 text-lg font-medium text-gray-900"
            >
              Remarks
            </label>
            <textarea
              id="Remarks"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-lg text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, {
  LeavingCertificateDownload,
})(LeavingCertificateForm);
