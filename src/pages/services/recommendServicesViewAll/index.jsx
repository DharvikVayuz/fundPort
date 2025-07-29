import React, { useEffect, useState } from "react";
import { Heading } from "../../../components/heading";
import {
  recommendedServiceListing,
  removeRecommendServiceWishlist,
  removeServiceWishlist,
  updateRecommendServiceWishlist,
  updateServiceWishlist,
} from "../../../redux/actions/servicesListing-action";
import { useDispatch, useSelector } from "react-redux";
import { ServicesCard } from "../listing/components/servicesCard";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
  updateServiceQuickWishlist,
  getMoreUserServices,
} from "../../../redux/actions/servicesListing-action";
import toast from "react-hot-toast";
import { ServiceCardShimmer } from "../../../components/loader/ServiceCardShimmer";
const RecommendedServicesViewAll = ({
  title = "",
  totalCount = 0,
  data = [],
}) => {
  const {
    category,
    subCategory,
    loading,
    loadingMore,
    page,
    limit,
    // totalCount,
    totalPage,
    list,
    wishList,
  } = useSelector((state) => state.service);

  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { recommendedServiceList, isRecommendedServiceLoading } = useSelector(
    (state) => state.service
  );
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    if (isSubmit && !wishList?.loading) {
      toast.success(wishList?.error);
    }
  }, [wishList?.loading]);

  let onClickWishList = (service) => {
    setIsSubmit(true);
    // console.log(service?.servicewishlistsSize,"service?.servicewishlistsSize");
    if (service?.servicewishlistsSize) {
      dispatch(removeRecommendServiceWishlist({ serviceId: service?._id }));
    } else {
      dispatch(updateRecommendServiceWishlist({ serviceId: service?._id }));
    }
  };

  let onCheckHandler = (service) => {};

  useEffect(() => {
    dispatch(recommendedServiceListing());
  }, []);
  //console.log(recommendedServiceList, "recommended")
  const formattedRecommendedServices = recommendedServiceList?.map(
    (service) => {
      return {
        _id: service._id,
        name: service.service[0]?.name ? service.service[0]?.name : "N/A",
        details: service?.service[0]?.details,
        duration: service?.service[0]?.duration,
        cost: service?.service[0]?.cost,
        servicewishlistsSize: service?.service[0]?.servicewishlistsSize,
      };
    }
  );

  return (
    <>
      <div className="flex flex-col overflow-y-auto ">
        <div className="mb-6 flex flex-col md:flex-row justify-between gap-6">
          <Heading title={title} backButton={true}>
            Recommended Services {totalCount ? `(${totalCount})` : ""}
          </Heading>
        </div>
        <div>
          {isRecommendedServiceLoading ? (
            <ServiceCardShimmer />
          ) : (
            <ServicesCard
              data={
                formattedRecommendedServices ? formattedRecommendedServices : []
              }
              onClick={(service) => onClickWishList(service)}
              onCheckedChange={(val) => onCheckHandler(val)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendedServicesViewAll;
