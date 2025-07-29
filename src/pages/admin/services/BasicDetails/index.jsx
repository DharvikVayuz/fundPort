import React, { useEffect, useState } from "react";
// import {
//   Input,
//   Spinner,
//   label,
//   Button,
//   Textarea,
// } from '@material-tailwind/react'
import Select from "react-select";
import { Button } from "../../../../components/buttons";
import { Input } from "../../../../components/inputs";
// import Papa from 'papaparse';  // Im
// import { Checkbox } from "@material-tailwind/react";
import { Checkbox } from "../../../../components/inputs/checkbox";
// import TitleComponent from '@/components/common/TitleComponent';
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  addsService,
  editService,
  getAllActiveCategories,
  getAllActiveSubCategories,
  getAllForms,
  getAllServices,
  uploadVideo,
} from "../../../../redux/admin/actions/services";
import { basicDetailsSchema } from "../../../../validation/adminSchema/serviceSchemas/basicDetailsSchema";
// import { TailSpin } from 'react-loader-spinner';
import {
  handleExtraSpaces,
  validateNumber,
} from "../../.../../../../utils/adminUtils";
// import { updateVideoUrl } from '@/redux/admin/slices/Service';
// import Breadcrumb from '@/widgets/layout/TopNavigation';
// import StepperWithContent from './StepForm';
// import HeaderTitle from '@/components/common/HeaderTitle';
// import ReusableModal from '@/components/common/ReusableModal';
import ReactQuill from "react-quill";

