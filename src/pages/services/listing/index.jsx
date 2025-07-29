import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons";
import { Insight } from "../../../components/insight";
import { MainTab } from "../../../pages/services/components/tabs/mainTab";
import { ServicesCard } from "./components/servicesCard";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";
// import { SelectAllTabs } from "../components/tabs/selectAllTab/index";
import { useSelector, useDispatch } from "react-redux";
import { Heading } from "../../../components/heading";

import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
  updateServiceWishlist,
  removeServiceWishlist,
  updateServiceQuickWishlist,
  getMoreUserServices,
  getInitialServicesCatagory,
  getInitialServicesSubCatagory,
} from "../../../redux/actions/servicesListing-action";
// import {
//   setToggleToCheckedWishlist,
//   resetService,
//   // onChangeSelectAll,
//   resetCheckBox,
// } from "../../../redux/slices/serviceListingSlice";
import toast from "react-hot-toast";
import { Offers } from "../../../components/offers";
import { updateServiveProgress } from "../../../redux/actions/dashboard-action";
import { NoData } from "../../../components/errors/noData";
import { ImSpinner2 } from "react-icons/im";
import { MetaTitle } from "../../../components/metaTitle";
import { CategorySubCategoryTabLoader } from "../../../components/loader/CategorySubCategoryTabLoader";
import { BusinessCardShimmer } from "../../../components/loader/ProfileShimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import { LinkButton } from "../../../components/link";
const ServicesListing = () => {
  const dispatch = useDispatch();
  const { servicesMainTab } = useSelector((state) => state.app);
  // console.log(servicesMainTab, "serviceMainTab");
  const {
    category,
    subCategory,
    loading,
    loadingMore,
    page,
    limit,
    totalCount,
    totalPage,
    list,
    wishList,
  } = useSelector((state) => state.service);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isServicesFetched, setIsServicesFetched] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // console.log("list", list);
  // console.log("service totalCount:", totalCount);
  // console.log("service page:", page);
  console.log("searchValue", searchValue);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    const subCategoryId = searchParams.get("subCategoryId");

    if (categoryId) {
      // If categoryId exists in searchParams, fetch subcategories for it
      category?.list == 0 && dispatch(getInitialServicesCatagory({}));
      dispatch(getInitialServicesSubCatagory({ categoryId }))
        .unwrap()
        .then((res) => {
          const data = res?.data;
          if (!subCategoryId) {
            // If subCategoryId is missing, set the first subcategory from the fetched data
            const firstSubCat = data?.[0]?._id;
            if (firstSubCat) {
              setSearchParams({ categoryId, subCategoryId: firstSubCat });
            }
          }
        });
    } else {
      // If categoryId is missing, fetch the initial categories and subcategories
      dispatch(getInitialServicesCatagory({}))
        .unwrap()
        .then((res) => {
          const data = res?.data;
          const firstCategory = data?.[0]?._id;
          if (firstCategory) {
            dispatch(
              getInitialServicesSubCatagory({ categoryId: firstCategory })
            )
              .unwrap()
              .then((res) => {
                const subCategoryData = res?.data;
                const firstSubCat = subCategoryData?.[0]?._id;
                setSearchParams({
                  categoryId: firstCategory,
                  subCategoryId: firstSubCat,
                });
                setInitialized(true); // Mark initialization as complete
              });
          }
        });
    }
  }, [dispatch]);

  useEffect(() => {
    //  dispatch(clearUser())
  }, []);
  // useEffect(() => {
  //   if (categoryId) {
  //     dispatch(getUserServicesSubCatagory({ categoryId }));
  //   }
  // }, [categoryId]);
  // useEffect(() => {
  //   if (categoryId) {
  //     dispatch(getUserServicesSubCatagory({ categoryId }))
  //     .unwrap()
  //       .then((response) => {
  //         if (response) {
  //          console.log(response, "from suub cat")
  //           const firstSubCategoryId = response?.data?.[0]?._id; // Adjust key as per your API
  //           setSearchParams((prev) => {
  //             const params = new URLSearchParams(prev);
  //             params.set("subCategoryId", firstSubCategoryId);
  //             return params;
  //           });
  //           setIsSubCategorySet(true);
  //         }
  //       })
  //       .catch(() => {
  //         setIsSubCategorySet(false);
  //       });
  //   }
  // }, [dispatch, categoryId]);
  // useEffect(() => {
  //   if (categoryId) {
  //     // Clear only subCategoryId when categoryId changes
  //     setSearchParams((prev) => {
  //       const params = new URLSearchParams(prev);
  //       params.delete("subCategoryId"); // Only delete subCategoryId, keep categoryId
  //       params.set("categoryId", categoryId); // Always set the new categoryId
  //       return params;
  //     });

  // dispatch(getUserServicesSubCatagory({ categoryId }))
  //   .unwrap()
  //   .then((response) => {
  //     if (response?.data?.length > 0) {
  //       const firstSubCategoryId = response?.data[0]?._id;

  //       // Only update subCategoryId if it was not set or changed
  //       setSearchParams((prev) => {
  //         const params = new URLSearchParams(prev);
  //         params.set("subCategoryId", firstSubCategoryId); // Set subCategoryId to the first one
  //         return params;
  //       });

  //       setIsSubCategorySet(true);
  //     } else {
  //       setSearchParams((prev) => {
  //         const params = new URLSearchParams(prev);
  //         params.delete("subCategoryId"); // Delete subCategoryId if no sub-categories found
  //         return params;
  //       });

  //       setIsSubCategorySet(false);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching sub-categories:", error);
  //     setIsSubCategorySet(false);
  //   });
  // }
  // }, [categoryId, dispatch]);

  useEffect(() => {
    if (
      categoryId &&
      subCategoryId &&
      !subCategory?.subCategoryLoading &&
      !loading
    ) {
      const search = searchParams.get("search");
      dispatch(
        getUserServices({
          categoryId,
          subCategoryId,
          page,
          limit,
          query: search || searchValue,
        })
      );
      setIsServicesFetched(true);
      // dispatch(resetCheckBox());
    }
  }, [
    categoryId,
    subCategoryId,
    subCategory?.subCategoryLoading,
    searchValue,
    isServicesFetched,
  ]);

  useEffect(() => {
    setIsServicesFetched(false);
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    if (isSubmit && !wishList?.loading) {
      toast.success(wishList?.error);
    }
  }, [wishList?.loading]);

  let onClickWishList = (service) => {
    setIsSubmit(true);
    if (service?.wishlistCount) {
      dispatch(removeServiceWishlist({ serviceId: service?._id }));
    } else {
      dispatch(updateServiceWishlist({ serviceId: service?._id }));
    }
  };
  let onCheckHandler = (service) => {
    dispatch(setToggleToCheckedWishlist(service));
  };

  //  let onClickAddWishlistHandler = () => {
  //     const wishlistSelectedData=wishList?.list?.map(item => item._id);
  //     dispatch(updateServiceQuickWishlist({ serviceIdArray: wishlistSelectedData }));
  //     toast.success("Wishlist Created")
  //   };
  //   let onChangeSelectAllHandler = () => {
  //     dispatch(onChangeSelectAll());
  //     // document.getElementsByClassName('service-checkbox').forEach(element => {

  //     // });
  //   };

  const loadMoreServices = () => {
    if (
      categoryId &&
      subCategoryId &&
      !subCategory?.subCategoryLoading &&
      !loading &&
      !isServicesFetched
    ) {
      const search = searchParams.get("search");
      dispatch(
        getMoreUserServices({
          categoryId,
          subCategoryId,
          page: page + 1,
          limit,
          query: search || searchValue,
        })
      );
    }
  };

  return (
    <section className="flex sm:flex-row flex-col gap-6 bg-white">
      <div className="w-full flex justify-center flex-col overflow-hidden">
        <MetaTitle title={"Service"} />
        <div className="w-full space-y-6">
          {category.categoryLoading ? (
            <CategorySubCategoryTabLoader />
          ) : (
            <MainTab />
          )}
          {category.categoryLoading || subCategory?.subCategoryLoading ? (
            <CategorySubCategoryTabLoader />
          ) : (
            <Filtertab />
          )}
        </div>
        <>
          {category.categoryLoading ||
          subCategory?.subCategoryLoading ||
          loading ? (
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index}>
                  <BusinessCardShimmer />
                </div>
              ))}
            </div>
          ) : list && list.length > 0 ? (
            <InfiniteScroll
              dataLength={list?.length || 0} // Use the currently loaded data length
              next={loadMoreServices} // Load more data
              hasMore={list?.length < totalCount} // true if more data exists, false otherwise
              loader={
                <div className="flex justify-center items-center p-1">
                  <ImSpinner2 className="animate-spin text-black !text-xl" />
                </div>
              }
              endMessage={
                totalCount &&
                totalCount > 0 &&
                list?.length > 6 && (
                  <p className="py-4 font-medium text-center text-gray-500">
                    Yay! You have seen it all
                  </p>
                )
              }
            >
              <ServicesCard
                data={list}
                onClick={(service) => onClickWishList(service)}
                onCheckedChange={(val) => onCheckHandler(val)}
              />
            </InfiniteScroll>
          ) : (
            <NoData title="Unavailable at this time" icon={"services"} />
          )}
          {/* {list && list.length > 5 && (
            <div className="mt-10 flex justify-center">
              {list.length == totalCount ? (
                <></>
              ) : (
                <Button primary={true}>Load More </Button>
              )}
            </div>
          )} */}
        </>
      </div>
    </section>
  );
};
export default ServicesListing;
