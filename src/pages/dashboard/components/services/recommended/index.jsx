import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetService } from "../../../../../redux/slices/serviceListingSlice";
import { Heading } from "../../../../../components/heading";
import { useEffect, useState } from "react";
import { recommendedServiceListing } from "../../../../../redux/actions/servicesListing-action";
import { Button } from "../../../../../components/buttons";
import { setTourOpen } from "../../../../../redux/slices/appTourSlice";
import TourComponent from "../../../../../components/appTour";

export const RecommendedServices = ({ data, total, target }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [run, setRun] = useState(false);

  let onClickViewAll = () => {
    dispatch(resetService({}));
    navigate("/services");
  };
  const navigateToDetail = (serviceId) => {
    navigate(`/services/detail/${serviceId}`);
  };
  // test dev branch
  console.log(total, "ˇTotal Service");
  const steps = [
    {
      target: ".service",
      content: (
        <div className="flex flex-col items-center gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            Recommended Services
          </h2>
          <p>Here you can see all the recommended services.</p>
          {/* <img src="/images/business/business-logo.svg" alt="Business Icon" width="50" /> */}
        </div>
      ),
    },
    {
      target: ".viewAllServices",
      content: (
        <div className="flex flex-col gap-6">
          <p>
            Click here to <strong>View All Services</strong>
          </p>
          {/* <Button
            primary={true}
            onClick={() => navigate("/services")}
          >
            View Businesses Now
          </Button> */}
        </div>
      ),
    },
  ];

  const handleClickStart = () => {
    setRun(!run);
    dispatch(setTourOpen(true)); // Open tour
  };
  return (
    <div className={` ${target} `}>
      <TourComponent isTourOpen={run} steps={steps} path={""} />
      <div className="py-2 flex flex-row sm:flex-row justify-between gap-2 service my-4">
        <Heading
          title={"Dashboard"}
          className={"py-0"}
          tourButton={true}
          onClick={handleClickStart}
        >
          Recommended Services {total ? `(${total})` : ""}
        </Heading>
        {data?.length > 2 ? (
          <Link
            className="font-medium text-sm text-[#797979] hover:text-primaryText viewAllServices"
            to={"/services/recommended-services-view-all"}
          >
            View All
          </Link>
        ) : (
          ""
        )}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 rounded-lg 
     lg:grid-cols-2 gap-6 bg-white "
      >
        {data?.slice(0, 2).map((data, index) => {
          const text =
            data?.details?.length > 50
              ? data?.details?.slice(0, 40) + "..."
              : data?.details;
          return (
            <button
              onClick={() => navigateToDetail(data._id)}
              key={index}
              className="flex justify-between items-center bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1 gap-2 w-full p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-8"
                  src="/icons/dashboard/services.svg"
                  alt="recommended-services"
                />
                <div className="flex  flex-col text-start">
                  <p className="font-semibold text-sm text-[#0a1c40]">
                    {data.name}
                  </p>
                  <p
                    className="font- text-[12px]"
                    dangerouslySetInnerHTML={{ __html: text }}
                  >
                    {/* {data?.details?.length > 50
                        ? data?.details?.slice(0, 40) + "..."
                        : data?.details}{" "} */}
                  </p>
                </div>
              </div>
              <div className="border-l h-full flex justify-center items-center">
                <img src="/icons/dashboard/arrow-right.svg" alt="" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
