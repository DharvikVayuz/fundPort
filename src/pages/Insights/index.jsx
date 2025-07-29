import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { NoData } from "../../components/errors/noData";
import {
  getInsights,
  loadMoreInsights,
  getCategories,
} from "../../redux/actions/insight-action";
import { MainTab } from "./Components";
import ShareMetaTags from "./Components/metTags.jsx";
import { Button } from "../../components/buttons/index.js";
import { InsightsCardShimmer } from "../../components/loader/InsightsCardShimmer.jsx";

function ViewAllInsights() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { isInsightLoading, insights, categoryLoading, categories } =
    useSelector((state) => state.insights);
  const { page, totalCount, error } = useSelector((state) => state.offers);
  const navigate = useNavigate();
  const [metaTitle, setMetaTitle] = useState("Insights");
  const [metaImage, setMetaImage] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const urlParams = new URLSearchParams(useLocation().search);
  const searchValue = urlParams.get("search");
  const metaBlogId = searchParams.get("metaBlogId");

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    console.log("calleddddd");
    dispatch(
      getInsights({ page: 1, categoryMetaUrl: searchParams.get("metaBlogId") })
    );
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(getCategories())
      .unwrap()
      .then((res) => {
        const activeMetaUrl = res.find((tab) => tab.metaUrl === metaBlogId);
        if (!activeMetaUrl) {
          dispatch(
            getInsights({ page: 1, categoryMetaUrl: res?.[0]?.metaUrl })
          );
        } else {
          dispatch(
            getInsights({ page: 1, categoryMetaUrl: activeMetaUrl?.metaUrl })
          );
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [dispatch]);

  const toggleReadMore = (e, index) => {
    e.stopPropagation();
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const findInsight = (insightId) => {
    console.log(insights, insightId);
    const foundBlog = insights?.filter((insight) => {
      return insight._id == insightId;
    });
    console.log(foundBlog, "foundBlog");

    setMetaTitle(foundBlog?.[0].title);
    setMetaImage(foundBlog?.[0].banner);
    setMetaDescription(foundBlog?.[0].description);
  };
  const handleNavigate = (e, metaUrlId) => {
    console.log(metaUrlId, "meta url id");

    // e.stopPropogation();
    navigate(`/insight-details/${metaUrlId}`);
  };

  return (
    <>
      <MainTab />
      <ShareMetaTags
        // pageTitle={metaTitle}
        pageDescription={metaDescription ? metaDescription : null}
        pageImage={metaImage ? metaImage : null}
      />
      {isInsightLoading ? (
        <>
          <InsightsCardShimmer count={5} />
        </>
      ) : (
        <InfiniteScroll
          dataLength={insights?.length || 0} // Number of currently loaded items
          next={() =>
            dispatch(loadMoreInsights({ query: searchValue, page: page + 1 }))
          }
          hasMore={!error && insights?.length < totalCount}
          loader={
            <div className="flex justify-center items-center p-1">
              <ImSpinner2 className="animate-spin text-black !text-xl" />
            </div>
          }
          endMessage={
            insights?.length > 6 && (
              <p className="py-4 font-medium text-center text-gray-500">
                Yay! You have seen it all
              </p>
            )
          }
        >
          <div>
            {insights?.length > 0 ? (
              insights.map((offer, index) => (
                <div
                  key={index}
                  onClick={(e) => handleNavigate(e, offer.metaUrl)}
                  className="flex sm:flex-row flex-col gap-3 px-4 py-4 mb-6 bg-[#F3F7FF] border border-[#DFEAF2] rounded-lg"
                >
                  <div
                    className={`sm:w-[30%] sm:max-w-[274px] h-[150px] flex justify-center items-center rounded-lg bg-cover bg-no-repeat bg-center overflow-hidden`}
                  >
                    <img
                      className="w-full object-cover object-center rounded-lg"
                      src={offer?.banner}
                      alt=""
                    />
                  </div>
                  <div className="flex sm:w-[70%] flex-col gap-2">
                    <p className="font-bold text-[20px] text-[#0A1C40]">
                      {offer?.title}
                    </p>
                    {/* <p className="font-medium text-[12px] text-[#0A1C40] line-clamp-5">
                    {expandedIndex === index ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: offer.description,
                        }}
                      />
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${offer.description?.slice(0, 200)}${offer.description?.length > 200 ? "..." : ""
                            }`,
                        }}
                      />
                    )}
                    <span
                      onClick={(e) => toggleReadMore(e, index)}
                      className="text-blue-500 cursor-pointer ml-2"
                    >
                      {offer.description?.length > 200 &&
                        (expandedIndex === index ? "Read Less" : "Read More")}
                    </span>
                  </p> */}
                    <p className="font-medium text-[12px] text-[#0A1C40]">
                      <span
                        className={` ${
                          expandedIndex === index
                            ? ""
                            : "line-clamp-2 overflow-hidden"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html:
                            expandedIndex === index
                              ? offer?.description
                              : `${offer.description?.slice(0, 150)}...`,
                        }}
                      />
                      {offer.description?.length > 150 && (
                        <span
                          onClick={(e) => toggleReadMore(e, index)}
                          className="text-blue-500 cursor-pointer ml-2"
                        >
                          {expandedIndex === index
                            ? " Read Less"
                            : " Read More"}
                        </span>
                      )}
                    </p>

                    {/* <Button onClick={() => findInsight(offer._id)} primary>Share insight</Button> */}
                  </div>
                </div>
              ))
            ) : (
              <NoData />
            )}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}

export default ViewAllInsights;
