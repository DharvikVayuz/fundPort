import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../../../../components/heading";
import { useSelector } from "react-redux";
import { LinkButton } from "../../../../../components/link";
import { ServiceCard } from "../serviceCard";
import { useEffect } from "react";
export const ServicesProgress = ({ data, heading, status, total, isSlice=true }) => {
  const { business } = useSelector((state) => state.businessList);

  const navigate = useNavigate();

  console.log(status, "status from component");
  const getServiceStatusText = (status) => {
    const statusMessages = {
      hold: "",
      completed: "",
      inProgress: "",
    };

    return statusMessages[status] || "Services were available but not availed";
  };

  console.log(data, "data from component");

  return (
    <>
      <div className="flex flex-col ">
        {data?.data?.length > 0 ? (
          <>
            <div className="py-2 flex flex-row sm:flex-row justify-between gap-2 my-2">
              <div className="flex   gap-2 font-semibold">
                {/* <div>My Services :</div> */}
                <div>
                  {heading}
                  {data?.total ? `(${data?.total})` : ""}
                </div>
              </div>
              {data?.total >= 2 && (
                <Link
                  to={`/services/serviceprogressdetail?status=${status}`}
                  className="font-medium text-sm text-[#797979] hover:text-primaryText"
                >
                  View All
                </Link>
              )}
            </div>

            {/* <ServiceCard data={data?.data?.slice(0, 3)} /> */}
            <ServiceCard data={isSlice ? data?.data?.slice(0, 3) : data?.data} />

          </>
        ) : (
          <div>
            <hr />
            <div className="flex justify-center gap-2 items-center flex-col h-[28vh] pt-10">
              <div className="size-24">
                <img
                  src="/icons/dashboard/services.svg"
                  alt=""
                  className="size-full"
                />
              </div>
              <p className="pt-2 font-bold text-xl text-[#000000]">
                Availed Services will be shown here
              </p>

              {business?.length > 0 && (
                <LinkButton
                  className={"px-4 py-1"}
                  onClick={() => {
                    navigate("/services");
                  }}
                  primary={true}
                  // leftIcon={<IoMdAddCircle />}
                >
                  Avail Service
                </LinkButton>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
