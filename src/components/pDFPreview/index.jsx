import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Load worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PdfPreview = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ position: "relative" }}>
      {!isFullscreen ? (
        <div style={{ border: "1px solid #ddd", padding: "10px", maxWidth: "400px" }}>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {/* Render the first page as a preview */}
            <Page pageNumber={1} width={350} />
          </Document>
          <button
            onClick={toggleFullscreen}
            style={{ marginTop: "10px", padding: "5px 15px", cursor: "pointer" }}
          >
            View
          </button>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            zIndex: 1000,
            overflow: "auto",
          }}
        >
          <button
            onClick={toggleFullscreen}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1001,
              padding: "5px 15px",
              cursor: "pointer",
            }}
          >
            Close Fullscreen
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} width={800} />
              ))}
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};
