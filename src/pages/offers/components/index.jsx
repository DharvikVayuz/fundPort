import React, { useEffect, useState } from "react";
import { Heading } from "../../../components/heading";
import { Offerss } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../components/link";
import { useDispatch, useSelector } from "react-redux";
import { OfferShimmer } from "../../../components/loader/OfferShimmer";
import { NoData } from "../../../components/errors/noData";
import { getOffers, loadMoreOffers } from "../../../redux/actions/offer-action";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImSpinner2 } from "react-icons/im";

function OffersDetails() {
  const dispatch = useDispatch();

  const { offers, page, totalCount, isLoading, loadingMore, error } =
    useSelector((state) => state.offers);

  const urlParams = new URLSearchParams(useLocation().search);
  // const navigate = useNavigate();
  // const url = new URL(window.location);
  // let page =urlParams.get("page") ||1 ;
  const searchValue = urlParams.get("search");

  useEffect(() => {
    // console.log("Offer page render");

    dispatch(getOffers({ query: searchValue }));
  }, [searchValue]);

  const [expandedIndex, setExpandedIndex] = useState(null); // To track which offer is expanded

  // console.log("expandedIndex", expandedIndex);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString("en-US", options);
  };

  // const handleLoadMore = () =>{
  //   if(totalCount % offers?.length > 0){
  //     dispatch(loadMoreOffers({page:Number(page)+1}));
  //     // url.searchParams.set('page', (Number(page)+1));
  //     // window.history.pushState({}, '', url);
  //   }else{
  //     toast.error("No more data found")
  //   }

  // }

  // useEffect(()=>{
  //   page = urlParams.get("page") ||1 ;
  //   url.searchParams.set('page', 1);
  //   // window.history.pushState({}, '', url);
  // },[])

  if (isLoading) return <OfferShimmer className={"my-4"} count={7} />;

  return (
    <>
      <Heading title={"Offers"} backButton={true}>
        {`Offers(${totalCount || 0})`}
      </Heading>

      <InfiniteScroll
        dataLength={totalCount} //This is important field to render the next data
        next={() =>
          dispatch(loadMoreOffers({ query: searchValue, page: page + 1 }))
        } //function call to load more
        hasMore={!error && totalCount % offers?.length > 0} //true : more data to load, false: No more data to load
        loader={
          <div className="flex justify-center items-center p-1">
            <ImSpinner2 className="animate-spin text-black !text-xl" />
          </div>
        }
        endMessage={
          offers?.length > 6 && (
            <p className="py-4 font-medium text-center text-gray-500">
              Yay! You have seen it all
            </p>
          )
        }
      >
        {/* Simple rendering of Array to show cards/lists */}
        <div>
          {offers ? (
            offers?.map((offer, index) => (
              <div
                key={index}
                className="flex sm:flex-row flex-col gap-3 px-4 py-4 mb-6 bg-[#F3F7FF] border border-[#DFEAF2] rounded-lg    "
              >
                <div
                  className={`sm:w-[20%]  sm:max-w-[274px] h-[200px] flex justify-center items-center rounded-lg bg-cover bg-no-repeat bg-center overflow-hidden`}
                >
                  <img
                    className="w-full h-full object-cover object-center rounded-lg"
                    src={
                      offer?.imageUrl
                        ? offer?.imageUrl
                        : "https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="flex sm:w-[80%] flex-col gap-2">
                  <p className="font-bold text-3xl  text-[#0A1C40]">
                    {offer.offerTitle}
                  </p>
                  <div className="flex items-center gap-6 ">
                    <p className="font-bold rounded-full text-[14px] text-white bg-[#4CAF50] px-2 py-1 ">
                      {`${offer?.discountType === "fixed" ? "₹ " : ""}${
                        offer.discountPercent
                      }${offer?.discountType === "percentage" ? "%" : ""} OFF`}
                    </p>
                    <p className="font-normal  text-[12px] text-[#737373]">
                      {`Valid till : ${formatDate(offer.validity)}`}
                    </p>
                  </div>
                  <p className="font-medium min-h-[78px] text-[12px] text-[#0A1C40] line-clamp-3">
                    {expandedIndex == index
                      ? offer.offerDetail
                      : `${offer.offerDetail?.substring(0, 200)} ${
                          offer.offerDetail?.length > 200 ? "..." : ""
                        }`}
                    <span
                      onClick={() => toggleReadMore(index)}
                      className="text-blue-500 cursor-pointer ml-2"
                    >
                      {offer.offerDetail?.length > 200 &&
                        (expandedIndex == index ? "Read Less" : "Read More")}
                    </span>
                  </p>
                  <div className="flex justify-end ">
                    <LinkButton
                      to={`/services/detail/${
                        offer?.offerservices &&
                        offer?.offerservices[0]?.serviceId
                      }`}
                      primary={true}
                    >
                      {" "}
                      Avail Now
                    </LinkButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}

          {/* {totalCount % offers?.length > 0 ?
            <div className="w-full flex justify-center items-center mb-4">
              <Button onClick={() => dispatch(loadMoreOffers({ page: (page + 1) }))} disabled={loadingMore} className="flex items-center sm:gap-2 p-2 hover:text-lg hover:shadow-lg" primary={true}>
                {loadingMore ? "loading..." : "Load more.."}
              </Button>
            </div> : ""
          } */}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default OffersDetails;
