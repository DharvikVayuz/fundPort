import Modal from "react-modal";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

export const ReactModal = ({
  id,
  onClick,
  button,
  disabled,
  children,
  className,
  buttonClassName,
  childrenClassName,
  header,
  title,
  crossButton,
  closeButton,
  triggerClick,
  confirmClose,
  modelCloseCheck,
  setModelCloseCheck,
  bottomButton,
  Response,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    setIsOpen(!isOpen);
    onClick && onClick(e);
  };

  useEffect(() => {
    if (modelCloseCheck) {
      setIsOpen(false)
      setModelCloseCheck(false)
    }
  }, [modelCloseCheck]);

  const handleClose = () => {
    return (
      <div className="bg-[#171717]">
        <div className="z-[1006] my-10 w-full sm:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border-gray-200 dark:border-gray-700 rounded-lg bg-[#e6edf3bf] dark:bg-[#171717] dark:text-white flex flex-col justify-center items-center space-y-2">
          <p className="">Are you sure you want to close?</p>
          <div className="space-x-2">
            <button
              type="button"
              className="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-[#ff930f] via-[#fc7300] to-[#fa6001]"
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            >
              {/* {t("header:yes")} */}
              Yes
            </button>
            <button
              className="px-4 py-1 rounded-lg text-white bg-gradient-to-r from-[#ff930f] via-[#fc7300] to-[#fa6001]"
              onClick={onClose}
            >
              {/* {t("header:no")} */}
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        disabled={disabled}
        id={id}
        className={`${buttonClassName} ${disabled
          ? "bg-bee-lightgray dark:bg-bee-matterHornDark cursor-not-allowed"
          : ""
          } dark:text-gray-200 outline-none cursor-pointer`}
        onClick={() => {
          handleClick();
        }}
      >
        {button}
      </div>
      {
        <Modal
          overlayClassName={
            "fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen flex justify-center items-center "
          }
          className={`${className ? className : "w-11/12 sm:w-8/12 lg:w-1/2"} ${isOpen ? "animate-ease-in-y" : "animate-ease-in-y-reverse"
            }  bg-white dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 p-0 overflow-hidden rounded-lg shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1010] outline-none`}
          // style={customStyles}
          // h-[70vh]
          isOpen={isOpen}
          onRequestClose={handleClick}
          ariaHideApp={false}
        // closeTimeoutMS={300}
        >
          {crossButton === true && (
            <button
              onClick={handleClick}
              className={`fixed top-2 right-2 p-2 flex justify-center items-center rounded-full border border-gray-200 dark:border-gray-700 font-medium bg-gray-50 text-gray-700 shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all text-sm dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800 z-[100]`}
            >
              <span
                className={`text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary`}
              >
                <RxCross2 className="text-xl" />
              </span>
            </button>
          )}
          {header === false ? (
            <></>
          ) : (
            <div
              className={`p-3 bg-gray-50 dark:bg-gray-700 z-10 sticky top-0 flex justify-between items-center border-b !border-gray-200 dark:!border-gray-700`}
            >
              {title ? (
                <h4 className="text-gray-800 dark:text-gray-200 text-2xl font-motserrat font-medium">
                  {title}
                </h4>
              ) : null}
              {closeButton === true ? (
                <button
                  onClick={handleClick}
                  className={`p-2 flex justify-center items-center rounded-full border border-gray-200 dark:border-gray-700 font-medium bg-gray-50 hover:bg-gray-200 text-gray-700 shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-bee-primary transition-all text-sm dark:bg-gray-500 dark:text-gray-400 dark:hover:text-white  cursor-pointer`}
                >
                  <span
                    className={`text-gray-500 hover:text-bee-primary dark:text-gray-400 dark:hover:text-bee-primary`}
                  >
                    <RxCross2 className="text-xl" />
                  </span>
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
          <div
            className={`${childrenClassName ? childrenClassName : "px-3"
              } relative w-full bg-gray-50 dark:bg-gray-600 dark:text-white overflow-auto text-center`}
          >
            {children}
            {bottomButton === true ? (
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  className="px-4 py-1 rounded-lg text-white bg-red-500"
                // onClick={() => {
                //   handleCancel();
                //   setConfirmationOpen(false);
                // }}
                >
                  {"Yes"}
                </button>
                <button
                  className="px-4 py-1 rounded-lg bg-gradient-to-r from-[#ff930f] via-[#fc7300] to-[#fa6001] text-white"
                  onClick={handleClick}
                >
                  {"No"}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal>
      }
    </>
  );
};
