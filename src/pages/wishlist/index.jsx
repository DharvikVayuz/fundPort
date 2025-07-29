import React, { useEffect } from "react";
import { Heading } from "../../components/heading";
import { ServicesCard } from "../services/listing/components/servicesCard";
import { servicesListing } from "../../database";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoreWishList,
  getWishList,
  removeServiceWishlistData1,
} from "../../redux/actions/wishlist-actions";
import { ServiceCardShimmer } from "../../components/loader/ServiceCardShimmer";
import { removeServiceWishlist } from "../../redux/actions/servicesListing-action";
import { NoData } from "../../components/errors/noData";
import { ImSpinner2 } from "react-icons/im";
import { WishlistCardShimmer } from "../../components/loader/WishlistCardShimmer";
import InfiniteScroll from "react-infinite-scroll-component";

//removeServiceWishlist
const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishList, totalCount, page } = useSelector((state) => state.wishlist);

  const { isLoading } = useSelector((state) => state.wishlist);
  // console.log("wishList,",wishList);

  // console.log("wishList.length", wishList?.length);
  // console.log("totalCount",totalCount);

  let onClickWishList = (service) => {
    //   console.log(service,"service123");
    //setIsSubmit(true);
    // if (service?.wishlistCount) {
    dispatch(removeServiceWishlistData1({ serviceId: service?.serviceId }));
    // } else {
    // dispatch(updateServiceWishlist({ serviceId: service?._id }));
    //{loading ? <ImSpinner2 className="animate-spin text-gray hover:text-white !text-xl" /> : <h2 className="font-bold text-4xl">{number}</h2>}
  }; //}
  console.log(wishList, "wishListwishList");
  useEffect(() => {
    dispatch(getWishList({ page: 1 }));
  }, []);
  return (
    <>
      {isLoading ? (
        <WishlistCardShimmer />
      ) : (
        <div>
          <Heading className={"mb-6"} title={"Wishlist"} backButton={true}>
            Wishlist {`(${totalCount})` || ""}
          </Heading>
          {/* Wishlist ({wishList?.length}) */}
          {wishList && wishList?.length === 0 ? (
            <NoData title="Let's Fill This Up!" />
          ) : (
            <ServicesCard
              data={wishList}
              onClick={(service) => onClickWishList(service)}
            />
          )}

          <InfiniteScroll
            dataLength={wishList?.length || 0} // Use the currently loaded data length
            next={() => dispatch(getMoreWishList({ page: page + 1 }))} // Load more data
            hasMore={wishList?.length < totalCount} // true if more data exists, false otherwise
            // hasMore={false} // true if more data exists, false otherwise
            loader={
              <div className="flex justify-center items-center p-1">
                <ImSpinner2 className="animate-spin text-black !text-xl" />
              </div>
            }
            endMessage={
              totalCount && totalCount > 0 && wishList?.length > 6 ? (
                <p className="py-4 font-medium text-center text-gray-500">
                  Yay! You have seen it all
                </p>
              ) : null
            }
          ></InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Wishlist;
