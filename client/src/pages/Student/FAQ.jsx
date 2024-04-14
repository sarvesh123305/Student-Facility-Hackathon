import React, { useState } from "react";

const FAQ = () => {
  // State to manage the open/close state of each accordion item
  const [isOpen, setIsOpen] = useState({
    "accordion-collapse-body-1": false,
    "accordion-collapse-body-2": false,
    "accordion-collapse-body-3": false,
    "accordion-collapse-body-4": false,
    "accordion-collapse-body-5": false,
    "accordion-collapse-body-6": false,
    "accordion-collapse-body-7": false,
    "accordion-collapse-body-8": false,
    "accordion-collapse-body-9": false,
    "accordion-collapse-body-10": false,
    "accordion-collapse-body-11": false,
    "accordion-collapse-body-12": false,
    "accordion-collapse-body-13": false,
    "accordion-collapse-body-14": false,
    "accordion-collapse-body-15": false,
    "accordion-collapse-body-16": false,
    "accordion-collapse-body-17": false,
  });

  // Function to toggle the visibility of an accordion item and close other items
  const toggleAccordion = (id) => {
    const updatedState = {};
    Object.keys(isOpen).forEach((key) => {
      updatedState[key] = key === id ? !isOpen[key] : false;
    });
    setIsOpen(updatedState);
  };

  return (
    <>
      <div className="flex items-center justify-center text-center">
        <div
          id="accordion-collapse"
          className="w-4/6"
          data-accordion="collapse"
        >
          <div className="shadow-md m-2 ">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-1")}
                aria-expanded={isOpen["accordion-collapse-body-1"]}
                aria-controls="accordion-collapse-body-1"
              >
                <span className="text-black">
                  How do I apply for a bonafide certificate?
                </span>
                <svg
                  className={`w-3 h-3 rotate-${
                    isOpen["accordion-collapse-body-1"] ? "0" : "180"
                  } shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-1"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2">
                  You can apply for a bonafide certificate through the student
                  portal by navigating to the "Request Bonafide" section and
                  filling out the required information.
                </p>
                <p className="mb-2">
                  Once submitted, your request will be reviewed by the
                  administrative team. Once the team approves, you will be able
                  to download the Bonafide Certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-2")}
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
              >
                <span className="text-black">
                  What is the process for applying for a scholarship?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-2"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  To apply for a scholarship, you need to access the scholarship
                  application form available on the student portal. Complete the
                  form with accurate details and submit it. The application will
                  undergo verification and approval by the scholarship
                  committee.
                </p>
              </div>
            </div>
          </div>
          {/* Add more questions and answers here */}
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-3")}
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
              >
                <span className="text-black">
                  How can I obtain a fee receipt?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-3"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Fee receipts can be generated through the student portal.
                  Navigate to the "Fee Receipt" section, enter the required
                  details and upload the SBI Collect Fee Receipt. The Fee
                  Receipt will be verified by the account section and then the
                  system will generate the digitally verified fee receipt for
                  you to download or print.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-4">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-4")}
                data-accordion-target="#accordion-collapse-body-4"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-4"
              >
                <span className="text-black">
                  How long does it take for my requested documents to be
                  available after approval?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-4"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-4"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-4"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The processing time for approved documents varies depending on
                  the type of document and the administrative workload.
                  Typically, approved documents are made available within 1-3
                  business days.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-5">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-5")}
                data-accordion-target="#accordion-collapse-body-5"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-5"
              >
                <span className="text-black">
                  Where can I view my semester-wise results?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-5"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-5"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-5"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Your semester-wise results can be viewed under the "Academic
                  Profile" section of the student portal. Select the desired
                  semester to access your subject-wise grades and overall
                  performance.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-9">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-9")}
                data-accordion-target="#accordion-collapse-body-9"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-9"
              >
                <span className="text-black">Can I view my CGPA?</span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-9"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-9"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-9"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Yes, you can view your CGPA (Cumulative Grade Point Average)
                  on the student portal. Navigate to the "Academic Profile"
                  section to find your CGPA for each semester as well as your
                  overall CGPA.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-10">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-10")}
                data-accordion-target="#accordion-collapse-body-10"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-10"
              >
                <span className="text-black">
                  How can I update my personal information?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-10"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-10"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-10"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  You can update your personal information, including contact
                  details and address, through the "Update Profile" section of
                  the student portal. Make sure to review and save the changes
                  after updating your information.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-11">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-11")}
                data-accordion-target="#accordion-collapse-body-11"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-11"
              >
                <span className="text-black">
                  How do I register for courses?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-11"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-11"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-11"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Course registration can be done through the student portal
                  during the designated registration period. Log in to your
                  account, access the course registration section, and follow
                  the prompts to select your courses for the upcoming semester.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-13">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-13")}
                data-accordion-target="#accordion-collapse-body-13"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-13"
              >
                <span className="text-black">
                  Can I change my registered courses?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-13"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-13"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-13"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  In most cases, course registration changes are not allowed
                  once the registration period has ended. However, if there are
                  exceptional circumstances, you can contact the academic
                  services department for assistance.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 shadow-md">
            <h2 id="accordion-collapse-heading-15">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3"
                onClick={() => toggleAccordion("accordion-collapse-body-15")}
                data-accordion-target="#accordion-collapse-body-15"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-15"
              >
                <span className="text-black">
                  What should I do if I encounter technical issues with the
                  student portal?
                </span>
                <svg
                  data-accordion-icon
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-15"
              className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${
                isOpen["accordion-collapse-body-15"] ? "" : "hidden"
              }`}
              aria-labelledby="accordion-collapse-heading-15"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  If you encounter technical issues with the student portal, you
                  can reach out to the IT support team for assistance. Provide
                  details about the problem you're facing, and they will help
                  resolve it as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
