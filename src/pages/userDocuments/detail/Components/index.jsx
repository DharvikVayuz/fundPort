import React from "react";
import { NoData } from "../../../../components/errors/noData";
const DocumentViewer = ({ docUrl, docName, isLoading }) => {
  const getFileExtension = (url) => {
    //if(JSON.stringify(url) === '{}'){
    return url?.split(".")?.pop()?.toLowerCase();
   // }
  };

  const renderDocumentContent = () => {
    const fileExtension = getFileExtension(docUrl);
    switch (fileExtension) {
      case "pdf":
        return (
          <iframe
            src={`https://docs.google.com/gview?url=${docUrl}&embedded=true`}
            title="PDF Document"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case "xlsx":
      case "xls":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`}
            title="Excel Document"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case "ppt":
      case "pptx":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`}
            title="PowerPoint Presentation"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <img
            src={docUrl}
            alt="Document"
            style={{ width: "100%", height: "auto" }}
          />
        );
      case "mp4":
      case "webm":
      case "ogg":
        return (
          <video controls width="100%" height="auto">
            <source src={docUrl} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          "...loading"
        </div>
      ) : docUrl ? (
        renderDocumentContent()
      ) : (
        <NoData></NoData>
      )}

      <h4 className="text-2xl mt-4">{docName}</h4>
    </div>
  );
};

export default DocumentViewer;
