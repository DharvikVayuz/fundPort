import { useEffect, useState } from "react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebars";
import { Outlet, Navigate, useLocation } from "react-router-dom"; // Import Navigate
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RightSidebar } from "../../sidebars/rightSidebar";
import { ConfirmationModal } from "../../modal/confirmationModal";
import { Button } from "../../buttons";
import {
  handleCallBackRequestModalOpen,
  handleModalOpen,
  handleRequestCallBackOpen,
} from "../../../redux/slices/dashboardSlice";
import {
  requestCallBack,
  requestChangeManager,
} from "../../../redux/actions/dashboard-action";
import { Logo } from "../../logo";
import { getLogo } from "../../../redux/actions/logo-actions";

export const PrimaryLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [phoneCollapse, setPhoneCollapse] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const { corpzoLogo } = useSelector((state) => state.logo);
  // const sidebarClassName = useSelector((state) => state.theme.sidebarClassName);
  const sidebarClassName = "";
  // profile = //useSelector((state) => state.auth);

  const {
    isChangeManagerOpen,
    isChangeManagerLoading,
    isRequestBackLoading,
    isChangeRequestOpen,
    manager,
  } = useSelector((state) => state.dashboard);
  const { callBackMessage, callBackHeading } = useSelector(
    (state) => state.serviceDetails
  );

  const onConfirmationModalClose = () => {
    dispatch(handleModalOpen(false));
  };

  const handleRequestCallBack = async () => {
    try {
      await dispatch(requestCallBack());
      dispatch(handleCallBackRequestModalOpen(false)); // ✅ Close modal after successful action
    } catch (error) {
      console.error("Error requesting callback:", error);
    }
  };

  const onCallBackRequestClose = () => {
    //dispatch(handleRequestCallBackOpen(false))
    dispatch(handleCallBackRequestModalOpen(false));
  };
  const handleChangeManager = async () => {
    try {
      await dispatch(requestChangeManager());
      dispatch(handleModalOpen(false));
    } catch (error) {
      console.error("Error changing manager:", error);
    }
  };
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
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  useEffect(() => {
    dispatch(getLogo("CORPZO_LOGO"));
  }, []);
  console.log(corpzoLogo, "corpzoLogo");
  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo && !token) {
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

  console.log(collapse, "collapse from layout");

  return (
    <>
      <Header
        className={"sticky top-0 left-0 lg:ps-[14rem] px-4"}
        collapse={collapse}
        setCollapse={setCollapse}
      />
      <Logo favicon={"/vayuzfavicon.ico"} />
      <div className="w-full">
        <div
          className={`w-full max-w-[100rem] mx-auto flex page-body-wrapper lg:px-4 md:px-2 sm:px-2 dark:dark:bg-slate-800`}
        >
          <Sidebar
            className={`${
              sidebarClassName ? sidebarClassName : ""
            } hidden lg:block w-52 max-w-48 fixed top-4 bottom-4 left-10 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-200`}
            collapse={collapse}
            setCollapse={setCollapse}
          />
          <Sidebar
            className={`${sidebarClassName ? sidebarClassName : ""} ${
              collapse ? "block" : "hidden"
            } lg:hidden max-w-48 h-[90vh] fixed top-15 left-0 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200`}
            collapse={collapse}
            setCollapse={setCollapse}
          />
          <motion.div
            initial={{ left: "-50%" }}
            animate={{ left: 0, transition: { duration: 0.3 } }}
            exit={{ left: "-50%", transition: { duration: 0.3 } }}
            className={`lg:ps-48 w-full `}
          >
            <motion.div className="py-6 px-4 bg-[#ffffff] dark:dark:bg-slate-800 flex gap-6">
              <div className="w-full lg:w-3/4">
                <Outlet />
                <ConfirmationModal
                  isOpen={isChangeManagerOpen}
                  onClose={onConfirmationModalClose}
                >
                  {manager?.name ? (
                    <div className="flex flex-col gap-6 items-center justify-center text-center">
                      <img
                        src="/icons/payment/callback.svg"
                        width={200}
                        alt=""
                      />
                      <p className="text-3xl font-bold text-[#0A1C40]">
                        Request to change manager
                      </p>
                      <p className="text-l font-bold text-[#0A1C40]">
                        Current Manager: {manager?.name ? manager?.name : "N/A"}
                      </p>
                      <p className="font-medium text-sm text-[#363636]">
  If you request to change your account manager, an admin will assign a new dedicated manager to assist you with your Corpzo services and queries. 
  Please confirm if you want to proceed. This action cannot be undone.
</p>

                      <div className="flex justify-center">
                        <Button
                          className={"px-6 py-2"}
                          primary={true}
                          isLoading={isChangeManagerLoading}
                          // onClick={handleRequestCallBack}
                          onClick={handleChangeManager}
                        >
                          {" "}
                          Continue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6 items-center justify-center text-center">
                      <img
                        src="/icons/payment/callback.svg"
                        width={200}
                        alt=""
                      />
                      <p className="text-3xl font-bold text-[#0A1C40]">
                        Request to add manager
                      </p>
                     
                      <p className="font-medium text-sm text-[#363636]">
                        By requesting a manager, an admin will assign a
                        dedicated manager to your account who will help you with
                        your Corpzo services and any queries you may have.
                        Please confirm if you want to proceed. This action
                        cannot be undone.
                      </p>
                      <div className="flex justify-center">
                        <Button
                          primary={true}
                          isLoading={isChangeManagerLoading}
                          // onClick={handleRequestCallBack}
                          onClick={handleChangeManager}
                          className={"px-6 py-2"}
                        >
                          {" "}
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </ConfirmationModal>
                <ConfirmationModal
                  isOpen={isChangeRequestOpen}
                  onClose={onCallBackRequestClose}
                >
                  <div className="flex flex-col gap-2 px-4 py-5 items-center justify-center ">
                    <img src="/icons/payment/callback.svg" width={200} alt="" />
                    <p className="text-3xl font-bold text-[#0A1C40]">
                      {callBackHeading ? callBackHeading : "Request Call Back?"}
                    </p>
                    <p className="font-medium text-sm text-[#595959]">
                      {callBackMessage}
                    </p>
                    <div className="flex justify-center">
                      <Button
                        primary={true}
                        isLoading={isRequestBackLoading}
                        onClick={handleRequestCallBack}
                      >
                        {" "}
                        Continue
                      </Button>
                    </div>
                  </div>
                </ConfirmationModal>
              </div>
              <RightSidebar
                className={
                  "w-full h-fit lg:w-1/4 hidden lg:flex flex-col gap-6 sticky top-0 right-0 pb-6"
                }
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
