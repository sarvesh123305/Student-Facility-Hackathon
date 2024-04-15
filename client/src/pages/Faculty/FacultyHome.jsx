import React from "react";

const FacultyHome = () => {
    return (
        <div>


            <div class="w-3/2 m-10 bg-white border border-gray-200 rounded-lg shadow ">


                <div id="fullWidthTabContent" class="border-t border-gray-200 ">
                    <div class=" p-4 bg-white rounded-lg md:p-8 " id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6  sm:p-8">
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">73+</dt>
                                <dd class="text-gray-500 ">No of Students</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">100+</dt>
                                <dd class="text-gray-500 ">No of Subjects</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">10</dt>
                                <dd class="text-gray-500 ">No of Dept</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">1+</dt>
                                <dd class="text-gray-500 ">No of Electives</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">90+</dt>
                                <dd class="text-gray-500 ">Notififcations</dd>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <dt class="mb-2 text-3xl font-extrabold">4</dt>
                                <dd class="text-gray-500 ">No of Passed Students</dd>
                            </div>
                        </dl>

                    </div>
                   
                </div>
            </div>

        </div>
    );
};

export default FacultyHome;
