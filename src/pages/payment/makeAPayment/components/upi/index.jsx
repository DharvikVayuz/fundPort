import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons/button";
import axios from "axios"; 

export const UPI = ({ control, errors }) => {
  const [verificationStatus, setVerificationStatus] = useState(""); 

  const verifyUPI = async (upiID) => {
  try {
    const response = await axios.post(
      'https://sandbox.cashfree.com/payout/v1/validation/upiDetails',
      {
        upiId: 'testuser@bank', 
        appId: 'TEST10432299904f5055d3ee27a1474299223401',  
      },
      {
        headers: {
          'Authorization': `Bearer cfsk_ma_test_340ccb13916608a2f3c2a401d29ffd17_0f48b9e4`, 
          'Content-Type': 'application/json',   
        },
      }
    );

    console.log('API Response:', response.data);
    if (response.data.success) {
      console.log("UPI ID verified successfully.");
    } else {
      console.log("UPI ID validation failed.");
    }
  } catch (error) {
    console.error("Error verifying UPI ID:", error.response ? error.response.data : error);
  }
};

  

  return (
    <>
      <p className="font-semibold text-[14px] pb-2 text-[#0A1C40]">
        Please enter your UPI ID{" "}
      </p>
      <div className="flex flex-col ">
        <div className=" flex flex-row justify-between items-center gap-2 ">
          <Controller
            name="Upi"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
              <Input
                {...field}
                type={"text"}
                label={"Enter UPI ID "}
                placeholder={"Enter UPI ID"}
                containerClassName={"w-full"}
                className={"border-[#D9D9D9] border"}
                errorContent={errors?.Upi?.message}  
              />
              <Button
                primary={true}
                onClick={()=>verifyUPI(field.value)} 
              >
                Verify
              </Button> 
            </>
            )}
          />
          
        </div>
        {verificationStatus && (
          <p className="font-semibold text-[12px] pt-2 text-[#FF3B3B]">
            {verificationStatus}
          </p>
        )}
        <p className="font-semibold text-[12px] pt-2 text-[#999999]">
          The UPI ID follows the format: name_or_phone_number@bankname
        </p>
        <p className="font-semibold text-[12px] flex pt-2 gap-1 items-center text-[#029126]">
          <img src="/icons/payment/check-double.svg" width={20} alt="" />
          Verified{" "}
          <span>Kindly click "Continue" to finalize your purchase.</span>{" "}
        </p>
      </div>
    </>
  );
};
