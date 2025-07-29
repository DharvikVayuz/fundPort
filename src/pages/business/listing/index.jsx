import { IoMdAddCircle } from "react-icons/io";
import { businessListing } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { LinkButton } from "../../../components/link";
import { getUserBusiness } from "../../../redux/actions/dashboard-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { calculateAge } from "../../../utils/index";
import { BusinessCard } from "./components/businessCard";
import { Heading } from "../../../components/heading";
import {
  getAllBusiness,
  getMoreBusiness,
} from "../../../redux/actions/businessPage-action";
import { BusinessCardShimmer } from "../../../components/loader/BusinessCardShimmer";
import { resetBusiness } from "../../../redux/slices/businessSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImSpinner2 } from "react-icons/im";
import TourComponent from "../../../components/appTour";
import { setTourOpen } from "../../../redux/slices/appTourSlice";
import { RecommendedServiceCardShimmer } from "../../../components/loader/RecommendedServiceCardShimmer";
// import { loadMoreBusiness } from "../../../redux/slices/businessPageSlice";

const BusinessListing = () => {
  const data = businessListing;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const [run, setRun] = useState(false);
  const { business, isLoading, totalCount, page, error, loadingMore } =
    useSelector((state) => state.businessList);

  // console.log("businessData", business);

  useEffect(() => {
    dispatch(getAllBusiness({ query: searchValue, page: 1 }));
  }, [searchValue]);

  // console.log("User Business",business);
  // useEffect(()=>{
  //   dispatch(getUserBusiness({}));
  // },[])
  // useEffect(() => {
  //   if (!businessLoading) {
  //     dispatch(getUserBusiness({ query: searchValue, page: 1 }));
  //   }
  // }, [searchValue, business?.page]);

  // const handleScroll = (e) => {
  //   console.log("handleScroll");

  //   const bottom =
  //     e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
  //   if (bottom && !isLoading && business?.length < totalCount) {
  //     console.log("loading more...");

  //     // dispatch(loadMoreBusiness(page + 1)); // Load next page
  //   }

  //   console.log("Not loading...");
  // };

  // return<div>Business page</div>

  // if (isLoading) return <BusinessCardShimmer count={8} className={"p-2"} />;
  const steps = [
    {
      target: ".business",
      disableBeacon: true,
      content: (
        <div className="grid gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            Your Businesses
          </h2>
          <p>Add your business here.</p>

          <div className="mx-auto">
            <img
              src="/icons/dashboard/business.svg"
              alt="Business Icon"
              width="50"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".viewAll",
      disableBeacon: true,
      content: (
        <div className="flex flex-col gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            View All Services
          </h2>

          {/* <Button
           primary={true}
            onClick={() => navigate("/business")}
          >
            View Businesses Now
          </Button> */}
        </div>
      ),
    },
  ];
  if (isLoading)
    return (
      <div>
        <BusinessCardShimmer className={"h-20 overflow-hidden"} />
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <RecommendedServiceCardShimmer />
            </div>
          ))}
        </div>
      </div>
    );

  const handleClickStart = () => {
    setRun(!run);
    console.log("clicked");
    dispatch(setTourOpen(true)); // Open tour
  };

  const title = location.pathname.includes("profile") ? "Profile" : "Business";
  return (
    <>
      <TourComponent isTourOpen={run} steps={steps} path={""} />
      <section>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <Heading
            onClick={handleClickStart}
            title={title}
            backButton={false}
            tourButton={business?.length > 0 ? true : false}
          >
            Your Business {totalCount ? `(${totalCount})` : ""}
          </Heading>
          {business?.length > 0 && (
            <LinkButton
              onClick={() => {
                dispatch(resetBusiness());
                navigate("/business/create");
              }}
              primary={true}
              leftIcon={<IoMdAddCircle />}
              className={"w-full sm:w-fit px-6 py-2 text-sm business"}
            >
              Add Business
            </LinkButton>
          )}
        </div>

        <InfiniteScroll
          className="pt-6"
          dataLength={business?.length || 0} // Use the currently loaded data length
          next={() => dispatch(getMoreBusiness({ page: page + 1 }))} // Load more data
          hasMore={business?.length < totalCount} // true if more data exists, false otherwise
          loader={
            <div
              className={`justify-center items-center p-1 ${
                business?.length == 0 ? "hidden" : "flex"
              }`}
            >
              <ImSpinner2 className="animate-spin text-black !text-xl" />
            </div>
          }
        >
          {business?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {business.map((data, index) => (
                <BusinessCard key={index} index={index} data={data} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-2 items-center flex-col h-[70vh] xl:h-[80vh]">
              <img
                src="/icons/dashboard/business.svg"
                alt=""
                className="size-28"
              />
              <p className="font-bold text-xl text-[#000000]">
                {searchValue ? "No Such Business Found" : " Create Business"}
              </p>
              <p className="font-normal text-[#797979]">
                {searchValue
                  ? "Try searching with different keyword"
                  : "Create a new business to get started"}
              </p>
              <div
                className={` ${
                  business?.length == 0 ? "flex " : "hidden"
                } items-center gap-2 business`}
              >
                <LinkButton
                  onClick={() => {
                    dispatch(resetBusiness());
                    navigate("/business/create");
                  }}
                  primary={true}
                  leftIcon={<IoMdAddCircle />}
                >
                  Add Business
                </LinkButton>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </section>
    </>
  );
};

export default BusinessListing;
