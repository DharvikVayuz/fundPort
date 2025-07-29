import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";

export const NetBanking = ({ control, errors }) => {
  const banks = [
    { label: "State Bank of India", value: "state_bank_of_india" },
    { label: "HDFC Bank", value: "hdfc_bank" },
    { label: "ICICI Bank", value: "icici_bank" },
    { label: "Punjab National Bank", value: "punjab_national_bank" },
    { label: "Axis Bank", value: "axis_bank" },
    { label: "Bank of Baroda", value: "bank_of_baroda" },
    { label: "Kotak Mahindra Bank", value: "kotak_mahindra_bank" },
    { label: "Yes Bank", value: "yes_bank" },
    { label: "Union Bank of India", value: "union_bank_of_india" },
    { label: "Canara Bank", value: "canara_bank" },
  ];

  return (
    <>
      <p className="font-semibold text-[14px] pb-2 text-[#0A1C40]">
        Net Banking{" "}
      </p>
      <div className="flex flex-col ">
        <div className=" flex flex-row justify-between items-center gap-2 ">
          <Controller
            name="netbanking"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Selector
                {...field}
                type={"month"}
                options={banks}
                // label={"Net Banking "}
                placeholder={"Net banking  "}
                containerClassName={"w-full"}
                className={"border-[#D9D9D9] border"}
                errorContent={errors?.name?.message}
              />
            )}
          />
        </div>
        <p className="font-semibold text-[12px] pt-2   text-[#FF3B3B]">
          ICICI Bank is currently unavailable due to a technical issue. Please
          select a different payment method to complete your transaction.
        </p>
      </div>
    </>
  );
};
