import { useState } from "react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebars";
import { Outlet, Navigate } from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RightSidebar } from "../../sidebars/rightSidebar";
import { Logo } from "../../logo";

export const SecondaryLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [phoneCollapse, setPhoneCollapse] = useState(true);

  const { corpzoLogo } = useSelector((state) => state.logo);
  // const sidebarClassName = useSelector((state) => state.theme.sidebarClassName);
  const sidebarClassName = "";
  // profile = //useSelector((state) => state.auth);

  // const isSignedIn = localStorage.getItem('signedIn')
  // if (!isSignedIn){
  //   window.addEventListener('beforeunload', function (e) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   });
  //   let userInfo = null;
  //   userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
  //   localStorage.removeItem('userInfo');
  //   }

  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    return <Navigate to="/sign-in" />;
  }
  // const isSignedIn = localStorage.getItem('signedIn')
  // if (!isSignedIn){
  //   window.addEventListener('beforeunload', function (e) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   });
  //   let userInfo = null;
  //   userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
  //   localStorage.removeItem('userInfo');
  //   }
  //

  return (
    <>
      <Header
        className={"sticky top-0 left-0 px-2 lg:px-4"}
        collapse={collapse}
        setCollapse={setCollapse}
      />
      <Logo favicon={"/vayuzfavicon.ico"} />
      <div className="w-full">
        <div
          className={`w-full max-w-[100rem] mx-auto flex page-body-wrapper lg:px-4 md:px-2 sm:px-2 dark:dark:bg-slate-800`}
        >
          {/* <Sidebar
            className={`${
              sidebarClassName ? sidebarClassName : ""
            } hidden lg:block w-52 max-w-48 fixed top-4 bottom-4 left-10 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
          /> */}
          <Sidebar
            className={`${sidebarClassName ? sidebarClassName : ""} ${
              collapse ? "block" : "hidden"
            } lg:hidden max-w-48 fixed top-20 left-0 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
          />

          <motion.div
            initial={{ left: "-50%" }}
            animate={{ left: 0, transition: { duration: 0.3 } }}
            exit={{ left: "-50%", transition: { duration: 0.3 } }}
            className={`w-full overflow-hidden`}
          >
            <motion.div className="py-6 px-4 lg:px-0 bg-[#ffffff] dark:dark:bg-slate-800 flex gap-5">
              <div className="w-full lg:w-3/4">
                <Outlet />
              </div>
              <RightSidebar
                className={
                  "w-full   md:w-1/4 hidden lg:flex flex-col gap-6 sticky top-0 right-0"
                }
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
