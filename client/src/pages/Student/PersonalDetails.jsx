import React from 'react'

const PersonalDetails = () => {
    return (
        <>
            <div class=" max-w-screen-lg flex flex-row p-5 mx-auto mt-10 ">
                <img class="h-auto mx-auto rounded-md" src="data:image/jpeg;base64,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" alt="image description" />
                <div class="flex w-full mx-auto flex-col justify-center ml-10 ">

                    <label class="block mb-2 text-lg font-medium text-gray-900 " for="file_input">Update Profile Photo</label>
                    <input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " aria-describedby="file_input_help" id="file_input" type="file" />
                    <p class="mt-1 text-lg text-gray-500 " id="file_input_help">PNG, JPG (MAX. 800x400px).</p>

                </div>
            </div>
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 p-10">
                    <div>
                        <label for="disabled-input-2" class="block mb-2 text-lg font-medium text-gray-900 ">PRN</label>
                        <input type="text" id="disabled-input-2" aria-label="disabled input 2" class="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" placeholder="142203002" disabled readonly />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Date of Birth</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="07/06/2004" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Blood Group</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="B+ve" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Secondary Email Address</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="sohelbargir2@gmail.com" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Religion</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Caste Category</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                    </div>

                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Caste Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Aadhar Card Number</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="******6755" required />
                    </div>
                    <div>
                        <label for="countries" class="block mb-2 text-lg font-medium text-gray-900 ">Gender</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option selected>Choose a Gender</option>
                            <option value="FR">Male</option>
                            <option value="DE">Female</option>
                        </select>
                    </div>
                    <div>
                        <label for="countries" class="block mb-2 text-lg font-medium text-gray-900 ">Is Handicapped?</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option selected>Choose</option>
                            <option value="FR">No</option>
                            <option value="DE">Yes</option>
                        </select>
                    </div>
                </div>
        
                <div className="text-center">
                    <button
                        className="bg-blue-500 text-lg text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}

export default PersonalDetails