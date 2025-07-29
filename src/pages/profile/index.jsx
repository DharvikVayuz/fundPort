import { useEffect } from "react";
import ProfileCard from "../profile/components/profileCard";
import { Business } from "../dashboard/components/business";
import { ServicesProgress } from "../dashboard/components/services/progress";
import { servicesProgress, businessListing } from "../../database";
import { getUser, getUserBusiness, updateServiveProgress } from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import BusinessListing from "../business/listing";
import { BusinessCardShimmer } from "../../components/loader/BusinessCardShimmer";
import { ServiceProgressShimmer } from "../../components/loader/ServiceProgressShimmer";
//import{BusinessDetail} from "../business/listing/index";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, dataUpdate, loading, business, businessLoading, fetching } = useSelector((state) => state.dashboard);

  const {
    holdServices,
    allServices, 
    completedServices,
    totalCount,
    completedServiceTotal,
    holdServiceTotal,
    inProgress
  } = useSelector((state) => state.dashboard)

  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  //console.log(business?.list?.length,"Profile Business");

console.log(allServices, "allServices")
  useEffect(() => {
    if (!user?.email) {
      dispatch(getUser());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   business?.list?.length==0
  //   dispatch(getUser());
  // }, [dispatch]);
  // useEffect(() => {

  //     dispatch(getUserBusiness());

  useEffect(() => {
    if (business?.list?.length === 0) {
      dispatch(getUserBusiness({ query: searchValue ? searchValue : "" }));
    }
    // dispatch(getUserServices({ query: searchValue ? searchValue : "" }));
  }, [searchValue, business?.list?.length, dispatch]);

  // useEffect(() => {
  //   if (dataUpdate?.data?.length == 0 || dataUpdate?.data?.length == undefined) {
  //     dispatch(updateServiveProgress({ page: 1 }));
  //   }
  // }, []);
  useEffect(() => {
    dispatch(updateServiveProgress({ page: 1, status: '' }));
    // dispatch(updateServiveProgress({ page: 1, status: 'completed' }));
    // dispatch(updateServiveProgress({ page: 1, status: 'inProgress' }));
  }, [dispatch, holdServices?.length > 0, completedServices?.length > 0, inProgress?.length>0]);


  return (
    <>
      <div className="flex flex-col gap-1 pb-4">
        <ProfileCard userData={user} loading={loading} />
        {businessLoading ? (<BusinessCardShimmer />) : (<Business data={business?.list} total={business?.totalPage} />)}

        {fetching ? (
          <ServiceProgressShimmer count={1} className={"p-2"} />
        ) : (
          <>
            {allServices && allServices?.data?.length > 0 && <ServicesProgress isSlice={false} data={allServices ? allServices : []} total={totalCount} heading={"In Progress"} status={"inProgress"} />}
          </>
        )}
        {fetching ? (
          <ServiceProgressShimmer count={1} className={"p-2"} />
        ) : (
          <>
            {holdServices && holdServices?.data?.length > 0 && <ServicesProgress data={holdServices} total={holdServiceTotal} heading={"Hold"} status={"hold"} />}
          </>
        )}
        {fetching ? (
          <ServiceProgressShimmer count={1} className={"p-2"} />
        ) : (
          <>
            {completedServices && completedServices?.data?.length > 0 && <ServicesProgress data={completedServices} total={completedServiceTotal} heading={"Completed Services"} status={"completed"} />}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
