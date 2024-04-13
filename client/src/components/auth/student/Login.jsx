import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);

  const {
    Studentlogin,
    Facultylogin,
    StudentSectionlogin,
    error,
    clearErrors,
    isAuthenticated,
  } = authContext;
  const { role, setShowSidebarAndNavbar } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      setShowSidebarAndNavbar(true);
      if (role === "Student") navigate("/");
      if (role === "Faculty") navigate("/Faculty/");
      if (role === "StudentsSection") navigate("/StudentSection/");
      //StudentsSection
    }

    if (error === "Invalid Credentials") {
      
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    mis: "",
    password: "",
  });

  const { mis, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(mis, password);
    if (mis === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      if (role === "Student") {
        await Studentlogin({
          mis,
          password,
          });

      } else if (role === "Faculty") {
        await Facultylogin({ empno: mis, password: password });
      } else if (role === "StudentsSection") {
        console.log("students sections");
        await StudentSectionlogin({
          empno: mis,
          password
        });
      }
      setUser({
        mis: "",
        password: "",
      });
    }
  };
  // const activeTab =
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-30 w-20"
          src={window.location.origin + "/images/coeplogo.png"}
          alt="Your Company"
        />
        <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          COEP Technological University <br></br>
        </h1>
      </div>

      <br></br>
      <br></br>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md ">
        <ul className="flex items-stretch mx-auto w-full sm:max-w-sm text-lg font-medium text-center text-gray-500  ">
          <li className="me-2">
            <Link
              to="/login"
              className={`inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 ${
                role === "Student" ? "text-white bg-blue-600 " : ""
              }`}
              aria-current="page"
            >
              Student Login
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="/Faculty/login"
              className={`inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 ${
                role === "Faculty" ? "text-white bg-blue-600" : ""
              } `}
            >
              Faculty Login
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="/StudentSection/login"
              className={`inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 ${
                role === "StudentsSection" ? "text-white bg-blue-600" : ""
              }`}
            >
              Student Section Login
            </Link>
          </li>
        </ul>
        <br></br>
        <form className="space-y-6 p-2" id="loginform" onSubmit={onSubmit}>
          {/* <h5 className="text-xl font-medium text-gray-900 ">Student Sign in</h5> */}
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              PRN Number
            </label>
            <input
              id="mis"
              type="text"
              name="mis"
              autoComplete="on"
              value={mis}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your PRN"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="on"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="flex items-end">
            {/* <div className="flex items-start">
                      <div className="flex items-center h-5">
                          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                      </div>
                      <label for="remember" className="ms-2 ml-2 text-lg font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div> */}
            <a
              href="#"
              className="ms-auto text-lg text-blue-700 hover:underline "
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  role: PropTypes.string.isRequired,
};

Login.defaultProps = {
  role: "Student",
};
export default Login;
