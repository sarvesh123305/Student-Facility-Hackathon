import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Authentication";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
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
import Profiletry from "./pages/Student/profiletry";
import ScholarshipQueries from "./pages/Student/ScholarshipQueries";
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <UserState>
          <Router>
            <Fragment>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Sidebar />
                <div className="flex-col w-full">
                  <Navbar />
                  <Alerts />
                  <Routes>
                    {/* STUDENT ROUTES*/}
                    <Route path="/academic" element={<Academic />} />
                    <Route
                      path="/subjectallocation"
                      element={<Subjectallocation />}
                    />

                    <Route
                      path="/Scholarship/RequestBonafide"
                      element={<RequestBonafide />}
                    />

                    <Route
                      path="/Scholarship/Queries"
                      element={<ScholarshipQueries />}
                    />
                    {/* FACULTY ROUTES*/}
                    <Route path="/Faculty/" element={<AdminHome />} />

                    {/* OTHER ROUTES*/}

                    <Route path="/" element={<AllApps />} />
                    <Route
                      path="/authentication"
                      element={<Authentication />}
                    />
                    <Route path="/login" element={<Login role="Student" />} />
                    <Route
                      path="/Faculty/login"
                      element={<Login role="Faculty" />}
                    />
                    <Route
                      path="/Other/other"
                      element={<Login role="other" />}
                    />

                    <Route path="/stroage" element={<Stroage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/build/:bID" element={<Build />} />
                    <Route path="/analytics/:aID" element={<Analytics />} />
                    <Route path="/profiletry" element={<Profiletry />} />
                  </Routes>
                </div>
              </div>
            </Fragment>
          </Router>
        </UserState>
      </AlertState>
    </AuthState>
  );
};

export default App;
