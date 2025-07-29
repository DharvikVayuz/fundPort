import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  isEqualObject,
  validateNumber,
  validateProfitValue,
} from "../../../../../utils";
import { Button } from "../../../../../components/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  updateFinancialDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { yupResolver } from "@hookform/resolvers/yup";
import { financialSchema } from "../../../../../validation/createBusinessValidationSchema";

export const FinancialDetails = ({ isEdit }) => {
  const { business, businessId, loading } = useSelector(
    (state) => state.business
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // console.log("business,businessId",business,businessId);

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
    resolver: yupResolver(financialSchema), // Apply the validation schema here
  });

  useEffect(() => {
    // Ensure to populate the registration data when business is available
    if (business) {
      // setValue("financial.capital", business?.financial?.capital);
      setValue("financial.authorizedCapital", business?.financial?.authorizedCapital);
      setValue("financial.paidCapital", business?.financial?.paidCapital);
      setValue("financial.revenue", business?.financial?.revenue);
      setValue("financial.profit", business?.financial?.profit);
      setValue("financial.pat", business?.financial?.pat);
      setValue("financial.grossMargin", business?.financial?.grossMargin);
      setValue("financial.loans", business?.financial?.loans);
    }
  }, [business]);

  const handleFieldChange = (fieldName, field, trigger) => {
    return (e) => {
      field.onChange(e); // Default handling
      trigger(fieldName); // Manually trigger validation for this field
    };
  };

  // const handleFieldBlur = (fieldName) => {
  //   return () => {
  //     handleBlur(fieldName); // Call the default handleBlur to trigger validation on blur
  //     trigger(fieldName); // Manually trigger validation for the field on blur
  //   };
  // };

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const payload = data?.financial;
    if (!businessId) {
      // console.log("No businessId exist is in business Store");
      return;
    }

    

    const { financial } = business;
    const isChanged = financial && !isEqualObject(financial, payload);
    // console.log("isChanged", isChanged);
    const source =
      searchParams.get("source") === "details"
        ? `?id=${searchParams.get("id")}&&source=details`
        : searchParams.get("source") === "dashboard"
        ? "?source=dashboard"
        : "";

    if (!isChanged) {
      isEdit
        ? navigate(`/business/edit/kyc${source}`)
        : navigate(`/business/create/kyc${source}`);
      return;
    }

    //PUT API to update changes
    payload.businessId = businessId;
    
     if(business?.formStep < 3) payload.formStep = 3;
    dispatch(updateFinancialDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId));
      if (!response?.error)
        isEdit
          ? navigate(`/business/edit/kyc${source}`)
          : navigate(`/business/create/kyc${source}`);
    });

    // navigate("/business/create/kyc");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      {/* <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `60%`,
          }}
        ></div>
      </div> */}
      <div className="px-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        <div className="w-full grid grid-cols-1 gap-6">
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Financial Details{" "}
              <span className="text-xs text-gray-500">(in ₹ Rupees)</span>
            </h5>
            <p className="text-xs">
              Provide the necessary financial detail of your own business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              name={`financial.authorizedCapital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Authorized Capital(₹)`}
                  placeholder={`Enter authorized capital`}
                  errorContent={errors.financial?.authorizedCapital?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.capital`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.authorizedCapital`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.paidCapital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Paid Capital(₹)`}
                  placeholder={`Enter paid capital`}
                  errorContent={errors.financial?.paidCapital?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.capital`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.paidCapital`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.revenue`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Revenue(₹)`}
                  placeholder={`Enter revenue`}
                  errorContent={errors.financial?.revenue?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.revenue`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.revenue`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.profit`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Profit(₹)`}
                  placeholder={`Enter profit`}
                  errorContent={errors.financial?.profit?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.profit`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.profit`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateProfitValue}
                  onInput={(e) => {
                    const value = e.target.value;
                    e.target.value = value.slice(0, 15); // Enforce max length on paste
                  }}
                />
              )}
            />
            <Controller
              name={`financial.pat`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Enter PAT(Profit After Tax in ₹)`}
                  placeholder={`Enter PAT`}
                  errorContent={errors.financial?.pat?.message}
                  required={true}
                  onChange={handleFieldChange(`financial.pat`, field, trigger)} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.grossMargin`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Enter Gross Margin (₹)`}
                  placeholder={`Enter Gross Margin`}
                  errorContent={errors.financial?.grossMargin?.message}
                  required={true}
                  onChange={handleFieldChange(
                    `financial.grossMargin`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.loans`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Enter Loan amount (₹)`}
                  placeholder={`Enter Loan amount`}
                  errorContent={errors.financial?.loans?.message}
                  required={true}
                  onChange={handleFieldChange(
                    `financial.loans`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 15); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 flex justify-between items-center gap-6">
        <Button
          className="flex items-center gap-2 bg-[#FFD700] p-1 px-4 text-[15px]  rounded-md"
          type="button"
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
          {loading ? "Saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
