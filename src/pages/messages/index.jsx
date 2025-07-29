import React, { useEffect, useState } from "react";
import { Heading } from "../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import { NoData } from "../../components/errors/noData";
import { WishlistCardShimmer } from "../../components/loader/WishlistCardShimmer";
import {
  getAllMessage,
  getSingleMessage,
  updateMessage,
} from "../../redux/actions/message.action";
import { Messages } from "../../components/messages";
import { useSearchParams } from "react-router-dom";

export default function MessagePage() {
  const dispatch = useDispatch();
  const {
    isMessageLoading,
    isSingleMessageLoading,
    singleNotificationId,
    singleMessageData,
    messageData,
    totalUnreads,
    totalMessage,
  } = useSelector((state) => state.message);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const search = searchParams.get("search") || "";
  const messageId = searchParams.get("messageId") || "";

  useEffect(() => {
    if (messageId) {
      dispatch(getSingleMessage({ notificationId: messageId }));
      const data = { notificationId: messageId };
      dispatch(updateMessage({ data: data }));
    } else {
      const page = searchParams.get("page") || 1;
      dispatch(
        getAllMessage({
          page: page,
          search: search,
          filter: filter,
          startDate: startDate,
          endDate: endDate,
        })
      );
    }
  }, [searchParams]);

  return (
    <>
      {isMessageLoading ? (
        <WishlistCardShimmer />
      ) : (
        <Messages
          data={messageData}
          total={totalMessage}
          singleMessageData={singleMessageData}
          singleNotificationId={singleNotificationId}
        />
      )}
    </>
  );
}
