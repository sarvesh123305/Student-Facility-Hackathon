import "../../css/Academic.css";
import "../../css/Profile.css";
import profileImage from "../../../public/images/coeplogo.png";

function Profile() {
  return (
    <div className="App">
      <h1>
        <b> Student Personal Info </b>
      </h1>
      <div className="main">
        <div className="info-container">
          <div className="p-info">
            <div className="p-head">Personal Information</div>
            <div className="personal">
              <div className="row-1">
                <div>
                  <b> MIS Number </b> : 112103144
                </div>
                <div>
                  <b>Name of Student</b> : TAKARKHEDE GAURI RAJESH
                </div>
                <div>
                  <b>Department </b>: Computer Engineering and Information
                  Technology
                </div>
              </div>
              <div className="row-2">
                <div>
                  <b>Branch/Course </b>: Computer Engineering
                </div>
                <div>
                  <b>Course Level</b> : UG
                </div>
                <div>
                  <b>Date Of Admission</b> : 10/15/2021
                </div>
              </div>
              <div className="row-3">
                <div>
                  <b>Coep Email </b>: takarkhedegr21.comp@coeptech.ac.in
                </div>
                <div>
                  <b>G-Merit-No</b> : 0
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="f-info">
            <div className="f-head">Family Information</div>
            <div className="family">
              <div className="row-1">
                <div>
                  <b> Father's Name</b> : XYZ
                </div>
                <div>
                  <b> Mother's Name </b> : XYZ
                </div>
                <div>
                  <b> Parents Contact No</b> : 8989988989
                </div>
              </div>
              <div className="row-2">
                <div>
                  <b> Fathers Occupation</b> : XYZ
                </div>
                <div>
                  <b> Local Gardian Name </b> : XYZ
                </div>
                <div>
                  <b> Local Gardian Phone </b> : 8989989989
                </div>
              </div>
            </div>
          </div>
          <div className="c-info">
            <div className="c-head">Contact Information</div>
            <div className="contact">
              <div className="row-1">
                <div>
                  <b> Permanent Address</b> : xyz
                </div>
                <div>
                  <b> Village/City </b> : zzzz
                </div>
                <div>
                  <b> District</b> :
                </div>
              </div>
              <div className="row-2">
                <div>
                  <b> State </b> :
                </div>
                <div>
                  <b> Country </b> :
                </div>
                <div>
                  <b> Postal PIN </b> :
                </div>
              </div>
              <div className="row-3">
                <div>
                  <b> TemporaryAddress</b> :
                </div>
                <div>
                  <b> Student Mobile No.</b>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="photo">
          <img src={profileImage} alt="profile" />
          <h3>Profile</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
