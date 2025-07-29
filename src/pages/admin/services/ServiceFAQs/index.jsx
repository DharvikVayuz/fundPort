import { useEffect, useState } from "react";
import { Checkbox } from "../../../../components/inputs/checkbox";
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import TitleComponent from '@/components/common/TitleComponent';
// import TableShimmer from '@/components/common/TableShimmer';
import {
  addServiceFaq,
  getServiceFaqs,
} from "../../../../redux/admin/actions/services";
// import HeaderTitle from "@/components/common/HeaderTitle";
// import Breadcrumb from "@/widgets/layout/TopNavigation";
import { Button } from "../../../../components/buttons";
const ServiceFaqs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const { serviceId } = useParams();
  const [selectAll, setSelectAll] = useState(false); // Add state for "Select All"
  const [searchParams] = useSearchParams({});
  const { serviceFaqs, isFetching, isAdding } = useSelector(
    (state) => state.adminService
  );

  // Fetch service faqs based on service Id
  useEffect(() => {
    dispatch(
      getServiceFaqs(
        searchParams.get("serviceId") || "677b9db7c6e0d47d44a6e5e8"
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (serviceFaqs && serviceFaqs.length > 0) {
      const selected = serviceFaqs
        .filter((faq) => faq.is_faq_added)
        .map((faq) => faq._id);
      setSelectedIds(selected);
    }
  }, [serviceFaqs]);

  const handleCheckboxChange = (faqId) => {
    if (selectedIds.includes(faqId)) {
      // Remove the ID from selectedIds
      setSelectedIds(selectedIds.filter((id) => id !== faqId));
    } else {
      // Add the ID to selectedIds
      setSelectedIds([...selectedIds, faqId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]); // Deselect all
    } else {
      const allIds = serviceFaqs.map((faq) => faq._id); // Select all
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll); // Toggle "Select All" state
  };

  // const handleSelectAll = () => {
  //     if (selectAll) {
  //         const previouslySelected = serviceFaqs
  //             .filter(faq => faq.is_faq_added)
  //             .map(faq => faq._id);
  //         setSelectedIds(previouslySelected);
  //     } else {
  //         const allIds = serviceFaqs.map(faq => faq._id);
  //         setSelectedIds([...new Set([...selectedIds, ...allIds])]);
  //     }
  //     setSelectAll(!selectAll);
  // };

  useEffect(() => {
    if (serviceFaqs?.length > 0 && selectedIds.length === serviceFaqs.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedIds, serviceFaqs]);

  const onSubmitChecked = () => {
    const faqData = {
      serviceId: "677b9db7c6e0d47d44a6e5e8",
      faqIdArray: selectedIds,
    };
    dispatch(addServiceFaq(faqData, navigate));
    console.log(faqData, "selected faqs ka data");
  };
  const breadcrumbData = [
    {
      name: "Service FAQs",
    },
  ];
  return (
    <>
      {/* <TitleComponent title={"CORPZO | Service FAQs"}></TitleComponent>
            <HeaderTitle title="Service FAQs" />
            <Breadcrumb items={breadcrumbData} /> */}
      <div className="w-full h-full mt-4">
        <div className="flex gap-6 justify-between items-center w-full"></div>

        {isFetching ? (
          "loading"
        ) : (
          <div>
            {serviceFaqs && serviceFaqs?.length > 0 ? (
              <div className="w-full">
                <div className="mb-1 flex gap-6 items-center">
                  <div className="flex items-center">
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                    <label className="">Select All</label>
                  </div>
                  <Button
                    primary={true}
                    onClick={onSubmitChecked}
                    disabled={isAdding}
                    isLoading={isAdding}
                  >
                    {isAdding ? (
                      <div className="flex justify-center items-center gap-3">
                        {"Adding FAQs"}
                      </div>
                    ) : (
                      "Add FAQs"
                    )}
                  </Button>
                </div>
                <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 p-1">
                  {serviceFaqs &&
                    serviceFaqs.map((serviceFaq) => (
                      <div className="shadow-md rounded-md px-2 py-1 flex justify-between items-center">
                        <NavLink
                          className="w-[80%]"
                          to={`/dashboard/admin/FAQ/view-faq/${serviceFaq.faqId}`}
                        >
                          {serviceFaq.question.slice(0, 15)}...
                        </NavLink>
                        <Checkbox
                          checked={selectedIds.includes(serviceFaq._id)}
                          onChange={() => handleCheckboxChange(serviceFaq._id)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-screen">
                <img
                  src="/img/nodata_svg.svg"
                  className="w-[50%]"
                  alt="No data found"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceFaqs;
