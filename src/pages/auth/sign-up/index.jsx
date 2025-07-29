import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { MetaTitle } from "../../../components/metaTitle";
import { signUpValidationSchema } from "../../../validation/authValidatiorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthLayout } from "../../../components/layout/auth";
import { PhoneNumberInput } from "../../../components/inputs/phoneInput";
import {
  registerUser,
  thirdPartyLogin,
} from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
import GoogleLogin from "react-google-login";
import { setRedirectTo } from "../../../redux/slices/appSlice";
import { updateEmail } from "../../../redux/slices/userAuth-slice";
import { validateAlphabet } from "../../../utils";
export const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    setError,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onChange",
  });
  const recaptchaRef = useRef(null);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const {
    isRegistering = false,
    registeringError,
    registerMessage,
    profile,
  } = useSelector((state) => state.auth);

  const handleBlur = async (field) => {
    await trigger(field);
  };
  localStorage.setItem("isSignedUpData", true);
  const googleLogin = (data) => {
    setIsSubmit(true);
    dispatch(
      thirdPartyLogin({
        email: data?.profileObj?.email,
        name: data?.profileObj?.givenName,
        profilePicture: data?.profileObj?.imageUrl,
      })
    );
    reset();
  };

  const [error, setSubmitError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch("password");
  useEffect(() => {
    if (password) {
      trigger("confirmPassword");
    }
  }, [password, trigger]);

  const onSubmit = async (data) => {
    setIsSubmit(true);
    setSubmitError("");

    const token = await recaptchaRef.current.executeAsync().then((res) => {
      const transformData = {
        full: data.full,
        phone: data.phone,
        email: data.email,
        password: data.password,
      };
      const userData = {
        ...transformData,
        countryCode: `+${data.phone.toString().slice(0, 2)}`,
        phone: +data.phone.toString().slice(2),
        firstName: data.full,
        recaptchaToken: res,
      };
      delete userData.full;
      setEmailSignUp(data.email);
      dispatch(updateEmail(data.email));
      dispatch(registerUser(userData));
      dispatch(setRedirectTo("verify"));
    });
  };

  useEffect(() => {
    if (!isRegistering && isSubmit) {
      setIsSubmit(false);
      if (registeringError) {
        toast.dismiss();
        toast.error(registeringError);
      } else {
        if (profile?.source === "GOOGLE") {
          navigate("/dashboard");
        } else {
          navigate("/verify");
        }
      }
    }
  }, [isRegistering, profile]);

  return (
    <>
      <MetaTitle title={"Sign up"} />
      <AuthLayout>
        <div className="mx-4 md:mx-0">
          <img src="/CorpZLogo-011.png" alt="CORPZO Logo" width={200} />
          <DualHeadingTwo
            containerClassName={"text-left pt-2"}
            heading={"Sign up"}
            subHeading={"Welcome to CorpZo. Please sign up here!"}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name="full"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Full Name"}
                      type={"name"}
                      placeholder={"Full Name"}
                      className={"border-[#D9D9D9] border"}
                      onKeyDown={validateAlphabet}
                      errorContent={errors?.full?.message}
                      onBlur={() => handleBlur("full")}
                      maxLength={60}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      {...field}
                      country={"in"}
                      // label={"Phone No."}
                      placeholder={"Phone No."}
                      touched={true}
                      errorContent={errors?.phone?.message}
                      onBlur={() => handleBlur("phone")}
                      onChange={(value, country) => {
                        if (country?.dialCode === value) {
                          setError("phone", "Please input Phone number");
                        } else {
                          setValue("phone", value);
                        }
                      }}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Email"}
                      type={"email"}
                      placeholder={"Email Id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      onBlur={() => handleBlur("email")}
                      maxLength={50}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Create Password"}
                      type={"password"}
                      className={"border-[#D9D9D9] border select-none"}
                      placeholder={"Password"}
                      errorContent={errors.password?.message}
                      onBlur={() => handleBlur("password")}
                      maxLength={20}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      style={{ userSelect: "none" }}
                    />
                  )}
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
                      className={"border-[#D9D9D9] border select-none"}
                      placeholder={"Re-enter Password"}
                      errorContent={errors.confirmPassword?.message}
                      onBlur={() => handleBlur("password")}
                      maxLength={20}
                      onCopy={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      style={{ userSelect: "none" }}
                    />
                  )}
                />

                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6LfMNLcqAAAAACszMjR9WdO_AZcme8aE1mQyIMly"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-4">
              <Button
                type={"submit"}
                v2={true}
                primary={true}
                className={
                  "mt-2 py-3 w-full rounded-lg  text-[#0A1C40] font-semibold !border-none "
                }
                disabled={!isValid}
                isLoading={isSubmit}
              >
                Sign up
              </Button>
              <div className="flex gap-2 items-center  ">
                <div className="border-t w-full border-[#D9D9D9] opacity-0"></div>
                <p className="text-base text-[#6E6E6E] font-medium">or</p>
                <div className="border-t w-full border-[#D9D9D9] opacity-0"></div>
              </div>

              <div
                className="flex items-center justify-center rounded-[10px] p-2 text-center text-[#0A1C40] font-semibold border border-[#E6E8E7] bg-white hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isSubmit) {
                    const button = e.currentTarget.querySelector("button");
                    if (button && !button.disabled) {
                      button.click();
                    }
                  }
                }}
                style={{ cursor: isSubmit ? "not-allowed" : "pointer" }}
              >
                <div className="flex gap-2">
                  <GoogleLogin
                    clientId="308533527726-5vcj3hnm8pu1in31t0bvjk4ggao2v1vp.apps.googleusercontent.com"
                    onSuccess={googleLogin}
                    onError={() => console.log("Errors")}
                    cookiePolicy={"single_host_origin"}
                    scope="openid profile email"
                    prompt="select_account"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled || isSubmit}
                        className={`flex items-center gap-2 ${
                          isSubmit ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        style={{ pointerEvents: "none" }} // Disable button's own click events
                      >
                        <img
                          src="google.svg"
                          alt="Google Logo"
                          className="w-5 h-5"
                        />
                        Sign up with Google
                      </button>
                    )}
                  />
                </div>
              </div>

              <div className="text-center flex  justify-center gap-2 font-normal text-[#6C6C6C] pt-4">
                <p>
                  Already have an account?
                  <Link
                    to={"/sign-in"}
                    className={`p-2 text-[#F1359C] hover:text-opacity-80 transition-all duration-300 hover:text-opacity-80 transition-all duration-300 font-semibold ${
                      isSubmit ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              {error && (
                <div className="text-red-500 mt-2 text-center">{error}</div>
              )}
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};
