import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { Selector } from "../../../../../components/select";
import { validateNumber } from "../../../../../utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateFundraise } from "../../../../../redux/actions/fundraise-actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const pastRevenueSchema = yup.object().shape({
  financialYear: yup.string().required("Financial Year is required"),
  currency: yup.string().required("Currency is required"),
  revenue: yup.string().required("Revenue is required"),
  cm: yup.string().required("CM 1 is required"),
  profitLoss: yup
    .string()
    .matches(/^\d+$/, "Profit or Loss must be a number")
    .max(10, "Profit or Loss cannot exceed 10 digits")
    .required("Profit or Loss is required"),
  link: yup
    .string()
    .url("Enter a valid YouTube video link")
    .required("YouTube video link is required"),
});

export const PastRevenue = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [yearOptions, setYearOptions] = useState([]);
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
      fundDetails: [
        {
          financialYear: "",
          revenue: "",
          cm: "",
          profitLoss: "",
          currency: "",
        },
      ], // Default values for the dynamic form
    },
    resolver: yupResolver(pastRevenueSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fundDetails",
  });

  const onSubmit = (data) => {
    console.log(data, "data");
    dispatch(
      updateFundraise({
        ...data,
        fundingRequirementId: fundId,
      })
    );
    // navigate(`/fundraise/create/preview/${fundId}`);
  };

  function getPastTenYears() {
    const currentYear = new Date().getFullYear();
    const options = [];

    for (let i = 0; i < 10; i++) {
      const startYear = currentYear - i;
      const endYear = startYear + 1;
      options.push({
        label: `${startYear}-${endYear}`,
        value: `${startYear}-${endYear}`,
      });
    }

    return options.reverse(); // To ensure the order is from the past 10 years
  }

  useEffect(() => {
    const pastTenYears = getPastTenYears();
    console.log(pastTenYears);
    setYearOptions(pastTenYears);
  }, []);

  const options = [
    { label: "2014-2015", value: "2014-2015" },
    { label: "2015-2016", value: "2015-2016" },
    { label: "2016-2017", value: "2016-2017" },
    { label: "2017-2018", value: "2017-2018" },
    { label: "2018-2019", value: "2018-2019" },
    { label: "2019-2020", value: "2019-2020" },
    { label: "2020-2021", value: "2020-2021" },
    { label: "2021-2022", value: "2021-2022" },
    { label: "2022-2023", value: "2022-2023" },
    { label: "2023-2024", value: "2023-2024" },
    { label: "2024-2025", value: "2024-2025" },
  ];
  const currencyOptions = [
    { label: "United States Dollar (USD)", value: "USD" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "British Pound (GBP)", value: "GBP" },
    { label: "Indian Rupee (INR)", value: "INR" },
    { label: "Australian Dollar (AUD)", value: "AUD" },
    { label: "Canadian Dollar (CAD)", value: "CAD" },
    { label: "Swiss Franc (CHF)", value: "CHF" },
    { label: "Japanese Yen (JPY)", value: "JPY" },
    { label: "Chinese Yuan (CNY)", value: "CNY" },
    { label: "Singapore Dollar (SGD)", value: "SGD" },
    { label: "Hong Kong Dollar (HKD)", value: "HKD" },
    { label: "New Zealand Dollar (NZD)", value: "NZD" },
    { label: "South African Rand (ZAR)", value: "ZAR" },
    { label: "Mexican Peso (MXN)", value: "MXN" },
    { label: "Brazilian Real (BRL)", value: "BRL" },
    { label: "Russian Ruble (RUB)", value: "RUB" },
    { label: "South Korean Won (KRW)", value: "KRW" },
    { label: "Turkish Lira (TRY)", value: "TRY" },
    { label: "Saudi Riyal (SAR)", value: "SAR" },
    { label: "UAE Dirham (AED)", value: "AED" },
  ];
  const revenueRangeOptions = [
    { label: "Less than 5,00,000", value: "0-500000" },
    { label: "5,00,000 - 10,00,000", value: "500000-1000000" },
    { label: "10,00,000 - 50,00,000", value: "1000000-5000000" },
    { label: "50,00,000 - 1,00,00,000", value: "5000000-10000000" },
    { label: "1,00,00,000 - 5,00,00,000", value: "10000000-50000000" },
    { label: "5,00,00,000 - 10,00,00,000", value: "50000000-100000000" },
    { label: "10,00,00,000 - 50,00,00,000", value: "100000000-500000000" },
    { label: "50,00,00,000 - 1,00,00,00,000", value: "500000000-1000000000" },
    { label: "More than 1,00,00,00,000", value: "1000000000+" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `100%`,
          }}
        ></div>
      </div>

      {/* Enter your past revenue details */}
      <h4>5. Enter your past revenue details</h4>
      <div className="w-full pt-4 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Checkbox />
          <p>Not applicable, we’re pre-revenue</p>
        </div>
      </div>

      {fields.map((item, index) => (
        <>
          <div
            key={item.id}
            className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-6"
          >
            {/* Left Column */}
            {index !== 0 && (
              <Button
                type="button"
                onClick={() => remove(index)}
                outline
                className="mt-2"
              >
                Remove Round
              </Button>
            )}
            <div className="w-full grid grid-cols-1 gap-6">
              <Controller
                name={`fundDetails[${index}].financialYear`}
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    label="Financial Year"
                    placeholder="Select Financial Year"
                    options={yearOptions}
                    value={
                      yearOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value);
                      trigger(`fundDetails[${index}].financialYear`);
                    }}
                    errorContent={
                      errors?.fundDetails?.[index]?.financialYear?.message
                    }
                  />
                )}
              />
              <Controller
                name={`fundDetails[${index}].currency`}
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    label="Currency"
                    placeholder="Select currency"
                    options={currencyOptions}
                    value={
                      currencyOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value);
                      trigger(`fundDetails[${index}].currency`);
                    }}
                    errorContent={
                      errors?.fundDetails?.[index]?.currency?.message
                    }
                  />
                )}
              />
              <Controller
                name={`fundDetails[${index}].revenue`}
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    label="Revenue"
                    placeholder="Select Revenue"
                    options={revenueRangeOptions}
                    value={
                      revenueRangeOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.value);
                      trigger(`fundDetails[${index}].revenue`);
                    }}
                    errorContent={
                      errors?.fundDetails?.[index]?.revenue?.message
                    }
                  />
                )}
              />
              <Controller
                name={`fundDetails[${index}].profitLoss`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Profit or Loss"
                    placeholder="Enter profit or loss"
                    error={errors?.fundDetails?.[index]?.profitLoss?.message}
                  />
                )}
              />
              <Controller
                name="cm"
                control={control}
                render={({ field }) => (
                  <>
                    <Selector
                      {...field}
                      label="CM 1 (Contribution Margin 1)"
                      placeholder="Select CM 1 (Contribution Margin 1)"
                      options={revenueRangeOptions}
                      value={
                        revenueRangeOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value);
                        trigger("cm");
                      }}
                      errorContent={errors?.cm?.message}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="w-full h-0.5 my-4 bg-gradient-to-r from-gray-100 via-black to-gray-100"></div>
        </>
      ))}
      <h4>6. Your Achievements</h4>
      <div className="w-full pt-4 flex items-center gap-2">
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                containerClassName={"w-full"}
                label="Past your youtube video link , ex-https://www.youtube.com/watch?v=VIDEO_ID"
                errorContent={errors?.link?.message}
              />
            </>
          )}
        />
      </div>
      {/* Add More Button */}
      <div className="flex justify-center items-center gap-6 pt-8">
        <Button
          type="button"
          simpleLink={true}
          onClick={() =>
            append({
              financialYear: "",
              revenue: "",
              cm: "",
              profitLoss: "",
              currency: "",
            })
          }
        >
          Add More
        </Button>
      </div>

      {/* Submit */}
      <div className="flex justify-center items-center gap-6 pt-8">
        <Button type="submit" disabled={!isValid}>
          Save Details
        </Button>
      </div>
    </form>
  );
};
