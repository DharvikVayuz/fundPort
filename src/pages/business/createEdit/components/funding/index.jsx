import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fundingSchema } from "../../../../../validation/createBusinessValidationSchema";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../../../components/buttons";
import {
  updateFundingDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { isEqualObject } from "../../../../../utils";

export const FundingDetails = ({ isEdit }) => {
  const { business, businessId, loading } = useSelector(
    (state) => state.business
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // console.log("business,businessId", business, businessId);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(getValidationSchema(currentStep)),
    defaultValues: business || {},
    resolver: yupResolver(fundingSchema), // Apply the validation schema here
  });

  // useEffect(() => {
  //   // Ensure to populate the registration data when business is available
  //   if (business) {
  //     setValue("funding.lookingForFunding", business?.funding?.lookingForFunding);
  //     setValue("funding.existingBusinessName", business?.funding?.existingBusinessName);

  //   }
  // }, [business, setValue]);
  const isFundingRequiredOption = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];
  const existingBusinessOption = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];
  const stageOfBusinessOption = [
    { label: "Idea Stage", value: "idea_stage" },
    { label: "Pre-Seed", value: "pre_seed" },
    { label: "Seed Stage", value: "seed_stage" },
    { label: "Early Stage", value: "early_stage" },
    { label: "Growth Stage", value: "growth_stage" },
    { label: "Expansion Stage", value: "expansion_stage" },
    { label: "Established", value: "established" },
    { label: "Mature Stage", value: "mature_stage" },
    { label: "Decline Stage", value: "decline_stage" },
    { label: "Exit Stage", value: "exit_stage" },
  ];

  useEffect(() => {
    // console.log("useeffect");

    setValue("funding.lookingForFunding", business?.funding?.lookingForFunding);
    setValue(
      "funding.existingBusinessName",
      business?.funding.existingBusinessName
    );
    setValue("funding.stageOfBusiness", business?.funding.stageOfBusiness);
  }, []);

  const onSubmit = (data) => {
    // console.log("Submitted Data : Funding  :", data);
    const payload = data?.funding;

    if (!businessId) {
      // console.log("No businessId exist is in business Store");
      return;
    }

    const { funding } = business;
    const isChanged = funding && !isEqualObject(funding, payload);
    // console.log("isChanged", isChanged);

    const source =
      searchParams.get("source") === "details"
        ? `?id=${searchParams.get("id")}&&source=details`
        : searchParams.get("source") === "dashboard"
        ? "?source=dashboard"
        : "";

    if (!isChanged) {
      isEdit ? navigate(-5) : navigate(`/business/preview${source}`);
      return;
    }

    //  //PUT API to update changes
    payload.businessId = businessId;
    if(business?.formStep < 5) payload.formStep = 5;

    dispatch(updateFundingDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId));
      isEdit ? navigate(-5) : navigate(`/business/preview${source}`);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 space-y-4">
        <div className="my-4">
          <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
            Funding Requirement
          </h5>
          <p className="text-xs">
            Provide the necessary funding detail of your own business.
          </p>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <Controller
            name="funding.lookingForFunding"
            control={control}
            render={({ field }) => {
              const selectedFund = isFundingRequiredOption.find(
                (option) => option.value === field.value
              );
              return (
                <Selector
                  {...field}
                  label={"Funding Required"}
                  placeholder={"Do you require funding?"}
                  errorContent={errors.funding?.lookingForFunding?.message}
                  options={isFundingRequiredOption}
                  required={true}
                  value={selectedFund}
                  // onBlur={() => handleBlur("funding.lookingForFunding")}
                  onChange={(selectedValue) => {
                    field.onChange(selectedValue.value); // Default handling
                    trigger("funding.lookingForFunding"); // Manually trigger validation
                    setValue("funding.lookingForFunding", selectedValue.value); // Update value
                  }}
                />
              );
            }}
          />
          <Controller
            name="funding.existingBusinessName"
            control={control}
            render={({ field }) => {
              const selectedFund = existingBusinessOption.find(
                (option) => option.value === field.value
              );
              return (
                <Selector
                  {...field}
                  label={"Existing Business"}
                  placeholder={"Select existing business"}
                  errorContent={errors.funding?.existingBusinessName?.message}
                  options={existingBusinessOption}
                  required={true}
                  value={selectedFund}
                  // onBlur={() => handleBlur("funding.existingBusinessName")}
                  onChange={(selectedValue) => {
                    field.onChange(selectedValue.value); // Default handling
                    trigger("funding.existingBusinessName"); // Manually trigger validation
                    setValue(
                      "funding.existingBusinessName",
                      selectedValue.value
                    ); // Update value
                  }}
                />
              );
            }}
          />
          <Controller
            name="funding.stageOfBusiness"
            control={control}
            render={({ field }) => {
              const selectedOption = stageOfBusinessOption.find(
                (option) => option.value === field.value
              );
              return (
                <Selector
                  {...field}
                  label={"Stage Of Business"}
                  placeholder={"Stage Of Business"}
                  errorContent={errors.funding?.stageOfBusiness?.message}
                  options={stageOfBusinessOption}
                  required={true}
                  value={selectedOption}
                  // onBlur={() => handleBlur("funding.stageOfBusiness")}
                  onChange={(selectedValue) => {
                    field.onChange(selectedValue.value); // Default handling
                    trigger("funding.stageOfBusiness"); // Manually trigger validation
                    setValue("funding.stageOfBusiness", selectedValue.value); // Update value
                  }}
                />
              );
            }}
          />
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="px-6 py-4 flex justify-between items-center gap-6">
        <Button
          type="button"
          className="flex items-center gap-2 bg-[#FFD700] p-1 px-4 text-[15px] rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <p className="text-xs text-orange-400">Please ensure the accuracy of the data</p>
        <Button
          type="submit"
          primary
          disabled={!isValid || loading}
          isLoading={loading}
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Save & Continue"
            : "Save & Preview"}
        </Button>
      </div>
    </form>
  );
};
