import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Selector } from "../../../../../components/select";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons";
import { validateNumber } from "../../../../../utils";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFundraise } from "../../../../../redux/actions/fundraise-actions";
import {
  updateCurrentFundingDetails,
  updateFundingReasonDetails,
} from "../../../../../redux/slices/fundraiseSlice";
import { TextEditor } from "../../../../../components/inputs/editor";

export const FundingReason = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { fundId } = useParams();

  const dispatch = useDispatch();
  const { isFundraiseAdding, fundingReason, pitchDec } = useSelector(
    (state) => state.fundraise
  );
  const [maxTicketSize, setMaxTicketSize] = useState("");
  const calculateMinTicketSizeValidation = () => {
    const newValue = Number(pitchDec?.amount); // Ensure it's a valid number

    const percentage = 10; // Dynamic percentage
    const maxTicketSize = newValue * (percentage / 100); // Calculate 10% of pitchDec.amount

    // Round the result to make sure it's a whole number (if you want)
    const roundedMaxTicketSize = Math.round(maxTicketSize);

    console.log(roundedMaxTicketSize);

    setMaxTicketSize(roundedMaxTicketSize); // Set max ticket size
  };

  useEffect(() => {
    calculateMinTicketSizeValidation();
  }, [pitchDec, maxTicketSize]);
  console.log(pitchDec, "pitchDec");

  const validationSchema = Yup.object({
    investmentReason: Yup.string().required("Investment Reason is required"),
    minTicketSize: Yup.number()
      .positive("Ticket size must be positive")
      .required("Ticket size is required")
      .max(
        maxTicketSize,
        `Ticket size must not exceed the max limit of ${maxTicketSize}`
      ),
    dealClosureDate: Yup.string().required("Deal Closure Date is required"),
  });
  // Set default value for commitmentReceived to false or true
  const [commitmentReceived, setCommitmentReceived] = useState(false); // default to 'No'
  const sanitizeInput = (value) => {
    if (!value) return ""; // Handle null or undefined
    return value
      .replace(/\s{2,}/g, " ") // Remove multiple spaces between words
      .replace(/<p>\s*(.*?)\s*<\/p>/g, (match, innerText) => {
        return `<p>${innerText.trim()}</p>`;
      }) // Trim spaces inside <p> and other block tags
      .replace(/<p>\s*<\/p>/g, "") // Remove empty <p> tags
      .replace(/<ul>\s*<\/ul>/g, "") // Remove empty <ul> tags
      .replace(/<li>\s*<\/li>/g, "") // Remove empty <li> tags
      .replace(/<p>(\s|<br>)*<\/p>/g, "") // Remove <p> tags with only <br>
      .trim(); // Final trim for the entire content
  };
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
      investmentReason: fundingReason?.investmentReason || "",
      minTicketSize: fundingReason?.minTicketSize || null,
      interestType: fundingReason?.interestType || "",
      dealClosureDate: fundingReason?.dealClosureDate || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data, "data ");
    dispatch(
      updateFundraise({
        ...data,
        investmentReason: data.investmentReason,
        minTicketSize: data.minTicketSize,
        dealClosureDate: new Date(data.dealClosureDate).getTime(),
        fundingRequirementId: fundId,
      })
    )
      .unwrap()
      .then((res) => {
        // if(res.code!== 200 || res.code!== 201){
        //   return;
        // }
        dispatch(
          updateFundingReasonDetails({
            ...data,
            fundingReason: sanitizeInput(fundingReason),
            fundingRequirementId: fundId,
          })
        );
        isEdit
          ? navigate(`/fundraise/update/pitch-deck/${fundId}`)
          : navigate(`/fundraise/create/pitch-deck/${fundId}`);
      });
  };

  const fundingInterestTypes = [
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

  const handleEditorChange = (value) => {
    const cleanedValue = value
      .replace(/<ul>\s*<\/ul>/g, "") // Remove empty <ul> tags
      .replace(/<li>\s*<\/li>/g, "") // Remove empty <li> tags
      .replace(/<p>(\s|<br>)*<\/p>/g, "") // Remove <p> tags with only <br>
      .replace(/<ul>(\s|<li><br><\/li>)*<\/ul>/g, "") // Remove <ul> with empty <li><br></li>
      .replace(/<p>\s*<\/p>/g, ""); // Ensure no empty <p> tags

    setValue("investmentReason", cleanedValue);
    console.log(value, "adasdasdasd");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `90%`,
          }}
        ></div>
      </div>

      {/* Funding Reason */}
      <h4>6. What is the reason of funding?</h4>
      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6">
        {/* Left Column */}
        <div className="w-full grid grid-cols-1 gap-6">
          <Controller
            name="interestType"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label="Interest Type"
                options={fundingInterestTypes}
                value={
                  fundingInterestTypes.find(
                    (option) => option.value === field.value
                  ) || null
                }
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                  trigger("interestType");
                }}
                placeholder="Select Interest Type"
                onBlur={() => trigger("interestType")}
                errorContent={errors.interestType?.message}
              />
            )}
          />
          <Controller
            name="minTicketSize"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type={"number"}
                  label="Minimum Ticket Size"
                  onKeyDown={validateNumber}
                  onBlur={() => trigger("minTicketSize")}
                  errorContent={errors.minTicketSize?.message}
                />
              );
            }}
          />
        </div>

        <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

        {/* Right Column */}
        <div className="w-full grid grid-cols-1 gap-6">
          <Controller
            name="dealClosureDate"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type={"date"}
                  label="Deal Closure Date"
                  onKeyDown={validateNumber}
                  errorContent={errors.dealClosureDate?.message}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <Controller
          name="investmentReason"
          control={control}
          render={({ field }) => {
            return (
              <TextEditor
                {...field}
                onChange={handleEditorChange}
                label="Investment Reason"
                onKeyDown={validateNumber}
                errorContent={errors.investmentReason?.message}
                // onBlur={()=> setValue("FundingReason", value)}
              />
            );
          }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-end items-center gap-6">
        <Button onClick={() => navigate(-1)} type="button" outline>
          {"Back"}
        </Button>
        <Button
          isLoading={isFundraiseAdding}
          type="submit"
          primary
          // disabled={!isValid}
        >
          {"Next"}
        </Button>
      </div>
    </form>
  );
};
