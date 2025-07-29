import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Selector } from "../../../../../components/select";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { validateNumber } from "../../../../../utils";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFundraise } from "../../../../../redux/actions/fundraise-actions";
import { updateCurrentFundingDetails } from "../../../../../redux/slices/fundraiseSlice";
import { TextArea } from "../../../../../components/inputs/textarea";

// Define validation schema using Yup
// const validationSchema = Yup.object({
//   roundType: Yup.string().required("Round Type is required"),
//   currentlyRaising: Yup.number()
//     .positive("Amount must be positive")
//     .required("Currently Raising amount is required"),
//   preMoneyValuation: Yup.number()
//     .positive("Amount must be positive")
//     .required("Pre-Money Valuation is required"),
//   commitmentReceived: Yup.boolean().oneOf([true, false], "Commitment Received is required"),
// });
const validationSchema = Yup.object({
  roundType: Yup.string().required("Round Type is required"),
  currentlyRaising: Yup.string()
    .oneOf(["yes", "no"], "Please select Yes or No")
    .required("Currently Raising selection is required"),
  preMoneyValuation: Yup.number()
    .positive("Amount must be positive")
    .required("Pre-Money Valuation is required"),
  commitmentReceived: Yup.boolean()
    .required("Commitment Received is required")
    .oneOf([true, false], "Commitment Received is required"),
});

