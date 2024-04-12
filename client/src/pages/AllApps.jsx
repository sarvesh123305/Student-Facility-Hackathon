import { useContext, useEffect } from "react";
import AuthContext from "../components/context/auth/authContext";
const AllApps = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return <h1 className="flex justify-start">Home {user && user.name}</h1>;
};

export default AllApps;
