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
export const PitchDeck = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { isFundraiseAdding, pitchDec, pitchDecLoading } = useSelector(
    (state) => state.fundraise
  );
  const [searchParams] = useSearchParams();
  const { fundId } = useParams();
  const fundingRequirementId = searchParams.get("fundId");
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPitch, setVideoPitch] = useState(null); // State to manage video pitch selection
  const [fileType, setFileType] = useState("");
  const [filesToSend, setFilesToSend] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const [videoPitchLater, setVideoPitchLater] = useState(false);
  const validationSchema = Yup.object({
    videoPitch: Yup.string().nullable(),
    investorIndorsementVideo: Yup.string().nullable(),
    customerTestimonialVideo: Yup.string().nullable(),
  });
  // const [filesToSend, setFilesToSend] = useState([])
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
      function: pitchDec?.function || "",
      amount: pitchDec?.amount || "",
      details: pitchDec?.details || "",
      pitchDeck: pitchDec?.pitchDeck || "",
      videoPitch: pitchDec?.videoPitch || "",
    },
    // resolver: yupResolver(validationSchema),
  });
  console.log(errors, "errors"); // To check if there are any validation errors

  const onSubmit = (data) => {
    // Check if validation errors are preventing the form submission

    const { amount, function: func, details, ...filteredVideoData } = data;
    dispatch(
      updateFundraise({
        ...filteredVideoData,
        fundingRequirementId,
        videoPitchLater,
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(updatePitchDec(filteredVideoData));
        console.log(res, "pitch dec response");
        isEdit
          ? navigate(
              `/fundraise/update/documents?fundId=${fundingRequirementId}`
            )
          : navigate(
              `/fundraise/create/documents?fundId=${fundingRequirementId}`
            );
      });
  };

  const handleVideoSelect = (file, documentType) => {
    console.log(file, "got file");
    const fileName = file.name;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (!["mp4", "mov"].includes(extFile)) {
      event.target.value = "";
      toast.error("Please select a mp4, mov file.");
      return;
    }
    setFilesToSend((prev) => [...prev, { file, documentType }]);
    setVideoPitch(file);
  };

  const uploadPitchDecVideo = async () => {
    // if (videoPitch) {
    //   formData.append("files", videoPitch);
    //   dispatch(uploadVideo({ formData }))
    //     .unwrap()
    //     .then((response) => {
    //       console.log(response, "rewsponse");
    //       if (response?.code !== 200) {
    //         toast.error("response?.data?.message");
    //       } else {
    //         console.log(response?.data?.url, "idhar hai url");
    //         // Set the value without triggering validation
    //         setValue("videoPitch", response?.data?.url);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
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
  const uploadPitchDecDoc = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("files", selectedFile);
      dispatch(uploadVideo({ formData }))
        .unwrap()
        .then((response) => {
          console.log(response, "rewsponse");
          if (response?.code !== 200) {
            toast.error("Something went wrong");
          } else {
            console.log(response?.data?.url, "idhar hai url");
            // Set the value without triggering validation
            setValue("pitchDeck", response?.data?.url);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // Handle checkbox change
  const handleCheckboxChange = (value) => {
    setVideoPitchLater(value === "maybeLater"); // Set to true if "Do It Later" is selected
    setFileType(value); // Set the file type based on selected checkbox
    setSelectedFile(null); // Clear selected file whenever checkbox changes
  };
  return (
    <form onSubmit={handleSubmit(uploadPitchDecVideo)} className="w-full">
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
      <h4>3. Upload your Investor Indorsement Video</h4>
      <div className="w-full pt-4 flex flex-col gap-6">
        <DragAndDrop
          text={"Investor Indorsement Video"}
          videoUrl={pitchDec?.videoPitch}
          onFileSelect={(file) =>
            handleVideoSelect(file, "investorIndorsementVideo")
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
      </div>
      <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
      <h4>3. Upload your Customer Testimonial Video</h4>
      <div className="w-full pt-4 flex flex-col gap-6">
        <DragAndDrop
          text={"Customer Testimonial Video"}
          videoUrl={pitchDec?.customerTestimonialVideo}
          onFileSelect={(file) =>
            handleVideoSelect(file, "customerTestimonialVideo")
          }
          className={"h-fit bg-white"}
        />
        {/* {videoPitch && (
          <Button
            primary
            type={"button"}
            isLoading={pitchDecLoading}
            onClick={(file)=> uploadPitchDecVideo(file, "")}
          >
            Upload video
          </Button>
        )} */}
      </div>

      <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
      {/* Do you have a video pitch? */}
      <h4>4. Do you have a video pitch?</h4>
      <div className="w-full pt-4 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={fileType === "yes"}
              onChange={() => handleCheckboxChange("yes")}
            />
            <p>Yes</p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={fileType === "no"}
              onChange={() => handleCheckboxChange("no")}
            />
            <p>No</p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={fileType === "maybeLater"}
              onChange={() => handleCheckboxChange("maybeLater")}
            />
            <p>Do It Later</p>
          </div>
        </div>
        {fileType === "yes" && (
          <>
            <DragAndDrop
              text={"video pitch"}
              onFileSelect={(file) => handleVideoSelect(file, "videoPitch")}
              className={"h-fit bg-white"}
            />
            {/* <Button primary type={"button"} onClick={uploadPitchDecDoc}>
              Upload Pitch
            </Button> */}
          </>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-end items-center gap-6">
        <Button onClick={() => navigate(-1)} type="button" outline>
          {"Back"}
        </Button>
        <Button isLoading={isFundraiseAdding} primary>
          {"Next"}
        </Button>
      </div>
    </form>
  );
};