export const CurrentFunding = ({ isEdit = false }) => {
  const navigate = useNavigate();
  // const { fundId } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const fundingRequirementId = searchParams.get("fundId");
  const { isFundraiseAdding, currentFunding } = useSelector(
    (state) => state.fundraise
  );

  console.log(currentFunding, "currentFunding");

  // Set default value for commitmentReceived to false or true
  const [commitmentReceived, setCommitmentReceived] = useState(false); // default to 'No'

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors, isValid },
  //   setValue,
  //   getValues,
  //   getFieldState,
  //   watch,
  //   trigger,
  // } = useForm({
  //   mode: "onChange",
  //   defaultValues : {
  //     roundType : "",
  //     currentlyRaising : "",
  //     preMoneyValuation : "",
  //     commitmentReceived : false
  //   },
  //   resolver: yupResolver(validationSchema),  // Attach the validation schema
  // });
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
      roundType: currentFunding?.roundType || "",
      currentlyRaising: currentFunding?.currentlyRaising || "",
      preMoneyValuation: currentFunding?.preMoneyValuation || "",
      commitmentReceived: currentFunding?.commitmentReceived ?? false,
    },
    resolver: yupResolver(validationSchema), // Attach the validation schema
  });

  useEffect(() => {
    currentFunding &&
      setCommitmentReceived(
        currentFunding?.commitmentReceived?.toLowerCase() === "yes"
      );
  }, []);
  const onSubmit = (data) => {
    console.log(data, "data ");
    dispatch(
      updateFundraise({
        ...data,
        currentlyRaising: data.currentlyRaising.toString(),
        commitmentReceived: data.commitmentReceived ? "yes" : "no",
        fundingRequirementId,
      })
    )
      .unwrap()
      .then((res) => {
        // if(res.code!== 200 || res.code!== 201){
        //   return;
        // }
        dispatch(
          updateCurrentFundingDetails({
            ...data,
            currentlyRaising: data.currentlyRaising.toString(),
            commitmentReceived: data.commitmentReceived ? "yes" : "no",
            fundingRequirementId,
          })
        );
        isEdit
          ? navigate(
              `/fundraise/update/pitch-deck?fundId=${fundingRequirementId}`
            )
          : navigate(`/fundraise/create/pitch-deck/${fundingRequirementId}`);

        // navigate(`/fundraise/create/pitch-deck/${fundId}`);
      });
    // navigate(`/fundraise/create/pitch-deck/${fundId}`);
  };

  const fundingRoundTypes = [
    { value: "pre-seed", label: "Pre-Seed" },
    { value: "seed", label: "Seed" },
    { value: "series-a", label: "Series A" },
    { value: "series-b", label: "Series B" },
    { value: "series-c", label: "Series C" },
    { value: "mezzanine", label: "Mezzanine Financing / Bridge Round" },
    { value: "ipo", label: "Initial Public Offering (IPO)" },
    { value: "convertible-notes", label: "Convertible Notes" },
    { value: "debt-financing", label: "Debt Financing" },
    { value: "crowdfunding", label: "Crowdfunding" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `40%`,
          }}
        ></div>
      </div>

      {/* Current Funding */}
      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
        {/* Left Column */}
        <div className="w-full grid grid-cols-1 gap-6">
          <h4>2. What is your current funding requirement?</h4>
          <Controller
            name="roundType"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Round Type"
                options={fundingRoundTypes}
                value={
                  fundingRoundTypes.find(
                    (option) => option.value === field.value
                  ) || null
                }
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                  trigger("roundType");
                }}
                placeholder="Select round type"
                onBlur={() => trigger("roundType")}
                errorContent={errors.roundType?.message}
              />
            )}
          />
          {/* <p>{errors.roundType?.message}</p> Display error message */}

          {/* <Controller
            name="currentlyRaising"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  label="Currently Raising(amount)"
                  placeholder="Currently Raising(amount)"
                  onKeyDown={validateNumber}
                />
              );
            }}
          />
          <p>{errors.currentlyRaising?.message}</p>
           */}
          <Controller
            name="currentlyRaising"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Currently Raising"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={
                  field.value
                    ? {
                        value: field.value,
                        label:
                          field.value.charAt(0).toUpperCase() +
                          field.value.slice(1),
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                  trigger("currentlyRaising");
                }}
                placeholder="Select option"
                onBlur={() => trigger("currentlyRaising")}
                errorContent={errors.currentlyRaising?.message}
              />
            )}
          />
          {/* <p>{errors.currentlyRaising?.message}</p> Display error message */}

          <Controller
            name="preMoneyValuation"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  label="Pre-Money Valuation"
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 10); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                  errorContent={errors.preMoneyValuation?.message}
                />
              );
            }}
          />
          {/* <p>{errors.preMoneyValuation?.message}</p> Display error message */}
          <div className="flex items-center gap-6">
            <h4>Commitment Received ?</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={commitmentReceived === true}
                  onChange={() => {
                    setCommitmentReceived(true);
                    setValue("commitmentReceived", true); // Update the form value
                  }}
                />
                <p>Yes</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={commitmentReceived === false}
                  onChange={() => {
                    setCommitmentReceived(false);
                    setValue("commitmentReceived", false); // Update the form value
                  }}
                />
                <p>No</p>
              </div>
            </div>
            <p>{errors.commitmentReceived?.message}</p>{" "}
            {/* Display error message */}
          </div>
        </div>

        <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

        {/* Right Column */}
        <div className="w-full grid grid-cols-1 gap-6">
          <h4>Utilization of the fund</h4>
          {/* Utilization of the fund */}
          <Controller
            name="function"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  maxLength={50}
                  {...field}
                  label="Utilization"
                  errorContent={errors.function?.message}
                  onBlur={() => {
                    field.onBlur();
                    trigger(`function`);
                  }}
                />
              );
            }}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  maxLength={9}
                  onKeyDown={validateNumber}
                  {...field}
                  label="Amount"
                  errorContent={errors.amount?.message}
                />
              );
            }}
          />
          <Controller
            name="details"
            control={control}
            render={({ field }) => {
              return (
                <TextArea
                  {...field}
                  className={"h-20"}
                  label="Details"
                  errorContent={errors.details?.message}
                  onBlur={() => {
                    field.onBlur();
                    trigger(`details`);
                  }}
                />
              );
            }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-end items-center gap-6">
        <Button onClick={() => navigate(-1)} type="button" outline>
          {"Back"}
        </Button>
        <Button
          isLoading={isFundraiseAdding}
          type="submit"
          primary
          disabled={!isValid}
        >
          {"Next"}
        </Button>
      </div>
    </form>
  );
};
