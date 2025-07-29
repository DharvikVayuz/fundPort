import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import DragAndDrop from "../../../../../components/dragAndDrop";
import { TextArea } from "../../../../../components/inputs/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFundraise,
  uploadVideo,
} from "../../../../../redux/actions/fundraise-actions";
import { handleExtraSpaces, validateNumber } from "../../../../../utils";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePitchDec } from "../../../../../redux/slices/fundraiseSlice";
import { useState } from "react";
import toast from "react-hot-toast";
export const Documents = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { isFundraiseAdding, pitchDec, pitchDecLoading } = useSelector(
    (state) => state.fundraise
  );
  const { fundId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPitch, setVideoPitch] = useState(null); // State to manage video pitch selection
  const [fileType, setFileType] = useState("");
  const [filesToSend, setFilesToSend] = useState([]);
  const validationSchema = Yup.object({
    pitchDeck: Yup.string(),
    monthlyInformationSheet: Yup.string(),
    financialProjection: Yup.string(),
    currentCaptable: Yup.string(),
    termOfInvetsment: Yup.string(),
    dueDeligenceReport: Yup.string(),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    getFieldState,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      monthlyInformationSheet: pitchDec?.monthlyInformationSheet || "",
      financialProjection: pitchDec?.financialProjection || "",
      currentCaptable: pitchDec?.currentCaptable || "",
      pitchDeck: pitchDec?.pitchDeck || "",
      termOfInvetsment: pitchDec?.termOfInvetsment || "",
      dueDeligenceReport: pitchDec?.dueDeligenceReport || "",
    },
    // resolver: yupResolver(validationSchema),
  });
  console.log(errors, "errors"); // To check if there are any validation errors

  const onSubmit = (data) => {
    console.log(data, "pitch data");
    console.log(errors); // Check if validation errors are preventing the form submission
    console.log(isValid);
    const { amount, details, function: func, ...filteredData } = data;

    // Log to check if the fields are excluded
    console.log(filteredData, "Filtered pitch data");

    // const pitchDetails = {
    //   fundingRequirementId: fundId,
    //   function: handleExtraSpaces(data.function),
    //   details: handleExtraSpaces(data.details),
    //   pitchDeck : data.pitchDeck,
    //   videoPitch : data.videoPitch
    // }

    dispatch(
      updateFundraise({
        ...filteredData,
        fundingRequirementId: searchParams.get("fundId"),
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(updatePitchDec(filteredData));
        console.log(res, "pitch dec response");
        isEdit
          ? navigate(`/fundraise/update/past-revenue/${fundingRequirementId}`)
          : navigate(`/fundraise/create/past-revenue/${fundingRequirementId}`);
      });
  };
  const handleFileSelect = (file, documentType) => {
    console.log(file, documentType, "got file");
    const fileName = file?.name;
    const idxDot = fileName?.lastIndexOf(".") + 1;
    const extFile = fileName?.substr(idxDot, fileName.length).toLowerCase();
    console.log(extFile, "extFile");

    if (!["ppt", "pdf"].includes(extFile)) {
      event.target.value = "";
      toast.error("Please select a PPT, PDF file.");
      return;
    }
    setFilesToSend((prev) => [...prev, { file, documentType }]);
    setSelectedFile(file);
  };

  // const uploadPitchDecDoc = () => {
  //   console.log("called")
  //   const formData = new FormData();
  //   if (filesToSend && filesToSend.length > 0) {

  //     filesToSend.forEach((file) => {
  //       console.log(file, "file is here");

  //       formData?.append("files", file.file)
  //       dispatch(uploadVideo({ formData }))
  //         .unwrap()
  //         .then((response) => {
  //           console.log(response, "rewsponse");
  //           if (response?.code !== 200) {
  //             toast.error("Something went wrong");
  //           } else {
  //             console.log(response?.data?.url, "idhar hai url");
  //             // Set the value without triggering validation
  //             setValue(`${file.documentType}`, response?.data?.url);

  //             if (filesToSend.indexOf(file) === filesToSend.length - 1) {
  //               handleSubmit(onSubmit)(); // Manually trigger form submission
  //             }
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //   }
  // };
  const uploadPitchDecDoc = async () => {
    console.log("called");

    if (filesToSend && filesToSend.length > 0) {
      try {
        for (const file of filesToSend) {
          console.log(file, "file is here");
          const formData = new FormData();
          formData.append("files", file.file);

          // Wait for the upload to complete before proceeding to the next file
          const response = await dispatch(uploadVideo({ formData })).unwrap();

          console.log(response, "response");
          if (response?.code !== 200) {
            toast.error("Something went wrong");
            return; // If there's an error, stop the process
          } else {
            console.log(response?.data?.url, "idhar hai url");

            // Set the value without triggering validation
            setValue(`${file.documentType}`, response?.data?.url);

            if (filesToSend.indexOf(file) === filesToSend.length - 1) {
              handleSubmit(onSubmit)(); // Manually trigger form submission after all files are uploaded
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (value) => {
    setFileType(value); // Set the file type based on selected checkbox
    setSelectedFile(null); // Clear selected file whenever checkbox changes
  };
  return (
    <form onSubmit={handleSubmit(uploadPitchDecDoc)} className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `60%`,
          }}
        ></div>
      </div>

      {/* Upload your Pitch Deck */}
      <h4>3. Upload your Document</h4>
      <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <DragAndDrop
          text={"Pitch Dec document"}
          videoUrl={pitchDec?.pitchDeck}
          onFileSelect={(file) => handleFileSelect(file, "pitchDeck")}
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            // onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
        <DragAndDrop
          text={"Monthly Information Sheet"}
          videoUrl={pitchDec?.monthlyInformationSheet}
          onFileSelect={(file) =>
            handleFileSelect(file, "monthlyInformationSheet")
          }
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
        <DragAndDrop
          text={"Financial Projection"}
          videoUrl={pitchDec?.financialProjection}
          onFileSelect={(file) => handleFileSelect(file, "financialProjection")}
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
        <DragAndDrop
          text={"Current Captable"}
          videoUrl={pitchDec?.currentCaptable}
          onFileSelect={(file) => handleFileSelect(file, "currentCaptable")}
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
        <DragAndDrop
          text={"Term Of Invetsment Report"}
          videoUrl={pitchDec?.termOfInvetsment}
          onFileSelect={(file) => handleFileSelect(file, "termOfInvetsment")}
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
        <DragAndDrop
          text={"Due Deligence Report"}
          videoUrl={pitchDec?.dueDeligenceReport}
          onFileSelect={(file) => handleFileSelect(file, "dueDeligenceReport")}
          className={"h-fit bg-white"}
        />
        {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={uploadPitchDecVideo}
          >
            Upload video
          </Button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-end items-center gap-6">
        <Button onClick={() => navigate(-1)} type="button" outline>
          {"Back"}
        </Button>
        <Button isLoading={isFundraiseAdding || pitchDecLoading} primary>
          {"Next"}
        </Button>
      </div>
    </form>
  );
};
