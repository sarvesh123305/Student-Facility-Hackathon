import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import { useContext } from "react";
// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../components/context/auth/authContext";
const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);
  const { user, userType } = authContext;
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "20rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusListStudent = [
    {
      name: "Academics",
      icon: BsPerson,
      menus: [
        "Academic Profile",
        "Semester Credit Registration",
        "Elective Registration",
      ],
    },
    {
      name: "Scholarship",
      icon: TbReportAnalytics,
      menus: [
        "Scholarships Available",
        "Request Bonafide",
        "Letter Formats",
        "Queries",
      ],
    },
  ];
  const subMenusListFaculty = [
    {
      name: "Manage Academics",
      icon: BsPerson,
      menus: [
        "Academic Profile",
        "Semester Credit Registration",
        "Elective Registration",
      ],
    },
  ];
  const FacultyMenubar = () => {
    return (
      <ul
        className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1
      font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   
      md:h-[68%] h-[70%]"
      >
        <li>
          <NavLink to={"/"} className="link">
            <AiOutlineAppstore size={23} className="min-w-max" />
            Profile
          </NavLink>
        </li>

        {(open || isTabletMid) && (
          <div className="border-slate-300 ">
            {subMenusListFaculty?.map((menu) => (
              <div key={menu.name} className="flex flex-col gap-1">
                <SubMenu data={menu} />
              </div>
            ))}
          </div>
        )}
        <li>
          <NavLink to={"/stroage"} className="link">
            <HiOutlineDatabase size={23} className="min-w-max" />
            Manage Result
          </NavLink>
        </li>
      </ul>
    );
  };
  const StudentMenubar = () => {
    return (
      <ul
        className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1
      font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   
      md:h-[68%] h-[70%]"
      >
        <li>
          <NavLink to={"/"} className="link">
            <AiOutlineAppstore size={23} className="min-w-max" />
            Profile
          </NavLink>
        </li>

        {(open || isTabletMid) && (
          <div className="border-slate-300 ">
            {subMenusListStudent?.map((menu) => (
              <div key={menu.name} className="flex flex-col gap-1">
                <SubMenu data={menu} />
              </div>
            ))}
          </div>
        )}
        <li>
          <NavLink to={"/stroage"} className="link">
            <HiOutlineDatabase size={23} className="min-w-max" />
            Result
          </NavLink>
        </li>
      </ul>
    );
  };
  const getMenubar = (role) => {
    switch (role) {
      case "student":
        return <StudentMenubar />;
      case "faculty":
        return <FacultyMenubar />;
      default:
        return <StudentMenubar />;
      // return <h1>Please Login</h1>;
    }
  };
  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[24rem]  w-[24rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-iQlmH71DcnDxzUNJfqs4-b0bXlkXvMU4LbUvzkf6Aw&s"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">COEP Tech</span>
        </div>

        <div className="flex flex-col  h-full">
          {/*Here ul to be inserted */}
          {getMenubar(userType)}
          {}
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-start hover:bg-gray-300">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  width={45}
                  alt=""
                  className="rounded-full"
                />
                <div className="ml-5 text-base">
                  <p>Hello {user && user.name}</p>
                  <small>142203002</small>
                </div>
                {/* <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p> */}
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
