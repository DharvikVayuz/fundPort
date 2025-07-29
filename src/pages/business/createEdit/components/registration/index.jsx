import { Controller, useForm, useWatch } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../../../../components/buttons";
import { registrationSchema } from "../../../../../validation/createBusinessValidationSchema";
import {
  getBusinessFromMCA,
  registrationDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { setBusinessId } from "../../../../../redux/slices/businessSlice";
import { isEqualObject } from "../../../../../utils";
import { a, del, use } from "framer-motion/client";
import client from "../../../../../redux/axios-baseurl";
import toast from "react-hot-toast";
import { ReactDatePicker } from "../../../../../components/inputs/datepicker";
import { TextArea } from "../../../../../components/inputs/textarea";
import { TiTick } from "react-icons/ti";
export const businessType = [
  { label: "Private Limited", value: "private_limited" },
  { label: "Public Limited", value: "public_limited" },
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "LLP", value: "llp" },
  { label: "OPC", value: "opc" },
  { label: "Section 8", value: "section_8" },
  { label: "Partnership", value: "partnership" },
  { label: "Cooperative", value: "cooperative" },
  { label: "Producer Company", value: "producer_company" },
  { label: "Foreign Corporation", value: "foreign_corporation" },
];
export const headQuarterLocationList = [
  { label: "East", value: "East" },
  { label: "West", value: "West" },
  { label: "North", value: "North" },
  { label: "South", value: "South" },
  { label: "Central", value: "Central" },
];

