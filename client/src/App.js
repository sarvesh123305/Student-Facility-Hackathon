import "./App.css";
//Necessary components
import Navbar from "./components/layout/Navbar";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//context states
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import Alerts from "./components/layout/Alerts";
//pages
import Home from "./components/pages/Home";
//student
import StudentLogin from "./components/auth/student/StudentLogin";
import StudentRegister from "./components/auth/student/StudentRegister";

//faculty

//others
const App = () => {
  return (
    <div>
      <AuthState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="student/login" element={<StudentLogin />} />
                  <Route
                    path="student/register"
                    element={<StudentRegister />}
                  />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AuthState>
    </div>
  );
};

export default App;
