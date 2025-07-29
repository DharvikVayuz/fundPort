import { useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../../components/buttons";
import { Input } from "../../../../../components/inputs";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { Selector } from "../../../../../components/select";
import {
  getAllBusiness,
  getBusinessDropdown,
} from "../../../../../redux/actions/businessPage-action";
import {
  addFundraise,
  getFundraise,
  getSingleFundraise,
  updateFundraise,
} from "../../../../../redux/actions/fundraise-actions";
import { fundraiseFundDetailsSchema } from "../../../../../validation/fundraiseScehmas";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateNumber } from "../../../../../utils/adminUtils";
import toast from "react-hot-toast";
import { updateFundDetails } from "../../../../../redux/slices/fundraiseSlice";
import { ImSpinner2 } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

export const PastFundings = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const { businessDropDown, isLoading } = useSelector(
    (state) => state.businessList
  );
  const { isFundraiseAdding, fundDetails, singleFundraiseLoading } =
    useSelector((state) => state.fundraise);

  const { fundId } = useParams();
  useEffect(() => {
    // dispatch(getFundraise({fundingRequirementId : localStorage.getItem}))
  }, []);
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

  const prefferedGeogrophicalLoacation = [
    { value: "north_india", label: "North India" },
    { value: "west_india", label: "West India" },
    { value: "south_india", label: "South India" },
    { value: "east_india", label: "East India" },
  ];

  useEffect(() => {
    dispatch(getBusinessDropdown());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getSingleFundraise({ fundingRequirementId: fundId }));
    }
  }, []);
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
    // defaultValues: {
    //   fundDetails: [
    //     {
    //       roundName: "",
    //       roundType: "",
    //       fundingDate: "",
    //       leadInvestor: "",
    //       fundingAmount: "",
    //       valuation: "",
    //     },
    //   ],
    // },
    defaultValues: {
      businessId: fundDetails?.businessId || "", // Set businessId here
      businessLocation: fundDetails?.businessLocation || "", // Set businessId here
      companyRaisedFundBefore: fundDetails?.companyRaisedFundBefore || false,
      fundDetails: fundDetails?.fundDetails ||
        fundDetails?.funddetails || [
          // Set fundDetails here
          {
            roundName: "",
            roundType: "",
            fundingDate: "",
            leadInvestor: "",
            fundingAmount: "",
            valuation: "",
            stackDiluted: "",
          },
        ],
    },
    // resolver: yupResolver(fundraiseFundDetailsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fundDetails",
  });

  const onSubmit = (data) => {
    console.log(data, "data from onsubmit");
    const fundraiseData = {
      ...data,
      fundDetails: data.fundDetails.map((item) => ({
        ...item,
        fundingDate: item.fundingDate
          ? new Date(item.fundingDate).getTime()
          : null,
      })),
    };
    if (window.location.pathname.includes("update")) {
      // Only call updateFundraise if the URL path contains "update"
      // dispatch(updateFundraise({ ...fundraiseData, fundingRequirementId: localStorage.getItem("fundId") }))
      dispatch(
        updateFundraise({
          ...fundraiseData,
          fundingRequirementId: queryParams.get("fundId"),
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(updateFundDetails(fundraiseData));
          navigate(
            `/fundraise/update/current-funding?fundId=${queryParams.get(
              "fundId"
            )}`
          );
        });
    } else if (fundDetails.length > 0) {
      // Ensure you handle cases where fundDetails exist but "update" is not in the URL
      dispatch(
        updateFundraise({
          ...fundraiseData,
          fundingRequirementId: localStorage.getItem("fundId"),
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(updateFundDetails(fundraiseData));
          navigate(`current-funding/${localStorage.getItem("fundId")}`);
        });
    } else {
      // Handle fundraise creation
      dispatch(addFundraise(fundraiseData))
        .unwrap()
        .then((res) => {
          console.log(res, "res from component");
          if (res?.code === 201) {
            toast.error(res?.message);
            return;
          }
          dispatch(updateFundDetails(data));
          localStorage.setItem("fundId", res?._id);
          isEdit
            ? navigate(`/fundraise/update/current-funding?fundId=${res._id}`)
            : navigate(`/fundraise/create/current-funding?fundId=${res._id}`);
        });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("fundId") &&
      window.location.pathname.includes("update")
    ) {
      dispatch(
        getSingleFundraise({
          fundingRequirementId: localStorage.getItem("fundId"),
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res, "basic detail response");
          setValue("businessId", res[0].businessId || "");
          setValue(
            "companyRaisedFundBefore",
            res[0]?.companyRaisedFundBefore || false
          );
          setValue(
            "fundDetails",
            res[0]?.funddetails || [
              {
                roundName: "",
                roundType: "",
                fundingDate: "",
                leadInvestor: "",
                fundingAmount: "",
                valuation: "",
              },
            ]
          );
          const fundraiseDetails = {
            businessId: res?.[0].businessId || "", // Set businessId here
            companyRaisedFundBefore: res?.[0]?.companyRaisedFundBefore || false,
            fundDetails: res?.[0]?.funddetails || [
              // Set fundDetails here
              {
                roundName: "",
                roundType: "",
                fundingDate: "",
                leadInvestor: "",
                fundingAmount: "",
                valuation: "",
              },
            ],
          };
          dispatch(updateFundDetails(fundraiseDetails));
        });
    }
  }, []);

  console.log(errors, "errors");
  if (
    isEdit &&
    fundId &&
    window.location.pathname.includes("update") &&
    singleFundraiseLoading
  )
    return (
      <>
        <ImSpinner2 className="animate-spin text-white !text-xl" />
      </>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `14.28%` }}
        ></div>
      </div>

      {/* Select Your Business */}
      <div className="w-full flex justify-center items-center gap-6">
        {businessDropDown?.length > 0 && <FaPlus />}
        <h4 className="mb-2 whitespace-nowrap ml-32">Select Your Business</h4>
        <Controller
          name="businessId"
          control={control}
          render={({ field }) => (
            <Selector
              {...field}
              containerClassName={"max-w-sm"}
              label="Business"
              options={businessDropDown ? businessDropDown : []}
              isSearchable={true}
              isDisabled={isLoading}
              placeholder="Select your business"
              onChange={(data) => field.onChange(data.value)}
              value={
                businessDropDown?.find(
                  (option) => option.value === field.value
                ) || null
              }
              errorContent={errors?.businessId?.message}
            />
          )}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-6">
        <h4 className="mb-2 whitespace-nowrap">
          Select Preferred Geographical Location
        </h4>
        <Controller
          name="businessLocation"
          control={control}
          render={({ field }) => (
            <Selector
              {...field}
              containerClassName={"max-w-sm"}
              options={
                prefferedGeogrophicalLoacation
                  ? prefferedGeogrophicalLoacation
                  : []
              }
              isSearchable={true}
              isDisabled={isLoading}
              placeholder="Select Preferred Geographical Location"
              onChange={(data) => field.onChange(data.value)}
              value={
                prefferedGeogrophicalLoacation?.find(
                  (option) => option.value === field.value
                ) || null
              }
              errorContent={errors?.businessLocation?.message}
            />
          )}
        />
      </div>

      {/* Past Fundings */}
      <div>
        <h4>1. Has the Company raised funds before?</h4>
        <Controller
          name="companyRaisedFundBefore"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                />
                <p>Yes</p>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value === false}
                  onChange={() => field.onChange(false)}
                />
                <p>No</p>
              </div>
            </div>
          )}
        />
      </div>

      {/* Funding Rounds */}
      {fields.map((round, index) => (
        <div
          key={round.id}
          className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6"
        >
          {/* Left Column */}
          <div className="w-full grid grid-cols-1 gap-6">
            <Controller
              name={`fundDetails[${index}].roundName`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Round Name"
                  placeholder="Enter Round Name"
                  onBlur={() => {
                    field.onBlur();
                    trigger(`fundDetails[${index}].roundName`);
                  }}
                  maxLength={50}
                  errorContent={
                    errors?.fundDetails?.[index]?.roundName?.message
                  }
                />
              )}
            />
            <Controller
              name={`fundDetails[${index}].roundType`}
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
                    trigger(`fundDetails[${index}].roundType`);
                  }}
                  placeholder="Select round type"
                  onBlur={() => trigger(`fundDetails[${index}].roundType`)}
                />
              )}
            />
            <Controller
              name={`fundDetails[${index}].fundingDate`}
              control={control}
              render={({ field }) => {
                const initialDate = field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : "";
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 100);
                return (
                  <Input
                    {...field}
                    value={initialDate}
                    label="Funding Date"
                    type="date"
                    min={minDate.toISOString().split("T")[0]}
                    max={new Date().toISOString().split("T")[0]}
                    errorContent={
                      errors?.fundDetails?.[index]?.fundingDate?.message
                    }
                    onBlur={() => {
                      field.onBlur();
                      trigger(`fundDetails[${index}].fundingDate`);
                    }}
                  />
                );
              }}
            />
            <Controller
              name={`fundDetails[${index}].stackDiluted`}
              control={control}
              render={({ field }) => (
                <Input
                  type={"number"}
                  {...field}
                  label="Stack diluted"
                  placeholder="Enter Stack diluted"
                  onBlur={() => {
                    field.onBlur();
                    trigger(`fundDetails[${index}].stackDiluted`);
                  }}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 10); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                  onKeyDown={validateNumber}
                  errorContent={
                    errors?.fundDetails?.[index]?.stackDiluted?.message
                  }
                />
              )}
            />
          </div>

          <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

          {/* Right Column */}
          <div className="w-full grid grid-cols-1 gap-6">
            <Controller
              name={`fundDetails[${index}].leadInvestor`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Lead Investor"
                  placeholder="Enter Lead Investor"
                  onBlur={() => {
                    field.onBlur();
                    trigger(`fundDetails[${index}].leadInvestor`);
                  }}
                  maxLength={50}
                  errorContent={
                    errors?.fundDetails?.[index]?.leadInvestor?.message
                  }
                />
              )}
            />
            <Controller
              name={`fundDetails[${index}].fundingAmount`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Funding Amount"
                  placeholder="Enter Funding Amount"
                  onBlur={() => {
                    field.onBlur();
                    trigger(`fundDetails[${index}].fundingAmount`);
                  }}
                  onKeyDown={validateNumber}
                  errorContent={
                    errors?.fundDetails?.[index]?.fundingAmount?.message
                  }
                />
              )}
            />
            <Controller
              name={`fundDetails[${index}].valuation`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Valuation"
                  placeholder="Enter Valuation"
                  onBlur={() => {
                    field.onBlur();
                    trigger(`fundDetails[${index}].valuation`);
                  }}
                  onKeyDown={validateNumber}
                  errorContent={
                    errors?.fundDetails?.[index]?.valuation?.message
                  }
                />
              )}
            />

            {/* Remove Round Button */}
            {index !== 0 && (
              <Button
                type="button"
                onClick={() => remove(index)}
                className="my-2 bg-[#FFD700] rounded-md text-[14px] w-fit px-2 py-1"
              >
                Remove Round
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Add More Rounds */}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() =>
            append({
              roundName: "",
              roundType: "",
              fundingDate: "",
              leadInvestor: "",
              fundingAmount: "",
              valuation: "",
              cm: "",
              financialYear: "",
              currency: "",
              revenue: "",
              profitLoss: "",
            })
          }
          primary
        >
          Add More Rounds
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-end items-center gap-6">
        <Button type="submit" outline>
          Cancel
        </Button>
        <Button isLoading={isFundraiseAdding} type="submit" primary>
          Next
        </Button>
      </div>
    </form>
  );
};
