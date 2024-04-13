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
import { FaQuestion } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { MdEdit, MdMenu, MdNotifications } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../components/context/auth/authContext";
import { Edit3Icon, EditIcon } from "lucide-react";
const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);
  const { user, userType, loadUser } = authContext;
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);
  const firstName = user ? user.name.split(" ") : null;
  const mis = user ? user.mis : null;

  useEffect(() => {
    isTabletMid && setOpen(false);
    // loadUser
    const userType = pathname.includes("Faculty")
      ? "faculty"
      : pathname.includes("student")
      ? "student"
      : "studentsection";
    // console.log(userType);
    userType && loadUser(userType);
    // }, [pathname, userType]);
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
      menus: ["Academic Profile", "Semester Credit Registration"],
    },
    {
      name: "Scholarship",
      icon: TbReportAnalytics,
      menus: [
        // "Scholarships Available",
        "Request Bonafide",
        "Letter Formats",
        "Queries",
      ],
    },
  ];

  const subMenusListStudentSection = [
    {
      name: "Request",
      icon: TbReportAnalytics,
      menus: [
        "Scholarship Requests",
        "Bonafide Requests",
        "Fee Receipt Requests",
        "Leaving Certificate Requests",
      ],
    },
    {
      name: "Queries",
      icon: TbReportAnalytics,
      menus: [
        "Received Queries",
        "Sent Replies",
      ],
    },
  
  ];

  const subMenusListFaculty = [
    {
      name: "Manage Academics",
      icon: BsPerson,
      menus: [
        // "Academic Profile",
        // "Semester Credit Registration",
        "Elective Allocation",
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
          <NavLink to={"/Faculty"} className="link">
            <AiOutlineAppstore size={23} className="min-w-max" />
            Profile
          </NavLink>
        </li>

        {(open || isTabletMid) && (
          <div className="border-slate-300 ">
            {subMenusListFaculty?.map((menu) => (
              <div key={menu.name} className="flex flex-col gap-1">
                <SubMenu data={menu} userType="Faculty" />
              </div>
            ))}
          </div>
        )}
        <li>
          <NavLink to={"/Faculty/manageResult"} className="link">
            <HiOutlineDatabase size={23} className="min-w-max" />
            Manage Result
          </NavLink>
        </li>
      </ul>
    );
  };

  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const StudentMenubar = () => {
    return (
      <ul
        className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1
      font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   
      md:h-[68%] h-[70%] "
      >
        <li>
          {/*
          <form class="flex items-center max-w-md mx-auto">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full m-1">

                <input type="text" id="simple-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5   " placeholder="Search Anything" required />
              </div>
              <button type="submit" 
              onClick={(e) => handleSubmit(e)} 
              class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                <svg class="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
                </button>
                </form>
              */}
        </li>
        <li>
          <NavLink
            to={"/"}
            className="link hover:bg-white-600 hover:text-black"
          >
            <AiOutlineAppstore size={23} className="min-w-max" />
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/updateProfile"}
            className="link flex items-stretch hover:bg-white-600 hover:text-black"
          >
            <MdEdit size={23} className="min-w-max" />
            Update Profile
          </NavLink>
        </li>

        {(open || isTabletMid) && (
          <div className="border-slate-300">
            {subMenusListStudent?.map((menu) => (
              <div key={menu.name} className="flex flex-col gap-1 items-stretch hover:bg-white-600 hover:text-black">
                <SubMenu data={menu} />
              </div>
            ))}
          </div>
        )}



        <li>
          <NavLink
            to={"/result"}
            className="link hover:bg-white-600 hover:text-black"
          >
            <HiOutlineDatabase size={23} className="min-w-max" />
            Result
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/notifications"}
            className="link flex items-stretch hover:bg-white-600 hover:text-black"
          >
            <MdNotifications size={23} className="min-w-max" />
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/faq"}
            className="link hover:bg-white-600 hover:text-black"
          >
            <FaQuestion size={23} className="min-w-max" />
            FAQ's
          </NavLink>
        </li>
      </ul>
    );
  };
  const StudentSectionMenubar = () => {
    return (
      <ul
        className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1
      font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   
      md:h-[68%] h-[70%] "
      >
        <li>
          {/*
          <form class="flex items-center max-w-md mx-auto">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full m-1">

                <input type="text" id="simple-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5   " placeholder="Search Anything" required />
              </div>
              <button type="submit" 
              onClick={(e) => handleSubmit(e)} 
              class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                <svg class="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
                </button>
                </form>
              */}
        </li>
        <li>
          <NavLink
            to={"/StudentSection/"}
            className="link hover:bg-white-600 hover:text-black"
          >
            <AiOutlineAppstore size={23} className="min-w-max" />
            Profile
          </NavLink>
        </li>

        {(open || isTabletMid) && (
          <div className="border-slate-300">
            {subMenusListStudentSection?.map((menu) => (
              <div key={menu.name} className="flex flex-col gap-1">
                <SubMenu data={menu} userType="StudentSection" />
              </div>
            ))}
          </div>
        )}

        <li>
          <NavLink
            to={"/StudentSection/notifications"}
            className="link flex items-stretch hover:bg-white-600 hover:text-black"
          >
            <MdNotifications size={23} className="min-w-max" />
            Notifications
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
      case "studentsection":
        return <StudentSectionMenubar />;
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
        className="	 text-slate-300	 shadow-xl z-[999] max-w-[24rem]  w-[24rem] 
            overflow-hidden md:relative fixed
         h-screen "
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-iQlmH71DcnDxzUNJfqs4-b0bXlkXvMU4LbUvzkf6Aw&s"
            width={45}
            className=" rounded-full"
            alt=""
          />
          <span className="text-xl whitespace-pre">COEP Tech</span>
        </div>

        <div className="flex flex-col  h-full">
          {getMenubar(userType)}
          {}
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-start hover:bg-zinc-600">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  width={45}
                  alt=""
                  className="rounded-full"
                />
                <div className="ml-5 text-base">
                  <p>
                    Hello {user && user.name.split(" ").slice(1, -1).join(" ")}
                  </p>
                  <small>{user && user.mis}</small>
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
