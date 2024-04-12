import React, { useState } from "react";

const FeeReceiptForm = () => {
  // Initialize state for form values
  const [formData, setFormData] = useState({
    "FullName": "",
    "Year": "",
    "MobileNumber": "",
    "Mis": "",
    "Branch": "",
    "Category": "",
    "DateOfPayment": "",
    "TutionFee": "",
    "DevelopmentFee": "",
    "GymkhanaFee": "",
    "TnpFee": "",
    "Library": "",
    "Laboratory": "",
    "InternetAndEmail": "",
    "Gathering": "",
    "Cmd": "",
    "BoatClubFee": "",
    "BoatClubMemFee": "",
    "StudentAidFund": "",
    "ExamFee": "",
    "IdentityCard": "",
    "UniversityFee": "",
    "AluminiFee": "",
    "HostelFee": "",
    "HostelDepost": "",
    "AraiLibFee": "",
    "AraiCompFee": "",
    "AraiLabFee": "",
    "AraiAluminiFee": "",
    "LeavingCert": "",
    "StudentAid": "",
    "Fine": "",
    "Other": "",
    "uploadSbiFee": ""
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
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          />
        </div>
        <div>
          <label
            for="Year"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Year
          </label>
          <select
            id="Year"
            onChange={handleInputChange} value={formData.Year}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="FYBtech">FY Btech</option>
            <option value="SYBtech">SY Btech</option>
            <option value="TYBtech">TY Btech</option>
            <option value="Btech">Btech</option>
            <option value="FYMTech">FY MTech</option>
            <option value="SYMTech">SY MTech</option>
          </select>
        </div>
        <div>
          <label
            for="MobileNumber"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="MobileNumber"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Mis"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Mis
          </label>
          <input
            type="text"
            id="Mis"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Branch"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Branch
          </label>
          <select
            id="Branch"
            onChange={handleInputChange} value={formData.Branch}
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
            for="Category"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Category
          </label>
          <select
            id="Category"
            onChange={handleInputChange} value={formData.Category} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Open">Open</option>
            <option value="TFWS">TFWS</option>
            <option value="SC/ST">SC/ST</option>
            <option value="OBC, SBC, VJNT, CAT">OBC, SBC, VJNT, CAT</option>
            <option value="EBC, SEBC, EWS">EBC, SEBC, EWS</option>
            <option value="J&K/ North East/Union Territory/J&K PMSSS">
              J&K/ North East/Union Territory/J&K PMSSS
            </option>
            <option value="NRI/PIO/OCI/FN">NRI/PIO/OCI/FN</option>
            <option value="Gulf">Gulf</option>
          </select>
        </div>

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
        <div>
          <label
            for="TutionFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Tution Fee
          </label>
          <input
            type="text"
            id="TutionFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="DevelopmentFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Development Fee
          </label>
          <input
            type="text"
            id="DevelopmentFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="GymkhanaFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Gymkhana Fee
          </label>
          <input
            type="text"
            id="GymkhanaFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="TnpFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Training and Placement
          </label>
          <input
            type="text"
            id="TnpFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Library"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Library
          </label>
          <input
            type="text"
            id="Library"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Laboratory"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Laboratory
          </label>
          <input
            type="text"
            id="Laboratory"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="InternetAndEmail"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Internet & Email
          </label>
          <input
            type="text"
            id="InternetAndEmail"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Gathering"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Gathering
          </label>
          <input
            type="text"
            id="Gathering"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Cmd"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            C. M. D. (Refundable)
          </label>
          <input
            type="text"
            id="Cmd"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="BoatClubFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Boat Club Fee
          </label>
          <input
            type="text"
            id="BoatClubFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="BoatClubMemFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Boat Club Membership
          </label>
          <input
            type="text"
            id="BoatClubMemFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="StudentAidFund"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Student Aid Fund
          </label>
          <input
            type="text"
            id="StudentAidFund"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ExamFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Exam Fee
          </label>
          <input
            type="text"
            id="ExamFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="IdentityCard"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Identity Card
          </label>
          <input
            type="text"
            id="IdentityCard"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="UniversityFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Univerity Fee
          </label>
          <input
            type="text"
            id="UniversityFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AluminiFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Alumni Membership Fee
          </label>
          <input
            type="text"
            id="AluminiFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="HostelFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Hostel Fee
          </label>
          <input
            type="text"
            id="HostelFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="HostelDepost"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Hostel Deposit
          </label>
          <input
            type="text"
            id="HostelDepost"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AraiLibFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Library Fee
          </label>
          <input
            type="text"
            id="AraiLibFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AraiCompFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Computer Lab Fee
          </label>
          <input
            type="text"
            id="AraiCompFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AraiLabFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Lab Fee
          </label>
          <input
            type="text"
            id="AraiLabFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AraiAluminiFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Alumni Association Fee
          </label>
          <input
            type="text"
            id="AraiAluminiFee"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="LeavingCert"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Leaving Certificate/Transfer Certificate
          </label>
          <input
            type="text"
            id="LeavingCert"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="StudentAid"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Student Accident Insurance Premium
          </label>
          <input
            type="text"
            id="StudentAid"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Fine"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Fine
          </label>
          <input
            type="text"
            id="Fine"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Other"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Other (Please Specify Fee)
          </label>
          <textarea
            id="Other"
            onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
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

export default FeeReceiptForm;
