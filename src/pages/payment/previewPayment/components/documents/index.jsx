import React from "react";
import { Controller } from "react-hook-form";

const index = ({ control, errors }) => {
  return (
    <>
      <div className="flex sm:flex-row flex-col sm:pt-1 pt-3 gap-6">
        <div className="flex flex-col  gap-2 ">
          <div className=" flex gap-2 w-full text-base font-normal text-[#0A1C40] ">
            AADHAR card{" "}
            <div>
              <img
                src="/images/payment/i - icon.svg"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  "The Aadhaar card image should include both front and back sides."
                }
              />
            </div>
          </div>
          <div className="sm:flex basis-1/3  gap-5">
            <Controller
              name={`Aadhar Card`}
              control={control}
              render={({ field }) => (
                <div className="flex  gap-2 text-center justify-center relative border border-[#00000033] rounded-lg px-8 py-10 ">
                  <img src="/images/payment/upload-icon.svg" alt="" />
                  <label
                    className="font-normal text-base text-[#585858]"
                    htmlFor="upload"
                  >
                    Upload document
                  </label>
                  <input
                    {...field}
                    id="upload"
                    className="w-full h-full absolute top-0 left-0 hidden"
                    type="file"
                    label={"Upload"}
                    placeholder={"Upload document"}
                    errorContent={errors.industryType?.message}
                    required={true}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className=" flex gap-2  text-base font-normal text-[#0A1C40] ">
            PAN Card{" "}
            <img
              src="/images/payment/i - icon.svg"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={
                "The Aadhaar card image should include both front and back sides."
              }
            />{" "}
          </div>
          <div className="sm:flex basis-1/3 gap-5">
            <Controller
              name={`PanCard`}
              control={control}
              render={({ field }) => (
                <div className="flex  gap-2 text-center justify-center relative border border-[#00000033] rounded-lg px-8 py-10 ">
                  <img src="/images/payment/upload-icon.svg" alt="" />
                  <label
                    className="font-normal text-base text-[#585858]"
                    htmlFor="upload"
                  >
                    Upload document
                  </label>
                  <input
                    {...field}
                    id="upload"
                    className="w-full h-full absolute top-0 left-0 hidden"
                    type="file"
                    label={"Upload"}
                    placeholder={"Upload document"}
                    errorContent={errors.industryType?.message}
                    required={true}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className=" flex gap-2  text-base font-normal text-[#0A1C40] ">
            ADDRESS PROOF{" "}
            <img
              src="/images/payment/i - icon.svg"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={
                "The Aadhaar card image should include both front and back sides."
              }
            />{" "}
          </div>
          <div className="sm:flex  basis-1/3 gap-5">
            <Controller
              name={`industryType`}
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 text-center justify-center relative border border-[#00000033] rounded-lg px-8  py-10 ">
                  <img src="/images/payment/upload-icon.svg" alt="" />
                  <label
                    className="font-normal text-base text-[#585858]"
                    htmlFor="upload"
                  >
                    Upload document
                  </label>
                  <input
                    {...field}
                    id="upload"
                    className="w-full h-full absolute top-0 left-0 hidden"
                    type="file"
                    label={"Upload"}
                    placeholder={"Upload document"}
                    errorContent={errors.industryType?.message}
                    required={true}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
