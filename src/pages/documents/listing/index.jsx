import { useEffect, useState } from "react";
import { Selector } from "../../../components/select";
import { Heading } from "../../../components/heading";
import { NoData } from "../../../components/errors/noData";
import {
  getService,
  getServiceData,
  getUserDocuments,
  getUserFolders,
  loadMoreServiceData,
} from "../../../redux/actions/document-action";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { DocumentListShimmer } from "../../../components/loader/DocumentListShimmer";
import DocumentForm from "./Components";
import { IoIosSearch } from "react-icons/io";

import { Outlet } from "react-router-dom";
import { getBusinessDropdown } from "../../../redux/actions/businessPage-action";
import { MdOutlineClear } from "react-icons/md";

const DocumentsListing = () => {
  const selectBtn = window.location.pathname.split("/").includes("your-files");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const { businessDropDown, isLoading: businessLoading } = useSelector(
    (state) => state.businessList
  );

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    dispatch(getBusinessDropdown());
  }, [dispatch]);
  const {
    documentList: services = [],
    dataList: folders = [],
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
  } = useSelector((state) => state.document);

  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const { id } = useParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  console.log(isDataLoading , "isDataLoading")
  useEffect(() => {
    dispatch(getService());
    const search = searchParams.get("search");
    dispatch(getServiceData({ formId: "", serviceId: "", search }));
    // dispatch(getUserFolders());
    // dispatch(getUserDocuments());
  }, []);

  

  const handleFolderClick = (_id) => {
    navigate(`/documents/folderdetail/${_id}`);
  };

  const servicesOptions = Array.isArray(services)
    ? services.map((item) => ({
        label: item.serviceName,
        value: item.serviceId,
        formId: item.formId,
      }))
    : [];
  const handleFileModal = (id = null, folderId) => {
    setSelectedId(id); // Set the selected id for file editing
    setOpenFile(!openFile);
    setFolderId(folderId);
  };

  // Function to toggle folder modal with id
  const handleFolderModal = (id) => {
    console.log("called");
    const data = folders.find((document) => document._id === id);
    console.log(data, "doc data");
    setSelectedId(id); // Set the selected id for folder editing
    setOpenFolder(!openFolder);
  };
  const handleServiceSelection = (selectedOption) => {
    dispatch(
      getServiceData({
        formId: selectedOption?.formId,
        serviceId: selectedOption?.value,
      })
    );
    setSelectedServiceInfo({
      formId: selectedOption.formId,
      serviceId: selectedOption.value,
    });
  };

  console.log(location.pathname, "locaton.pathname");

  let activeTab = "";
  switch (true) {
    case location.pathname === "/documents/your-files":
      activeTab = "your-files";
      break;

    case location.pathname === "/documents/your-documents":
      activeTab = "your-documents";
      break;

    case /^\/documents\/detail\/[a-f\d]{24}$/i.test(location.pathname):
      activeTab = "your-documents";
      break;

    default:
      activeTab = "";
      break;
  }

  const options = [
    {
      label: "Create folder",
      value: "create-folder",
    },
    {
      label: "Upload Document",
      value: "upload-document",
    },
  ];

  const handleSelectorChange = (selectedOption) => {
    console.log(selectedOption, "selected option");
    if (selectedOption.value === "create-folder") {
      // Open the folder modal when "Create Folder" is selected
      handleFolderModal();
      // setOpenFolder(true);
      setOpenFile(false); // Ensure the file modal is closed
    } else if (selectedOption.value === "upload-document") {
      // Open the file modal when "Upload Document" is selected
      setOpenFile(true);
      setOpenFolder(false); // Ensure the folder modal is closed
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchInput }, { replace: true });
  };
  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchInput("");
    setSearchParams(newParams); // This is necessary to apply the change
  };
  console.log(folders, "folders")
  return (
    <>
      <Heading title={"Documents"} tourButton={false}>
        Documents {total != "" ? `(${total})` : ""}
      </Heading>
      <div className="my-4 flex flex-wrap gap-4">
        <Link
          to="/documents"
          className={`p-2 ${
            activeTab === "" ? "bg-[#B5D8FF] font-semibold" : "bg-[#F1F1F1]"
          } rounded-md text-sm cursor-pointer`}
        >
          Services Files
        </Link>

        <Link
          to="/documents/your-files"
          className={`p-2 ${
            activeTab === "your-files"
              ? "bg-[#B5D8FF] font-semibold"
              : "bg-[#F1F1F1]"
          } rounded-md text-sm cursor-pointer`}
        >
          Your Folders
        </Link>

        <Link
          to="/documents/your-documents"
          className={`p-2 ${
            activeTab === "your-documents"
              ? "bg-[#B5D8FF] font-semibold"
              : "bg-[#F1F1F1]"
          } rounded-md text-sm cursor-pointer`}
        >
          Your Documents
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {!window.location.pathname.includes("detail") && (
          <Selector
            isClearable={true}
            label={"Folders"}
            placeholder={"Select Services"}
            options={servicesOptions}
            onChange={(selectedOption) => {
              const updatedServiceInfo = {
                ...selectedServiceInfo,
                serviceId: selectedOption ? selectedOption.value : "",
                formId: selectedOption ? selectedOption.formId : "",
              };
              setSelectedServiceInfo(updatedServiceInfo);
              dispatch(getServiceData(updatedServiceInfo));
            }}
            value={
              selectedServiceInfo?.serviceId
                ? servicesOptions.find(
                    (option) => option.value === selectedServiceInfo.serviceId
                  )
                : null
            }
          />
        )}

        {!window.location.pathname.includes("detail") && (
          <Selector
            isClearable={true}
            placeholder={"Select Business"}
            options={businessDropDown}
            onChange={(selectedOption) => {
              const updatedServiceInfo = {
                ...selectedServiceInfo,
                businessId: selectedOption ? selectedOption.value : "",
              };
              setSelectedServiceInfo(updatedServiceInfo);
              dispatch(getServiceData(updatedServiceInfo));
            }}
            value={
              selectedServiceInfo?.businessId
                ? businessDropDown?.find(
                    (option) => option.value === selectedServiceInfo.businessId
                  )
                : null
            }
          />
        )}
      </div>

      <div>
        {isDataLoading ? (
          <div className="flex justify-center items-center py-8">
            <DocumentListShimmer count={5} />
          </div>
        ) : folders.length > 0 ? (
          <Outlet />
        ) : (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <NoData title="Unavailable at this time" icon={"services"} />
          </div>
        )}
        <div>
</div>
  
      </div>

      {
        <DocumentForm
          open={openFile}
          handleOpen={() => setOpenFile(false)}
          modalType="file"
          folderId={folderId}
          // id={selectedId}
          loading={uploadUserDocuments}
        />
      }
      {
        <DocumentForm
          open={openFolder}
          handleOpen={() => setOpenFolder(false)}
          modalType="folder"
          id={selectedId}
          loading={addUserFolder}
        />
      }
    </>
  );
};

export default DocumentsListing;
