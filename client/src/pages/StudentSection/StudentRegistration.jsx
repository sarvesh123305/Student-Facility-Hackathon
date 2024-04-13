import React, { useState } from "react";

const StudentRegistration = () => {
    // Initialize state for form values

    const [isOpen, setIsOpen] = useState({
        "studentDetails": false,
        // "paymentDetails": false,
        // "uploadReceipt": false,
    });

    // Function to toggle the visibility of a section
    const toggleSection = (sectionId) => {
        setIsOpen({
            ...isOpen,
            [sectionId]: !isOpen[sectionId],
        });
    };

    const [formData, setFormData] = useState({
        "name": "",
        "mis": "",
        "password": "",
        "currentYear": "",
        "academicYear": "",
        "studentinformations": {
            "MIS": "",
            "ProfilePhoto": "",
            "PersonalInformation": {
                "Name": "",
                "Department": "",
                "CourseLevel": "",
                "DateOfAdmission": "",
                "COEPEmail": "",
                "GMeritNo": ""
            },
            "FamilyInformation": {
                "FatherName": "",
                "MotherName": "",
                "ParentsContact": "",
                "FatherOccupation": "",
                "LocalGuardianName": "",
                "LocalGuardianNo": ""
            },
            "ContactInformation": {
                "PermanentAdd": "",
                "City": "",
                "District": "",
                "State": "",
                "Country": "",
                "Pincode": "",
                "TemporaryAdd": "",
                "StudentMobile": ""
            }
        },
        "academicprofiles": {
            "mis": "",
            "branch": "",
            "year": "",
        }
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hellloooooooo");
        // Do something with formDataObject, like sending it to an API
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-10" >

            {/* Student Details Section */}
            <div className="mb-6">
                <h2
                    className="text-lg font-semibold mb-4 cursor-pointer"
                    onClick={() => toggleSection("studentDetails")}
                >
                    Student Details
                </h2>
                <div
                    className={`grid gap-6 md:grid-cols-2 lg:grid-cols-2 ${isOpen["studentDetails"] ? "" : "hidden"}`}
                >
                    {/* Student details fields */}
                    <div>
                        <label
                            for="FullName"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="FullName"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            MIS
                        </label>
                        <input
                            type="text"
                            id="mis"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="currentYear"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Current Year
                        </label>
                        <input
                            type="text"
                            id="currentYear"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="1 / 2 / 3 / 4"
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="academicYear"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Academic Year
                        </label>
                        <input
                            type="text"
                            id="academicYear"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            value="23-24"
                            disabled
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="Department"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Department
                        </label>
                        <select
                            id="Department"
                            onChange={handleInputChange} value={formData.Department}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option value="Computer Engineering">Computer Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Electronics and Telecommunication Engineering">
                                Electronics and Telecommunication Engineering
                            </option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Instrumentation and Control Engineering">
                                Instrumentation and Control Engineering
                            </option>
                            <option value="Production Engineering">Production Engineering</option>
                            <option value="Robotics and AI Engineering">Robotics and AI Engineering</option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="CourseLevel"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Course Level
                        </label>
                        <select
                            id="CourseLevel"
                            onChange={handleInputChange} value={formData.CourseLevel}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                        </select>
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
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="COEPEmail"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            COEP Email
                        </label>
                        <input
                            type="email"
                            id="COEPEmail"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="GMeritNo"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            G-Merit-No
                        </label>
                        <input
                            type="text"
                            id="COEPEmail"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                    </div>


                </div>
            </div>

            {/* Payment Details Section */}
            <div className="mb-6">
                <h2
                    className="text-lg font-semibold mb-4 cursor-pointer"
                    onClick={() => toggleSection("paymentDetails")}
                >
                    Payment Details
                </h2>
                <div
                    className={`grid gap-6 md:grid-cols-2 lg:grid-cols-2 ${isOpen["paymentDetails"] ? "" : "hidden"}`}
                >
                    {/* Payment details fields */}
                    <div>
                        <label
                            for="DateOfPayment"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Date Of Payment
                        </label>
                        <input
                            type="date"
                            id="DateOfPayment"
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>

                </div>
            </div>

            {/* Upload Receipt Section */}
            <div className="mb-6">
                <h2
                    className="text-lg font-semibold mb-4 cursor-pointer"
                    onClick={() => toggleSection("uploadReceipt")}
                >
                    Upload SBI Collect Fee Receipt
                </h2>
                <div
                    className={`grid gap-6 md:grid-cols-2 lg:grid-cols-2 ${isOpen["uploadReceipt"] ? "" : "hidden"}`}
                >
                    {/* Upload receipt fields */}
                    <div>
                        <label
                            for="uploadSbiFee"
                            className="block mb-2 text-lg font-medium text-gray-900"
                        >
                            Upload SBI Collect Fee Receipt
                        </label>
                        <input
                            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            aria-describedby="file_input_help"
                            id="uploadSbiFee"
                            type="file"
                            accept=".pdf, .png, .jpeg, .jpg"
                        />
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="Receipt">
                            PDF, JPG, JPEG, PNG
                        </p>
                    </div>

                </div>
            </div>


            {/*  */}

            <div className="text-center">
                <button
                    type="submit"
                    onChange={handleInputChange} className="bg-blue-500 text-lg text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default StudentRegistration;

/*
const userData = {
  "name": "Sanika Kulkarni",
  "mis": "142203011",
  "password": "StrongPassword123!",
  "totalCreditsEarned": "21",
  "totalCurrentCredits": "23",
  "currentYear": "3",
  "academicYear": "23-24",
  "studentinformations": {
    "MIS": 142203011,
    "ProfilePhoto": 123,
    "PersonalInformation": {
      "Name": "Sanika Kulkarni",
      "Department": "Computer Engineering",
      "CourseLevel": "Undergraduate",
      "DateOfAdmission": "2020-08-01",
      "COEPEmail": "kulkarnis22.comp@coeptech.ac.in",
      "GMeritNo": "55"
    },
    "FamilyInformation": {
      "FatherName": "Amit Kulkarni",
      "MotherName": "Anita Kulkarni",
      "ParentsContact": "9876543210",
      "FatherOccupation": "Software Engineer",
      "LocalGuardianName": "Shilpa Deshmukh",
      "LocalGuardianNo": "0987654321"
    },
    "ContactInformation": {
      "PermanentAdd": "456 Maple St",
      "City": "Anytown",
      "District": "Anycity",
      "State": "Anystate",
      "Country": "USA",
      "Pincode": "54321",
      "TemporaryAdd": "789 Oak St",
      "StudentMobile": "0987654321"
    }
  },
  "academicprofiles": {
    "mis": 142203011,
    "branch": "Computer Engineering",
    "year": 3,
    "semesters": [
      {
        "semesterName": "Fall 2020",
        "creditsRegistered": 12,
        "creditsEarned": 12,
        "newCGPA": 3.3,
        "newSGPA": 3.3,
        "status": "Completed",
        "date": "2020-12-15",
        "subjects": [
          {
            "semesterName": "Fall 2020",
            "department": "Computer Engineering",
            "subjects": [
              {
                "subjectName": "Computer Science I",
                "subjectCode": "CS101",
                "credits": "3",
                "noOfAttempts": "1",
                "awardedGrade": "B",
                "awardedGradePoint": "3.0",
                "subjectStatus": "Completed"
              },
              {
                "subjectName": "Computer Science II",
                "subjectCode": "CS102",
                "credits": "3",
                "noOfAttempts": "1",
                "awardedGrade": "A",
                "awardedGradePoint": "4.0",
                "subjectStatus": "Completed"
              },
              {
                "subjectName": "Data Structures",
                "subjectCode": "CS103",
                "credits": "4",
                "noOfAttempts": "1",
                "awardedGrade": "A",
                "awardedGradePoint": "4.0",
                "subjectStatus": "Completed"
              }
            ]
          }
        ]
      },
      {
        "semesterName": "Spring 2021",
        "creditsRegistered": 15,
        "creditsEarned": 15,
        "newCGPA": 3.5,
        "newSGPA": 3.5,
        "status": "Completed",
        "date": "2021-05-15",
        "subjects": [
          {
            "semesterName": "Spring 2021",
            "department": "Computer Engineering",
            "subjects": [
              {
                "subjectName": "Artificial Intelligence",
                "subjectCode": "CS301",
                "credits": "4",
                "noOfAttempts": "1",
                "awardedGrade": "A",
                "awardedGradePoint": "4.0",
                "subjectStatus": "Completed"
              },
              {
                "subjectName": "Computer Organisation",
                "subjectCode": "CS302",
                "credits": "4",
                "noOfAttempts": "1",
                "awardedGrade": "B",
                "awardedGradePoint": "3.0",
                "subjectStatus": "Completed"
              },
              {
                "subjectName": "Principles of Software Engineering",
                "subjectCode": "CS303",
                "credits": "3",
                "noOfAttempts": "1",
                "awardedGrade": "A",
                "awardedGradePoint": "4.0",
                "subjectStatus": "Completed"
              }
            ]
          }
        ]
      }
    ]
  }

*/