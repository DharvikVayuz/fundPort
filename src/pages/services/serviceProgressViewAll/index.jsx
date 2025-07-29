import React, { useEffect, useState } from "react";
import { Heading, PageHeading } from "../../../components/heading";
import { TextArea } from "../../../components/inputs/textarea";
import { Rating } from "../../../components/rating";
import { Button } from "../../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoreService,
  getMoreServiceUpdate,
  updateServiveProgress,
} from "../../../redux/actions/dashboard-action";
import { Controller, useForm } from "react-hook-form";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressBar } from "../../../components/progressBar";
import { ImSpinner2 } from "react-icons/im";
import { ServiceProgressShimmer } from "../../../components/loader/ServiceProgressShimmer";
import { yupResolver } from "@hookform/resolvers/yup";
import { ratingReviewSchema } from "../../../validation/ratingReviewValidationSchema";
import { ratingReview } from "../../../redux/actions/servicesDetails-actions";

import { ServiceCard } from "../../dashboard/components/services/serviceCard";
import { useSearchParams } from "react-router-dom";
import { MainTab } from "./components";
import { NoData } from "../../../components/errors/noData";
const ServiceprogressViewAll = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const {
    dataUpdate,
    holdServices,
    completedServices,
    inProgress,
    totalCount,
    loadingMore,
    allServices,
    fetching,
    page,
    morePage,
  } = useSelector((state) => state.dashboard);
  const [searchParams] = useSearchParams();
  console.log(
    dataUpdate?.data,
    holdServices,
    completedServices,
    inProgress,
    "dataUpdate Inside ServiceCard"
  );
  const status = searchParams.get("status");
  useEffect(() => {}, []);
  const [dropdownStates, setDropdownStates] = useState(
    dataUpdate?.data?.map(() => false)
  );

  const [viewAllServices, setViewAllServices] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(updateServiveProgress({ page: 1, status }));
    dispatch(updateServiveProgress({ page: 1, status: status === "all" ? "" : status }));

  }, [status]);

  // useEffect(() => {
  //   switch (status) {
  //     case "hold": {
  //       setViewAllServices(holdServices?.data);
  //       return;
  //     }
  //     case "inProgress": {
  //       setViewAllServices(inProgress?.data);

  //       return;
  //     }
  //     case "closed": {
  //       setViewAllServices(completedServices?.data);

  //       return;
  //     }
  //     case "all": {
  //       setViewAllServices(allServices?.data);

  //       return;
  //     }
  //   }
  // }, [status]);

  useEffect(() => {
  switch (status) {
    case "hold": {
      setViewAllServices(holdServices?.data || []);
      break;
    }
    case "inProgress": {
      setViewAllServices(inProgress?.data || []);
      break;
    }
    case "closed": {
      setViewAllServices(completedServices?.data || []);
      break;
    }
    case "all": {
      setViewAllServices(allServices?.data || []);
      break;
    }
    default:
      setViewAllServices([]);
  }
}, [status, holdServices, completedServices, inProgress, allServices]);

  console.log(allServices, "allServices")
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <Heading
          backButton={true}
          title={"Your Service Progress Updates"}
          tourButton={true}
        >
          Your Service Progress Updates{" "}
          {viewAllServices?.total ? `(${viewAllServices?.total})` : ""}
        </Heading>
      </div>
    <MainTab/>
      <div className="flex flex-col gap-6">
        {fetching ? (
          <ServiceProgressShimmer count={8} className={"p-2"} />
        ) : (
          <>
          {
            (viewAllServices && viewAllServices.length > 0) ?  <ServiceCard data={viewAllServices} /> : <NoData/>
          }
          </> 
          
        )}

        <InfiniteScroll
          dataLength={viewAllServices?.data?.length || 0}
          next={() => dispatch(getMoreServiceUpdate({ page: morePage + 1 }))}
          hasMore={viewAllServices?.data?.length < totalCount}
          loader={
            <div className="flex justify-center items-center p-1">
              <ImSpinner2 className="animate-spin text-black !text-xl" />
            </div>
          }
          endMessage={
            viewAllServices?.data?.length &&
            viewAllServices?.data?.length > 0 && (
              <p className="py-4 font-medium text-center text-gray-500">
                Yay! You have seen it all
              </p>
            )
          }
        ></InfiniteScroll>
      </div>
    </>
  );
};

const Dropdown = ({ isOpen, servicesProgessSteps }) => {
  return (
    <>
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <ProgressBar steps={servicesProgessSteps} />
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceprogressViewAll;
