import { IconBox } from "../iconBox";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AccountManager } from "../../pages/dashboard/components/accountManager";
import { UpdateProfile } from "./updateProfile";

export const Sidebar = ({ className, collapse, setCollapse }) => {
  const user = useSelector((state) => state.dashboard);
  const { zIndexSidebar } = useSelector((state) => state.app);
  const baseUrl = "https://corpzo-x.vercel.app/";
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const { corpzoLogo } = useSelector((state) => state.logo);

  const initialSidebarItems = [
    {
      id: 0,
      title: "Dashboard",
      icon: (
        <img className="w-[18px]" src="/icons/dashboard/dashboard.svg" alt="" />
      ),
      to: "/dashboard",
      isPinned: false,
    },
    {
      id: 1,
      title: "Business",
      icon: (
        <img className="w-[18px]" src="/icons/dashboard/business.svg" alt="" />
      ),
      to: "/business",
      isPinned: false,
      className: "corpzo-dashboard-step-8",
    },
    {
      id: 2,
      title: "Fundraise",
      icon: (
        <img className="w-[18px]" src="/icons/dashboard/fundraise.svg" alt="" />
      ),
      to: baseUrl + "/fundraise?token=" + token,
      external: true,
      isPinned: false,
      className: "corpzo-dashboard-step-9",
    },
    {
      id: 4,
      title: "Services",
      icon: (
        <img className="w-[18px]" src="/icons/dashboard/services.svg" alt="" />
      ),
      to: "/services",
      isPinned: false,
      className: "corpzo-dashboard-step-10",
    },
    {
      id: 5,
      title: "Payment History",
      icon: (
        <img
          className="w-[18px]"
          src="/icons/dashboard/payment-history.svg"
          alt=""
        />
      ),
      to: "/payment/history",
      isPinned: false,
      className: "corpzo-dashboard-step-11",
    },
    {
      id: 6,
      title: "Documents",
      icon: (
        <img className="w-[18px]" src="/icons/dashboard/documents.svg" alt="" />
      ),
      to: "/documents",
      isPinned: false,
      className: "corpzo-dashboard-step-12",
    },
  ];

  const [items, setItems] = useState(initialSidebarItems);
  const [percentage, setPercentage] = useState(100);

  const fieldsKey = [
    "name",
    "email",
    "busniessEmail",
    "phone",
    "profile_picture_url",
  ];

  const calculatePercentageHandler = () => {
    let count = 0;
    Object.keys(user).forEach((data) => {
      if (fieldsKey.includes(data)) {
        count++;
      }
    });
    const percentage = Math.floor((count / fieldsKey.length) * 100);
    setPercentage(percentage);
  };

  useEffect(() => {
    if (user) {
      calculatePercentageHandler();
    }
  }, [user]);

  const handlePinToggle = (title) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.title === title ? { ...item, isPinned: !item.isPinned } : item
      );
      const pinnedItems = updatedItems.filter((item) => item.isPinned);
      const nonPinnedItems = updatedItems.filter((item) => !item.isPinned);
      nonPinnedItems.sort((a, b) => a.id - b.id);
      return [...pinnedItems, ...nonPinnedItems];
    });
  };

  const handleSidebar = () => {
    setCollapse(!collapse);
  };


  let profile = false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ left: "-50%" }}
        animate={{ left: 10, transition: { duration: 0.3 } }}
        exit={{ left: "-50%", transition: { duration: 0.3 } }}
        style={{ zIndex: zIndexSidebar }}
        className={`${
          className || ""
        } overflow-hidden shadow-xl dark:bg-slate-900 overflow-y-auto`}
      >
        <div className="py-4 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col justify-center items-center px-4">
              <Link to={"/dashboard"}>
                <div>
                  <img
                    className="block dark:hidden fill-white"
                    src="/VAYUZ (WHite Strokes).png"
                    alt="VAYUZ Technologies"
                  />
                  <img
                    width={0}
                    height={0}
                    className="hidden dark:block"
                    src="/VAYUZ (WHite Strokes).png"
                    alt="VAYUZ Technologies"
                  />
                </div>
              </Link>

              {profile ? (
                <div className="flex justify-end mt-2">
                  <h1 className="font-bold text-xs uppercase">
                    {capitalize(profile.role)}
                  </h1>
                </div>
              ) : null}
            </div>

            <div className="px-4 overflow-x-hidden row-span-3">
              <div className="space-y-1">
                {items?.map((item, index) => (
                  <IconBox
                    containerClassName="px-4 py-2"
                    titleClassName={item.to == null && "bg-[#FFD700] shadow-lg"}
                    key={index}
                    to={item.to}
                    icon={item.icon}
                    title={item.title}
                    child={item.child}
                    setPin={() => handlePinToggle(item.title)}
                    className={item.className}
                    collapse={collapse}
                    setCollapse={setCollapse}
                    external={item.external} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-2 row-span-1 corpzo-dashboard-step-13">
            <AccountManager sidebar={true} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

function capitalize(text) {
  return text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase();
}
