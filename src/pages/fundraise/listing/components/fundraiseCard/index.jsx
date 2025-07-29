import { Link, useNavigate } from "react-router-dom";
import { calculateAge } from "../../../../../utils/index";
import { Button } from "../../../../../components/buttons";
import { BusinessCardShimmer } from "../../../../../components/loader/BusinessCardShimmer";
import { FaEdit } from "react-icons/fa";
export const FundraiseCard = ({ data }) => {
  const navigate = useNavigate();

  const handleServices = () => {
    navigate("/services");
  };
  console.log(data, "data")
  function getCompanyAge(establishmentDate) {
    // Convert the establishment date to a Date object
    const establishment = new Date(establishmentDate);
    const current = new Date();

    // Calculate the age in years
    let age = current.getFullYear() - establishment.getFullYear();

    // Adjust if the establishment date hasn't occurred yet this year
    if (
      current.getMonth() < establishment.getMonth() ||
      (current.getMonth() === establishment.getMonth() &&
        current.getDate() < establishment.getDate())
    ) {
      age -= 1;
    }

    return age;
  }
  return (
    <>
      {
        (
          <div className="p-4 bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1	 rounded-xl hover:shadow-lg ">
            <div
              onClick={() => navigate(`/fundraise/detail?fundId=${data?._id}`)}
              className="flex flex-col gap-2 hover:cursor-pointer bg-white rounded-xl p-2"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#F3F7FF] rounded-xl flex justify-center items-center">
                  <img
                    src="/images/business/business-logo.svg"
                    className=""
                    alt=""
                  />
                </div>

                <div>
                  <Link to={`/business/detail?id=${data?._id}`}>
                    <h4 className="font-bold text-base text-[#171717] break-all">
                      {data?.businessName ? data?.businessName : "______"}
                    </h4>
                  </Link>
                  <p className="font-semibold text-[12px] text-[#343C6A]">
                    {data.businesSubTitle}
                  </p>
                </div>
                <div onClick={(e) => {
                  e.stopPropagation()
                  console.log(data._id)
                  navigate(`/fundraise/update?fundId=${data._id}`)
                  localStorage.setItem("fundId", data?._id)
                }}>
                  <FaEdit />
                </div>
              </div>
              <div className="flex flex-col px-2 pt-2 gap-1 w-[100%]">
                {labelValue(
                  "Company Name:",
                  data?.businessdetails?.[0]?.businessName
                    ? `${(data?.businessdetails?.[0]?.businessName)}`
                    : "-----"
                )}
                {labelValue(
                  "Company Status:",
                  data?.active ? "Active" : "In Active"
                )}
                {labelValue(
                  "Company Age:",
                  data?.businessdetails?.[0]?.yearOfStablish
                    ? `${calculateAge(data?.businessdetails?.[0]?.yearOfStablish)}`
                    : null
                )}
                {labelValue(
                  "Round Type:",
                  data?.roundType
                )}
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 pt-5">
              <button className="font-medium text-sm text-[#787878]">{`See more Details >>`}</button>
              <Button
                className={
                  "w-fit px-4 py-2 !font-medium lg:!text-[12px] !whitespace-nowrap"
                }
                primary={true}
                onClick={handleServices}
              >
                Explore Investor
              </Button>
            </div>
          </div>
        )}
    </>
  );
};

const labelValue = (label, value) => (
  <div className="flex justify-between">
    <p className="font-medium text-sm text-[#000000B2] ">{label}</p>
    <p className="font-semibold text-sm text-[#0A1C40] break-all">{value}</p>
  </div>
);
