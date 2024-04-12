import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/student/Login";
import AuthState from "./components/context/auth/AuthState";
import AlertState from "./components/context/alert/AlertState";
import Alerts from "./layouts/Alerts";
import { Fragment } from "react";
import Navbar from "./layouts/sidebar/Navbar";
import Sidebar from "./layouts/sidebar";
import AdminHome from "./pages/Faculty/AdminHome";
import RequestBonafide from "./pages/Student/RequestBonafide";
import UserState from "./components/context/user/UserState";
import Subjectallocation from "./pages/Student/Subjectallocation";
import Academic from "./pages/Student/Academic";
import Profile from "./pages/Student/Profile";
import ScholarshipQueries from "./pages/Student/ScholarshipQueries";
import Home from "./pages/Student/Home";
import Query from "./pages/Student/Query";
import Allocationform from "./pages/Faculty/Allocationform";
import Result from "./pages/Student/Result";
import ScholarshipsAvailable from "./pages/Student/ScholarshipsAvailable";
import LetterFormats from "./pages/Student/LetterFormats";
import SemesterCreditRegistration from "./pages/Student/SemesterCreditRegistration";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      {" "}
      <AuthState>
        <AlertState>
          <UserState>
            <Router>
              <Fragment>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Sidebar />
                  <div className="flex-col w-full bg-white">
                    <Navbar />
                    <Alerts />
                    <Routes>
                      {/* STUDENT ROUTES*/}
                      <Route
                        path="/Academics/AcademicProfile"
                        element={<Academic />}
                      />
                      <Route path="/elective" element={<Home />} />
                      <Route
                        path="/Academics/ElectiveRegistration"
                        element={<Subjectallocation />}
                      />

                      <Route
                        path="/Scholarship/RequestBonafide"
                        element={<RequestBonafide />}
                      />
                      <Route path="/Scholarship/Queries" element={<Query />} />
                      <Route
                        path="/Scholarship/LetterFormats"
                        element={<LetterFormats />}
                      />
                      <Route path="/result" element={<Result />} />
                      <Route
                        path="/Academics/SemesterCreditRegistration"
                        element={<SemesterCreditRegistration />}
                      />

                      <Route
                        path="/Scholarship/ScholarshipsAvailable"
                        element={<ScholarshipsAvailable />}
                      />

                      {/* FACULTY ROUTES*/}
                      <Route path="/Faculty/" element={<AdminHome />} />

                      {/* OTHER ROUTES*/}

                      <Route path="/login" element={<Login role="Student" />} />
                      <Route
                        path="/Faculty/login"
                        element={<Login role="Faculty" />}
                      />
                      <Route
                        path="/Other/other"
                        element={<Login role="other" />}
                      />

                      <Route path="/" element={<Profile />} />
                      <Route
                        path="/allocationform"
                        element={<Allocationform />}
                      />
                    </Routes>
                  </div>
                </div>
              </Fragment>
            </Router>
          </UserState>
        </AlertState>
      </AuthState>
    </Provider>
  );
};

export default App;
