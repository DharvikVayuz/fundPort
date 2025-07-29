import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table } from "../../../components/table";
import { Button } from "../../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionHistoryCount,
  getSubscriptions,
} from "../../../redux/actions/settings-actions";
import { ImSpinner2 } from "react-icons/im";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { NoData } from "../../../components/errors/noData";
import Pagination from "../../../components/Pagination";
import { formatDate } from "../../../utils";

const SubscriptionHistory = () => {
  const [packageType, setPackageType] = useState("");
  const [packageIndex, setPackageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const subscriptionType = searchParams.get("subscriptionType");
  const columns = [
    { header: "Subscription", accessor: "subscription" },
    { header: "Status", accessor: "status" },
    { header: "Amount", accessor: "amount" },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Renew Date", accessor: "renewDate" },
    { header: "Subscription Type", accessor: "type" },
    ...(subscriptionType === "expired"
      ? [{ header: "Actions", accessor: "actions" }]
      : []),
  ];
  const dispatch = useDispatch();
  const {
    activeCount,
    isActiveLoading,
    expiredCount,
    upcomingCount,
    isExpiredLoading,
    isUpcommingLoading,
    subscriptionsData,
    subscriptionTotal,
    isSubScriptionLoading,
  } = useSelector((state) => state.settings);

  const FormattedSubscriptions = subscriptionsData?.map((subscription) => {
    const {
      amount,
      active,
      paymentMode,
      subscriptionExpireyDate,
      service_data,
      subscriptionDetails,
      serviceDetails,
      serviceId,
    } = subscription;

    console.log(subscriptionDetails?.title, "subscriptionDetails");
    return {
      id: {
        serviceId: serviceId,
      },
      _id: {
        serviceId: serviceId,
      },
      subscription: subscriptionDetails ? subscriptionDetails?.title : "N/A",
      status: active ? "Active" : "",
      amount: amount,
      paymentMethod: paymentMode,
      renewDate: formatDate(subscriptionExpireyDate),
      plan: subscriptionDetails?.type ? subscriptionDetails?.type : "N/A",
    };
  });

  useEffect(() => {
    dispatch(getSubscriptionHistoryCount({ type: "active" }));
    dispatch(getSubscriptionHistoryCount({ type: "expired" }));
    dispatch(getSubscriptionHistoryCount({ type: "up-coming" }));
  }, []);

  const handleNavigation = (button) => {
    let newIndex;

    if (button === "Previous") {
      // Move to previous subscription, wrap around if necessary
      newIndex =
        packageIndex > 0 ? packageIndex - 1 : subscriptionPackage.length - 1;
    } else if (button === "Next") {
      // Move to next subscription, wrap around if necessary
      newIndex =
        packageIndex < subscriptionPackage.length - 1 ? packageIndex + 1 : 0;
    }

    // Update packageIndex
    setPackageIndex(newIndex);

    // Get the current subscription type (active, expired, upcoming)
    const currentLabel = subscriptionPackage[newIndex].label;

    // Determine the type for the API call based on the current label
    const type =
      currentLabel === "Active Subscription"
        ? "active"
        : currentLabel === "Expired Subscription"
        ? "expired"
        : "up-coming";

    // Dispatch with the correct type
    dispatch(getSubscriptions({ page: 1, type }));
  };
  const navigateToServiceDetail = (id) => {
    navigate(`/services/detail/${id}`);
  };
  const actionMenu = (id, _id) => {
    return (
      <div className="flex py-2 justify-evenly items-center">
        <Button primary={true} onClick={() => navigateToServiceDetail(id)}>
          Renew Subscription
        </Button>
      </div>
    );
  };
  const subscriptionPackage = [
    {
      number: activeCount ? activeCount : 0,
      label: "Active Subscription",
      description: "Manage all your active subscriptions efficiently.",
      loading: isActiveLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : [],
    },
    {
      number: expiredCount ? expiredCount : 0,
      label: "Expired Subscription",
      description: "Manage all your expired subscriptions efficiently.",
      loading: isExpiredLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : [],
    },
    {
      number: upcomingCount ? upcomingCount : 0,
      label: "Upcoming Renewals",
      description: "Manage all your upcoming renewals efficiently.",
      loading: isUpcommingLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : [],
    },
  ];
  const currentPackage = subscriptionPackage[packageIndex];

  const handleCard = (label, data) => {
    if (data.number === 0) {
      return;
    }
    setPackageType(label);
    const index = subscriptionPackage.findIndex((pkg) => pkg.label === label);

    setPackageIndex(index);
    setSearchParams({
      subscriptionType:
        label == "Active Subscription"
          ? "active"
          : label == "Expired Subscription"
          ? "expired"
          : "up-coming",
    });
    dispatch(
      dispatch(
        getSubscriptions({
          page: 1,
          type:
            label == "Active Subscription"
              ? "active"
              : label == "Expired Subscription"
              ? "expired"
              : "up-coming",
        })
      )
    );
  };

  useEffect(() => {
    const subscriptionType = searchParams.get("subscriptionType");

    // Only proceed if subscriptionType is truthy
    if (!subscriptionType) return;

    // Dispatch the action with the valid subscriptionType
    dispatch(getSubscriptions({ page: 1, type: subscriptionType }));
  }, [searchParams, dispatch]);

  return (
    <div>
      {searchParams.get("subscriptionType") ? (
        <>
          {currentPackage ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 font-semibold text-xl text-[#0A1C40]">
                <button
                  onClick={() => navigate("/settings/subscription-history")}
                >
                  <GoArrowLeft />
                </button>
                <p>
                  {searchParams.get("subscriptionType") == "active"
                    ? "Active Subscription"
                    : searchParams.get("subscriptionType") == "expired"
                    ? "Expired Subscription"
                    : "Up-Coming Subscription"}
                </p>
              </div>
              <h4 className="font-semibold text-lg">
                {currentPackage.description}
              </h4>
              {/* {isSubScriptionLoading ? (<TableShimmer />) : <Table columns={columns} data={currentPackage.data} />} */}
              {isSubScriptionLoading ? (
                <TableShimmer />
              ) : currentPackage.data.length === 0 ? (
                <NoData />
              ) : (
                <>
                  <p>
                    <b>{subscriptionTotal}</b> results
                  </p>
                  <Table
                    columns={columns}
                    data={currentPackage.data}
                    isExpandable={false}
                    isExpandableData={currentPackage?.description}
                    actionMenu={
                      subscriptionType === "expired" ? actionMenu : null
                    }
                  />
                </>
              )}
              <div className="flex justify-end items-center gap-3">
                {/* <p>
                  <b>{subscriptionTotal}</b> results
                </p> */}
                <div className="flex items-center gap-2">
                  {/* <Button
                    onClick={() => handleNavigation("Previous", currentPackage.label)}
                    outline={true}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => handleNavigation("Next", currentPackage.label)}
                    outline={true}
                  >
                    Next
                  </Button> */}
                  {!isSubScriptionLoading && subscriptionTotal > 10 && (
                    <Pagination
                      totalItems={subscriptionTotal}
                      itemsPerPage={10}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {" "}
          <h4 className="font-semibold text-lg">
            Handle your subscription packages here
          </h4>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {subscriptionPackage.map((data, index) => (
              <Card
                key={index}
                number={data.number}
                label={data.label}
                description={data.description}
                onClick={() => handleCard(data.label, data)}
                loading={data.loading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionHistory;

const Card = ({ number, label, description, onClick, loading }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-start gap-6 px-5 py-5 border border-[#DFEAF2] hover:bg-[#0A1C40] cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out rounded-[20px] ${
        number > 0 ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {loading ? (
        <ImSpinner2 className="animate-spin text-gray hover:text-white !text-xl" />
      ) : (
        <h2 className="font-semibold text-3xl">{number}</h2>
      )}

      <div>
        <label className="font-semibold text-base">{label}</label>
        <p className="text-sm">{description}</p>
      </div>
      {!loading && number > 0 && (
        <button className="text-sm text-[#808080] hover:text-[#0A1C40]">
          View All
        </button>
      )}
    </div>
  );
};
