import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServicesMainTab } from "../../../../redux/slices/appSlice";
import { useSearchParams } from "react-router-dom";

export const MainTab = () => {
  const [mainactiveTab, setmainActiveTab] = useState(0);
 const [searchParams, setSearchParams] = useSearchParams({});  
  const dispatch = useDispatch();

  const mainTabs = [
    { name: "Basic Details" },
    { name: "Service Step" },
    { name: "Service Subscriptions" },
    { name: "Service FAQs" },
    { name: "Service Videos" },
    { name: "Service Testimonials" },
  ];

  // const handleMainTab = (index, tabToSet) => {
  //   setmainActiveTab(index);
  //   switch(index){
  //       case 0:
  //           setSearchParams({ tab: "basic-details" });
  //           break;
  //       case 1:
  //           setSearchParams({ tab: "service-steps" });
  //           break;
  //       case 2:
  //           setSearchParams({ tab: "service-subscriptions" });
  //           break;
  //       case 3:
  //           setSearchParams({ tab: "service-faqs" });
  //           break;
  //       default:
  //           setSearchParams({ tab: "basic-details" });
  //           break;
  //   }
  //   dispatch(setServicesMainTab(index));
  // };
  const handleMainTab = (index, tabToSet) => {
    setmainActiveTab(index);

    // Get the current search parameters
    const currentParams = new URLSearchParams(window.location.search);

    // Update the tab parameter without affecting others
    switch (index) {
        case 0:
            currentParams.set("tab", "basic-details");
            break;
        case 1:
            currentParams.set("tab", "service-steps");
            break;
        case 2:
            currentParams.set("tab", "service-subscriptions");
            break;
        case 3:
            currentParams.set("tab", "service-faqs");
            break;
        case 4:
            currentParams.set("tab", "service-videos");
            break;
        case 5:
            currentParams.set("tab", "service-testimonials");
            break;
        default:
            currentParams.set("tab", "basic-details");
            break;
    }

    // Update the search parameters
    setSearchParams(currentParams);

    // Dispatch the main tab change
    dispatch(setServicesMainTab(index));
};


  useEffect(()=>{
    switch(searchParams.get('tab')){
        case 'basic-details':
            setmainActiveTab(0);
            break;
        case 'service-steps':
            setmainActiveTab(1);
            break;
        case 'service-subscriptions':
            setmainActiveTab(2);
            break;
        case 'service-faqs':
            setmainActiveTab(3);
            break;
        case 'service-videos':
            setmainActiveTab(4);
            break;
        case 'service-testimonials':
            setmainActiveTab(5);
            break;
        default:
            setmainActiveTab(0);
            break;
    }
  })
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4  ">
        {mainTabs.map((tab, index) => (
          <button
            key={index}
            className={`sm: ${
              mainactiveTab === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2 "
                : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => handleMainTab(index, tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </>
  );
};