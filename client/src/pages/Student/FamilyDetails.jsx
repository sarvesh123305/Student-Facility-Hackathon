import React from 'react'

const FamilyDetails = () => {
    return (
        <>

            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 p-10">

                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Father's Full Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="07/06/2004" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Mother's Full Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="B+ve" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Father's Occupation</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="******6755" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Mother's Occupation</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="sohelbargir2@gmail.com" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Parents Contact Number</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Maharashtra" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Local Guardian Full Name  </label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                    </div>

                    <div>

                        <label for="message" class="block mb-2 text-lg font-medium text-gray-900 ">Local Guardian Address</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your temporary Address.."></textarea>

                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Local Guardian Phone</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="******6755" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Family Income</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="******6755" required />
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

export default FamilyDetails