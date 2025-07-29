import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { dateFormated, iconSize, useOutsideClick } from "../../utils";
import { IoMdNotificationsOutline } from "react-icons/io";

import { IconWrapper } from "../wrappers/icon-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkDone } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotification,
  updateAllNotification,
} from "../../redux/actions/notification-action";

export const Notification = ({ closeButton, path }) => {
  console.log(path);
  const [notification, setNotification] = useState(false);
  const [read, setRead] = useState("");
  const [markAsReadClicked, setMarkAsReadClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isNotificationLoading, isNotificationData } = useSelector(
    (state) => state.notification
  );
  const { isNotificationCountLoading, notificationCount } = useSelector(
    (state) => state.notification
  );
  const { user } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      const page = searchParams.get("page") || 1;
      dispatch(
        getAllNotification({
          page: page,
        })
      );
    }
  }, [searchParams, location.pathname, dispatch]);

  const notificationData = isNotificationData?.data;

  const handleMarkAsRead = () => {
    dispatch(updateAllNotification());
  };

  // Outside click

  const notificationPopupRef = useRef();
  const handleNotification = () => {
    setNotification(!notification);
  };
  useOutsideClick(notificationPopupRef, handleNotification);

  return (
    <div className="relative corpzo-dashboard-step-3">
      <IconWrapper className={"cursor-pointer"} onClick={handleNotification}>
        <button
          data-tooltip-content={"Notification"}
          data-tooltip-id="my-tooltip"
          className="header-icon"
        >
          <img
            src={
              path === "Notifications"
                ? `/icons/header/bell_fill.svg`
                : "/icons/header/Bell2.svg"
            }
            alt=""
            className="size-5 md:size-6"
          />
          {notificationCount > 0 && (
            <span className="absolute -top-[6px] -right-2 md:top-[2px] md:-right-0 lg:top-[3px] lg:right-1 bg-red-500 text-white text-[9px] font-bold rounded-full px-1.5 py-0.5">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>
      </IconWrapper>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            ref={notificationPopupRef}
            className="absolute right-0 lg:right-4 top-10 z-50 w-[300px] md:min-w-[20rem] max-h-[80vh] bg-white dark:bg-[#1E293B] border dark:border-gray-700 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Notifications
              </h3>
              <button
                onClick={handleNotification}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>

            {/* Notifications */}
            {notificationData?.length > 0 ? (
              <>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[300px] overflow-y-auto custom-scroll">
                  {notificationData?.slice(0, 3)?.map((data, i) => (
                    <div
                      key={i}
                      className={`p-4 cursor-pointer transition duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                        data.isRead === false ? "bg-[#FFF3E0]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h5
                          className={`text-sm font-medium ${
                            data.isRead === false
                              ? "text-black dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {data.notificationDetail?.title}
                        </h5>
                        {data.isRead === false && (
                          <span className="w-2 h-2 rounded-full bg-[#FBB03B]"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {data?.notificationDetail?.message}
                      </p>
                      <p className="text-[11px] text-right text-gray-400 dark:text-gray-500 mt-1">
                        {dateFormated(data.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 flex justify-between items-center bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700">
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
                    onClick={handleMarkAsRead}
                  >
                    <IoCheckmarkDone className="text-lg" />
                    Mark all as read
                  </button>
                  <Link
                    to="notifications"
                    onClick={() => {
                      closeButton;
                      setNotification(false);
                    }}
                    className="text-sm font-medium text-primary hover:underline hover:text-[#0A1C40]"
                  >
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center bg-[#FFF3E0] text-black">
                <h4 className="font-bold text-lg mb-1">{user?.name},</h4>
                <p className="text-sm">
                  Welcome to VAYUZ! You have no notifications yet.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