export const RegistrationDetails = ({ isEdit }) => {
  const [industryOptions, setIndustryOptions] = useState([]);
  const [isIndustryLoading, setIsIndustryLoading] = useState(false);

  const [subIndustryOptions, setSubIndustryOptions] = useState([]);
  const [isSubIndustryLoading, setIsSubIndustryLoading] = useState(false);

  const { business, businessId, loading, businessByMCA, loadingMCA } =
    useSelector((state) => state.business);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cinNum, setCinNum] = useState(business?.registration?.cinNumber || "");
  const [isValidCIN, setIsValidCIN] = useState(true);
  const [businessName, setBusinessName] = useState(business?.registration?.businessName || "");
  const [businessList, setBusinessList] = useState([]);
  const [isBusinessListLoading, setIsBusinessListLoading] = useState(false);


  // console.log("store",businessByMCA);


  useEffect(() => {
    //API call to get industry options
    const getIndustryOptions = async () => {
      try {
        setIsIndustryLoading(true);
        const response = await client.get("/user/industry", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token
              }`,
          },
        });
        const res = response?.data?.data;
        //filter res in {label:res.name, value:res._id}
        const filteredRes = res.map((item) => {
          return { label: item.name, value: item._id };
        });
        setIndustryOptions(filteredRes);
        setIsIndustryLoading(false);
      } catch (error) {
        error?.response?.data?.message
          ? toast.error("Industry list : " + error?.response?.data?.message)
          : toast.error(error?.message);

        setIsIndustryLoading(false);
      }
    };
    getIndustryOptions();
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
    defaultValues: business || {},
    resolver: yupResolver(registrationSchema), // Apply the validation schema here
  });

  // console.log("isValid", isValid, errors);
  // console.log("getValues", getValues());

  const selectedIndustry = useWatch({
    control,
    name: "registration.industryId",
    defaultValue: "",
  });

  const selectedSubIndustry = useWatch({
    control,
    name: "registration.subIndustryId",
    defaultValue: "",
  });
  // console.log("selectedSubIndustry:", watch("registration.subIndustry"));

  // console.log("selectedIndustry:", selectedIndustry);

  useEffect(() => {
    // if (selectedIndustry && subIndustryOption[selectedIndustry]) {
    //   // console.log('okokokkok');

    //   setSubIndustryOptions(subIndustryOption[selectedIndustry]);
    //   // setValue("registration.subIndustry", ""); // Reset subIndustry when industry changes
    // } else {
    //   setSubIndustryOptions([]);
    // }

    if (selectedIndustry) {
      const getSubIndustryOptions = async () => {
        try {
          setIsSubIndustryLoading(true);
          const response = await client.get(`/user/sub-industry`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token
                }`,
            },
            params: { industryId: selectedIndustry },
          });
          const res = response?.data?.data;
          //filter res in {label:res.name, value:res._id}
          const filteredRes = res.map((item) => {
            return { label: item.name, value: item._id };
          });

          setSubIndustryOptions(filteredRes);
          setIsSubIndustryLoading(false);
        } catch (error) {
          // console.error("Error fetching industry options", error?.response?.data?.message || error?.message);
          error?.response?.data?.message
            ? toast.error(
              "Sub Industry list : " + error?.response?.data?.message
            )
            : toast.error(error?.message);
          setIsSubIndustryLoading(false);
        }
      };
      getSubIndustryOptions();
    }
  }, [selectedIndustry]);

  const roleOption = [
    { label: "Director/Founder/Owner", value: "Director/Founder/Owner" },
    { label: "Authorised Signatory", value: "Authorised Signatory" },
    { label: "Employee", value: "Employee" },
  ];

  const fundingOption = [
    { label: "Funded", value: "funded" },
    { label: "Bootstrapped", value: "bootstrap" },
  ];

  const industryOption = [
    { label: "Technology", value: "tech" },
    { label: "Finance", value: "finance" },
    { label: "Healthcare", value: "healthcare" },
  ];

  const subIndustryOption = {
    tech: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "AI & ML", value: "ai_ml" },
      { label: "Cybersecurity", value: "cybersecurity" },
      { label: "Cloud Computing", value: "cloud_computing" },
      { label: "Other", value: "other" },
    ],
    finance: [
      { label: "Banking", value: "banking" },
      { label: "Insurance", value: "insurance" },
      { label: "Investment", value: "investment" },
      { label: "Fintech", value: "fintech" },
      { label: "Other", value: "other" },
    ],
    healthcare: [
      { label: "Medical Devices", value: "medical_devices" },
      { label: "Pharmaceuticals", value: "pharmaceuticals" },
      { label: "Health IT", value: "health_it" },
      { label: "Biotechnology", value: "biotech" },
      { label: "Other", value: "other" },
    ],
  };

  const companySizeDropdown = [
    { label: "1-50 employees", value: "1-50" },
    { label: "51-100 employees", value: "51-100" },
    { label: "101-1000 employees", value: "101-1000" },
    { label: "201-500 employees", value: "201-500" },
    { label: "501-1000 employees", value: "501-1000" },
    { label: "1001-5000 employees", value: "1001-5000" },
    { label: "5001-10000 employees", value: "5001-10000" },
    { label: "1000+ employees", value: "1000+" },
  ];

  const handleBlur = async (field) => {
    await trigger(field);
  };

  const onSubmit = (data) => {
    const payload = data?.registration;
    const { registration } = business;
    const isChanged = registration && !isEqualObject(registration, payload);
    const source =
      searchParams.get("source") === "details"
        ? `?id=${searchParams.get("id")}&&source=details`
        : searchParams.get("source") === "dashboard"
          ? "?source=dashboard"
          : "";
    if (!isChanged) {
      isEdit
        ? navigate(`/business/edit/address${source}`)
        : navigate(`/business/create/address${source}`);
      return;
    }

    payload.businessName = businessByMCA?.registration?.businessName;
    if(business?.formStep<=1) payload.formStep = 1;
    // console.log("payload",payload);
    // return 


    if (!businessId) {
      // Perform POST API call here
      dispatch(registrationDetails(payload)).then((response) => {
        // console.log("Response", response?.payload);
        // const newBusinessId = response.payload;
        // dispatch(setBusinessId(newBusinessId));
        if (!response?.error) navigate(`/business/create/address${source}`);
      });
    } else {
      //PUT API to update changes
      // console.log("businessId already exist", businessId);

      payload.businessId = businessId;
      dispatch(updateRegistrationDetails(payload)).then((response) => {
        // console.log("Response", response);
        // const newBusinessId = response.payload;
        // dispatch(setBusinessId(newBusinessId));
        if (!response?.error)
          isEdit
            ? navigate(`/business/edit/address${source}`)
            : navigate(`/business/create/address${source}`);
      });
    }
  };

  // console.log("registration.subIndustry", "hour", business?.registration.subIndustry);
  // console.log('MCA API store :',businessByMCA);
  // console.log("Edit API Store :", business);
  // console.log("Local Store :", getValues("registration"));


  useEffect(() => {
    // console.log("useeffect");

    const { registration } = businessByMCA || {};
    // console.log("render3",business, businessByMCA);


    // setValue("registration.roleOfCompany",business?.registration.roleOfCompany)
    setValue(
      "registration.businessName",
      { label: registration?.businessName, value: registration?.cinNumber } || business?.registration.businessName
    );
    setValue(
      "registration.cinNumber",
      registration?.cinNumber || business?.registration.cinNumber
    );
    setValue(
      "registration.headQuarterLocation",
      registration?.headQuarterLocation ||
      business?.registration.headQuarterLocation
    );
    setValue(
      "registration.yearOfStablish",
      registration?.yearOfStablish || business?.registration.yearOfStablish
    );
    setValue(
      "registration.typeOfBusiness",
      registration?.typeOfBusiness || business?.registration.typeOfBusiness
    );
    setValue("registration.industry", business?.registration.industry);
    setValue("registration.subIndustry", business?.registration.subIndustry);

    setValue("registration.industryId", business?.registration.industryId);
    setValue(
      "registration.subIndustryId",
      business?.registration.subIndustryId
    );
    setValue(
      "registration.about",
      registration?.about || business?.registration?.about
    );
  }, [business, businessByMCA]);

  const handleGetBusinessFromMCA = async () => {
    //  const cinValue = watch("registration.cinNumber");
    const cinValue = cinNum;

    // console.log("cinValue", cinValue);


    // Trigger CIN validation before API call
    const isValidCIN = await trigger("registration.cinNumber");
    if (!isValidCIN) return;

    // API call to fetch business details using CIN
    //...

    dispatch(getBusinessFromMCA({ cinNumber: cinValue }))
      .unwrap()
      .then(() => {
        setIsValidCIN(true);
      })
      .catch(() => {
        setIsValidCIN(false);
      });
  };

  useEffect(() => {
    const businessName = watch("registration.businessName");

    const timeoutId = setTimeout(() => {
      // console.log("businessName", businessName);
      // console.log("getValues", getValues("registration.businessName"));

      const compName = getValues("registration.businessName")?.label || getValues("registration.businessName")

      const getBusinessList = async () => {
        try {
          setIsBusinessListLoading(true);
          const response = await client.post(
            `/business/mca-company-name-search`,
            {
              companyName: compName,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`,
              },
            }
          );

          // console.log("response", response?.data?.result);
          const filteredList = response?.data?.result
            ?.filter(item => item?.companyID?.length >= 21)
            .map(item => ({
              label: item.companyName,
              value: item.companyID
            }));

          // console.log("filteredList", filteredList);


          // Example handling (adjust as needed)
          if (response?.data?.result) {
            setBusinessList(filteredList || []);
          }

        } catch (error) {
          error?.response?.data?.message
            ? toast.error("Business list : " + error?.response?.data?.message)
            : toast.error(error?.message);
        } finally {
          setIsBusinessListLoading(false)
        }
      };
      // console.log("compName",compName);
      // console.log(typeof compName);
      // console.log("compName",typeof compName);
    

      if (typeof compName === "string" && compName?.trim() && compName?.trim()?.length > 2) getBusinessList();
    }, 1000); // 1 second delay

    // Cleanup timeout on unmount or before next run
    return () => clearTimeout(timeoutId);

  }, [watch("registration.businessName")]);




  // useEffect(()=>{

  //   if (business?.registration?.cinNumber) dispatch(getBusinessFromMCA({ cinNumber: business?.registration.cinNumber }))
  // },[business?.registration?.cinNumber])

  useEffect(() => {
    // console.log("cinNum", cinNum?.trim()?.length);
    if (cinNum?.trim()?.length == 21) handleGetBusinessFromMCA();
  }, [cinNum]);

  // console.log("render 2", getValues("registration"));




  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {loadingMCA && (
        <div className="fixed rounded-3xl inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
      )}

      {/* Form */}
      <div className="px-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        {/* Heading */}
        <div className="pb-4 flex items-center">
          <div className="w-full">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Business Registration Details
            </h5>
            <p className="text-xs">
              Provide the necessary details to add your own business.
            </p>
          </div>
        </div>
        <div className="mt-2 w-full flex flex-col md:flex-row md:justify-between gap-6">
          {/* Left Column */}
          <div className="w-full grid grid-cols-1 gap-6">
             <Controller
              name="registration.businessName" // <- important: this holds selected `value`
              control={control}
              render={({ field }) => {
                const selectedOption = businessList.find(
                  (option) => option.value === field.value
                );
                // console.log("render", selectedOption)
                return (
                  <Selector
                    label="Business Name"
                    placeholder="Select Business Name"
                    required={true}
                    isSearchable
                    options={businessList}
                    errorContent={errors.registration?.businessName?.message}
                    value={{ label: businessByMCA?.registration?.businessName, value: businessByMCA?.registration?.cinNumber }}
                    isLoading = {isBusinessListLoading}
                    // User typ
                    onInputChange={(inputValue) => {
                      // Optional: if you want live search
                      setValue("registration.businessName", inputValue); // store typed text
                    }}

                    // User selects
                    onChange={(selectedValue) => {
                      setCinNum(selectedValue?.value); // optional state
                      setValue("registration.businessName", selectedValue.label); // store business name
                      setValue("registration.cinNumber", selectedValue.value);    // store CIN number
                      field.onChange(selectedValue.label); // update form field for Controller
                    }}
                  />
                );
              }}
            />
            <div className="w-full relative">
              <Controller
                name="registration.cinNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="CIN No.(eg:L01631KA2010PTC096843)"
                    maxLength={21}
                    placeholder="Enter your CIN number"
                    errorContent={!isValidCIN && "Invalid CIN"}
                    required
                    value={cinNum} // Use local state as the value
                    onChange={(e) => {
                      setCinNum(e.target.value); // Update local state
                      field.onChange(e); // Update form state
                    }}
                    disabled={businessId}
                  />
                )}
              />
            </div>

            <Controller
              name="registration.typeOfBusiness"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    label={"Type Of Business"}
                    placeholder="Enter Type Of Business"
                    errorContent={errors.registration?.typeOfBusiness?.message}
                    required
                    maxLength={50}
                    disabled={businessByMCA?.registration?.typeOfBusiness}
                  />
                );
              }}
            />

            {/* Business Name */}
            {/* <Controller
              name="registration.businessName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Business Name"
                  placeholder="Enter your business name"
                  errorContent={errors.registration?.businessName?.message}
                  required
                  maxLength={50}
                  disabled={businessByMCA?.registration?.businessName}
                />
              )}
            /> */}


            {/* Role of Company */}
            <Controller
              name="registration.roleOfCompany"
              control={control}
              render={({ field }) => {
                // Find the selected role option from the list
                const selectedRole = roleOption.find(
                  (option) => option.value === field.value
                );

                return (
                  <Selector
                    {...field}
                    label={"Role"}
                    placeholder={"Select role in the company"}
                    errorContent={errors.registration?.roleOfCompany?.message}
                    options={roleOption}
                    required={true}
                    // Ensure only the value is passed to the Selector
                    value={selectedRole}
                    onChange={(selectedValue) => {
                      // On change, set only the selected value (not the full object)
                      field.onChange(selectedValue.value);
                      setValue(
                        "registration.roleOfCompany",
                        selectedValue.value
                      );
                    }}
                  />
                );
              }}
            />

            {/* Year of Establishment */}
            <Controller
              name="registration.yearOfStablish"
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
                    label="Year of Establishment"
                    type="date"
                    required={true}
                    min={minDate.toISOString().split("T")[0]}
                    max={new Date().toISOString().split("T")[0]}
                    errorContent={errors.registration?.yearOfStablish?.message}
                    // onBlur={() => handleBlur("registration.yearOfStablish")}
                    disabled={businessByMCA?.registration?.yearOfStablish}
                  />
                );
              }}
            />
          </div>

          {/* Right Column */}
          <div className="w-full grid grid-cols-1 gap-6">
            {/* Headquarters Location */}
            <Controller
              name="registration.headQuarterLocation"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Headquarter Location"
                  placeholder="Enter your headquarter location"
                  errorContent={
                    errors.registration?.headQuarterLocation?.message
                  }
                  required
                  maxLength={50}
                  disabled={businessByMCA?.registration?.headQuarterLocation}
                />
              )}
            />

            {/* Industry */}
            <Controller
              name="registration.industryId"
              control={control}
              render={({ field }) => {
                const selectedIndustry = industryOptions.find(
                  (option) => option.value === field.value
                );

                // console.log("registration field", field);

                return (
                  <Selector
                    {...field}
                    label="Industry Type"
                    placeholder="Select industry type"
                    required={true}
                    isLoading={isIndustryLoading}
                    errorContent={errors.registration?.industryId?.message}
                    options={industryOptions} // Ensure industryOption is populated correctly
                    value={selectedIndustry || null} // Ensure value matches the options
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value); // Update the form value

                      setValue("registration.subIndustryId", ""); // Reset sub-industry
                      trigger("registration.subIndustryId"); // Trigger validation for sub-industry
                      // setSubIndustryOptions(
                      //   subIndustryOption[selectedValue.value] || []
                      // ); // Update sub-industry options dynamically
                    }}
                  />
                );
              }}
            />

            {/* Sub Industry */}
            <Controller
              name="registration.subIndustryId"
              control={control}
              render={({ field }) => {
                const selectedSubIndustry = subIndustryOptions.find(
                  (option) => option.value === field.value
                );

                return (
                  <Selector
                    {...field}
                    isLoading={isSubIndustryLoading}
                    label="Sub Industry Type"
                    placeholder="Select sub industry type"
                    required={true}
                    errorContent={errors.registration?.subIndustryId?.message}
                    options={subIndustryOptions}
                    value={selectedSubIndustry || null}
                    onChange={(selectedValue) =>
                      field.onChange(selectedValue.value)
                    }
                  />
                );
              }}
            />

            {/* Company Size  dropdown*/}
            <Controller
              name="registration.sizeOfCompany"
              control={control}
              render={({ field }) => {
                const selectedCompanySize = companySizeDropdown.find(
                  (option) => option.value === field.value
                );

                return (
                  <Selector
                    {...field}
                    label="Size of the company"
                    placeholder="Select size of the company"
                    required={true}
                    errorContent={errors.registration?.sizeOfCompany?.message}
                    options={companySizeDropdown}
                    value={selectedCompanySize || null}
                    onChange={(selectedValue) =>
                      field.onChange(selectedValue.value)
                    }
                  />
                );
              }}
            />

            {/* Company Size */}
            {/* <Controller
            name="registration.sizeOfCompany"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Size of the company"
                type="number"
                placeholder="Enter size of the company"
                errorContent={errors.registration?.sizeOfCompany?.message}
                required


                onInput={(e) => {
                  const value = e.target.value;
                  // Prevent invalid characters and limit input length to 10
                  e.target.value = value
                    .replace(/[^0-9]/g, "") // Allow only digits
                    .slice(0, 10); // Limit to 10 characters
                  field.onChange(e); // Trigger React Hook Form's onChange
                }}
              />
            )}
          /> */}

            {/* Funding Status */}
            <Controller
              name="registration.funded"
              control={control}
              render={({ field }) => {
                // Find the selected funding option from the list
                const selectedFund = fundingOption.find(
                  (option) => option.value === field.value
                );

                return (
                  <Selector
                    {...field}
                    label={"Funding Status"}
                    placeholder={"Select funding status"}
                    errorContent={errors.registration?.funded?.message}
                    options={fundingOption}
                    required={true}
                    // Ensure that only the value is passed to the Selector
                    value={selectedFund}
                    onChange={(selectedValue) => {
                      // On change, set only the selected value (not the full object)
                      field.onChange(selectedValue.value);
                      setValue("registration.funded", selectedValue.value);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
        {/* About Business */}
        <div className="mt-6">
          <Controller
            name="registration.about"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="About your Business"
                placeholder="About your Business"
                errorContent={errors.registration?.about?.message}
                required
                maxLength={500}
                touched={true}
                className={
                  "pb-6 min-h-24 h-full placeholder:text-xl border bg-white border-[#D9D9D9]"
                }
                disabled={businessByMCA?.registration?.about?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 flex justify-end gap-6">
        <p className="text-xs text-orange-400">Please ensure the accuracy of the data</p>
        <Button
          type="submit"
          primary
          disabled={
            !isValid ||
            loading ||
            isIndustryLoading ||
            isSubIndustryLoading ||
            !isValidCIN
          }
          isLoading={loading}
        >
          {loading ? "Saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
