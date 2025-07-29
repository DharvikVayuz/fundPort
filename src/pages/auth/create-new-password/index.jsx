import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layout/auth";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { MetaTitle } from "../../../components/metaTitle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewPasswordSchema } from "../../../validation/authValidatiorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
export const CreateNewPassword = () => {
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [isVerify, setIsVerify] = useState(false);
  const {
    changingPassword = false,
    changedPasswordMessage,
    changingPasswordError,
    profile,
  } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(createNewPasswordSchema),
    mode: "onChange",
  });
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
    } else {
      setIsResendDisabled(true);
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);
  useEffect(() => {
    if (isVerify && !changingPassword) {
      setIsVerify(false);
      if (changingPasswordError) {
        toast.error(changingPasswordError);
      } else {
        toast.success(changedPasswordMessage);
        navigate("/sign-in");
      }
    }
  }, [changingPassword]);

  const handleEmailSubmit = (data) => {
    setIsVerify(true);
    dispatch(
      resetPassword({
        userId: profile?.userId,
        newPassword: data.password,
      })
    );
  };

  return (
    <>
      <MetaTitle title={isOtpScreen ? "Verify OTP" : "Create New Password"} />
      <AuthLayout>
        {/* className="sm:w-32 w-36" */}
        <img src="/Black Strokes Logo.png" alt="VAYUZ logo" width={200} />
        <div className="flex flex-col justify-between">
          <DualHeadingTwo
            containerClassName={"text-left pt-5"}
            heading={"Create New Password"}
            // subHeading={"Please enter password."}
          />
          <form
            onSubmit={handleSubmit(handleEmailSubmit)}
            className="flex flex-col gap-2 pt-3 pb-2"
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  label={"New Password"}
                  type={"password"}
                  className={"border-[#D9D9D9] border"}
                  placeholder={"Password"}
                  errorContent={errors.password?.message}
                  // onBlur={() => handleBlur("password")}
                />
              )}
              // rules={{ required: "Password is required" }}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  label={"Confirm Password"}
                  type={"password"}
                  className={"border-[#D9D9D9] border"}
                  placeholder={"Re-enter Password"}
                  errorContent={errors.confirmPassword?.message}
                  // onBlur={() => handleBlur("password")}
                />
              )}
              // rules={{ required: "Password is required" }}
            />
            <Button
              type="submit"
              v2={true}
              primary={true}
              className="mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none"
              disabled={!isValid}
              isLoading={changingPassword}
            >
              Continue
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};
