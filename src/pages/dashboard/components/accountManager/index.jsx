import { useRef, useState, useEffect } from "react";
import { useOutsideClick } from "../../../../utils";
import { RiExchangeBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCallBack,
  requestChangeManager,
} from "../../../../redux/actions/dashboard-action";
import { IoIosAddCircle } from "react-icons/io";
import {
  handleModalOpen,
  handleRequestCallBackOpen,
} from "../../../../redux/slices/dashboardSlice";

export const AccountManager = ({ sidebar }) => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const dispatch = useDispatch();
  const accountShowButtonRef = useRef();
  const { user } = useSelector((state) => state.dashboard);

  console.log(user?.agent_data[0]?.name, "useruser");
  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };

  useOutsideClick(accountShowButtonRef, handleAccountShowBtn);

  const requestManagerChange = () => {
    dispatch(requestChangeManager());
    handleAccountShowBtn();
  };

  const handleOpenRequestManagerChange = () => {
    dispatch(handleModalOpen(true));
  };
  const handleRequestCallBack = () => {
    dispatch(handleRequestCallBackOpen(true));
    // dispatch(requestCallBack());
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`
      ${
        sidebar
          ? "px-2 py-3 bg-[url('/images/dashboard/am-bg.svg')] bg-no-repeat bg-cover bg-center items-start gap-2"
          : "bg-white px-5 py-4 gap-6"
      }
      relative w-full  sm:w-auto border border-[#DFEAF2] rounded-xl overflow-hidden

    `}
    >
      <div className="w-full h-full">
        <div className="flex gap-2">
          {user?.agent_data[0]?.name && (
            <div className="flex items-center ">
              <img
                className={`${
                  sidebar ? "w-14 h-14" : "w-10 h-10"
                } rounded-full`}
                src="/images/insights/user-logo.svg"
                alt=""
              />
            </div>
          )}
          <div className="w-full flex flex-col">
            <div className="font-semibold text-white">
              {user?.agent_data[0]?.name ? (
                <div className="flex flex-col">
                  <h4 className="line-clamp-1">{user?.agent_data[0]?.name}</h4>
                  <p className="max-w-24 text-gray-100 whitespace-nowrap overflow-hidden font-medium text-[10px] flex items-center gap-1">
                    Account Manager
                  </p>
                  <div
                    onClick={handleOpenRequestManagerChange}
                    className="text-[11px] text-gray-100 font-normal hover:underline cursor-pointer"
                  >
                    Change?
                  </div>
                </div>
              ) : (
                <>
                
                <div className="flex justify-center items-center gap-2">
                  <div>Add Manager</div>
                  <div
                    onClick={handleOpenRequestManagerChange}
                    className="cursor-pointer font-bold"
                    >
                    <IoIosAddCircle size={25} />
                  </div>
                </div>
                {user?.hasRequestedAgent && <p className="pt-1 font-normal text-[10px] text-center">(Request Already Submitted)</p>}
                </>
              )}
            </div>

            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded-md z-10"
              >
                <button
                  // onClick={handleOpenRequestManagerChange}
                  className="block w-full text-left px-4 py-2 text-[12px] hover:bg-gray-100"
                >
                  {user?.agent_data[0]?.name
                    ? "Request to Change Manager"
                    : "Request to Add Manager"}
                </button>
              </div>
            )}
          </div>
        </div>

        {user?.agent_data?.[0]?.name && (
          <div className="flex justify-center gap-2 mt-2">
            {/* Removing this will mess with my mental health, and trust me, it won’t be good for your physical health either! 😉 */}

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=reach@corpzo.com&cc=notify-cc@corpzo.com&su=Business%20Inquiry%20-%20Corpzo%20Assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 border-2 cursor-pointer"
            >
              <img
                src="/icons/dashboard/mess.svg"
                alt="Message Icon"
                className="size-3"
              />
            </a>

            {user?.phone && (
              <div
                onClick={handleRequestCallBack}
                className="rounded-full p-2 border-2 cursor-pointer"
              >
                <img
                  src="/icons/dashboard/phone.svg"
                  alt=""
                  className="size-3"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
