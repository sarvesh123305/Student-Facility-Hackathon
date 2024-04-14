import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/student/Login";
import AuthState from "./components/context/auth/AuthState";
import AlertState from "./components/context/alert/AlertState";
import Alerts from "./layouts/Alerts";
import { Fragment, useEffect, useState } from "react";
import Navbar from "./layouts/sidebar/Navbar";
import Sidebar from "./layouts/sidebar";
import FacultyHome from "./pages/Faculty/FacultyHome";
import RequestBonafide from "./pages/Student/RequestBonafide";
import UserState from "./components/context/user/UserState";
import Subjectallocation from "./pages/Student/Subjectallocation";
import Academic from "./pages/Student/Academic";
import Profile from "./pages/Student/Profile";
import ScholarshipQueries from "./pages/Student/ScholarshipQueries";
import Home from "./pages/Student/Home";
import Query from "./pages/Student/Query";
import ElectiveRegistration from "./pages/Faculty/ElectiveRegistration";
import Result from "./pages/Student/Result";
import ScholarshipsAvailable from "./pages/Student/ScholarshipsAvailable";
import LetterFormats from "./pages/Student/LetterFormats";
import SemesterCreditRegistration from "./pages/Student/SemesterCreditRegistration";
import ManageResult from "./pages/Faculty/ManageResult";
import ElectiveAllocation from "./pages/Faculty/ElectiveAllocation";
import StudentSectionHome from "./pages/StudentSection/StudentSectionHome";
import Notifications from "./pages/Student/Notifications";
import UpdateProfile from "./pages/Student/UpdateProfile";
import StudentSectionNotifications from "./pages/StudentSection/StudentSectionNotifications";
import Bonafides from "./pages/StudentSection/Bonafides";
import LetterFormat from "./pages/StudentSection/LetterFormat";
import Queries from "./pages/StudentSection/Queries";
import UploadMarks from "./pages/Faculty/UploadMarks";
import FeeReceiptForm from "./pages/Student/FeeReceiptForm";
import LeavingCertificateForm from "./pages/Student/LeavingCertificateForm";
import FAQ from "./pages/Student/FAQ";
import { Provider } from "react-redux";
import store from "./redux/store";
import StudentRegistration from "./pages/StudentSection/StudentRegistration";
import LCRequests from "./pages/StudentSection/LCRequests";
import FeeReceiptRequests from "./pages/StudentSection/FeeReceiptRequests";
import ScholarshipRequests from "./pages/StudentSection/ScholarshipRequests";
import Layout from "./layouts/Layout";
import AllocateGrades from "./pages/Faculty/AllocateGrades";
import PrivateRouteStudent from "./components/Routing/PrivateRouteStudent";
import PrivateRouteFaculty from "./components/Routing/PrivateRouteFaculty";
import PrivateRouteStudentSection from "./components/Routing/PrivateRouteStudentSection";
const App = () => {
  const [showSidebarAndNavbar, setShowSidebarAndNavbar] = useState(false);

  useEffect(() => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/Faculty/login" &&
      location.pathname !== "/StudentSection/login"
    ) {
      setShowSidebarAndNavbar(true);
    } else {
      setShowSidebarAndNavbar(false);
    }
  }, [location]);

  return (
    <Provider store={store}>
      {" "}
      <AuthState>
        <AlertState>
          <UserState>
            <Router>
              <Fragment>
                <Layout showSidebarAndNavbar={showSidebarAndNavbar}>
                  <Routes>
                    {/* STUDENT ROUTES*/}
                    <Route
                      path="/"
                      element={<PrivateRouteStudent component={Profile} />}
                    />
                    <Route
                      path="/login"
                      element={
                        <Login
                          role="Student"
                          setShowSidebarAndNavbar={setShowSidebarAndNavbar}
                        />
                      }
                    />
                    {/*<Route path="/" element={<Profile />} />*/}
                    <Route
                      path="/Academics/AcademicProfile"
                      element={<PrivateRouteStudent component={Academic} />}
                    />
                    <Route path="/elective" element={<Home />} />
                    <Route
                      path="/Academics/ElectiveRegistration"
                      element={
                        <PrivateRouteStudent component={Subjectallocation} />
                      }
                    />
                    <Route
                      path="/Applications/RequestBonafide"
                      element={
                        <PrivateRouteStudent component={RequestBonafide} />
                      }
                    />
                    <Route
                      path="/Applications/Queries"
                      element={<PrivateRouteStudent component={Query} />}
                    />
                    <Route
                      path="/Applications/LetterFormats"
                      element={
                        <PrivateRouteStudent component={LetterFormats} />
                      }
                    />
                    <Route
                      path="/Applications/FeeReceipt/"
                      element={
                        <PrivateRouteStudent component={FeeReceiptForm} />
                      }
                    />
                    <Route
                      path="/Applications/LeavingCertificate/"
                      element={
                        <PrivateRouteStudent
                          component={LeavingCertificateForm}
                        />
                      }
                    />
                    <Route
                      path="/result"
                      element={<PrivateRouteStudent component={Result} />}
                    />
                    <Route
                      path="/notifications"
                      element={
                        <PrivateRouteStudent component={Notifications} />
                      }
                    />
                    <Route
                      path="/updateProfile"
                      element={
                        <PrivateRouteStudent component={UpdateProfile} />
                      }
                    />
                    <Route
                      element={
                        <PrivateRouteStudent
                          component={SemesterCreditRegistration}
                        />
                      }
                      path="/Academics/SemesterCreditRegistration"
                    />
                    <Route
                      element={
                        <PrivateRouteStudent
                          component={ScholarshipsAvailable}
                        />
                      }
                      path="/Scholarship/ScholarshipsAvailable"
                    />
                    <Route
                      path="/notifications/"
                      element={
                        <PrivateRouteStudent component={Notifications} />
                      }
                    />
                    <Route
                      path="/faq/"
                      element={<PrivateRouteStudent component={FAQ} />}
                    />
                    {/* FACULTY ROUTES*/}
                    <Route
                      path="/Faculty/UploadMarks"
                      element={<PrivateRouteFaculty component={UploadMarks} />}
                    />
                    <Route
                      path="/Faculty/AllocatedGrades"
                      element={
                        <PrivateRouteFaculty component={AllocateGrades} />
                      }
                    />
                    <Route
                      path="/Faculty/login"
                      element={
                        <Login
                          role="Faculty"
                          setShowSidebarAndNavbar={setShowSidebarAndNavbar}
                        />
                      }
                    />

                    <Route
                      path="/Faculty/"
                      element={<PrivateRouteFaculty component={FacultyHome} />}
                    />
                    <Route
                      path="/Faculty/ManageAcademics/ElectiveRegistration"
                      element={
                        <PrivateRouteFaculty component={ElectiveRegistration} />
                      }
                    />
                    <Route
                      path="/Faculty/manageResult"
                      element={<PrivateRouteFaculty component={ManageResult} />}
                    />
                    <Route
                      path="/Faculty/ManageAcademics/ElectiveAllocation"
                      element={
                        <PrivateRouteFaculty component={ElectiveAllocation} />
                      }
                    />
                    {/*STUDENTSECTION ROUTES*/}
                    <Route
                      path="/StudentSection/login"
                      element={
                        <Login
                          role="StudentsSection"
                          setShowSidebarAndNavbar={setShowSidebarAndNavbar}
                        />
                      }
                    />
                    <Route
                      path="/StudentSection/"
                      element={
                        <PrivateRouteStudentSection
                          component={StudentSectionHome}
                        />
                      }
                    />
                    <Route
                      path="/StudentSection/notifications"
                      element={
                        <PrivateRouteStudentSection
                          component={StudentSectionNotifications}
                        />
                      }
                    />
                    <Route
                      path="/StudentSection/Request/BonafideRequests"
                      element={
                        <PrivateRouteStudentSection component={Bonafides} />
                      }
                    />
                    <Route
                      path="/StudentSection/Request/LeavingCertificateRequests"
                      element={
                        <PrivateRouteStudentSection component={LCRequests} />
                      }
                    />
                    <Route
                      path="/StudentSection/Request/FeeReceiptRequests"
                      element={
                        <PrivateRouteStudentSection
                          component={FeeReceiptRequests}
                        />
                      }
                    />
                    <Route
                      path="/StudentSection/Request/ScholarshipRequests"
                      element={
                        <PrivateRouteStudentSection
                          component={ScholarshipRequests}
                        />
                      }
                    />
                    <Route
                      path="/StudentSection/StudentRegistration"
                      element={
                        <PrivateRouteStudentSection
                          component={StudentRegistration}
                        />
                      }
                    />
                    {/* <Route
                        path="/StudentSection/Scholarship/ScholarshipsAvailable"
                        element={<Scholarships />}
                      /> */}
                    <Route
                      path="/StudentSection/Scholarship/RequestedBonafides"
                      element={
                        <PrivateRouteStudentSection component={Bonafides} />
                      }
                    />
                    <Route
                      path="/StudentSection/Scholarship/LetterFormats"
                      element={
                        <PrivateRouteStudentSection component={LetterFormat} />
                      }
                    />
                    <Route
                      path="/StudentSection/Scholarship/Queries"
                      element={
                        <PrivateRouteStudentSection component={Queries} />
                      }
                    />
                  </Routes>
                </Layout>
              </Fragment>
            </Router>
          </UserState>
        </AlertState>
      </AuthState>
    </Provider>
  );
};

export default App;
