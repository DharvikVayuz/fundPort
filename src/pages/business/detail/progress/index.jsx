import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../../../../components/heading";
import { useSelector } from "react-redux";
import { LinkButton } from "../../../../../components/link";
import { ServiceCard } from "../serviceCard";
import { useEffect } from "react";
export const ServicesProgress = ({ data, heading, status, total }) => {
  const { business } = useSelector((state) => state.businessList);

  const navigate = useNavigate();

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
      <div className="flex flex-col gap-6 mb-4">
        {data?.data?.length > 0 ? (
          <>
            <div className="py-2 flex flex-row sm:flex-row justify-between gap-2 ">
              <div className="flex flex-col gap-2">
                <Heading
                  title={"Dashboard"}
                  className={"py-0 "}
                  tourButton={true}
                >
                  My Service Progress Updates{" "}
                  {data?.total ? `(${data?.total})` : ""}
                </Heading>
                <Heading
                  title={"Dashboard"}
                  className={"py-0 "}
                  tourButton={false}
                >
                  {heading}
                </Heading>
              </div>
              {total >= 2 && (
                <Link
                  to={`/services/serviceprogressdetail?status=${status}`}
                  className="font-medium text-sm text-[#797979] hover:text-[#0A1C40]"
                >
                  View All
                </Link>
              )}
            </div>

            <ServiceCard data={data?.data?.slice(0, 3)} />
          </>
        ) : (
          <div>
            <div className="flex justify-center gap-2 items-center flex-col h-[28vh] pt-10">
              <div className="size-24">
                <img
                  src="/icons/dashboard/services.svg"
                  alt=""
                  className="size-full"
                />
              </div>
              <p className="font-bold text-xl text-[#000000] mb-4">
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
