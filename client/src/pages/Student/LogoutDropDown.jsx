import React, { useContext, useEffect } from "react";

import { Link } from 'react-router-dom'
import AuthContext from "../../components/context/auth/authContext";

const LogoutDropDown = () => {
    const authContext = useContext(AuthContext);

    const { logout } = authContext;

    const handleLogout = () => {
        logout();
        window.location.replace('/login');
    };

    return (
        <div id="dropdownDivider" class="z-10 absolute top-14 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
            <ul class="py-2 text-lg text-gray-700 " aria-labelledby="dropdownDividerButton">
                <li>
                    <Link
                        to={"/"}
                        class="block px-4 py-2 hover:bg-gray-100 "
                    >
                        Profile
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/Academics/AcademicProfile"}
                        class="block px-4 py-2 hover:bg-gray-100 "
                    >
                        Academic Profile
                    </Link>
                </li>
            </ul>
            <div class="py-2">
                <a onClick={handleLogout} class="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 ">Logout</a>
            </div>
        </div>
    )
}

export default LogoutDropDown