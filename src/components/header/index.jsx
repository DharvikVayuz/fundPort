import { Search } from "../search";
import { Button } from "../buttons";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { headerLinks } from "../../database";
import { HiOutlineUser } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdStarOutline } from "react-icons/io";
import { RxArrowRight, RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { IconWrapper } from "../wrappers/icon-wrapper";
import { ModalWrapper } from "../wrappers/modal";
import { IoSettingsOutline } from "react-icons/io5";
import { titleCase, useOutsideClick } from "../../utils";
// import { FullScreenButton } from "../fullScreen";
import { ThemeSwitch } from "../theme/switch";
import { capitalize } from "../../utils";
import { Notification } from "../notification";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../modal/confirmationModal";
import { persistor } from "../../redux/store";
import { clearDocumentList } from "../../redux/slices/documentSlice";
import { getUser } from "../../redux/actions/dashboard-action";
import { Profile } from "../../pages/dashboard/components/profile";
import { DashboardProfileCardShimmer } from "../loader/DashboardProfileCardShimmer";
import { LiaExchangeAltSolid } from "react-icons/lia";

function getPageHeading(pathname) {
  switch (true) {
    case pathname.includes("dashboard"):
      return "Dashboard";
    case pathname.includes("wishlist"):
      return "Wishlist";
    case pathname.includes("business"):
      return "Business";
    case pathname.includes("fundraise"):
      return "Fundraise";
    case pathname.includes("investment"):
      return "Investment";
    case pathname.includes("services"):
      return "Services";
    case pathname.includes("payment"):
      return "Payment";
    case pathname.includes("document"):
      return "Document";
    case pathname.includes("settings"):
      return "Settings";
    case pathname.includes("profile"):
      return "Profile";
    case pathname.includes("offersDetails"):
      return "Offers";
    case pathname.includes("messages"):
      return "Messages";
    case pathname.includes("notification"):
      return "Notifications";
    case pathname.includes("view-all-insights"):
      return "Insight";
    case pathname.includes("insight-details"):
      return "Insight Detail";
    default:
      return "";
  }
}

export const Header = ({ className, collapse, setCollapse }) => {
  const { loading } = useSelector((state) => state.dashboard);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [signedInMenuPopup, setSignedInMenuPopup] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useSelector((state) => state.dashboard.user);
  console.log(user,"USER SWITCH TO CORPZOX");
  const { upload } = useSelector((state) => state.profile);
  const { isMessageCountLoading, messageCount } = useSelector(
    (state) => state.message
  );
  const { isNotificationCountLoading, notificationCount } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get('token');
  const { pathname } = useLocation();

  const signedInMenuPopupRef = useRef();

  const baseUrl = "https://corpzo-x.vercel.app/";
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const handleSignInMenuPopup = () => {
    setSignedInMenuPopup(!signedInMenuPopup);
  };

  useOutsideClick(signedInMenuPopupRef, handleSignInMenuPopup);

  // Dummy variables

  const signedIn = true;
  const profile = false;

  // Handle sidebar collapse
  // console.log(upload, "upload image");

  const handleSidebar = () => {
    setCollapse(!collapse);
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  const handleLogout = () => {
    persistor.pause();
    persistor.flush().then(() => {
      // console.log("Persisted data cleared successfully!");
      localStorage.clear();
      navigate("/sign-in");
      return persistor.purge();
    });
    // dispatch(clearDocumentList())
  };

  const handleCancelLogout = () => {
    onConfirmationModalClose();
  };

  const clearSearch = () => {
    searchParams.delete("search");

    setSearchParams(searchParams);

    console.log("Search parameter removed:", searchParams.toString());
  };

  useEffect(() => {
    if (!user?.profile_picture_url || !user?.name || !user?.email) {
      dispatch(getUser(tokenFromUrl));
    }
  }, []);
  console.log(user);


  const excludedPaths = [
    "settings",
    "profile",
    "wishlist",
    "offersDetails",
    "dashboard",
    "payment",
    // "messages",
    "view-all-insights",
    "services/detail",
    "services/serviceprogressdetail",
    "insight-detail",
    "business/detail",
    // "documents",
  ];

  return (
    <header
      className={`${
        className && className
      } bg-[#0A1C40] dark:bg-slate-900 py-3 z-30`}
    >
      <div className="relative flex justify-between items-center">
        {/* Left Side Menu */}
        <div className="flex items-center gap-2 w-[60%]">
          {/* Logo for secondary layout */}
          {pathname.includes("messages") && (
            <Link className="hidden lg:block" to={"/"}>
              <img
                className="block dark:hidden min-w-10"
                src="/vayuzfavicon.ico"
                alt="corpzo-logo"
              />
              <img
                className="hidden dark:block min-w-10"
                src="/vayuzfavicon.ico"
                alt="corpzo-logo"
              />
            </Link>
          )}
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className={`flex justify-center items-center`}>
              <IconWrapper>
                <button onClick={handleSidebar} className="header-icon">
                  {collapse ? (
                    <RxCross2 className="text-white" />
                  ) : (
                    <RxHamburgerMenu className="text-white" />
                  )}
                </button>
              </IconWrapper>
            </div>
            {/* {!pathname.includes("messages") && (
            )} */}
            <Link to={"/"}>
              <img
                className="block dark:hidden min-w-10"
                src="/vayuzfavicon.ico"
                alt="corpzo-logo"
              />
              <img
                className="hidden dark:block min-w-10"
                src="/vayuzfavicon.ico"
                alt="corpzo-logo"
              />
              {profile ? (
                <div className="flex justify-end">
                  <h1 className="font-bold text-xs uppercase">
                    {capitalize(profile.role)}
                  </h1>{" "}
                </div>
              ) : (
                ""
              )}
            </Link>
          </div>
          {/* Page Heading */}
          <h1 className="font-bold text-white text-2xl">
            {getPageHeading(pathname)}
          </h1>
          {/* Search */}
          {!excludedPaths.some((path) => pathname.includes(path)) && (
            <Search
              clearSerarch={clearSearch}
              placeholder={`Search ${getPageHeading(pathname)}`}
              containerClassName={
                "hidden lg:block w-full h-10 lg:!max-w-lg !bg-[#3D485F] rounded-md overflow-hidden   border-[#8c94a2] border !text-white"
              }
              inputClassName={"w-full h-10  !bg-[#3D485F] text-white"}
            />
          )}

          {/* Header Links */}
          <div className="hidden lg:flex items-center gap-6">
            {headerLinks?.map((data, index) => (
              <Link
                className={`${
                  window.location.pathname.includes(data.url) && "text-primary"
                } hover:text-primary`}
                to={data.url}
                key={index}
              >
                {data.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Right Side Menu */}
        {signedIn ? (
          <div className="flex items-center gap-2 md:w-[50%] justify-end">
            <div className="hidden md:flex items-center gap-2">
              <MenuItems messageCount={messageCount} />
            </div>

            <div className="flex relative gap-2">
              <div className="md:bg-[#3c4962] py-1 md:px-[6px] md:dark:bg-[#22262C] bg-transparent flex justify-center items-center rounded-full md:border border-[#97a3b5]">
                <button
                  onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                  className="flex items-center gap-1 overflow-hidden"
                >
                  <div className=" ">
                    {loading ? (
                      <DashboardProfileCardShimmer />
                    ) : (
                      <Profile
                        user={user}
                        target={"profile"}
                        className="w-full sm:w-auto text-center sm:text-left"
                      />
                    )}
                  </div>

                  <div className="hidden md:flex flex-col items-start">
                    <h5 className="font-semibold md:text-[11px] lg:text-sm text-white whitespace-nowrap ">
                      {user?.name
                        ? user.name.slice(0, 15) +
                          (user.name.length > 15 ? "..." : "")
                        : null}
                    </h5>
                    <p className="text-[9px] text-white">
                      {user?.name ? (
                        user.email.slice(0, 15) +
                        (user.email.length > 15 ? "..." : "")
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>

                  <div>
                    <img
                      src="/icons/header/down-arrow.svg"
                      alt=""
                      className="size-5"
                    />
                  </div>
                </button>
              </div>
              <AnimatePresence>
                {signedInMenuPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} // Start slightly above with fade-in
                    animate={{ opacity: 1, y: 0, scale: 1 }} // Drop down smoothly
                    exit={{ opacity: 0, y: -10, scale: 0.95 }} // Exit upwards with fade-out
                    transition={{ duration: 0.2, ease: "easeOut" }} // Smooth transition
                    ref={signedInMenuPopupRef}
                    className="w-[200px] md:w-[12rem] absolute top-full mt-2 right-1 sm:right-4 bg-white dark:text-white dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50 flex flex-col items-start justify-start overflow-hidden"
                  >
                    <div className="w-full py-2 md:hidden flex justify-around items-center gap-2 bg-[#0A1C40]">
                      <MenuItems messageCount={messageCount} />
                    </div>
                    <Link
                      onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                      // to={baseUrl + "document?token=" + token}
                      to={
                        user?.specificRole === undefined || !('specificRole' in user) ||!user?.specificRole 
                          ? `${baseUrl}select-user-role?token=${token}`
                          : `${baseUrl}dashboard?token=${token}`
                      }
                      className="flex border-b  items-center p-2 gap-2 w-full hover:bg-gray-100 hover:text-blue-500 transition duration-200"
                    >
                      <div className="size-5  ">
                        <LiaExchangeAltSolid className="size-full" />
                      </div>
                      <p className="text-sm ">Switch To VAYUZ-x</p>
                    </Link>

                    <Link
                      onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                      to={"/profile"}
                      className="flex border-b items-center p-2 gap-2 w-full hover:bg-gray-100 hover:text-blue-500 transition duration-200"
                    >
                      <div className="size-5  ">
                        <HiOutlineUser className="size-full" />
                      </div>
                      <p className="text-sm ">My Profile</p>
                    </Link>
                    <Link
                      onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                      to={"/settings"}
                      className="flex border-b items-center p-2 gap-2 w-full hover:bg-gray-100 hover:text-blue-500 transition duration-200"
                    >
                      <div className="size-5  ">
                        <IoSettingsOutline className="size-full" />
                      </div>

                      <p className="text-sm">Settings</p>
                    </Link>
                    <button
                      onClick={() => {
                        setConfirmationModal(true);
                        setSignedInMenuPopup(!signedInMenuPopup);
                        // dispatch(clearUser());
                        // navigate("/sign-in");
                      }}
                      className="flex items-center p-2 gap-2 w-full text-red-400 hover:bg-gray-100  transition duration-200"
                    >
                      <div className="size-5  ">
                        <FiLogOut className="size-full" />
                      </div>

                      <p className="text-sm">Sign Out</p>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <Link v3={true} to={"/sign-in"}>
                Sign In
              </Link>
            </div>
            <button
              className="block lg:hidden"
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
        )}

        <ConfirmationModal
          isOpen={confirmationModal}
          onClose={onConfirmationModalClose}
        >
          <div className="text-center flex flex-col gap-2 py-4">
            <p className="font-bold text-[30px] text-black ">Sign out</p>

            <p className=" text-[14px] text-black">
              Are you sure you want to sign out from VAYUZ?
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              {/* <Button primary={true}>Yes</Button> */}

              <Button onClick={handleLogout} primary={true}>
                Yes
              </Button>
              {/* <Button onClose={onConfirmationModalClose} primary={true}>
                No
              </Button> */}

              <Button onClick={handleCancelLogout} outline={true}>
                No
              </Button>
            </div>
          </div>
        </ConfirmationModal>
      </div>
    </header>
  );
};

const MenuItems = ({ messageCount }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* <ThemeSwitch /> */}

      {/* <FullScreenButton /> */}
      <Link to={"/wishlist"}>
        <IconWrapper
          data-tooltip-content={"Wishlist"}
          data-tooltip-id="my-tooltip"
        >
          <img
            src={
              getPageHeading(pathname) === "Wishlist"
                ? `/icons/header/Star.svg`
                : "/icons/header/star-6.svg"
            }
            alt=""
            className="size-5 md:size-6"
          />
        </IconWrapper>
      </Link>

      <Link to={"/messages"}>
        <IconWrapper
          data-tooltip-content={"Messages"}
          data-tooltip-id="my-tooltip"
          className="relative"
        >
          <img
            src={
              getPageHeading(pathname) === "Messages"
                ? "/icons/header/fillMessage.svg"
                : "/icons/header/message2.svg"
            }
            alt=""
            className="md:size-5"
          />
          {messageCount > 0 && (
            <span className="absolute -top-[10px] -right-2 md:-top-[1px] md:-right-0 lg:-top-[2px] lg:-right-0 bg-red-500 text-white text-[8px] font-bold rounded-full px-1.5 py-0.5">
              {messageCount}
            </span>
          )}
        </IconWrapper>
      </Link>
      <div className="block md:hidden">
        <IconWrapper
          className={"cursor-pointer"}
          onClick={() => navigate("/notifications")}
        >
          <div
            data-tooltip-content={"Notification"}
            data-tooltip-id="my-tooltip"
            className="header-icon"
          >
            <img
              src={
                pathname === "Notifications"
                  ? `/icons/header/bell_fill.svg`
                  : "/icons/header/Bell2.svg"
              }
              alt=""
              className="size-5 md:size-6"
            />
            {/* {notificationCount > 0 && (
              <span className="absolute -top-[6px] -right-2 md:top-[2px] md:-right-0 lg:top-[3px] lg:right-1 bg-red-500 text-white text-[9px] font-bold rounded-full px-1.5 py-0.5">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )} */}
          </div>
        </IconWrapper>
      </div>
      <div className="hidden md:block">
        <Notification path={getPageHeading(pathname)} />
      </div>
    </>
  );
};
