import profileImage from "../../../public/images/coeplogo.png";
// import Academic from "./Academic";
import { useContext, useEffect } from "react";
import AuthContext from "../../components/context/auth/authContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { initialLoadUser } from "../../redux/actions/logActions";
const Profile = ({
  student: { studentInformation, studentDetails },
  initialLoadUser,
}) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    initialLoadUser();
  }, []);
  return (
    studentInformation &&
    studentDetails && (
      <div className="bg-white mx-auto max-w-7xl px-6 lg:px-8">
        <div className="infohead flex flex-col sm:flex-row justify-between mx-8">
          <div className="sidehead flex-col">
            <h1 className="text-center text-xl font-bold leading-8 text-gray-900">
              Student Personal Info
            </h1>
            <div className="profileoptions mt-8 sm:mt-12 pl-4">
              <div className="flex">
                <ion-icon name="create-outline"></ion-icon>
                <h3 className="ml-2">Update Profile</h3>
              </div>
              <div className="flex">
                <ion-icon name="book-outline"></ion-icon>
                <h3 className="ml-2">
                  <a href="Academic"> Academic Profile</a>
                </h3>
              </div>
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
          <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-md ">
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
          <h2 className="text-left text-lg font-semibold leading-8 text-gray-900">
            Family Information
          </h2>
          <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-md">
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
          <h2 className="text-left text-lg font-semibold leading-8 text-gray-900">
            Contact Information
          </h2>
          <div className="mx-auto mb-10 px-4 py-4 grid max-w-[90%] grid-cols-1 items-center gap-x-4 gap-y-6 sm:max-w-[90vw] sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none shadow-md">
            <div className="w-full object-contain whitespace-normal">
              <b> Permanent Address</b> :
              {studentInformation.ContactInformation.PermanentAdd}
            </div>
            <div className="w-full object-contain whitespace-normal">
              <b> Village/City </b> :
              {studentInformation.ContactInformation.City}
            </div>
            <div className="w-full object-contain whitespace-normal">
              <b> District</b> :{studentInformation.ContactInformation.District}
            </div>
            <div className="w-full object-contain whitespace-normal">
              <b> State </b> :{studentInformation.ContactInformation.District}
            </div>
            <div className="w-full object-contain whitespace-normal">
              <b> Country </b> :{studentInformation.ContactInformation.Country}
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
    )
  );
};
Profile.propTypes = {
  initialLoadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { initialLoadUser })(Profile);
