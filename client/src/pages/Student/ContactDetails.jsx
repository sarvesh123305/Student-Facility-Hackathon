import React from 'react'

const ContactDetails = () => {
    return (
        <>
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 p-10">
                    <div>

                        <label for="message" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent Address </label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your permanent Address.." required></textarea>

                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permenant Village</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="07/06/2004" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent Taluka</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="B+ve" required />
                    </div>
                    <div>

                        <label for="message" class="block mb-2 text-lg font-medium text-gray-900 ">Temporary Address</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your temporary Address.." required></textarea>

                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent District</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="sohelbargir2@gmail.com" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent State</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Maharashtra" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent Country</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                    </div>

                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 ">Permanent Address Portal PIN</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-lg font-medium text-gray-900 " >Student Mobile Number</label>
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

export default ContactDetails