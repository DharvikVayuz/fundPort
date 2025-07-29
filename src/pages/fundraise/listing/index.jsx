import InfiniteScroll from "react-infinite-scroll-component";
import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { IoMdAddCircle } from "react-icons/io";
import { FundraiseCard } from "./components/fundraiseCard";
import { ImSpinner2 } from "react-icons/im";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFundraise,
  loadMoreFundraise,
} from "../../../redux/actions/fundraise-actions";
import { useSearchParams } from "react-router-dom";
import { BusinessCardShimmer } from "../../../components/loader/BusinessCardShimmer";
import { getAllBusiness } from "../../../redux/actions/businessPage-action";
import { clearState } from "../../../redux/slices/fundraiseSlice";

const FundraiseListing = () => {
  let fundraise;
  let totalCount;
  let searchValue;
  const dispatch = useDispatch();
  const { fundraiseList, isFundraiseLoading } = useSelector(
    (state) => state.fundraise
  );
  console.log(fundraiseList, "fundraiseList");
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const page = searchParams.get("page") || 1;
    const query = searchParams.get("search") || "";

    dispatch(getFundraise({ page, query }));
  }, []);

  if (isFundraiseLoading)
    return (
      <div>
        <BusinessCardShimmer className={"py-4 h-20"} />
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <BusinessCardShimmer />
            </div>
          ))}
        </div>
      </div>
    );
  const handleClearState = () => {
    dispatch(clearState());
  };

  return (
    <div className="flex flex-col overflow-y-auto pb-4">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <Heading
          title={"Fundraise"}
          backButton={true}
          tourButton={fundraiseList.length > 0 ? true : false}
        >
          Fundraise
        </Heading>
        <div className="flex items-center gap-2">
          {fundraiseList.length > 0 && (
            <LinkButton
              onClick={handleClearState}
              to={"create"}
              primary={true}
              leftIcon={<IoMdAddCircle />}
            >
              Add Portfolio
            </LinkButton>
          )}
        </div>
      </div>

      <InfiniteScroll
        dataLength={fundraise?.length || 0}
        next={() => dispatch(loadMoreFundraise({ page: page + 1 }))}
        hasMore={fundraise?.length < totalCount}
        loader={
          <div className="flex justify-center items-center p-1">
            <ImSpinner2 className="animate-spin text-black !text-xl" />
          </div>
        }
        endMessage={
          totalCount &&
          totalCount > 0 &&
          fundraise?.length > 6 && (
            <p className="py-4 font-medium text-center text-gray-500">
              Yay! You have seen it all
            </p>
          )
        }
      >
        {fundraiseList?.length > 0 ? (
          <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
            {fundraiseList.map((data, index) => (
              <FundraiseCard key={index} data={data} />
            ))}
          </div>
        ) : (
          // <FundraiseCard data={fundraiseList && fundraiseList} />

          <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
            <img src="/images/business/no-business.svg" alt="" />
            <p className="font-bold text-xl text-[#000000]">
              {searchValue
                ? "No Such Portfolios Found"
                : "No Portfolios Created"}
            </p>
            <p className="font-normal text-[#797979]">
              {searchValue
                ? "Try searching with different keyword"
                : "Create one to gain investors"}
            </p>
            {fundraiseList.length === 0 && (
              <LinkButton
                onClick={handleClearState}
                to={"create"}
                primary={true}
                leftIcon={<IoMdAddCircle />}
              >
                Add Portfolio
              </LinkButton>
            )}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default FundraiseListing;
