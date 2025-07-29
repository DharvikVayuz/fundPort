import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUser,
  getUserBusiness,
  requestChangeManager,
  updateServiveProgress,
} from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import { Advertisement } from "./components/adverstisement";
import { RecommendedServices } from "./components/services/recommended";
import { ServicesProgress } from "./components/services/progress";
import { Business } from "./components/business";
import { recommendedServiceListing } from "../../redux/actions/servicesListing-action";
import { RecommendedServiceCardShimmer } from "../../components/loader/RecommendedServiceCardShimmer";
import { Heading } from "../../components/heading";
import { ServiceProgressShimmer } from "../../components/loader/ServiceProgressShimmer";
import { BusinessCardShimmer } from "../../components/loader/BusinessCardShimmer";
import { clearEmail } from "../../redux/slices/userAuth-slice";
import {
  getAllMessage,
  getMessagesCount,
} from "../../redux/actions/message.action";
import { handleModalOpen } from "../../redux/slices/dashboardSlice";
import { getNotificationCount } from "../../redux/actions/notification-action";

const Dashboard = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(() =>
    localStorage.getItem("userInfo")
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const { businessId } = useSelector((state) => state.business);
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const url = window.location.href;

  const {
    business,
    businessLoading,

    // fetching,
    // holdServices,
    // completedServices,
    // totalCount,
    // completedServiceTotal,
    // holdServiceTotal
  } = useSelector((state) => state.dashboard);

  const {
    fetching,
    holdServices,
    completedServices,
    totalCount,
    completedServiceTotal,
    holdServiceTotal,
    inProgress,
  } = useSelector((state) => state.dashboard);
  const { email } = useSelector((state) => state.auth);
  const {
    bannerAdvertisementList,
    isbannerAdvertisementLoading,
    isupdatebannerLoading,
    updatebannerAdvertisementList,
    isChangeManagerOpen,
    isChangeManagerLoading,
  } = useSelector((state) => state.dashboard);

  const { recommendedServiceList, isRecommendedServiceLoading } = useSelector(
    (state) => state.service
  );

  const formattedRecommendedServices = recommendedServiceList?.map(
    (service) => {
      return {
        _id: service?._id,
        name: service.service[0]?.name,
        details: service.service[0]?.details,
      };
    }
  );

  useEffect(() => {
    dispatch(getAllMessage());
    dispatch(getMessagesCount());
    dispatch(getNotificationCount());
  }, []);

  useEffect(() => {
    if (email) {
      dispatch(clearEmail());
    }
  });
  useEffect(() => {
    dispatch(updateServiveProgress({ page: 1, status: "hold" }));
    dispatch(updateServiveProgress({ page: 1, status: "closed" }));
    dispatch(updateServiveProgress({ page: 1, status: "inProgress" }));
  }, [
    dispatch,
    holdServices?.length > 0,
    completedServices?.length > 0,
    inProgress?.length > 0,
  ]);

  console.log(
    totalCount,
    completedServiceTotal,
    holdServiceTotal,
    "inProgress"
  );
  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserBusiness({ query: searchValue ? searchValue : "" }));
    // dispatch(getUserServices({ query: searchValue ? searchValue : "" }));
  }, [searchValue]);
  useEffect(() => {
    
      dispatch(recommendedServiceListing());
  }, []);

  const onConfirmationModalClose = () => {
    dispatch(handleModalOpen(false));
  };
  const handleRequestCallBack = () => {
    dispatch(requestChangeManager());
  };

  useEffect(() => {
    if (!isChangeManagerLoading) {
      dispatch(handleModalOpen(false));
    }
  }, [isChangeManagerLoading]);
  // const dispatch = useDispatch();

  return (
    <>
      {/* <TourComponent steps={steps}/> */}
      <Heading title={"Dashboard"}></Heading>
      <section className="flex flex-col gap-1">
        <Advertisement />
        {businessLoading ? (
          <>
            <BusinessCardShimmer />
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <RecommendedServiceCardShimmer />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Business
            data={business?.list}
            total={business?.totalPage}
            target={"corpzo-dashboard-step-16"}
          />
        )}
        
        <div>
        <div className="">
 {(totalCount>0 || completedServiceTotal > 0 || holdServiceTotal > 0) && <h2 className="text-xl font-bold text-[#0A1C40]">My Services</h2>}
</div>
        {fetching ? (
          <ServiceProgressShimmer count={3} className={"p-2"} />
        ) : (
          <>
            {inProgress && inProgress?.data?.length > 0 && (
              <ServicesProgress
                data={inProgress ? inProgress : []}
                total={totalCount}
                heading={"In Progress"}
                status={"inProgress"}
              />
            )}
          </>
        )}
        {fetching ? (
          <ServiceProgressShimmer count={3} className={"p-2"} />
        ) : (
          <>
            {holdServices && holdServices?.data?.length > 0 && (
              <ServicesProgress
                data={holdServices}
                total={holdServiceTotal}
                heading={"Hold"}
                status={"hold"}
              />
            )}
          </>
        )}
        {fetching ? (
          <ServiceProgressShimmer count={3} className={"p-2"} />
        ) : (
          <div className="mb-8">
            {completedServices && completedServices?.data?.length > 0 && (
              <ServicesProgress
                data={completedServices}
                total={completedServiceTotal}
                heading={"Completed Services"}
                status={"closed"}
              />
            )}
          </div>
        )}

        {isRecommendedServiceLoading ? (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-6">
            {Array.from({ length: 2 }, (_, index) => (
              <RecommendedServiceCardShimmer key={index} />
            ))}
          </div>
        ) : (
          <RecommendedServices
            target={""}
            data={formattedRecommendedServices}
            total={formattedRecommendedServices?.length}
          />
        )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
