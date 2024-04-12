import React from "react";

const ManageResult = () => {
  return (
    <>
      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 p-10">
          <div>
            <label
              for="disabled-input-2"
              class="block mb-2 text-lg font-medium text-gray-900 "
            >
              Semester Name
            </label>
            <input
              type="text"
              id="input-2"
              aria-label=" input 2"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div>
            <label
              for="first_name"
              class="block mb-2 text-lg font-medium text-gray-900 "
            >
              Number of Subjects
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div>
            <label
              for="first_name"
              class="block mb-2 text-lg font-medium text-gray-900 "
            >
              Number
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button className="bg-blue-500 text-lg text-white px-5 py-2 rounded-lg hover:bg-blue-600">
            Add To Result
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageResult;
