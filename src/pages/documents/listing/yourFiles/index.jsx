// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserFolders } from "../../../../redux/actions/document-action";
// import DocumentForm from "../Components";
// import { DocumentListShimmer } from "../../../../components/loader/DocumentListShimmer";
// import { useSearchParams } from "react-router-dom";
// import { Button } from "../../../../components/buttons";

// const FileLayout = ({ item }) => {
//   const renderFile = () => {
//     switch (item.type) {
//       case "folder":
//         return (
//           <div className="relative">
//             <div className="size-36">
//               <img
//                 className="size-full"
//                 src="/icons/documents/document.svg"
//                 alt="document-icon"
//               />
//               <img
//                 className="size-full"
//                 src="/icons/documents/document.svg"
//                 alt="document-icon"
//               />
//             </div>
//             <div className="absolute bottom-6 left-4 text-[14px] font-semibold">
//               {item.name}
//             </div>
//           </div>
//         );

//       case "document":
//         return (
//           <div className="w-36 h-36 p-2">
//             <div className="w-full h-28">
//               <img
//                 className="size-full"
//                 src="/icons/documents/doc.svg"
//                 alt="document-icon"
//               />
//               <img
//                 className="size-full"
//                 src="/icons/documents/doc.svg"
//                 alt="document-icon"
//               />
//             </div>
//             <div className="text-center">
//               {item?.name?.length > 15
//                 ? item.name.slice(0, 15) + "..."
//                 : item.name}
//               {item?.name?.length > 15
//                 ? item.name.slice(0, 15) + "..."
//                 : item.name}
//             </div>
//           </div>
//         );

//       case "pdf":
//         return (
//           <div className="w-36 h-36 p-2">
//             <div className="w-full h-28">
//               <img
//                 className="size-full"
//                 src="/icons/documents/pdf.svg"
//                 alt="pdf-icon"
//               />
//               <img
//                 className="size-full"
//                 src="/icons/documents/pdf.svg"
//                 alt="pdf-icon"
//               />
//             </div>
//             <div className="text-center">{item.name}</div>
//           </div>
//         );

//       default:
//         return <div className="text-center">Unknown File Type</div>;
//     }
//   };

//   return <>{renderFile()}</>;
// };

// export const YourFiles = () => {
//   const [openFolder, setOpenFolder] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [folderId, setFolderId] = useState(null);
//   const [openFile, setOpenFile] = useState(false);

//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const {
//     userFolders,
//     totalUserFolders,
//     userDocumentsLoading,
//     userFoldersLoading,
//     uploadUserDocuments,
//     addUserFolder,
//   } = useSelector((state) => state.document);
//   const yourFileData = [
//     {
//       name: "my folder1",
//       type: "folder",
//       type: "folder",
//     },
//     {
//       name: "my folder2",
//       type: "folder",
//       type: "folder",
//     },
//     {
//       name: "my folder3",
//       type: "folder",
//     },
//   ];

//   useEffect(() => {
//     const search = searchParams.get("search");
//     const getFolders = async () => {
//       const response = await dispatch(getUserFolders({ search }));

//     };

//     getFolders();
//   }, [searchParams]);
//   const handleFolderModal = (id) => {
//     console.log("called");
//     // const data = folders.find((document) => document._id === id);
//     setSelectedId(id); // Set the selected id for folder editing
//     setOpenFolder(!openFolder);
//   };

//   const handleFileModal = (id = null, folderId) => {
//     setSelectedId(id); // Set the selected id for file editing
//     setOpenFile(!openFile);
//     setFolderId(folderId);
//   };
//   return (
//     <div>
//       <div className="flex gap-4 my-4">
//         <Button outline={true} onClick={handleFolderModal}>
//           Create folder
//         </Button>
//         {/* <Button outline={true} onClick={handleFileModal}>
//           Upload
//         </Button> */}
//       </div>
//       <div className=" mb-16">
//         {userFoldersLoading ? (
//           <div className="flex justify-center items-center py-8">
//             <DocumentListShimmer count={5} />
//           </div>
//         ) : (
//           <Folder data={userFolders && userFolders} />
//         )}
//       <div className=" mb-16">
//         {userFoldersLoading ? (
//           <div className="flex justify-center items-center py-8">
//             <DocumentListShimmer count={5} />
//           </div>
//         ) : (
//           <Folder data={userFolders && userFolders} />
//         )}
//       </div>
//       {
//         <DocumentForm
//           open={openFolder}
//           handleOpen={() => setOpenFolder(false)}
//           modalType="folder"
//           // id={selectedId}
//           loading={addUserFolder}
//         />
//       }
//       <DocumentForm
//         open={openFile}
//         handleOpen={() => setOpenFile(false)}
//         modalType="file"
//         folderId={folderId}
//         // id={selectedId}
//         loading={uploadUserDocuments}
//       />
//     </div>
//   );
// };
//   );
// };