const initialValues = {
  name: "",
  details: "",
  subCategoryId: "",
  categoryId: "",
  isOneTime: false,
  cost: 0,
  formId: "",
  duration: 0,
  delivrableVideoUrl: "",
  stepsVideoUrl: "",
  documentVideoUrl: "",
  about: "",
  active: true,
};
const BasicDetails = () => {
  const MAX_EDITOR_LENGTH = 10000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [csvError, setCsvError] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csv, setCsv] = useState(null);
  const {
    service,
    delivrableVideoUrl,
    uploadVideoLoading,
    isServiceDetails,
    stepsVideoUrl,
    documentVideoUrl,
    isAdding,
    editPage,
    activeCategories,
    isFetching,
    activeSubCategories,
    forms,
    buttonContent,
    updateHeader,
  } = useSelector((state) => state.adminService);
  const [isOneTime, setIsOneTime] = useState(false);
  const [navigationTab, setNavigationTab] = useState(0);
  const [searchParams] = useSearchParams({});
  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setCsvError("");
  };
  const handleClose = () => {
    setOpen((prevState) => !prevState);
  };

  const sanitizeInput = (value) => {
    if (!value) return ""; // Handle null or undefined

    return (
      value
        // Remove multiple spaces between words
        .replace(/\s{2,}/g, " ")
        // Trim spaces inside <p> and other block tags
        .replace(/<p>\s*(.*?)\s*<\/p>/g, (match, innerText) => {
          return `<p>${innerText.trim()}</p>`;
        })
        // Remove empty <p> tags
        .replace(/<p>\s*<\/p>/g, "")
        // Remove empty <ul> tags
        .replace(/<ul>\s*<\/ul>/g, "")
        // Remove empty <li> tags
        .replace(/<li>\s*<\/li>/g, "")
        // Remove <p> tags with only <br>
        .replace(/<p>(\s|<br>)*<\/p>/g, "")
        .trim()
    ); // Final trim for the entire content
  };
  ReactQuill.Quill.register("modules/maxlength", function (quill, options) {
    quill.on("text-change", function () {
      const textLength = quill.getText().trim().length;
      if (textLength > options.maxLength) {
        quill.deleteText(options.maxLength, textLength - options.maxLength);
      }
    });
  });

  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"], [{ list: "bullet" }]],
    },
    maxlength: { maxLength: MAX_EDITOR_LENGTH }, // Use the custom maxlength module
  };
  const handleAnswerChange = (value) => {
    console.log(value, "answer value");

    const cleanedValue = value
      // Remove empty <ul> tags
      .replace(/<ul>\s*<\/ul>/g, "")
      // Remove empty <li> tags
      .replace(/<li>\s*<\/li>/g, "")
      // Remove <p> tags containing only spaces or <br>
      .replace(/<p>(\s|<br>)*<\/p>/g, "")
      // Remove <ul> with empty <li><br></li>
      .replace(/<ul>(\s|<li><br><\/li>)*<\/ul>/g, "")
      // Ensure no empty <p> tags
      .replace(/<p>\s*<\/p>/g, "");

    console.log(cleanedValue, "cleaned value");

    // Update the form field with the cleaned content
    setFieldValue("details", cleanedValue);
  };
  const handleAboutChange = (value) => {
    console.log(value, "answer value");

    const cleanedValue = value
      // Remove empty <ul> tags
      .replace(/<ul>\s*<\/ul>/g, "")
      // Remove empty <li> tags
      .replace(/<li>\s*<\/li>/g, "")
      // Remove <p> tags containing only spaces or <br>
      .replace(/<p>(\s|<br>)*<\/p>/g, "")
      // Remove <ul> with empty <li><br></li>
      .replace(/<ul>(\s|<li><br><\/li>)*<\/ul>/g, "")
      // Ensure no empty <p> tags
      .replace(/<p>\s*<\/p>/g, "");

    console.log(cleanedValue, "cleaned value");

    // Update the form field with the cleaned content
    setFieldValue("about", cleanedValue);
  };
  useEffect(() => {
    if (localStorage.getItem("serviceDetails")) {
      console.log(localStorage.getItem("serviceDetails"), "serviceDetails");
      const serviceDetails = JSON.parse(localStorage.getItem("serviceDetails"));
      const basicDetails = serviceDetails?.[0]?.basicDetails;

      if (basicDetails) {
        console.log("isnide basicDetails");
        setFieldValue("name", basicDetails.name);
        setFieldValue("details", basicDetails.details || "");
        setFieldValue("isOneTime", basicDetails.isOneTime || false);
        setFieldValue("cost", basicDetails.cost || "");
        setFieldValue("formId", basicDetails.formId || "");
        setFieldValue("duration", basicDetails.duration || "");
        setFieldValue(
          "delivrableVideoUrl",
          basicDetails.delivrableVideoUrl || ""
        );
        setFieldValue("documentVideoUrl", basicDetails.documentVideoUrl || "");
        setFieldValue("stepsVideoUrl", basicDetails.stepsVideoUrl || "");

        if (basicDetails.category && basicDetails.category.length > 0) {
          console.log(basicDetails.category, "basicDetails.category");
          setFieldValue("categoryId", basicDetails.category[0]._id || "");
          dispatch(getAllActiveSubCategories(basicDetails.category[0]._id));
        }

        if (basicDetails.sub_category && basicDetails.sub_category.length > 0) {
          console.log(basicDetails.sub_category, "basicDetails.sub_category");
          setFieldValue(
            "subCategoryId",
            basicDetails.sub_category[0]._id || ""
          );
        }

        setFieldValue("about", basicDetails.about || "");
        setFieldValue("isOneTime", basicDetails.isOneTime);
        setIsOneTime(basicDetails.isOneTime);

        setErrors({});
      }
    }
  }, []);

  useEffect(() => {
    switch (searchParams.get("tab")) {
      case "basic-details":
        setNavigationTab(1);
        break;
      case "service-steps":
        setNavigationTab(2);
        break;
      case "service-subscriptions":
        setNavigationTab(3);
        break;
      case "service-faqs":
        setNavigationTab(4);
        break;
      default:
        setNavigationTab(0);
        break;
    }
  });
  const serviceDetails = JSON.parse(localStorage.getItem("serviceDetails"));
  const basicDetails = serviceDetails?.[0]?.basicDetails;
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
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: basicDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setTouched({}, false);
      const data = {
        name: handleExtraSpaces(values.name),
        details: sanitizeInput(values.details),
        subCategoryId: values.subCategoryId,
        categoryId: values.categoryId,
        isOneTime: isOneTime,
        cost: values.cost || 0,
        formId: values.formId,
        duration: values.duration,
        about: sanitizeInput(values.about),
      };

      if (delivrableVideoUrl) {
        data.deliverableVideoUrl = delivrableVideoUrl;
      }

      if (stepsVideoUrl) {
        data.stepsVideoUrl = stepsVideoUrl;
      }

      if (documentVideoUrl) {
        data.documentVideoUrl = documentVideoUrl;
      }

      if (id !== undefined || localStorage.getItem("serviceDetails")) {
        dispatch(
          editService(
            { ...data, serviceId: id || basicDetails._id },
            navigate,
            editPage
          )
        );
      } else {
        dispatch(addsService(data, navigate, navigationTab));
      }
      setErrors({});
    },
  });
  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllActiveCategories(true));
    forms.length === 0 && dispatch(getAllForms());
  }, []);
  const formattedFormsList = forms?.map((form) => ({
    value: form._id,
    label: form.title,
  }));
  // const formattedFormsList = []
  useEffect(() => {
    if (id !== undefined && service) {
      setFieldValue("name", service.name || "");
      setFieldValue("details", service.details || "");
      setFieldValue("isOneTime", service.isOneTime || false);
      setFieldValue("cost", service.cost || "");
      setFieldValue("formId", service.formId || "");
      setFieldValue("duration", service.duration || "");
      setFieldValue("delivrableVideoUrl", service.delivrableVideoUrl || "");
      setFieldValue("documentVideoUrl", service.documentVideoUrl || "");
      setFieldValue("stepsVideoUrl", service.stepsVideoUrl || "");

      if (service.category && service.category.length > 0) {
        console.log(service.category, "service.category");
        setFieldValue("categoryId", service.category[0]._id || "");
        dispatch(getAllActiveSubCategories(service.category[0]._id));
      }

      if (service.sub_category && service.sub_category.length > 0) {
        console.log(service.sub_category, "service.sub_category");
        setFieldValue("subCategoryId", service.sub_category[0]._id || "");
      }

      setFieldValue("about", service.about || "");
      setFieldValue("isOneTime", service.isOneTime);
      setIsOneTime(service.isOneTime);

      setErrors({});
    } else {
      setFieldValue("name", "");
      setFieldValue("details", "");
      setFieldValue("isOneTime", false);
      setFieldValue("cost", "");
      setFieldValue("formId", "");
      setFieldValue("duration", "");
      setFieldValue("delivrableVideoUrl", "");
      setFieldValue("documentVideoUrl", "");
      setFieldValue("stepsVideoUrl", "");
      setFieldValue("about", "");
      setFieldValue("categoryId", "");
      setFieldValue("subCategoryId", "");
      setFieldValue("about", "");
      setFieldValue("isOneTime", false);
    }
    if (localStorage.getItem("serviceDetails")) {
      console.log(localStorage.getItem("serviceDetails"), "serviceDetails");
      const serviceDetails = JSON.parse(localStorage.getItem("serviceDetails"));
      const basicDetails = serviceDetails?.[0]?.basicDetails;

      console.log(basicDetails, "basicDetails");

      if (basicDetails) {
        console.log("isnide basicDetails");
        setFieldValue("name", basicDetails.name);
        setFieldValue("details", basicDetails.details || "");
        setFieldValue("isOneTime", basicDetails.isOneTime || false);
        setFieldValue("cost", basicDetails.cost || "");
        setFieldValue("formId", basicDetails.formId || "");
        setFieldValue("duration", basicDetails.duration || "");
        setFieldValue(
          "delivrableVideoUrl",
          basicDetails.delivrableVideoUrl || ""
        );
        setFieldValue("documentVideoUrl", basicDetails.documentVideoUrl || "");
        setFieldValue("stepsVideoUrl", basicDetails.stepsVideoUrl || "");

        if (service.category && service.category.length > 0) {
          console.log(service.category, "service.category");
          setFieldValue("categoryId", basicDetails.categoryId || "");
          dispatch(getAllActiveSubCategories(basicDetails.categoryId));
        }

        if (service.sub_category && service.sub_category.length > 0) {
          console.log(service.sub_category, "service.sub_category");
          setFieldValue("subCategoryId", basicDetails.subCategoryId || "");
        }

        setFieldValue("about", basicDetails.about || "");
        setFieldValue("isOneTime", basicDetails.isOneTime);
        setIsOneTime(basicDetails.isOneTime);

        setErrors({});
      }
    }
    setErrors({}); // Clear errors when updating form fields
  }, [id, service, setFieldValue, dispatch]);

  useEffect(() => {
    if (isServiceDetails) {
      console.log(isServiceDetails, "isServiceDetails");
    }
  }, []);
  console.log(isServiceDetails, "isServiceDetails");
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getAllServices(1, 1, "", id));
      console.log(service, "service data");
    }
  }, [id]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log(value, "category value");
    setFieldValue("categoryId", value);
    const selectedCategory = activeCategories.find(
      (category) => category._id === value
    );
    dispatch(getAllActiveSubCategories(selectedCategory._id));
    setFieldValue("subCategoryId", activeSubCategories[0]?._id);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsOneTime(isChecked);
    if (isChecked) {
      setFieldValue("cost", null);
    }
  };
  const handleUpload = (file, type) => {
    const formData = new FormData();
    formData.append("files", file); // Pass file to FormData
    console.log(type, "video modal.fieldname");
    dispatch(uploadVideo(formData, type));
  };

  const handleSelectChange = (selectedOption) => {
    setFieldValue("formId", selectedOption ? selectedOption.value : "");
  };
  const breadcrumbData = [
    {
      name: "Service Management",
      url: "/admin/service",
      children: [
        {
          name: id ? "Update Service" : "Create Service",
          url: id ? "" : "/admin/services/create-service",
        },
      ],
    },
  ];
  useEffect(() => {
    setErrors({});
    setTouched({}, false);
  }, []);
  return (
    <div className="">
      {/* <Breadcrumb items={breadcrumbData} />
      <TitleComponent title={id ? `CORPZO | Update Service` : `CORPZO | Create Service`}></TitleComponent>
      <HeaderTitle title={id ? "Update service" : "Create Service"} /> */}
      {id !== undefined && isFetching ? (
        <div className="flex justify-center items-center min-h-screen">
          {/* <TailSpin height={50} width={50} color="blue" /> */}
          loading
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-1/2 gap-6 mb-1">
              <div className="flex-grow">
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Service Title
                </label>
                <Input
                  size="sm"
                  placeholder="Enter Service title"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={50}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="flex-grow">
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Select Sub Category
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500"
                  name="subCategoryId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => (touched.sectionId = true)}
                  value={values.subCategoryId}
                >
                  <option value="" disabled>
                    Select Sub Category
                  </option>
                  {!activeCategories && isFetching ? (
                    // <h1><TailSpin /></h1>
                    <h1>loading</h1>
                  ) : (
                    activeSubCategories.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.subSectionTitle}
                      </option>
                    ))
                  )}
                </select>

                {errors.subCategoryId && touched.subCategoryId && (
                  <p className="text-sm text-red-500">{errors.subCategoryId}</p>
                )}
              </div>
              <div className="flex gap-6 ">
                <div className="flex-grow flex flex-col">
                  <label
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-medium"
                  >
                    Form
                  </label>
                  <Select
                    name="formId"
                    options={formattedFormsList}
                    value={
                      formattedFormsList.find(
                        (option) => option.value === values.formId
                      ) || null
                    }
                    onChange={handleSelectChange}
                    isClearable
                    placeholder="Select Form"
                    classNamePrefix="react-select"
                    onBlur={handleBlur}
                  />
                  {errors.formId && touched.formId && (
                    <p className="text-sm text-red-500">{errors.formId}</p>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Service Detail
                </label>
                <ReactQuill
                  className="h-50"
                  theme="snow"
                  placeholder={"Enter Service Details..."}
                  onChange={handleAnswerChange}
                  onBlur={() => setFieldTouched("details", true)}
                  name="details"
                  value={values.details}
                  modules={modules}
                  readOnly={false}
                />
                {errors.details && touched.details && (
                  <p className="text-sm text-red-500">{errors.details}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-1/2 gap-6 mb-1">
              <div className="flex-grow">
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Select Category
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500"
                  name="categoryId"
                  onChange={(e) => handleCategoryChange(e)}
                  onBlur={handleBlur}
                  onFocus={() => (touched.categoryId = true)}
                  value={values.categoryId}
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  {!activeCategories && isFetching ? (
                    // <h1><TailSpin /></h1>
                    <h1>loading</h1>
                  ) : (
                    activeCategories?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.categoryName}
                      </option>
                    ))
                  )}
                </select>
                {errors.categoryId && touched.categoryId && (
                  <p className="text-sm text-red-500">{errors.categoryId}</p>
                )}
              </div>

              <div className="flex-grow">
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 mt-2 font-medium"
                >
                  Duration
                </label>
                <select
                  className="px-3 w-full py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => (touched.type = true)}
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  <option value="1">Monthly</option>
                  <option value="3">Quarterly</option>
                  <option value="6">Half-Yearly</option>
                  <option value="12">Yearly</option>
                  <option value="24">Two Years</option>
                  <option value="60">Five Years</option>
                </select>
                {errors.duration && touched.duration && (
                  <p className="text-sm text-red-500">{errors.duration}</p>
                )}
              </div>

              <div className="flex flex-row items-baseline">
                <div>
                  <label
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Is One Time
                  </label>
                  <Checkbox
                    checked={isOneTime}
                    onChange={handleCheckboxChange}
                  />
                  {errors.documentVideoUrl && touched.documentVideoUrl && (
                    <p className="text-sm text-red-500 ml-2">
                      {errors.documentVideoUrl}
                    </p>
                  )}
                </div>

                {isOneTime && (
                  <div className="flex flex-col flex-grow ml-4">
                    <label
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Cost
                    </label>
                    <Input
                      size="sm"
                      placeholder="Enter Cost"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onKeyDown={(e) => validateNumber(e)}
                      maxLength={7}
                      name="cost"
                      value={values.cost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.cost && touched.cost && (
                      <p className="text-sm text-red-500 ml-2">{errors.cost}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  About
                </label>
                <ReactQuill
                  className="h-50"
                  theme="snow"
                  placeholder={"Enter About Service..."}
                  onChange={handleAboutChange}
                  onBlur={() => setFieldTouched("about", true)}
                  name="about"
                  value={values.about}
                  modules={modules}
                  readOnly={false}
                />
                {errors.about && touched.about && (
                  <p className="text-sm text-red-500">{errors.about}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-2">
            {/* <Button onClick={handleClose}>Upload Service Videos</Button> */}
          </div>
          <Button
            primary={true}
            type="submit"
            disabled={isAdding || !(dirty && isValid)}
            isLoading={isAdding}
          >
            {id || localStorage.getItem("serviceDetails")
              ? "Update service"
              : "Create Service"}
          </Button>
        </form>
      )}
      {/* 
      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Choose a CSV file."
        confirmText="upload File"
        cancelText="Close"
        isConfirmVisible={true}
        onConfirm={handleConfirm}
      >
        <input
          type="file"
          id="csvFileInput"
          onChange={handleFileChange}

        />
        {csvError && <p style={{ color: 'red' }}>{csvError}</p>}  
      </ReusableModal> */}

      {/* <StepperWithContent open={open} handleOpen={handleClose} handleConfirm={handleUpload} /> */}
    </div>
  );
};

export default BasicDetails;
