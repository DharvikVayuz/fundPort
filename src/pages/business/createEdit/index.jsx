import { ModalWrapper } from "../../../components/wrappers/modal";
import { Outlet, replace, useNavigate } from "react-router-dom";
import BusinessListing from "../listing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoaderOff } from "../../../redux/slices/businessSlice";
import { TiTick } from "react-icons/ti";
import { useLocation } from "react-router-dom";
const CreateBusiness = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("Create Business");
  useEffect(() => {
    // navigate("/business/edit/registration",{replace:true});
    dispatch(setLoaderOff());
  }, []);
  const location = useLocation();
  let currentPath = location.pathname.split("/");
  console.log(currentPath);
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    // Add overflow hidden when component renders
    document.body.style.overflow = "hidden";
    return () => {
      // Remove overflow hidden when component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  const steps = [
    { label: "Step 1", path: "address" },
    { label: "Step 2", path: "financial" },
    { label: "Step 3", path: "kyc" },
    { label: "Step 4", path: "funding" },
    { label: "Step 5", path: "done" },
  ];

  const currentPaths = location.pathname;
  
  const currentStepIndex = steps.findIndex((step, i) =>
    currentPaths.includes(step.path)
  );

  return (
    <>
      <BusinessListing />
      <ModalWrapper
        title={isEdit ? "Edit Business Details" : "Add Business Details"}
      >
        <div
          // onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <ProgressBar steps={steps} currentStepIndex={currentStepIndex} />
          {/* progress bar */}
          {/* <div className="py-4 w-full flex justify-center">
            <div className="px-[30px] w-full grid grid-cols-4">
              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center bg-white col-span-1 border-[#004561] border-2 size-4 md:size-5 rounded-full">
                    {currentPath.includes("address") ||
                    currentPath.includes("financial") ||
                    currentPath.includes("kyc") ||
                    currentPath.includes("funding") ? (
                      <TiTick />
                    ) : (
                      <TiTick className="opacity-0" />
                    )}
                  </div>
                  <div className="w-full h-1 bg-white relative">
                    <div
                      className={`h-full ${
                        currentPath.includes("address") ||
                        currentPath.includes("financial") ||
                        currentPath.includes("kyc") ||
                        currentPath.includes("funding")
                          ? "w-full"
                          : "w-[40%]"
                      } bg-[#004561] transition-all duration-300`}
                    ></div>
                  </div>
                </div>
                <div className="absolute left-[-7px] text-[10px] md:text-sm">
                  Step 1
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center bg-white col-span-1 border-[#004561] border-2 size-4 md:size-5 rounded-full">
                    {currentPath.includes("financial") ||
                    currentPath.includes("kyc") ||
                    currentPath.includes("funding") ? (
                      <TiTick />
                    ) : (
                      <TiTick className="opacity-0" />
                    )}
                  </div>
                  <div
                    className={`${
                      currentPath.includes("financial") ||
                      currentPath.includes("funding") ||
                      currentPath.includes("kyc")
                        ? "bg-[#004561]"
                        : "bg-white"
                    }  w-full h-1`}
                  ></div>
                </div>
                <div className="absolute left-[-7px] text-[10px] md:text-sm">
                  Step 2
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center bg-white col-span-1 border-[#004561] border-2 size-4 md:size-5 rounded-full">
                    {currentPath.includes("kyc") ||
                    currentPath.includes("funding") ? (
                      <TiTick />
                    ) : (
                      <TiTick className="opacity-0" />
                    )}
                  </div>
                  <div
                    className={`${
                      currentPath.includes("funding") ||
                      currentPath.includes("kyc")
                        ? "bg-[#004561]"
                        : "bg-white"
                    }  w-full h-1`}
                  ></div>
                </div>
                <div className="absolute left-[-7px] text-[10px] md:text-sm">
                  Step 3
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center bg-white col-span-1 border-[#004561] border-2 size-4 md:size-5 rounded-full">
                    {currentPath.includes("funding") ? (
                      <TiTick />
                    ) : (
                      <TiTick className="opacity-0" />
                    )}
                  </div>
                  <div
                    className={`${
                      currentPath.includes("funding")
                        ? "bg-[#004561]"
                        : "bg-white"
                    }  w-full h-1`}
                  ></div>

                  <div className="flex items-center bg-white col-span-1 border-[#004561] border-2 size-4 md:size-5 rounded-full">
                    <TiTick className="opacity-0" />
                  </div>
                </div>
                <div className="absolute left-[-7px] text-[10px] md:text-sm">
                  Step 4
                </div>
                <div className="absolute right-[-7px] text-[10px] md:text-sm">
                  Step 5
                </div>
              </div>

             
              
            </div>
          </div> */}
          <Outlet />
        </div>
      </ModalWrapper>
    </>
  );
};

export default CreateBusiness;

export const ProgressBar = ({ steps, currentStepIndex }) => {
  return (
    <div className="pt-6 w-full flex justify-center">
      <div
        className="w-full relative flex"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          gap: "8px",
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const showConnector = index < steps.length - 1;

          return (
            <div className="relative flex flex-col items-center" key={index}>
              {/* Circle */}
              <div
                className="z-10 flex items-center justify-center size-5 md:size-6 rounded-full border-2 bg-white"
                style={{
                  borderColor: isCompleted || isActive ? "#004561" : "#ccc",
                }}
              >
                <TiTick
                  className={`${isCompleted ? "text-[#004561]" : "opacity-0"}`}
                />
              </div>

              {/* Label */}
              <div className="mt-2 text-[10px] md:text-sm text-center w-max">
                {step.label}
              </div>

              {/* Connector Line */}
              {showConnector && (
                <div className="absolute top-2.5 left-1/2 w-full h-0.5 z-0">
                  {/* Base line */}
                  <div className="absolute left-0 top-0 h-full w-full bg-white" />
                  {/* Progress fill */}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#004561] transition-all duration-300"
                    style={{
                      width:
                        index < currentStepIndex
                          ? "100%"
                          : index === currentStepIndex
                          ? "50%"
                          : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
