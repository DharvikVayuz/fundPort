import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDocuments,
  getUserFolders,
} from "../../../../redux/actions/document-action";
import DocumentForm from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import { NoData } from "../../../../components/errors/noData";
import { div } from "framer-motion/client";
import { Button } from "../../../../components/buttons";
import { Heading } from "../../../../components/heading";
import { DocumentListShimmer } from "../../../../components/loader/DocumentListShimmer";

const FileLayout = ({ item }) => {
  const getFileTypeFromUrl = (url) => {
    if (!url) return "unknown";
    return url.split(".").pop().toLowerCase();
  };

  console.log(item, "item");
  const fileType = getFileTypeFromUrl(item?.url);

  const navigate = useNavigate();
  const navigateToDetail = (id) => {
    navigate(`/documents/detail/${id}`);
  };

  const renderFile = () => {
    return (
      <div
        onClick={() => navigateToDetail(item._id)}
        className="w-36 h-40 p-2 flex flex-col items-center"
      >
        <div className="w-full h-28 flex justify-center items-center bg-gray-100 rounded-lg">
          {fileType === "jpeg" ||
          fileType === "jpg" ||
          fileType === "png" ||
          fileType === "gif" ||
          fileType === "webp" ? (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={item.url}
              alt="image-preview"
            />
          ) : fileType === "pdf" ? (
            <img
              className="w-16 h-16"
              src="/icons/documents/pdf.svg"
              alt="pdf-icon"
            />
          ) : fileType === "doc" || fileType === "docx" ? (
            <img
              className="w-16 h-16"
              src="/icons/documents/doc.svg"
              alt="doc-icon"
            />
          ) : (
            <div className="text-sm font-semibold">Unknown</div>
          )}
        </div>
        <div className="mt-2 w-full text-center text-sm font-semibold truncate">
          {item.name}
        </div>
      </div>
    );
  };

  return <>{renderFile()}</>;
};

export const FolderDocuments = () => {
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [openFile, setOpenFile] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    userFolders,
    totalUserFolders,
    userDocumentsLoading,
    userFoldersLoading,
    userDocuments,
    uploadUserDocuments,
    addUserFolder,
  } = useSelector((state) => state.document);
  const yourFileData = [
    {
      name: "my folder1",
      type: "folder",
    },
    {
      name: "my folder2",
      type: "folder",
    },
    {
      name: "my folder3",
      type: "folder",
    },
  ];

  useEffect(() => {
    const getFolders = async () => {
      const response = await dispatch(getUserDocuments({ folderId: id }));

      console.log(response, "respopnse from usr docuiments");
    };

    getFolders();
  }, []);
  const handleFolderModal = (id) => {
    console.log("called");
    // const data = folders.find((document) => document._id === id);
    setSelectedId(id); // Set the selected id for folder editing
    setOpenFolder(!openFolder);
  };

  const handleFileModal = (id = null, folderId) => {
    setSelectedId(id); // Set the selected id for file editing
    setOpenFile(!openFile);
    setFolderId(folderId);
  };
  return (
    <div>
      <Heading
            title={"Document Listing"}
            backButton={true}
            tourButton={false}
          >
            Document Listing
          </Heading>
      {userDocuments.length > 0 && (
        <div className="flex gap-6 my-4 justify-between">
          {" "}
          <Button outline={true} onClick={handleFileModal}>
            Upload
          </Button>
        </div>
      )}

      {/* <div>
        {userDocuments && userDocuments.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4  my-5">
            {
              userDocumentsLoading ? (
                <DocumentListShimmer/>
              ) : (
                <>
                   {userDocuments.map((document, index) => (
              <FileLayout key={index} item={document} />
            ))}
                </>
              )
            }
           
          </div>
        ) : (
          <div className="grid place-content-center h-[70vh]">
            <div>
              <div>
                <img
                  src="/images/errors/no-data.svg"
                  width={350}
                  alt="no-data icon"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button outline={true} onClick={handleFileModal}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      </div> */}
      <div>
        {userDocumentsLoading ? (
          <div>
            <DocumentListShimmer />
          </div>
        ) : userDocuments && userDocuments.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
            {userDocuments.map((document, index) => (
              <FileLayout key={index} item={document} />
            ))}
          </div>
        ) : (
          <div className="grid place-content-center h-[70vh]">
            <div>
              <div>
                <img
                  src="/images/errors/no-data.svg"
                  width={350}
                  alt="no-data icon"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button outline={true} onClick={handleFileModal}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {
        <DocumentForm
          open={openFolder}
          handleOpen={() => setOpenFolder(false)}
          modalType="folder"
          // id={selectedId}
          loading={addUserFolder}
        />
      }
      <DocumentForm
        open={openFile}
        handleOpen={() => setOpenFile(false)}
        modalType="file"
        folderId={id}
        // id={selectedId}
        loading={uploadUserDocuments}
      />
    </div>
  );
};
