import { useEffect, useState } from "react";
import { Selector } from "../../../../components/select";
import { Heading } from "../../../../components/heading";
import { NoData } from "../../../../components/errors/noData";
import {
  getService,
  getServiceData,
  getUserDocuments,
  getUserFolders,
} from "../../../../redux/actions/document-action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DocumentListShimmer } from "../../../../components/loader/DocumentListShimmer";
import DocumentForm from "../Components";
import { Button } from "../../../../components/buttons";
import DocumentViewer from "../../detail/Components";
// import { ConfirmationModal } from "../../../components/modal/confirmationModal";

const ViewAllDocuments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openFile, setOpenFile] = useState(false); // For file modal
  const [openFolder, setOpenFolder] = useState(false); // For folder modal
  const [selectedId, setSelectedId] = useState(null); // To store the ID of the item being edited
  const [folderId, setFolderId] = useState(null);
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
  } = useSelector((state) => state.document);

  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const { id } = useParams();
  //console.log(listData,"Document DATA");
  useEffect(() => {
    dispatch(getService());
    dispatch(getServiceData({ formId: "", serviceId: "" }));
    dispatch(getUserFolders({}));
    dispatch(getUserDocuments());
  }, []);

  const handleFolderClick = (_id) => {
    navigate(`/documents/detail/${_id}`);
  };

  console.log("selected folder", folders);

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
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Heading title={"Documents"} tourButton={true}>
          Documents {folders?.length ? `(${folders.length})` : ""}
        </Heading>
        <Selector
          isClearable={true}
          className={"!min-w-80 !max-w-fit"}
          placeholder={"Create Folders/ Upload Documents"}
          onChange={handleSelectorChange}
          options={options}
        ></Selector>
      </div>

      <div>
        {/* <Selector
          className={"!min-w-52 !max-w-fit"}
          isClearable={true}
          label={"Folders"}
          placeholder={"Select Services"}
          options={servicesOptions}
          onChange={(selectedOption) => {
            if (selectedOption) {
              dispatch(
                getServiceData({
                  formId: selectedOption.formId,
                  serviceId: selectedOption.value,
                })
              );
              setSelectedServiceInfo({
                formId: selectedOption.formId,
                serviceId: selectedOption.value,
              });
            } else {
              setSelectedServiceInfo(null);
              dispatch(getServiceData({ formId: "", serviceId: "" }));
            }
          }}
          value={
            selectedServiceInfo
              ? servicesOptions.find(
                (option) => option.value === selectedServiceInfo.serviceId
              )
              : null
          }
        /> */}
        <Button primary={true} onClick={handleFileModal}>
          Add Document
        </Button>
      </div>
      <div className="py-4">
        <div className="py-2 flex flex-row sm:flex-row items-center justify-between gap-2">
          <Heading title={"Documents"} tourButton={true}>
            Uploaded Documents{" "}
            {totalUserDocuments ? `(${totalUserDocuments})` : ""}
          </Heading>
        </div>
        {userDocumentsLoading ? (
          <div className="flex justify-center items-center py-8">
            <DocumentListShimmer count={2} />
          </div>
        ) : userDocuments.length > 0 ? (
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {userDocuments?.map((data) => (
              <div
                key={data._id}
                onClick={() => handleFolderClick(data._id)}
                className="relative bg-[#F2F2F2] px-4 py-2 flex cursor-pointer justify-between items-center gap-6 border rounded"
              >
                <div className="flex items-center gap-6">
                  <img src="/icons/documents/folder.svg" alt="folder-icon" />
                  <p className="font-semibold text-xs">{data?.name}</p>
                </div>
                {/* <DocumentViewer docUrl={data?.url}/> */}
                <button></button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <NoData />
          </div>
        )}
      </div>

      <DocumentForm
        open={openFile}
        handleOpen={() => setOpenFile(false)}
        modalType="file"
        folderId={folderId}
        // id={selectedId}
        // loading={uploadUserDocuments}
      />
      {/* <DocumentForm
        open={openFolder}
        handleOpen={handleFolderModal}
        modalType="folder"
        id={selectedId}
        loading={addUserFolder}
      /> */}
    </div>
  );
};

export default ViewAllDocuments;