// const Folder = ({ data }) => {
  
//   const handleNavigate = (id)=>{
//     navigate(`/user-documents/folder-documents/${id}`)
//   }
//   console.log(data, "data from folder")
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 my-5 mb-12 ">
//       {data?.map((item) => (
//         <div
//           key={item._id}
//           onClick={()=> handleNavigate(item._id)}
//           className="cursor-pointer p-3 rounded-lg bg-white border hover:shadow-md flex flex-col items-center"
//         >
//           {/* Image Container */}
//           <div className="w-20 h-20">
//             <img
//               className="w-full h-full object-contain"
//               src="/icons/documents/document.svg"
//               alt="document-icon"
//             />
//           </div>

//           {/* Service Name */}
//           <div className="mt-2 text-sm md:text-[12px] font-semibold text-center break-all">
//             {item.folderName}
//           </div>

//           {/* Case ID */}
//           {/* <div className="mt-1 text-[12px] md:text-[10px] font-semibold text-gray-500 text-center">
//                 {item.folderName}
//               </div> */}
//         </div>
//       ))}
//     </div>
//         </div>
//       ))}
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFolders } from "../../../../redux/actions/document-action";
import DocumentForm from "../Components";
import { DocumentListShimmer } from "../../../../components/loader/DocumentListShimmer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/buttons";

// Reusable layout for rendering files/folders
const FileLayout = ({ item }) => {
  const renderFile = () => {
    switch (item.type) {
      case "folder":
        return (
          <div className="relative size-36">
            <img className="size-full" src="/icons/documents/document.svg" alt="document-icon" />
            <div className="absolute bottom-6 left-4 text-[14px] font-semibold">
              {item.name}
            </div>
          </div>
        );

      case "document":
        return (
          <div className="w-36 h-36 p-2">
            <div className="w-full h-28">
              <img className="size-full" src="/icons/documents/doc.svg" alt="document-icon" />
            </div>
            <div className="text-center">
              {item.name?.length > 15 ? item.name.slice(0, 15) + "..." : item.name}
            </div>
          </div>
        );

      case "pdf":
        return (
          <div className="w-36 h-36 p-2">
            <div className="w-full h-28">
              <img className="size-full" src="/icons/documents/pdf.svg" alt="pdf-icon" />
            </div>
            <div className="text-center">{item.name}</div>
          </div>
        );

      default:
        return <div className="text-center">Unknown File Type</div>;
    }
  };

  return <>{renderFile()}</>;
};

// Folder Grid Component
const Folder = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/user-documents/folder-documents/${id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 my-5 mb-12">
      {data?.map((item) => (
        <div
          key={item._id}
          onClick={() => handleNavigate(item._id)}
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
            {item.folderName}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Component
export const YourFiles = () => {
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [openFile, setOpenFile] = useState(false);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const {
    userFolders,
    userFoldersLoading,
    uploadUserDocuments,
    addUserFolder,
  } = useSelector((state) => state.document);

  useEffect(() => {
    const search = searchParams.get("search");
    dispatch(getUserFolders({ search }));
  }, [searchParams, dispatch]);

  const handleFolderModal = (id) => {
    setSelectedId(id || null);
    setOpenFolder(true);
  };

  const handleFileModal = (id = null, folderId) => {
    setSelectedId(id || null);
    setFolderId(folderId || null);
    setOpenFile(true);
  };

  return (
    <div>
      <div className="flex gap-4 my-4">
        <Button outline={true} onClick={() => handleFolderModal()}>
          Create folder
        </Button>
        {/* <Button outline={true} onClick={() => handleFileModal()}>
          Upload
        </Button> */}
      </div>

      {userFoldersLoading ? (
        <div className="flex justify-center items-center py-8">
          <DocumentListShimmer count={5} />
        </div>
      ) : (
        <Folder data={userFolders} />
      )}

      <DocumentForm
        open={openFolder}
        handleOpen={() => setOpenFolder(false)}
        modalType="folder"
        id={selectedId}
        loading={addUserFolder}
      />

      <DocumentForm
        open={openFile}
        handleOpen={() => setOpenFile(false)}
        modalType="file"
        folderId={folderId}
        id={selectedId}
        loading={uploadUserDocuments}
      />
    </div>
  );
};
