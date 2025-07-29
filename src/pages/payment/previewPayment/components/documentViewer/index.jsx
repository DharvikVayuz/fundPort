import React from "react";

const DocumentViewer = ({ docUrl, docName, isLoading }) => {
  const getFileExtension = (url) => {
    return url.split(".").pop().toLowerCase();
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
      <h4 className="text-2xl">{docName}</h4>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <TailSpin height={50} width={50} color="blue" />
        </div>
      ) : docUrl ? (
        renderDocumentContent()
      ) : (
        <div className="flex items-center justify-center">
          <p>No document available to display.</p>
        </div>
      )}
    </div>
  );
};
export default DocumentViewer;
