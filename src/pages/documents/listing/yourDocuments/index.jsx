import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDocuments,
  getUserFolders,
} from "../../../../redux/actions/document-action";
import DocumentForm from "../Components";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DocumentListShimmer,
  PictuteListShimmer,
} from "../../../../components/loader/DocumentListShimmer";
import { Button } from "../../../../components/buttons";

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

export const YourDocuments = () => {
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [openFile, setOpenFile] = useState(false);

  const [searchParams] = useSearchParams();
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
    const search = searchParams.get("search");
    const getFolders = async () => {
      const response = await dispatch(getUserDocuments({ search }));

      console.log(response, "respopnse from user docs");
    };

    getFolders();
  }, [searchParams]);
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
      <div className="flex gap-6 my-4">
        {/* <div className='border p-2 px-4 rounded-md border-black cursor-pointer' onClick={handleFolderModal}>Create folder</div> */}
        <Button outline={true} onClick={handleFileModal}>
          Upload
        </Button>
      </div>
      {userDocumentsLoading ? (
        <div className="flex justify-center items-center py-8">
          <PictuteListShimmer count={5} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6  my-5">
          {userDocuments &&
            userDocuments?.map((document, index) => {
              return <FileLayout key={index} item={document} />;
            })}
        </div>
      )}

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
        folderId={folderId}
        // id={selectedId}
        loading={uploadUserDocuments}
      />
    </div>
  );
};
