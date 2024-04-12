import React, { useState } from "react";

const FeeReceiptForm = () => {
  // Initialize state for form values
  const [formData, setFormData] = useState({
    FullName: "",
    year: "",
    MobileNumber: "",
    MIS: "",
    branch: "",
    category: "",
    DateOfPayment: "",
    TutionFee: "",
    // Add more fields as needed
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
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            required
          />
        </div>
        <div>
          <label
            for="year"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Year
          </label>
          {/* <input type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required /> */}
          <select
            id="year"
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="MIS"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            MIS
          </label>
          <input
            type="text"
            id="MIS"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="branch"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Branch
          </label>
          {/* <input type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required /> */}
          <select
            id="branch"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="CS">Computer Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ENTC">
              Electronics and Telecommunication Engineering
            </option>
            <option value="Civil">Civil Engineering</option>
            <option value="Mech">Mechanical Engineering</option>
            <option value="Instru">
              Instrumentation and Control Engineering
            </option>
            <option value="Prod">Production Engineering</option>
            <option value="Robo">Robotics and AI Engineering</option>
          </select>
        </div>
        <div>
          <label
            for="category"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Year
          </label>
          {/* <input type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required /> */}
          <select
            id="category"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
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
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="TNP"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Training and Placement
          </label>
          <input
            type="text"
            id="TNP"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="InternetEmail"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Internet & Email
          </label>
          <input
            type="text"
            id="InternetEmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="CMD"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            C. M. D. (Refundable)
          </label>
          <input
            type="text"
            id="CMD"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="BoatClubMembership"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Boat Club Membership
          </label>
          <input
            type="text"
            id="BoatClubMembership"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="StudentAid"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Student Aid Fund
          </label>
          <input
            type="text"
            id="StudentAid"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="IDCard"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Identity Card
          </label>
          <input
            type="text"
            id="IDCard"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="UniverityFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Univerity Fee
          </label>
          <input
            type="text"
            id="UniverityFee"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="AlumniMembershipFee"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Alumni Membership Fee
          </label>
          <input
            type="text"
            id="AlumniMembershipFee"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="HostelDeposit"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Hostel Deposit
          </label>
          <input
            type="text"
            id="HostelDeposit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ARAILibrary"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Library Fee
          </label>
          <input
            type="text"
            id="ARAILibrary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ARAIComputer"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Computer Lab Fee
          </label>
          <input
            type="text"
            id="ARAIComputer"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ARAILab"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Lab Fee
          </label>
          <input
            type="text"
            id="ARAILab"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ARAIAlumni"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            ARAI Alumni Association Fee
          </label>
          <input
            type="text"
            id="ARAIAlumni"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="LC"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Leaving Certificate/Transfer Certificate
          </label>
          <input
            type="text"
            id="LC"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="Insurance"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Student Accident Insurance Premium
          </label>
          <input
            type="text"
            id="Insurance"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            for="ReceiptUpload"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Upload SBI Collect Fee Receipt
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            aria-describedby="file_input_help"
            id="ReceiptUpload"
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
          className="bg-blue-500 text-lg text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FeeReceiptForm;
