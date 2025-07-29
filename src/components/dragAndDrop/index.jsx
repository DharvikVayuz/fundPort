import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

function DragAndDrop({
  className,
  text,
  errorContent,
  maxFileSize = 2, // In MB
  isRequired,
  onFileSelect,
  videoUrl,
}) {
  const [sizeExceedFiles, setSizeExceedFiles] = useState([]);
  const [files, setFiles] = useState([]); // To manage file previews
  const [onDrag, setOnDrag] = useState(false);

  const handleDrop = (files) => {
    if (files.length > 1) {
      toast.error("You can only upload one file.");
      return;
    }
    const validFiles = [];
    const oversizedFiles = [];

    files.forEach((file) => {
      if (file.size <= maxFileSize * 1024 * 1024) {
        validFiles.push(file);
      } else {
        oversizedFiles.push(file.name);
      }
    });

    if (oversizedFiles.length > 0) {
      toast.error(
        `Max file size of ${maxFileSize}MB exceeded for: ${oversizedFiles.join(
          ", "
        )}`
      );
      setSizeExceedFiles((prev) => [...prev, ...oversizedFiles]);
    }

    // Update the file previews with valid files
    const filePreviews = validFiles.map((file) => {
      if (file?.type.startsWith("image")) {
        return {
          name: file.name,
          preview: URL.createObjectURL(file),
          type: "image",
        };
      } else if (file?.type.startsWith("video")) {
        return {
          name: file.name,
          preview: URL.createObjectURL(file),
          type: "video",
        };
      } else if (
        file?.type === "application/pdf" ||
        file.type === "application/vnd.ms-powerpoint"
      ) {
        return {
          name: file.name,
          preview: "/path/to/your/pdf-icon.png", // Update to appropriate icon or thumbnail path
          type: "document",
        };
      }
    });

    setFiles((prev) => [...prev, ...filePreviews]);
    onFileSelect(validFiles?.[0]);
    // console.log(validFiles, "valid files")
  };

  // useEffect(() => {
  //   onFileSelect(files?.[0])
  // }, [files])

  console.log(files, "valid files");

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`${className} ${onDrag ? "border-primary" : ""} ${
        errorContent ? "border-error" : "border-[#D6D6D6]"
      } p-5 border rounded-lg flex flex-col gap-2 justify-center items-center`}
    >
      <Dropzone
        onDropRejected={() => {
          toast.error(
            "File must be of type .pdf, .ppt, .mp4, .png, .jpeg, or .jpg"
          );
        }}
        onDrop={handleDrop}
        onDragEnter={() => setOnDrag(true)}
        onDragLeave={() => setOnDrag(false)}
        accept={{
          "application/pdf": [".pdf"],
          "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
          "video/mp4": [".mp4", ".mov"],
          "image/png": [".png", ".jpeg", ".jpg"],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="mt-2 w-10 h-10 mx-auto text-gray-400 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <span className="mt-2 block text-sm text-gray-800">
                  Browse your device or{" "}
                  <span className="group-hover:text-blue-700 text-blue-600">
                    drag &apos;n drop&apos;
                  </span>
                  <span className="ml-1">
                    to select {String(text?.toLowerCase())} file{" "}
                    {isRequired && <span className="text-error">*</span>}
                  </span>
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  Maximum file size is {maxFileSize} MB
                </span>
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="h-1 mb-2">
        {errorContent && <p className="text-error text-xs">{errorContent}</p>}
      </div>

      {/* File Preview */}
      <div className="flex flex-wrap gap-6">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            {file?.type === "image" && (
              <img
                src={file.preview}
                alt={file.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            )}
            {file?.type === "video" && (
              <video
                src={file.preview || videoUrl}
                className="w-20 h-20 object-cover rounded-lg border"
                controls
              />
            )}
            {file?.type === "document" && (
              <img
                src={file.preview}
                alt={file.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            )}
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragAndDrop;
