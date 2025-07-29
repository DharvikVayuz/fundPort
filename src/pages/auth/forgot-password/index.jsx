import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layout/auth";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { MetaTitle } from "../../../components/metaTitle";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordSchema } from "../../../validation/authValidatiorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { resendOtp } from "../../../redux/actions/userAuth-action";
import { useNavigate } from "react-router-dom";
import { setRedirectTo } from "../../../redux/slices/appSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { updateEmail } from "../../../redux/slices/userAuth-slice";
export const ForgotPassword = () => {
  const location = useLocation();
  const emailOrPhone = location.state?.email;
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const {
    isVerifying = false,
    verifyingError,
    verifyMessage,
    resendingOtp,
    profile,
  } = useSelector((state) => state.auth);
  const [otpMessage, setOtpMessage] = useState("");

  localStorage.setItem("forgotPassword", true);

  useEffect(() => {
    if (emailOrPhone) {
      setValue("email", emailOrPhone);
      trigger("email");
    }
  }, [emailOrPhone, setValue]);

  useEffect(() => {
    if (isOtpScreen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOtpScreen]);

  useEffect(() => {
    if (timer === 0 || timer == "00") {
      setIsResendDisabled(false);
    } else {
      setIsResendDisabled(true);
      const countdown = setTimeout(() => {
        setTimer(
          (timer - 1).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        );
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  useEffect(() => {
    if (isVerify && !isVerifying) {
      setIsVerify(false);
      if (verifyingError) {
        setOtpMessage(verifyingError);
      } else {
        navigate("/create-new-password");
      }
    }
  }, [isVerifying]);

  useEffect(() => {
    if (otpMessage) {
      const timer = setTimeout(() => {
        setOtpMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [otpMessage]);

  const handleEmailSubmit = (data) => {
    dispatch(updateEmail(data?.email));
    dispatch(resendOtp({ data, navigate }));
    dispatch(setRedirectTo("verify"));
  };

  useEffect(() => {
    if (!isOtpScreen && resendingOtp) {
      setIsOtpScreen(true);
      setTimer(30);
    }
  }, [resendingOtp]);

  return (
    <>
      <MetaTitle title={isOtpScreen ? "Verify OTP" : "Forgot password"} />
      <AuthLayout>
        {/* className="sm:w-32 w-36" */}
        <img src="/CorpZLogo-011.png" alt="CORPZO Logo" width={200} />
        <div className="w-full">
          <div className="w-full ">
            <div className="flex flex-col justify-between ">
              <div>
                <DualHeadingTwo
                  containerClassName={"text-left pt-2 mx-4 md:mx-0"}
                  heading={"Forgot Password"}
                  subHeading={
                    "Please enter your registered email id to reset password."
                  }
                />
                <form
                  onSubmit={handleSubmit(handleEmailSubmit)}
                  className="flex flex-col gap-7 pt-5 mx-4 md:mx-0 "
                >
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={
                      profile?.[0]?.email
                        ? profile?.[0]?.email
                        : profile?.[0]?.phone
                    }
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"Email"}
                        type={"email"}
                        placeholder={"Email Id"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.email?.message}
                        maxLength={50}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    primary={true}
                    className={
                      "mt-2 py-3 w-full rounded-lg  text-[#0A1C40] font-semibold !border-none "
                    }
                    disabled={!isValid}
                    isLoading={resendingOtp}
                  >
                    Continue
                  </Button>
                </form>
              </div>
              <div className="flex gap-2 items-center mt-8">
                <div className="border-t w-full border-[#D9D9D9] opacity-0" />
                <p className="text-xl text-[#6E6E6E] font-medium">or</p>
                <div className="border-t w-full border-[#D9D9D9] opacity-0" />
              </div>
              <div
                className={`text-center mt-6 flex justify-center gap-2 font-normal text-[#6C6C6C] ${
                  resendingOtp ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div>Back to</div>
                <Link
                  to={"/sign-in"}
                  className="text-[#F1359C] hover:text-opacity-80 transition-all duration-300 font-semibold"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
