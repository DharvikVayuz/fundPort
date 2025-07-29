import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/buttons";
import { IoMdAddCircle } from "react-icons/io";
import { BusinessCard } from "../../../business/listing/components/businessCard";
import { Heading } from "../../../../components/heading";
import { LinkButton } from "../../../../components/link";
import { resetBusiness } from "../../../../redux/slices/businessSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTourOpen } from "../../../../redux/slices/appTourSlice";
import TourComponent from "../../../../components/appTour";
import { useState } from "react";

export const Business = ({ data = [], total, target }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [run, setRun] = useState(false);

  const handleClickStart = () => {
    setRun(!run);
    console.log("clicked");
    dispatch(setTourOpen(true)); // Open tour
  };

  const { isTourOpen } = useSelector((state) => state.tour);

  const steps = [
    {
      target: ".business",
      disableBeacon: true,
      content: (
        <div className="grid gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            Your Businesses
          </h2>
          <p>Here you can see and manage all your registered businesses.</p>
        </div>
      ),
    },
    {
      target: ".addBusiness",
      disableBeacon: true,
      content: (
        <div className="grid gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            Add Businesses
          </h2>
          <p>Here you can register businesses.</p>
        </div>
      ),
    },
    {
      target: ".viewAll",
      disableBeacon: true,
      content: (
        <div className="flex flex-col gap-6">
          <h2 style={{ color: "#0A1C40" }} className="font-semibold">
            View All Business
          </h2>
        </div>
      ),
    },
  ];

  return (
    <>
      <TourComponent isTourOpen={run} steps={steps} path={""} />
      <div className={`flex flex-col business ${target}`}>
        <div className="flex justify-between gap-4 my-2">
          <Heading
            className={"py-0"}
            title={"Dashboard"}
            tourButton={data?.length > 0 ? true : false}
            onClick={handleClickStart}
          >
            My Business {data.length ? `(${data.length})` : ""}
          </Heading>
          <div className="flex items-center gap-2">
            {data?.length > 0 && (
              <div className="addBusiness hidden sm:block">
                <LinkButton
                  primary={true}
                  leftIcon={<IoMdAddCircle />}
                  onClick={(e) => {
                    // e.stopPropogation()
                    dispatch(resetBusiness());
                    navigate("/business/create?source=dashboard");
                  }}
                >
                  Add Business
                </LinkButton>
              </div>
            )}
            {data?.length > 2 && (
              <Link
                className="font-medium text-sm text-[#797979] hover:text-primaryText viewAll"
                to={"/business"}
              >
                View All
              </Link>
            )}
          </div>
        </div>
        {data?.length > 0 && (
          <div className="mt-2 addBusiness block sm:hidden">
            <LinkButton
              primary={true}
              leftIcon={<IoMdAddCircle />}
              onClick={(e) => {
                // e.stopPropogation()
                dispatch(resetBusiness());
                navigate("/business/create?source=dashboard");
              }}
            >
              Add Business
            </LinkButton>
          </div>
        )}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
            {data.slice(0, 2).map((data, index) => (
              <BusinessCard key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 items-center flex-col h-[50vh]">
            <div className="size-32">
              <img
                src="/icons/dashboard/business.svg"
                alt=""
                className="size-full"
              />
            </div>
            <p className="font-bold  text-xl text-[#000000] ">
              Create Business
            </p>
            <p className="font-normal text-[#797979]">
              Create one to start your services
            </p>

            <div
              className={`${
                data.length === 0 ? "flex" : "hidden"
              } items-center gap-2 addBusiness`}
            >
              <LinkButton
                primary={true}
                type="button"
                leftIcon={<IoMdAddCircle />}
                onClick={(e) => {
                  // e.stopPropogation()
                  dispatch(resetBusiness());
                  navigate("/business/create?source=dashboard");
                }}
              >
                Add Business
              </LinkButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
