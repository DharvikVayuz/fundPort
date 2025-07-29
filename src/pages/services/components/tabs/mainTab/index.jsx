import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserServicesSubCatagory, getMoreUserServices } from "../../../../../redux/actions/servicesListing-action";

export const MainTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, subCategory, loading } = useSelector((state) => state.service);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const dispatch = useDispatch();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);
  const tabRefs = useRef([]);

  // Check if scrolling is needed
  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  useEffect(() => {
    if (tabRefs.current[activeTabIndex]) {
      tabRefs.current[activeTabIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    checkOverflow();
  }, [activeTabIndex, category?.list]);

  useEffect(() => {
    const categoryIdFromParams = searchParams.get("categoryId");
    if (category?.list?.length && categoryIdFromParams) {
      const foundIndex = category.list.findIndex((tab) => tab._id === categoryIdFromParams);
      if (foundIndex !== -1) {
        setActiveTabIndex(foundIndex);
        dispatch(setSelectedCategory(category.list[foundIndex]));
      } else {
        setActiveTabIndex(0);
        dispatch(setSelectedCategory(category.list[0]));
        setSearchParams({ categoryId: category.list[0]._id });
      }
    }
    checkOverflow();
  }, [searchParams, category?.list, dispatch, setSearchParams]);

  const handleMainTab = (index) => {
    searchParams.delete("subCategory");
    if (category?.list?.[index]) {
      dispatch(setSelectedCategory(category?.list[index]));
      setSearchParams({ categoryId: category?.list[index]?._id });
      setActiveTabIndex(index);
      callSubCat(category?.list[index]?._id, index);
    }
  };

  const callSubCat = (categoryId, index) => {
    dispatch(getUserServicesSubCatagory({ categoryId }))
      .unwrap()
      .then((response) => {
        if (response?.data?.length > 0) {
          const firstSubCategoryId = response?.data[0]?._id;
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("categoryId", category?.list[index]?._id);
            params.set("subCategoryId", firstSubCategoryId);
            return params;
          });
        } else {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("subCategoryId");
            params.set("categoryId", category?.list[index]?._id);
            return params;
          });
          dispatch(getMoreUserServices({ categoryId }));
        }
      })
      .catch((error) => console.error("Error fetching sub-categories:", error));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -500, behavior: "smooth" });
      setTimeout(checkOverflow, 500); // Delay check to ensure visibility updates
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 500, behavior: "smooth" });
      setTimeout(checkOverflow, 500);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left Arrow Button */}
      {isOverflowing && canScrollLeft && (
        <button onClick={scrollLeft} className="z-10">
          <IoIosArrowBack color="#0A1C40" size={20} />
        </button>
      )}

      <div
        className="flex items-center gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap border-b"
        ref={scrollContainerRef}
        onScroll={checkOverflow}
      >
        {category.list.map((tab, index) => (
  <button
    key={index}
    disabled={subCategory?.subCategoryLoading || loading}
    ref={(el) => (tabRefs.current[index] = el)}
    className={`${
      activeTabIndex === index
        ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded"
        : "font-normal text-sm py-1 text-[#7E7E7E] hover:text-[#0A1C40] hover:font-semibold hover:border-b-4 hover:border-[#F1359C]"
    } ${
      subCategory?.subCategoryLoading || loading
        ? "opacity-50 cursor-not-allowed"
        : "transition-all duration-200"
    } !text-[16px] `}
    onClick={() => handleMainTab(index)}
  >
    {tab.categoryName}
  </button>
))}

      </div>

      {/* Right Arrow Button */}
      {isOverflowing && canScrollRight && (
        <button onClick={scrollRight} className="z-10">
          <IoIosArrowForward color="#0A1C40" size={20} />
        </button>
      )}
    </div>
  );
};
