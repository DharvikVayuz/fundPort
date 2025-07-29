import React, { useEffect, useState } from "react";
// import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { addDocuments, updateDocument, uploadDocument } from '@/redux/admin/actions/Document';
import { useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { ConfirmationModal } from "../../../../components/modal/confirmationModal";
import { Button } from "../../../../components/buttons";
// import { NewInput } from '@/components/globally/inputs';
import { handleExtraSpaces } from "../../../../utils";
import {
  addUserFolders,
  uploadUserDocuments,
} from "../../../../redux/actions/document-action";
import { Input } from "../../../../components/inputs";
const folderInitalValues = {
  folderName: "",
};
const fileInitalValues = {
  files: null,
  folderId: "",
  userId: "",
};
const DocumentForm = ({
  open,
  handleOpen,
  modalType,
  id,
  folderId,
  loading,
}) => {
  const folderValidationSchema = Yup.object().shape({
    folderName: Yup.string()
      .required("Folder Name is required.")
      .max(30, "Folder Name can be at most 30 characters long")
      .min(3, "Folder Name must be at least 3 characters long")
      .matches(
        /^[a-zA-Z0-9\- ]+$/,
        "Folder Name can only contain alphabets, numbers, hyphens, and spaces"
      ),
  });

  const fileValidationSchema = Yup.object().shape({
    folderName: Yup.mixed().required("File is required"),
  });

  const dispatch = useDispatch();
  const { isAdding, documentList } = useSelector((state) => state.document);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const handleClose = () => {
    handleOpen();
    setFileError(null);
  };
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
    setTouched,
    isValid,
    setErrors,
    dirty,
    setFieldTouched,
  } = useFormik({
    initialValues:
      modalType === "folder" ? folderInitalValues : fileInitalValues,
    validationSchema: modalType === "folder" ? folderValidationSchema : null,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);
      console.log(values, "folder valuies");
      if (modalType === "folder") {
        if (id) {
          console.log(values, "folder valuies");
          // const data = documentList.find((document) => document.folderId === id);
          // dispatch(updateDocument(data._id, values.folderName));
        } else {
          console.log(values, "folder valuiesasdasd");
          const folderData = {
            folderName: handleExtraSpaces(values.folderName),
          };
         const response = await dispatch(addUserFolders(folderData));

         console.log(response, "folder response")
        }
      } else {
        if (!file) {
          setFileError("Please select a file before proceeding.");
          return;
        }
        // File upload handling
        const formData = new FormData();
        formData.append("files", file);
        if (folderId) {
          formData.append("folderId", folderId);
        }
        console.log(file, "file mil gyi ");
        dispatch(uploadUserDocuments({ formData, file }));
      }
      handleClose();
      setErrors({});
      setFileError("");
    },
  });
  const allowedExtensions = [
    "pdf",
    "doc",
    "docx",
    "dot",
    "dotx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "pps",
    "ppsx",
    "csv",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "mp4",
    "mov",
    "avi",
    "mkv",
  ];

  // Function to handle file change
  // const handleFileChange = (e) => {
  //     const file = e.target.files[0]; // Get the first file from the input
  //     setFile(file); // Set the file in state
  //     console.log(file, "Selected file"); // Log the file to verify
  //     setFileError(selectedFile ? "" : "Please select a file before proceeding.");
  // };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file from the input

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase(); // Extract the file extension and normalize case

      // Check if the file extension is allowed
      if (allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile); // Set the file in state
        setFileError(""); // Clear any previous errors
        console.log(selectedFile, "Selected file"); // Log the file to verify
      } else {
        setFile(null); // Clear the file in state
        setFileError(
          `Invalid file type. Allowed types: pdf,ppt,doc,docx,mp4 and image`
        ); // Set an error message
        e.target.value = "";
      }
    } else {
      setFile(null); // Reset file state if no file is selected
      if (fileError) {
        setFileError(""); // Clear the error if no file is selected
      }
    }
  };
console.log(errors, "errors")
  useEffect(() => {
    if (id && modalType === "folder") {
      // const data = documentList.find((document) => document.folderId === id);
      // setFieldValue('folderName', data?.folderName);
    } else {
      setFieldValue("folderName", "");
      setErrors({});
    }
  }, [modalType, id]);
  useEffect(() => {
    if (open) {
      setFieldValue("folderName", "");
      setFile(null);
      setFileError("");
      setErrors({});
      setTouched({}, false); // Reset touched fields
    }
  }, [open]);
  

  const closeModal = () => {
    handleOpen();
    setErrors({});
    setFieldTouched("folderName", false);
  };
  useEffect(() => {
    if (!loading) {
      closeModal();
    }
  }, [loading]);
  return (
    <>
      <ConfirmationModal
        isOpen={open}
        onClose={closeModal}
        className="relative w-full max-w-sm p-2"
      >
        {id ? (
          <h4 className="font-bold text-xl">
            {modalType === "folder" ? "Update Folder" : "Update File"}
          </h4>
        ) : (
          <h4 className="font-bold text-xl">
            {modalType === "folder" ? "Create Folder" : "Add File"}
          </h4>
        )}
        <form className="mt-4" onSubmit={handleSubmit} id="docform">
          {modalType === "folder" ? (
            <>
              <Input
                size="sm"
                type="text"
                label="Enter Folder Name"
                value={values.folderName}
                name="folderName"
                className="border border-gray-400 p-2 focus:!border-t-gray-900 rounded-md w-full"
                onBlur={handleBlur}
                onChange={handleChange}
                maxLength={30}
                errorContent={errors.folderName && touched.folderName ? errors.folderName : ""}
              />
              {/* {errors.folderName && touched.folderName && (
                <p className="text-sm text-red-500">{errors.folderName}</p>
              )} */}
            </>
          ) : (
            <>
              <input
                size="sm"
                type="file"
                name="file"
                label="Add File"
                onChange={handleFileChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              />
              {fileError && <p className="text-red-500">{fileError}</p>}
            </>
          )}
        </form>
        <div className="mt-4 flex justify-end gap-2">
          {/* <Button
            disabled={
              loading ||
              !(dirty && isValid) ||
              (!file && modalType !== "folder")
            }
            form="docform"
            type="submit"
            isLoading={loading}
          > */}
          <Button
            disabled={
              loading ||
              !(dirty && isValid) ||
              (!file && modalType !== "folder") ||
              (modalType === "folder" && !values.folderName.trim()) // Ensure folderName is not empty
            }
            form="docform"
            type="submit"
            isLoading={loading}
          >

            {loading ? (
              <div className="flex justify-center items-center gap-3">
                {/* <Spinner color='white' className="h-4 w-4" /> */}
                {modalType === "folder"
                  ? id
                    ? "Updating Folder"
                    : "Creating Folder"
                  : id
                    ? "Updating Document"
                    : "Adding Document"}
              </div>
            ) : modalType === "folder" ? (
              id ? (
                "Update Folder"
              ) : (
                "Create Folder"
              )
            ) : id ? (
              "Update Document"
            ) : (
              "Add Document"
            )}
          </Button>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default DocumentForm;
