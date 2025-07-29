import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../heading";
import { dateFormated } from "../../../utils";
import {
  getAllNotification,
  getMoreNotification,
  updateNotification,
} from "../../../redux/actions/notification-action";
import { IoEllipsisVertical } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImSpinner2 } from "react-icons/im";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

export const NotificationDetail = () => {
  const { isNotificationData, page, totalCount } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState("all");

  const notificationData = isNotificationData?.data;

  // Sync selectedTab with URL params
  useEffect(() => {
    const typeFromParams = searchParams.get("notificationType");
    if (typeFromParams === "unread") {
      setSelectedTab("unread");
    } else {
      setSelectedTab("all");
    }
  }, [searchParams]);

  // Load notifications on mount or when URL changes
  useEffect(() => {
    const typeFromParams = searchParams.get("notificationType");
    const page = searchParams.get("page") || 1;
    dispatch(
      getAllNotification({
        page,
        notificationType: typeFromParams === "unread" ? "unread" : undefined,
      })
    );
  }, [dispatch, searchParams]);

  const handleUnreadMessages = () => {
    const page = searchParams.get("page") || 1;
    setSearchParams({ page, notificationType: "unread" });
  };

  const handleAllMessages = () => {
    const page = searchParams.get("page") || 1;
    setSearchParams({ page });
  };

  const handleReadNotification = (notificationId) => {
    dispatch(updateNotification({ notificationId: notificationId })).then(
      () => {
        const page = searchParams.get("page") || 1;
        const typeFromParams = searchParams.get("notificationType");
        dispatch(
          getAllNotification({
            page,
            notificationType:
              typeFromParams === "unread" ? "unread" : undefined,
          })
        );
      }
    );
  };

  return (
    <>
      <Heading className={"!pt-0 pb-4"} title={"Notifications"} backButton>
        Notifications {totalCount ? `(${totalCount})` : ""}
      </Heading>

      <div className="mb-4 flex gap-4">
        <button
          className={`${
            selectedTab === "all" ? "font-bold border-b-2 border-[#F1359C]" : ""
          }`}
          onClick={handleAllMessages}
        >
          All
        </button>
        <button
          className={`${
            selectedTab === "unread"
              ? "font-bold border-b-2 border-[#F1359C]"
              : ""
          }`}
          onClick={handleUnreadMessages}
        >
          Unread
        </button>
      </div>

      <InfiniteScroll
        dataLength={notificationData?.length || 0}
        next={() =>
          dispatch(
            getMoreNotification({
              page: page + 1,
              notificationType: selectedTab === "unread" ? "unread" : undefined,
            })
          )
        }
        hasMore={notificationData?.length < totalCount}
        loader={
          <div className="flex justify-center items-center p-1">
            <ImSpinner2 className="animate-spin text-black !text-xl" />
          </div>
        }
        endMessage={
          <p className="text-center text-gray-500 py-4">
            <b>No more notifications</b>
          </p>
        }
      >
        {isNotificationData?.data?.map((data, i) => (
          <NotificationBox
            key={i}
            data={data}
            onReadNotification={handleReadNotification}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};

const NotificationBox = ({ data, onReadNotification }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleApplication = (id, type) => {
    switch (type) {
      case "APPLICATION_PROGRESS":
        navigate("/services/serviceprogressdetail?status=inProgress");
        break;
      case "APPLICATION_DELAY":
        navigate("/services/serviceprogressdetail?status=All");
        break;
      case "APPLICATION_COMPLETED":
        navigate("/services/serviceprogressdetail?status=completed");
        break;
      case "SUBMIT_DOCUMENT":
      case "DOCUMENT_REJECTED_1":
      case "DOCUMENT_REJECTED_2":
      case "DOCUMENT_REJECTED_3":
        navigate(`/payment/create/${id}/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`${data.isRead == false ? "bg-[#FFF3E0]" : ""} border p-4`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {/* <img
            className="w-20 h-20 inset-0 rounded-full object-cover  "
            src={
              data?.profile_picture_url
                ? data?.profile_picture_url
                : "/images/insights/user-logo.svg"
            }
            alt="profile-pic"
          /> */}
          <div className="flex flex-col gap-1 ">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-bold text-lg text-[#333342]">
                {data?.notificationDetail?.title}
              </h4>
            </div>

            <p className="text-sm text-[#666C7E]">
              {data?.notificationDetail?.message}
            </p>
            <p className="text-xs text-[#666C7E]">
              {dateFormated(data.createdAt)}
            </p>
          </div>
        </div>
        {/* {data.isRead === false && (
          <span className="w-2 h-2 rounded-full bg-[#FBB03B]"></span>
        )} */}
        <div className="ps-2 flex gap-1">
          {data?.obj?.applicationId && (
            <button
              className="text-sm text-[#0a0909]"
              onClick={() =>
                handleApplication(
                  data?.obj?.applicationId,
                  data?.obj?.notificationType
                )
              }
            >
              View
            </button>
          )}

          {data?.isRead === false && (
            <>
              <button
                onClick={() => onReadNotification(data._id)}
                className="text-gray-700"
                data-tooltip-id={`tooltip-${data._id}`}
                data-tooltip-content="Mark as Read"
              >
                <IoCheckmarkDoneOutline size={24} />
              </button>
              <Tooltip id={`tooltip-${data._id}`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
