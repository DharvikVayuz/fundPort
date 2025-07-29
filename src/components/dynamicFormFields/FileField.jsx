import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import client from "../../redux/axios-baseurl";

function FileField({ index, field, className = "", onChange }) {
  const { lebel: label, isRequired, value = [], fileName, maxSize = 1 } = field;
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(value[0] || "");
  const [uploadedFileName, setUploadedFileName] = useState(fileName || "");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const accept = "image/jpeg,image/png,application/pdf";

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    const maxSizeInBytes = maxSize * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, or PDF files are allowed.");
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error(`File exceeds ${maxSize}MB limit.`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      let fileType = "";
      const type = file.type.split("/")[1];

      if (
        ["avif", "jpeg", "jpg", "png", "svg", "svg+xml", "webp"].includes(type)
      ) {
        fileType = "image";
      } else if (["wav", "webm", "mpeg", "ogg", "3gpp"].includes(type)) {
        fileType = "audio";
      } else if (["x-msvideo", "mp4", "mp2t", "webm"].includes(type)) {
        fileType = "video";
      } else if (
        [
          "zip",
          "vnd.ms-excel",
          "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "vnd.openxmlformats-officedocument.presentationml.presentation",
          "nd.ms-powerpoint",
          "pdf",
          "vnd.oasis.opendocument.presentation",
          "x-freearc",
          "vnd.openxmlformats-officedocument.wordprocessingml.document",
          "msword",
          "csv",
          "json",
        ].includes(type)
      ) {
        fileType = "document";
      }

      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const response = await client.put("/user/auth/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fileUrl = response.data?.data?.url;
      if (fileUrl) {
        setUploadedUrl(fileUrl);
        setUploadedFileName(file.name);

        onChange?.(index, {
          fileUrl,
          filename: file.name,
          fileType,
        });
      } else {
        toast.error("Upload failed. No URL returned.");
      }
    } catch (error) {
      toast.error("Upload failed.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      className="flex items-center justify-center bg-white bg-opacity-95"
    >
      <div
        className={`w-full border-2 border-dashed p-8 rounded-lg transition-all ${
          dragActive
            ? "border-[#29C59F] bg-[#e6f8f3]"
            : "border-[#D9D9D9] bg-white"
        }`}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {label && (
          <label className="block text-lg font-semibold text-center text-[#4F5B76] mb-4">
            {label}
            {isRequired && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          className="hidden"
          accept={accept}
        />

        <div className="text-center space-y-3">
          <p className="text-[#4F5B76] text-base">
            Drag and drop a file here or{" "}
            <span
              onClick={() => inputRef.current.click()}
              className="text-[#29C59F] cursor-pointer underline font-medium"
            >
              browse
            </span>
          </p>

          {uploading && <p className="text-sm text-blue-600">Uploading...</p>}

          {uploadedUrl && (
            <div className="mt-4">
              <p className="text-sm text-green-600">
                File uploaded:{" "}
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-700"
                >
                  {uploadedFileName}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileField;
