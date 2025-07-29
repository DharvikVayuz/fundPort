import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heading } from "../heading";
import { GoDotFill } from "react-icons/go";
import { Search } from "../search";
import { formatReadableDate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessage,
  getMoreMessage,
  getSingleMessage,
  updateMessage,
} from "../../redux/actions/message.action";
import { NoData } from "../errors/noData";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImSpinner2 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import MessageCardShimmer from "../loader/MessageCardShimmer";
import Messageshimmer from "../loader/Messageshimmer";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export const Messages = () => {
  const {
    isMessageLoading,
    isSingleMessageLoading,
    singleMessageData,
    messageData,
    totalMessageCount,
    page,
    totalMessage,
  } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hasInitializedSelection, setHasInitializedSelection] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const messageId = searchParams.get("messageId");
    if (messageId && messageData?.length > 0 && !hasInitializedSelection) {
      const messageFromList = messageData.find((msg) => msg._id === messageId);
      if (messageFromList) {
        setSelectedMessage(messageFromList);
        setHasInitializedSelection(true);
        dispatch(getSingleMessage({ notificationId: messageId }));
      }
    }
  }, [searchParams, messageData, hasInitializedSelection, dispatch]);

  useEffect(() => {
    const messageId = searchParams.get("messageId");
    if (messageData?.length > 0 && !messageId && !hasInitializedSelection) {
      const firstMessage = messageData[0];
      setSelectedMessage(firstMessage);
      setHasInitializedSelection(true);
      window.history.replaceState(null, "", `?messageId=${firstMessage._id}`);
      dispatch(getSingleMessage({ notificationId: firstMessage._id }));
    } else if (messageData?.length === 0) {
      setSelectedMessage(null);
      setHasInitializedSelection(false);
    }
  }, [messageData, hasInitializedSelection, dispatch]);

  const Filter = () => {
    const todayTimesTamp = Date.now();
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const sevenDaysAgo = todayTimesTamp - 7 * millisecondsInOneDay;
    const thirtyDaysAgo = todayTimesTamp - 30 * millisecondsInOneDay;

    const handleDataFilter = (filter, startTimestamp, endTimestamp) => {
      const params = {};
      if (filter) params.filter = filter;
      if (startTimestamp && endTimestamp) {
        params.startDate = startTimestamp;
        params.endDate = endTimestamp;
      }
      setSearchParams(params);
      // Reset selection state when filtering
      // setSelectedMessage(null);
      // setHasInitializedSelection(false);
    };

    const clearFilter = () => {
      setSearchParams({});
      // setSelectedMessage(null);
      // setHasInitializedSelection(false);
    };

    return (
      <div className="w-36 p-2 absolute top-4 right-4 bg-white rounded shadow-xl flex flex-col items-start z-10">
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={() => handleDataFilter("", "", "")}
        >
          All Messages
        </button>
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={() => handleDataFilter("unread", "", "")}
        >
          Unread
        </button>
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={() => handleDataFilter("", todayTimesTamp, todayTimesTamp)}
        >
          Today
        </button>
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={() => handleDataFilter("", sevenDaysAgo, todayTimesTamp)}
        >
          Last 7 days
        </button>
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={() => handleDataFilter("", thirtyDaysAgo, todayTimesTamp)}
        >
          Last 30 days
        </button>
        <button
          className="text-xs hover:bg-gray-200 p-2 text-start border-b font-semibold w-full cursor-pointer"
          onClick={clearFilter}
        >
          Clear Filter
        </button>
      </div>
    );
  };

  const handleSingleMessage = (id) => {
    const messageFromList = messageData.find((msg) => msg._id === id);
    if (messageFromList) {
      setSelectedMessage(messageFromList);
    }
    setSearchParams({ messageId: id });
    dispatch(getSingleMessage({ notificationId: id }));
    dispatch(updateMessage({ data: { notificationId: id } }));
  };

  const fetchMoreData = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      await dispatch(getMoreMessage({ page: page + 1 }));
    } catch (error) {
      console.error("Error fetching more messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore =
    messageData && totalMessageCount
      ? messageData.length < totalMessageCount
      : false;

  return (
    <>
      <motion.div className="w-full">
        <div
          onMouseEnter={() => setIsCollapsed(false)}
          onMouseLeave={() => setIsCollapsed(window.innerWidth < 768)}
          className={`fixed top-16 left-0 transition-all duration-300 h-full bg-white
          ${isCollapsed ? "w-16" : "w-60"}
          shadow-lg md:shadow-none z-10`}
        >
          <div
            id="scrollableDiv"
            className="overflow-y-auto max-h-[calc(100vh-64px)]"
          >
            {messageData?.length > 0 ? (
              <InfiniteScroll
                dataLength={messageData.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div className="flex justify-center items-center p-4">
                    <ImSpinner2 className="animate-spin text-black text-xl" />
                  </div>
                }
                // endMessage={
                //   <div className="text-center p-4">
                //     <p className="text-sm text-gray-500">No more messages</p>
                //   </div>
                // }
                scrollableTarget="scrollableDiv"
                style={{ overflow: "visible" }}
              >
                <ul className="border border-[#DFEAF2] shadow-xl rounded-[5px] overflow-hidden">
                  {messageData.map((msg, index) => (
                    <li
                      key={`${msg._id}-${index}`}
                      onClick={() => handleSingleMessage(msg._id)}
                      className={`relative flex items-center gap-2 p-2 border-b cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        selectedMessage?._id === msg._id
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <img
                        className={`rounded-full object-cover transition-all duration-300 ${
                          isCollapsed ? "w-10 h-10" : "w-12 h-12"
                        }`}
                        src={
                          msg.notificationBy?.[0]?.url ||
                          "/images/insights/user-logo.svg"
                        }
                        alt="profile"
                        title={isCollapsed ? msg.notificationBy?.[0]?.name : ""}
                      />
                      {!isCollapsed && (
                        <div className="flex flex-col w-full">
                          <h3 className="max-w-40 text-sm font-semibold text-gray-900 line-clamp-1">
                            {msg.notificationBy?.[0]?.name || "Unknown"}
                          </h3>
                          <div
                            className="max-w-40 text-xs text-gray-500 line-clamp-1"
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                        </div>
                      )}
                      {!msg?.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r" />
                      )}
                      {selectedMessage?._id === msg._id && (
                        <GoDotFill
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
                          size={12}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            ) : (
              <div className="flex justify-center items-center h-full">
                {isMessageLoading ? <MessageCardShimmer /> : <NoData />}
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            isCollapsed ? "ps-16" : "md:ps-60"
          } w-full overflow-y-auto h-[90vh] md:h-[85vh]`}
        >
          <div className="pb-4 w-full flex justify-between items-center gap-4">
            <Heading title={"Messages"} backButton={true} tourButton={false}>
              Messages {totalMessage ? `(${totalMessage})` : ""}
            </Heading>
            <div className="relative flex justify-center items-center">
              <button onClick={() => setShowFilter(!showFilter)}>
                {!showFilter ? (
                  <HiOutlineAdjustmentsHorizontal size={18} />
                ) : (
                  <RxCross2 size={18} />
                )}
              </button>
              {showFilter && <Filter />}
            </div>
          </div>
          {isSingleMessageLoading ? (
            <Messageshimmer />
          ) : selectedMessage ? (
            <div className="p-3 border border-[#DFEAF2] rounded-md">
              <div className="flex justify-between">
                <div className="flex items-start gap-2">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={
                      selectedMessage?.notificationBy?.[0]?.url ||
                      "/images/insights/user-logo.svg"
                    }
                    alt="profile"
                  />
                  <div>
                    <h4 className="font-medium">
                      {selectedMessage?.notificationBy?.[0]?.name}
                    </h4>
                    <p className="text-xs text-black-500">
                      to: {userEmail}
                    </p>
                    <p className="pt-1 text-xs text-gray-500">
                      {formatReadableDate(selectedMessage?.createdAt)}
                    </p>
                  </div>
                </div>
                {/* <span className="text-xs text-gray-500">
                  {formatReadableDate(selectedMessage?.createdAt)}
                </span> */}
              </div>
              <h4 className="text-xl font-semibold mt-4">
                {selectedMessage?.title}
              </h4>
              <p
                className="font-medium mt-2"
                dangerouslySetInnerHTML={{ __html: selectedMessage?.content }}
              />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </motion.div>
    </>
  );
};
