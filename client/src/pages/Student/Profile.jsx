import profileImage from "../../../public/images/coeplogo.png";
// import Academic from "./Academic";
import { useContext, useEffect } from "react";
import AuthContext from "../../components/context/auth/authContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { initialLoadUser, updateStudent } from "../../redux/actions/logActions";
const Profile = ({
  student: { studentInformation, studentDetails },
  initialLoadUser,
  updateStudent,
}) => {
  const authContext = useContext(AuthContext);
  const { user, userType, loadUser } = authContext;
  /*

}
*/
  useEffect(() => {
    console.log("HEHE GHOT THS");
    loadUser("student");
    initialLoadUser();
    console.log("HEHE COMPLETERD THS");
  }, []);

  const handleUpdateProfile = () => {
    // updateStudent
    const fixedArr = {
      MIS: 142203012,
      ProfilePhoto: 1233,
      PersonalInformation: {
        Name: "Kulkarni Sarvesh Anant",
        Department: "Computer Engineering",
        Branch: "CS",
        CourseLevel: "Undergraduate",
        DateOfAdmission: "2023-09-01",
        COEPEmail: "kulkarnisa22.comp@coeptech.ac.in",
        GMeritNo: "58",
      },
      FamilyInformation: {
        FatherName: "Anant Kulkarni",
        MotherName: "Aparna Kulkarni",
        ParentsContact: "9878979321",
        FatherOccupation: "Business",
        LocalGuardianName: "Shreya Kulkarni",
        LocalGuardianNo: "798798793",
      },
      ContactInformation: {
        PermanentAdd: "COEP Hostel",
        City: "Pune",
        District: "Pune",
        State: "Maharashtra MH",
        Country: "India",
        Pincode: "411005",
        TemporaryAdd: "COEP Hostel",
        StudentMobile: "8668446202",
      },
    };
    updateStudent("142203012", fixedArr);
  };
  return (
    <div>
      {studentInformation && studentDetails && (
        <div className="bg-white mx-auto max-w-7xl px-6 lg:px-8">
          <div className="infohead flex flex-col sm:flex-row justify-between mx-8">
            <div className="sidehead flex-col">
              <h1 className="text-center text-xl font-bold leading-8 text-gray-900">
                Student Personal Info
              </h1>
              <div className="profileoptions mt-8 sm:mt-12 pl-4">
                {/* <div className="flex">
                  <ion-icon name="create-outline"></ion-icon>
                  <h3 className="ml-2">Update Profile</h3>
                </div> */}
                {/* <div className="flex">
                  <ion-icon name="book-outline"></ion-icon>
                  <h3 className="ml-2">
                    <a href="Academic"> Academic Profile</a>
                  </h3>
                </div> */}
              </div>
            </div>

            {/* <div className="photo w-48 h-64">
              <img src={profileImage} alt="profile" />
              <h3>Profile</h3>
            </div> */}
          </div>
          <div className="w-full mt-5 mb-10 mx-auto p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="data:image/jpeg;base64,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"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                KULKARNI SARVESH ANANT
              </h5>
              <span className="text-sm text-gray-500 ">142203002</span>
              <div className="flex mt-4 md:mt-6">
                <button
                  // href="#"
                  onClick={handleUpdateProfile}
                  className="inline-flex items-center mr-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Update Profile
                </button>
                <a
                  href="#"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  Academic Profile
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-left mb-2 text-xl font-bold tracking-tight">
              Student Information
            </h2>
            <div className="mx-auto p-10 mb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none  ">
              <div className="w-full object-contain whitespace-normal">
                <b> MIS Number </b>: {studentDetails.mis}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Name of Student</b>: {studentDetails.mis}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Department </b>:{" "}
                {studentInformation.PersonalInformation.Department}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Branch/Course </b>:{" "}
                {studentInformation.PersonalInformation.Branch}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Course Level</b>:{" "}
                {studentInformation.PersonalInformation.CourseLevel}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>Date Of Admission</b>:{" "}
                {new Date(
                  studentInformation.PersonalInformation.DateOfAdmission
                ).toLocaleDateString("en-GB")}
              </div>
              <div className="w-full object-contain whitespace-normal overflow-wrap break-word max-w-full">
                <b>Coep Email </b>:
                {studentInformation.PersonalInformation.COEPEmail}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b>G-Merit-No</b> :
                {studentInformation.PersonalInformation.GMeritNo}
              </div>
            </div>
            <h2 className="text-left mb-2 text-xl font-bold tracking-tight">
              Family Information
            </h2>
            <div className="mx-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none ">
              <div className="w-full object-contain whitespace-normal">
                <b> Father's Name</b> :
                {studentInformation.FamilyInformation.FatherName}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Mother's Name </b> :
                {studentInformation.FamilyInformation.MotherName}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Parents Contact No</b> :
                {studentInformation.FamilyInformation.ParentsContact}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Fathers Occupation</b> :
                {studentInformation.FamilyInformation.FatherOccupation}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Local Gardian Name </b> :
                {studentInformation.FamilyInformation.LocalGuardianName}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Local Gardian Phone </b> :
                {studentInformation.FamilyInformation.LocalGuardianNo}
              </div>
            </div>
            <h2 className="text-left mb-2 text-xl font-bold tracking-tight">
              Contact Information
            </h2>
            <div className="mx-auto mb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none ">
              <div className="w-full object-contain whitespace-normal">
                <b> Permanent Address</b> :
                {studentInformation.ContactInformation.PermanentAdd}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Village/City </b> :
                {studentInformation.ContactInformation.City}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> District</b> :
                {studentInformation.ContactInformation.District}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> State </b> :{studentInformation.ContactInformation.District}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Country </b> :
                {studentInformation.ContactInformation.Country}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Postal PIN </b> :
                {studentInformation.ContactInformation.Pincode}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> TemporaryAddress</b> :
                {studentInformation.ContactInformation.TemporaryAdd}
              </div>
              <div className="w-full object-contain whitespace-normal">
                <b> Student Mobile No.</b>:
                {studentInformation.ContactInformation.StudentMobile}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Profile.propTypes = {
  initialLoadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { initialLoadUser, updateStudent })(
  Profile
);
