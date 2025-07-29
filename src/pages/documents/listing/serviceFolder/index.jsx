import React, { useEffect, useState } from "react";
import { Selector } from "../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { DocumentListShimmer } from "../../../../components/loader/DocumentListShimmer";
import { getServiceData, loadMoreServiceData } from "../../../../redux/actions/document-action";
import { NoData } from "../../../../components/errors/noData";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
export const ServiceFolder = () => {
  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    documentList: services = [],
    dataList = [],
    isLoading,
    isdocumentLoading,
    isDataLoading,
    listData,
    fetchingDocumentError,
    userFolders,
    totalUserFolders,
    userDocumentsLoading,
    userFoldersLoading,
    totalUserDocuments,
    userDocuments,
    uploadUserDocuments,
    addUserFolder,
    total,
    page
  } = useSelector((state) => state.document);
  const servicesOptions = Array.isArray(services)
    ? services.map((item) => ({
        label: item.serviceName,
        value: item.serviceId,
        formId: item.formId,
      }))
    : [];
  // useEffect(() => {
  //     dispatch(getServiceData({ formId: "", serviceId: "" }));
  //   }, []);

  console.log(dataList, "dataList");
  const navigateToViewDocument = (id) => {
    navigate(`/user-documents/folder-documents/${id}`);
  };

  const loadMoreHandler = () => {
  dispatch(loadMoreServiceData({
    formId: "",
    serviceId: "",
    page: page + 1
  }));
};
  return (
    <div>
      <div className="w-56"></div>
      {/* <div className='flex justify-between my-4'>
        <div className='font-semibold'>Services Folders</div>
      </div> */}
      {isDataLoading ? (
        <DocumentListShimmer count={5} />
      ) : dataList?.length > 0 ? (
        // <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 my-5 mb-16">
        //   {dataList.map((item) => (
        //     <div
        //       key={item._id}
        //       onClick={() => navigateToViewDocument(item?._id)}
        //       className="cursor-pointer p-3 rounded-lg bg-white border hover:shadow-md flex flex-col items-center"
        //     >
        //       <div className="w-20 h-20">
        //         <img
        //           className="w-full h-full object-contain"
        //           src="/icons/documents/document.svg"
        //           alt="document-icon"
        //         />
        //       </div>

              
        //       <div className="mt-2 text-sm md:text-[12px] font-semibold text-center break-all">
        //         {item.serviceName}
        //       </div>

        //       <div className="mt-1 text-[12px] md:text-[10px] font-semibold text-gray-500 text-center">
        //         {item.caseId}
        //       </div>
        //     </div>
        //   ))}
          

        // </div>
        <InfiniteScroll
  dataLength={dataList.length}
  next={loadMoreHandler}
  hasMore={dataList.length < total}
  loader={<DocumentListShimmer count={2} />}
  endMessage={
    <p className="text-center text-xs text-gray-500 mt-4">No more folders to load.</p>
  }
>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 my-5 mb-16">
    {dataList.map((item) => (
      <div
        key={item._id}
        onClick={() => navigateToViewDocument(item?._id)}
        className="cursor-pointer p-3 rounded-lg bg-white border hover:shadow-md flex flex-col items-center"
      >
        <div className="w-20 h-20">
          <img
            className="w-full h-full object-contain"
            src="/icons/documents/document.svg"
            alt="document-icon"
          />
        </div>
        <div className="mt-2 text-sm md:text-[12px] font-semibold text-center break-all">
          {item.serviceName}
        </div>
        <div className="mt-1 text-[12px] md:text-[10px] font-semibold text-gray-500 text-center">
          {item.caseId}
        </div>
      </div>
    ))}
  </div>
</InfiniteScroll>
      ) : (
        <div className="text-center text-gray-500 my-5 text-sm md:text-base">
          <NoData />
        </div>
      )}
    </div>
  );
};
