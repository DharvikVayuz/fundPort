import { Link, useSearchParams } from "react-router-dom";
import { insightBlog } from "../../database/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getInsights,
  getSidePannelInsights,
} from "../../redux/actions/insight-action";
import { InsightsCardShimmer } from "../loader/InsightsCardShimmer";
import { LinkButton } from "../link";
import { MainTab } from "../../pages/admin/services/components";
import { NoData } from "../errors/noData";

export const Insight = () => {
  const dispatch = useDispatch();
  const {
    isSidePanelInsightLoading,
    sidePannelInsights: insightBlog,
    totalInsights,
  } = useSelector((state) => state.insights);
  const [searchParams, setSearchParams] = useSearchParams({});
  const metaBlogId = searchParams.get("metaBlogId");

  console.log(insightBlog, totalInsights, "insightBlog");
  useEffect(() => {
    dispatch(getSidePannelInsights({ page: 1 }));
  }, []);
  return (
    <>
      <div className="flex flex-col corpzo-dashboard-step-15 ">
        {isSidePanelInsightLoading ? (
          <InsightsCardShimmer count={3} />
        ) : (
          <>
            <div className="flex justify-between items-center  ">
              {/* <MainTab/> */}
              <p className="font-semibold text-[16px] text-[#0A1C40] mb-1">
                Insights
              </p>

              {totalInsights > 0 && (
                <Link
                  className="font-medium text-xs text-[#828282] hover:text-[#0A1C40]"
                  to={"/view-all-insights"}
                >
                  View All
                </Link>
              )}

              {/* <Link className="font-medium text-xs text-[#828282]">View All</Link> */}
            </div>
            <hr className="mb-6" />
            {insightBlog && insightBlog?.length > 0 ? (
              <div className="grid gap-6">
                {insightBlog?.slice(0, 2)?.map?.((blog, index) => (
                  <a
                    key={index}
                    href={`/insight-details/${blog.metaUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col xl:flex-row gap-2 p-2 bg-[#EEEFF3] rounded-lg  hover:shadow-lg "
                  >
                    <div className="w-full h-[100px] xl:w-[100px] xl:h-auto xl:min-h-[100px] rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          blog?.banner
                            ? blog.banner
                            : "https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg"
                        }
                        alt="blog-Img"
                        className="size-full object-center object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-3 bg-[#EEEFF3]">
                      <h4
                        className="font-bold text-[12.64px] text-[#1A202E] line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                      ></h4>
                      <p
                        className="font-normal text-[12px] text-[#737373] line-clamp-3 "
                        dangerouslySetInnerHTML={{
                          __html: blog.description,
                        }}
                      ></p>

                      <div className="flex flex-col ">
                        <p className="font-medium text-[14px] text-[#495367]">
                          {blog?.authorName}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <NoData
                className={"h-18 w-[60%] ml-16"}
                title={"Insights yet to be uploaded"}
                textSize="small"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
