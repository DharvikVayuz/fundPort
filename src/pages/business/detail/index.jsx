import { useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons/button";
import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { servicesProgress } from "../../../database";
import { getBusiness } from "../../../redux/actions/business-action";
import { updateServiveProgress } from "../../../redux/actions/dashboard-action";
import { resetBusiness } from "../../../redux/slices/businessSlice";
import { calculateAge } from "../../../utils";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import { businessType } from "../createEdit/components/registration";
import { ServiceProgressShimmer } from "../../../components/loader/ServiceProgressShimmer";
import { NoData } from "../../../components/errors/noData";
import { BusinessDetailShimmer } from "../../../components/loader/BusinessDetailShimmer";
const BusinessDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { business, loading, error } = useSelector((state) => state.business);
  // const { user, fetching } = useSelector((state) => state.dashboard);
  const {
    holdServices,
    completedServices,
    totalCount,
    completedServiceTotal,
    holdServiceTotal,
    inProgress,
    fetching,
    allServices,
  } = useSelector((state) => state.dashboard);
  console.log(allServices, "allServices")
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get("id");
  // console.log("BUSINESS ID12", business)
  useEffect(() => {
    if (businessId) {
      // console.log("Dispatching action with businessId:", businessId);
      dispatch(getBusiness({ businessId }));
    } else {
      console.log("No businessId found");
    }
  }, [businessId, dispatch]);

  const handleEditBusiness = () => {
    navigate(`/business/edit/registration?id=${businessId}&&source=details`);
  };

  useEffect(() => {
    // dispatch(updateServiveProgress({ page: 1, status: 'hold', businessId: businessId }));
    // dispatch(updateServiveProgress({ page: 1, status: 'completed', businessId: businessId }));
    // dispatch(updateServiveProgress({ page: 1, status: 'inProgress', businessId: businessId }));
    dispatch(updateServiveProgress({ page: 1, businessId: businessId }));
  }, [businessId]);

  // console.log("businessType",businessType?.filter((el)=>el.value===business?.registration?.typeOfBusiness)[0]?.label);
  //              {labelValue("Type:", data.typeOfBusiness)}

  const businessTableData = [
    // ------------------ GENERAL INFORMATION ------------------
    {
      label: "Company Name",
      value: business?.registration?.businessName,
      section: "General Information",
    },
    {
      label: "CIN Number",
      value: business?.registration?.cinNumber,
      section: "General Information",
    },
    {
      label: "Type of Business",
      value: business?.registration?.typeOfBusiness,
      section: "General Information",
    },
    {
      label: "Role in Company",
      value: business?.registration?.roleOfCompany,
      section: "General Information",
    },
    {
      label: "Headquarter Location",
      value: business?.registration?.headQuarterLocation,
      section: "General Information",
    },
    {
      label: "Company Status",
      value: business?.registration?.active ? "Active" : "Inactive",
      section: "General Information",
    },
    {
      label: "Company Size",
      value: business?.registration?.sizeOfCompany,
      section: "General Information",
    },
    {
      label: "Year of Establishment",
      value: business?.registration?.yearOfStablish
        ? new Date(business.registration.yearOfStablish).toLocaleDateString()
        : "--",
      section: "General Information",
    },
    {
      label: "Company Age",
      value: calculateAge(business?.registration?.yearOfStablish),
      section: "General Information",
    },
    {
      label: "Industry",
      value: business?.registration?.industries?.[0]?.name,
      section: "General Information",
    },
    {
      label: "Sub Industry",
      value: business?.registration?.subindustries?.[0]?.name,
      section: "General Information",
    },
    {
      label: "About",
      value: business?.registration?.about,
      section: "General Information",
    },

    // ------------------ ADDRESS DETAILS ------------------
    {
      label: "Registered Office",
      value:
        business?.address?.businessAddressL1 &&
        business?.address?.businessAddressCity &&
        business?.address?.businessAddressPin &&
        `${business.address.businessAddressL1}, ${business.address.businessAddressCity}, ${business.address.businessAddressPin}`,
      section: "Address Details",
    },
    {
      label: "Communication Address",
      value:
        business?.address?.communicationAddressL1 &&
        business?.address?.communicationAddressCity &&
        business?.address?.communicationAddressPin &&
        `${business.address.communicationAddressL1}, ${business.address.communicationAddressCity}, ${business.address.communicationAddressPin}`,
      section: "Address Details",
    },

    // ------------------ FINANCIAL DETAILS ------------------
    {
      label: "Authorized Capital (₹)",
      value: business?.financial?.authorizedCapital?.toLocaleString() ,
      section: "Financial Details",
    },
    {
      label: "Paid Capital (₹)",
      value: business?.financial?.paidCapital?.toLocaleString() ,
      section: "Financial Details",
    },
    {
      label: "Revenue (₹)",
      value: business?.financial?.revenue?.toLocaleString(),
      section: "Financial Details",
    },
    {
      label: "Profit (₹)",
      value: business?.financial?.profit?.toLocaleString(),
      section: "Financial Details",
    },
    // {
    //   label: "PAT (₹)",
    //   value: business?.financial?.pat?.toLocaleString(),
    //   section: "Financial Details",
    // },
    // {
    //   label: "Gross Margin (₹)",
    //   value: business?.financial?.grossMargin?.toLocaleString(),
    //   section: "Financial Details",
    // },
    // {
    //   label: "Loan Amount (₹)",
    //   value: business?.financial?.loans?.toLocaleString(),
    //   section: "Financial Details",
    // },

    // ------------------ KYC DETAILS ------------------
    {
      label: "KYC Username",
      value: business?.kyc?.kycUser,
      section: "KYC Details",
    },
    {
      label: "PAN Number",
      value: business?.kyc?.id,
      section: "KYC Details",
    },
    {
      label: "Address Proof",
      value: business?.kyc?.addressProof,
      section: "KYC Details",
    },

    // ------------------ FUNDING DETAILS ------------------
    {
      label: "Looking for Funding?",
      value: business?.funding?.lookingForFunding ? "Yes" : "No",
      section: "Funding Details",
    },
    {
      label: "Existing Business Status",
      value: business?.funding?.existingBusinessName,
      section: "Funding Details",
    },
    {
      label: "Stage of Business",
      value: business?.funding?.stageOfBusiness,
      section: "Funding Details",
    },
  ];

  console.log(business, "sadfsfsd");

  return (
    <>
      {loading ? (
        <BusinessDetailShimmer />
      ) : (
        <section className="pb-10 leading-loose overflow-hidden">
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <Heading
                title={"Business Detail"}
                backButton={true}
                tourButton={false}
              >
                Business Detail
              </Heading>
              <div className="flex gap-2 items-center">
                <Button outline={true} onClick={handleEditBusiness}>
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-20">
                <img
                  src="/images/business/business-logo.svg"
                  className="size-full"
                  alt="business-logo"
                />
              </div>

              <div className="flex flex-col mt-5">
                <div className="font-semibold text-2xl text-[#171717]">
                  {business?.registration?.businessName
                    ? business?.registration?.businessName
                    : "..."}
                </div>
                <div className="text-base text-[#343C6A]">
                  {/* Business #{business?.registration?.businessNumber} */}
                  Industry:{" "}
                  <span className="font-normal">
                    {(business?.registration?.industries &&
                      business?.registration?.industries[0]?.name) ||
                      "--"}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full table-auto border-collapse bg-white">
                <tbody>
                  {(() => {
                    const groupedRows = [];
                    let lastSection = null;
                    let isFirstSection = true;

                    businessTableData.forEach((item, index) => {
                      if (item.section && item.section !== lastSection) {
                        groupedRows.push(
                          <tr key={`section-${index}`}>
                            <td
                              colSpan={2}
                              className={`${
                                isFirstSection ? "" : "mt-6"
                              } py-2 px-4 bg-gray-100`}
                            >
                              <h3 className="text-base font-bold text-gray-800">
                                {item.section}
                              </h3>
                            </td>
                          </tr>
                        );
                        lastSection = item.section;
                        isFirstSection = false;
                      }

                      groupedRows.push(
                        <tr key={index}>
                          <td className="py-2 px-4 align-top">
                            <span className="font-medium text-base text-[#000000B2] whitespace-nowrap">
                              {item.label}:
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            <span className="font-semibold text-base text-black">
                              {item.value || "N/A"}
                            </span>
                          </td>
                        </tr>
                      );
                    });

                    return groupedRows;
                  })()}
                </tbody>
              </table>
            </div>

            {fetching ? (
              <ServiceProgressShimmer count={3} className={"p-2"} />
            ) : (
              <>
                {allServices && (
                  <ServicesProgress
                    data={allServices}
                    total={totalCount}
                    heading={"Availed Services"}
                    status={"All"}
                  />
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default BusinessDetail;
