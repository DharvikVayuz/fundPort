import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../../../../components/buttons";
import { kycSchema } from "../../../../../validation/createBusinessValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateKYCDetails,
  updateRegistrationDetails,
  getBusinessFromMCA,
} from "../../../../../redux/actions/business-action";
import { isEqualObject } from "../../../../../utils";

export const KYCDetails = ({ isEdit }) => {
  const { business, businessByMCA, businessId, loading } = useSelector(
    (state) => state.business
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: business || {},
    resolver: yupResolver(kycSchema),
  });

  useEffect(() => {
    if (!businessByMCA && business?.registration?.cinNumber) {
      dispatch(
        getBusinessFromMCA({ cinNumber: business?.registration?.cinNumber })
      );
    }
  }, [business?.registration?.cinNumber]);

  useEffect(() => {
    const { kyc } = businessByMCA || {};
    if (business) {
      setValue("kyc.id", kyc?.id || business?.kyc?.id);
    }
  }, [business, businessByMCA]);

  const onSubmit = (data) => {
    const source =
      searchParams.get("source") === "details"
        ? `?id=${searchParams.get("id")}&&source=details`
        : searchParams.get("source") === "dashboard"
        ? "?source=dashboard"
        : "";

    const isChanged = !isEqualObject(data.kyc, business.kyc);
    if (!isChanged) {
      navigate(
        isEdit
          ? `/business/edit/funding${source}`
          : `/business/create/funding${source}`
      );
      return;
    }

    // const payload = {
    //   ...data,
    //   businessId,
    // };

    const payload = data?.kyc;
    payload.businessId = businessId;
    if(business?.formStep < 4) payload.formStep = 4;


    dispatch(updateKYCDetails(payload)).then((response) => {
      if (!response?.error) {
        navigate(
          isEdit
            ? `/business/edit/funding${source}`
            : `/business/create/funding${source}`
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-6 max-h-[50vh] overflow-hidden overflow-y-auto">
        <div className="pb-4">
          <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
            KYC Details
          </h5>
          <p className="text-xs">
            Provide the necessary KYC detail of your own business.
          </p>
        </div>
        <div className="mt-2 w-full sm:w-1/2 grid grid-cols-1 gap-6">
          {/* <Controller
            name="kyc.kycUser"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Username"
                placeholder="Enter username"
                errorContent={errors.kyc?.kycUser?.message}
                required
                onChange={(e) => {
                  field.onChange(e);
                  trigger("kyc.kycUser");
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/\s{2,}/g, " ")
                    .replace(/^\s+/g, "");
                  field.onChange(e);
                }}
                maxLength={20}
              />
            )}
          /> */}
          <Controller
            name="kyc.id"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="PAN No."
                placeholder="Enter PAN no."
                errorContent={errors.kyc?.id?.message}
                required
                onChange={(e) => {
                  field.onChange(e);
                  trigger("kyc.id");
                }}
                maxLength={15}
                disabled={businessByMCA?.kyc?.id}
              />
            )}
          />
          <Controller
            name="kyc.addressProof"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Address Proof No.(eg:Aadhaar Id)"
                placeholder="Enter address proof no."
                errorContent={errors.kyc?.addressProof?.message}
                required
                onChange={(e) => {
                  field.onChange(e);
                  trigger("kyc.addressProof");
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9 _\-\\/]/g, "");
                  field.onChange(e);
                }}
                maxLength={30}
              />
            )}
          />
        </div>
      </div>

      <div className="px-6 py-4 flex justify-between gap-6">
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
          {loading ? "Saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
