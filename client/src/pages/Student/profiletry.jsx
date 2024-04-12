import profileImage from "../../../public/images/coeplogo.png";
function Profiletry() {
  return (
    <div className="bg-white py-12 sm:py-8">
      <div className="infohead flex flex-col sm:flex-row justify-between mx-8">
        <div className="sidehead flex-col">
          <h1 className="text-center text-xl font-bold leading-8 text-gray-900">
            Student Personal Info
          </h1>
          <div className="profileoptions mt-8 sm:mt-12 pl-4">
            <h3>Update Profile</h3>
            <h3>Academic Profile</h3>
          </div>
        </div>
        <div className="photo w-48 h-64">
          <img src={profileImage} alt="profile" />
          <h3>Profile</h3>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-left text-lg font-semibold leading-8 text-gray-900">
          Student Information
        </h2>
        <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-lg ">
          <div className="w-full object-contain whitespace-normal">
            <b> MIS Number </b>: 112103144
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>Name of Student</b>: TAKARKHEDE GAURI RAJESH
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>Department </b>: Computer Engineering and Information Technology
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>Branch/Course </b>: Computer Engineering
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>Course Level</b>: UG
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>Date Of Admission</b>: 10/15/2021
          </div>
          <div className="w-full object-contain whitespace-normal overflow-wrap break-word max-w-full">
            <b>Coep Email </b>: takarkhedegr21.comp@coeptech.ac.in
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b>G-Merit-No</b> : 0
          </div>
        </div>
        <h2 className="text-left text-lg font-semibold leading-8 text-gray-900">
          Family Information
        </h2>
        <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-lg">
          <div className="w-full object-contain whitespace-normal">
            <b> Father's Name</b> : XYZ
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Mother's Name </b> : XYZ
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Parents Contact No</b> : 8989988989
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Fathers Occupation</b> : XYZ
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Local Gardian Name </b> : XYZ
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Local Gardian Phone </b> : 8989989989
          </div>
        </div>
        <h2 className="text-left text-lg font-semibold leading-8 text-gray-900">
          Contact Information
        </h2>
        <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-lg">
          <div className="w-full object-contain whitespace-normal">
            <b> Permanent Address</b> : xyz
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Village/City </b> : zzzz
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> District</b> :
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> State </b> :
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Country </b> :
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Postal PIN </b> :
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> TemporaryAddress</b> :
          </div>
          <div className="w-full object-contain whitespace-normal">
            <b> Student Mobile No.</b>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profiletry;
