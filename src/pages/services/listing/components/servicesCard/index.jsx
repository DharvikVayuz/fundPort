import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../../../components/link";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
export const ServicesCard = ({
  data,
  onClick = (service) => console.log("Heart icon clicked"),
}) => {
  const location = useLocation();
  const { addLoading, removeLoading } = useSelector((state) => state.service);
  const { isLoading, heartloading, childLoading, loading } = useSelector(
    (state) => state.wishlist
  );

  const navigate = useNavigate();
  const url = window.location.href;

  const navigateToServiceDetail = (serviceId) => {
    navigate(`/services/detail/${serviceId}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data &&
          data.map((service, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 border-[#DFEAF2] border  px-3 py-3 rounded-[14px] sm:gap-6 justify-between cursor-pointer hover:shadow-lg"
                onClick={() => {
                  if (url.includes("services")) {
                    navigateToServiceDetail(service?._id);
                  } else {
                    navigateToServiceDetail(service?.serviceId);
                  }
                }}
              >
                <div className="rounded-[14px] bg-[#F3F7FF] px-3 py-3 flex flex-col gap-6 min-h-[210px]">
                  <div className="flex gap-2">
                    <div className="size-12">
                      <img
                        src="/icons/dashboard/services.svg"
                        alt=""
                        className="size-full"
                      />
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <h4
                        style={{ fontFamily: "Encode Sans, sans-serif" }}
                        className="font-bold text-[#0A1C40] text-xl uppercase line-clamp-1 h-15"
                      >
                        {url.includes("services")
                          ? service?.name
                            ? service?.name
                            : "___"
                          : service?.service?.[0]?.name
                          ? service?.service[0]?.name
                          : "___"}
                      </h4>
                      <div className="">
                        {url.includes("services") &&
                          service?.offerservices?.[0]?.offers?.[0]
                            ?.discountPercent && (
                            <div className="px-2.5 py-1 rounded-lg text-white bg-[#28A745] w-fit flex flex-col items-center">
                              <p className="font-bold text-sm">
                                <span>
                                  {service.offerservices[0].offers[0]
                                    .discountPercent &&
                                  service.offerservices[0].offers[0]
                                    .discountType === "fixed"
                                    ? "₹"
                                    : "%"}
                                </span>
                                <span>
                                  {
                                    service.offerservices[0].offers[0]
                                      .discountPercent
                                  }
                                </span>
                              </p>

                              <p className="text-[10px]">
                                {service.offerservices[0].offers[0]
                                  .discountPercent &&
                                service.offerservices[0].offers[0]
                                  .discountType === "fixed"
                                  ? "Off"
                                  : "% Off"}
                              </p>
                            </div>
                          )}
                        {url.includes("wishlist") &&
                          service?.service?.[0]?.offerservices?.[0]?.offers?.[0]
                            ?.discountPercent && (
                            <p className="font-medium rounded-full text-[12px] text-white bg-[#28A745] px-2 py-1">
                              {
                                service?.service?.[0]?.offerservices?.[0]
                                  ?.offers?.[0]?.discountPercent
                              }{" "}
                              % Off
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  {url.includes("wishlist") &&
                  service?.service?.[0]?.details ? (
                    <div
                      className="text-xs leading-[16px] font-normal text-[#7C7C7C] line-clamp-5"
                      dangerouslySetInnerHTML={{
                        __html: service?.service?.[0]?.details || "",
                      }}
                    />
                  ) : (
                    <div
                      className="text-xs leading-[16px] font-normal text-[#7C7C7C] line-clamp-5 h-[80px]"
                      dangerouslySetInnerHTML={{
                        __html: service?.details || "",
                      }}
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-[#0A1C40]">
                        Estimated Time:
                      </div>
                      <p className="text-sm font-semibold text-[#0A1C40] text-start">
                        {url.includes("services")
                          ? service?.duration
                            ? service?.duration
                            : "___"
                          : service?.service[0]?.duration
                          ? service?.service[0]?.duration
                          : "___"}{" "}
                        {"Month"}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-[#0A1C40] flex items-center">
                        Price
                      </p>
                      <p className="text-sm font-semibold text-[#0A1C40] flex items-center">
                        <FaRupeeSign />

                        {url.includes("services")
                          ? service?.cost
                            ? service?.cost
                            : "___"
                          : service?.service[0]?.cost
                          ? service?.service[0]?.cost
                          : "___"}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center  justify-between gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {addLoading[service._id] ||
                  removeLoading[service._id] ||
                  childLoading[service.serviceId] ? (
                    <FaStar
                      size={25}
                      color="#878787 "
                      className=" animate-pulse "
                    />
                  ) : (
                    <button
                      data-tooltip-content={
                        service.wishlistCount === 1 ||
                        window.location.pathname.includes("/wishlist")
                          ? "Remove From WishList"
                          : "Add to WishList"
                      }
                      data-tooltip-id="my-tooltip"
                      onClick={(event) => {
                        event.stopPropagation();
                        onClick(service);
                      }}
                      disabled={
                        addLoading[service._id] ||
                        removeLoading[service._id] ||
                        childLoading[service.serviceId]
                      }
                    >
                      {location.pathname === "/wishlist" ||
                      (service?.wishlistCount && service.wishlistCount === 1) ||
                      (service?.servicewishlistsSize &&
                        service.servicewishlistsSize === 1) ? (
                        <FaStar size={25} color="#FF0000" />
                      ) : (
                        <FaRegStar size={25} />
                      )}
                    </button>
                  )}

                  <LinkButton
                    type="submit"
                    to={
                      url?.includes("services")
                        ? `/services/detail/${service?._id}`
                        : `/services/detail/${service?.serviceId}`
                    }
                    className="bg-white border border-[#004561]/[0.6] text-[#004561] px-5 py-2 rounded-md text-sm font-medium hover:bg-[#FFD700] hover:text-black hover:border-white transition-colors duration-300"
                  >
                    Avail Now
                  </LinkButton>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
