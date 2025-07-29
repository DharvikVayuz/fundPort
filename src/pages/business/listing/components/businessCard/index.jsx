import { Link, useNavigate } from "react-router-dom";
import { calculateAge } from "../../../../../utils/index";
import { Button } from "../../../../../components/buttons";
import { BusinessCardShimmer } from "../../../../../components/loader/BusinessCardShimmer";
import { businessType } from "../../../createEdit/components/registration";

export const BusinessCard = ({ data, index }) => {
  console.log(data, index)
  const navigate = useNavigate();


  const handleServices = () => {
    navigate("/services");
  }
  return (
    <>
      {data.length > 0 ? (
        <BusinessCardShimmer />
      ) : (
        <div className="p-4 border rounded-xl hover:shadow-lg">
          <div onClick={() => navigate(`/business/detail?id=${data?._id}`)} className="flex flex-col gap-2 hover:cursor-pointer bg-[#f3f7ff] rounded-xl p-2">
            <div className="flex items-end gap-1">
              <div className="  bg-[#F3F7FF] rounded-xl flex justify-center items-center">
                <img
                  src="/images/business/business-logo.svg"
                  className=""
                  alt=""
                />
              </div>
              <div>
                <Link to={`/business/detail?id=${data?._id}`}>
                  <h4 className="font-bold text-base text-[#171717] break-all">
                    {(data?.businessName) ? data?.businessName : "--"}
                  </h4>
                </Link>
                <p className="font-semibold text-[12px] text-[#343C6A]">
                  {data.businesSubTitle}
                </p>
              </div>
            </div>
            <div className="flex flex-col px-2 pt-2 gap-1 w-[100%]">
              {labelValue("Type:", data.typeOfBusiness)}
              {/* {labelValue("Type:",businessType?.filter((el)=>el.value===data?.typeOfBusiness)[0]?.label?businessType?.filter((el)=>el.value===data?.typeOfBusiness)[0]?.label: "-------")} */}
              {labelValue(
                "Registered Office:",
                (data?.businessAddressCity && data?.businessAddressState
                  ? `${data?.businessAddressCity}, ${data?.businessAddressState}`
                  : data?.businessAddressCity
                    ? data?.businessAddressCity
                    : data?.businessAddressState) ? (data?.businessAddressCity && data?.businessAddressState
                      ? `${data?.businessAddressCity}, ${data?.businessAddressState}`
                      : data?.businessAddressCity
                        ? data?.businessAddressCity
                        : data?.businessAddressState) : "--"
              )}
              {labelValue(
                "Company Status:",
                data?.active ? "Active" : "In Active"
              )}
              {labelValue(
                "Company Age:",
                data?.yearOfStablish
                  ? `${calculateAge(data?.yearOfStablish)}`
                  : null
              )}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 pt-5">
            <div className="flex items-center gap-5">

              <div className="flex gap-2 items-center">
                <div className="size-6">

                  <img src="/icons/dashboard/services.svg" alt="" className="size-full" />
                </div>
                <p className="font-medium text-[14px] text-[#293958] whitespace-nowrap">
                  {data?.totalService} Active Service
                </p>

                {data?.formStep && (
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="transform -rotate-90"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke={
                          (data.formStep / 5) * 100 < 40
                            ? '#F59E0B' // amber-500
                            : (data.formStep / 5) * 100 < 80
                              ? '#3B82F6' // blue-500
                              : '#10B981' // green-500
                        }
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 10}
                        strokeDashoffset={
                          2 * Math.PI * 10 - (data.formStep / 5) * (2 * Math.PI * 10)
                        }
                      />
                    </svg>
                    <span className="absolute text-[8px] text-[#000000B2] font-medium">
                      {(data.formStep / 5) * 100}%
                    </span>
                  </div>
                )}

              </div>
            </div>
            <Button className={`${index === 0 ? "viewAll" : ""} bg-white border border-[#004561]/[0.6] text-[#004561] px-4 py-1 rounded-md text-[14px] font-medium hover:bg-[#FFD700] hover:text-black hover:border-white transition-colors duration-300`} onClick={handleServices}>
              Add Service
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const labelValue = (label, value) => (
  <div className="grid grid-cols-2">
    <p className="font-medium text-sm text-[#000000B2] ">{label}</p>
    <p className="font-semibold text-sm text-[#0A1C40] break-words line-clamp-1">{value}</p>
  </div>
);
