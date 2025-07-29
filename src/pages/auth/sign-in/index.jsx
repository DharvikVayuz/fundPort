import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { MetaTitle } from "../../../components/metaTitle";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { Checkbox } from "../../../components/inputs/checkbox";
import { AuthLayout } from "../../../components/layout/auth";
import {
  loginUser,
  thirdPartyLogin,
} from "../../../redux/actions/userAuth-action";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { signinValidationSchema } from "../../../validation/authValidatiorSchema";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { yupResolver } from "@hookform/resolvers/yup";
import { setIsSignedIn, setRedirectTo } from "../../../redux/slices/appSlice";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(signinValidationSchema),
    mode: "onChange",
  });
  const recaptchaRef = useRef(null);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    isLoggingIn = false,
    error,
    profile,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [visitorId, setVisitorId] = useState(null);

  localStorage.setItem("forgotPassword", false);
  const handleCheckbox = (e) => {
    e.preventDefault();
    setCheckedCheckbox((prev) => !prev);
  };
  localStorage.setItem("forgotPassword", false);
  localStorage.setItem("isSignedUpData", false);
  const phoneRegex = /^[1-9][0-9]{8,11}$/;
  const emailOrPhone = watch("email");

  useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setVisitorId(result.visitorId);
        console.log(navigator.userAgent, "AGENT");
      } catch (error) {
        console.error("FingerprintJS error:", error);
      }
    };

    loadFingerprint();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmit(true);
    let transformedData = {};
    const isPhoneNumber = phoneRegex.test(emailOrPhone);
    if (isPhoneNumber) {
      transformedData.phone = emailOrPhone;
      transformedData.password = data.password;
    } else {
      transformedData.email = emailOrPhone;
      transformedData.password = data.password;
    }

    const token = await recaptchaRef.current.executeAsync().then((res) => {
      data = {
        ...transformedData,
        recaptchaToken: res,
        userType: "end_user",
        deviceId: visitorId,
        deviceName: navigator.userAgent,
      };
      data?.email
        ? localStorage.setItem("islogindata", data?.email)
        : localStorage.setItem("islogindata", data?.phone);
      dispatch(loginUser(data));
    });
    dispatch(setIsSignedIn(checkedCheckbox));
    dispatch(setRedirectTo("verify"));
  };

  useEffect(() => {
    if (!isLoggingIn && isSubmit) {
      setIsSubmit(false);
      if (error) {
        toast.dismiss();
        toast.error(error);
      } else {
        if (profile?.source === "GOOGLE") {
          navigate("/dashboard");
        } else {
          navigate("/verify");
        }
      }
    }
  }, [isLoggingIn]);

  const googleLogin = (data) => {
    setIsSubmit(true);
    dispatch(
      thirdPartyLogin({
        email: data?.profileObj?.email,
        name: data?.profileObj?.givenName,
        profilePicture: data?.profileObj?.imageUrl,
      })
    );
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENTID,
        scope: "",
      });
    });
  });

  return (
    <>
      <MetaTitle title={"Sign in"} />
      <AuthLayout>
        <div className="mx-4 md:mx-0">
          <img src="/CorpZLogo-011.png" alt="CORPZO Logo" width={200} />
          <DualHeadingTwo
            containerClassName={"text-left pt-2"}
            heading={"Sign in"}
            subHeading={"Please sign in to access your account."}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 pt-6"
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email Id or Phone Number"
                  type="text"
                  placeholder="Email Id / Phone No."
                  className="border-[#D9D9D9] border"
                  errorContent={errors?.email?.message}
                  maxLength={phoneRegex.test(emailOrPhone) ? 12 : 50}
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
                  label="Password"
                  type="password"
                  className="border-[#D9D9D9] border select-none"
                  placeholder="Password"
                  maxLength={20}
                  errorContent={errors?.password?.message}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  style={{ userSelect: "none" }}
                />
              )}
              rules={{ required: "Password is required" }}
            />
            <div className="flex justify-between">
              <p>
                <p
                  onClick={handleCheckbox}
                  className="!inline-flex items-center font-normal text-[14px] text-[#a5a3a3] -mt-2 gap-2"
                >
                  <Checkbox
                    checked={checkedCheckbox}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleCheckbox}
                  />
                  <p>
                    <a
                      className={`${
                        checkedCheckbox
                          ? "text-[#000] cursor-pointer "
                          : "text-[#969696] cursor-pointer"
                      } hover:text-[#F148B2]`}
                    >
                      Keep me signed in
                    </a>
                  </p>
                </p>
              </p>

              <a>
                <Link
                  to={"/forgot-password"}
                  state={{ email: emailOrPhone }}
                  className="font-medium text-[14px] text-[#969696] hover:text-[#F148B2]"
                >
                  Forgot password?
                </Link>
              </a>
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LfMNLcqAAAAACszMjR9WdO_AZcme8aE1mQyIMly"
            />

            <Button
              type={"submit"}
              primary={true}
              className={
                "mt-2 py-3 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
              }
              disabled={!isValid}
              isLoading={isSubmit}
            >
              Sign in
            </Button>

            <div className="flex gap-2 items-center">
              <div className="border-t w-full border-[#D9D9D9] opacity-0" />
              <p className="text-base text-[#969696] font-medium">or</p>
              <div className="border-t w-full border-[#D9D9D9] opacity-0" />
            </div>

            <div
              className="flex items-center justify-center rounded-[10px] p-2 text-center text-[#232323] hover:bg-gray-100 font-semibold border border-[#E6E8E7] bg-white"
              onClick={(e) => {
                e.preventDefault();
                // Trigger Google login on div click
                if (!isSubmit) {
                  const button = e.currentTarget.querySelector("button");
                  if (button) button.click();
                }
              }}
              style={{ cursor: isSubmit ? "not-allowed" : "pointer" }}
            >
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
                    style={{ pointerEvents: "none" }} // Disable button's own pointer events
                  >
                    <img
                      src="google.svg"
                      alt="Google Logo"
                      className="w-5 h-5"
                    />
                    Sign in with Google
                  </button>
                )}
              />
            </div>
            <div className="text-center flex justify-center gap-2 font-normal text-[#969696] pt-4">
              <p>
                Don’t have an account yet?
                <Link
                  to={"/sign-up"}
                  className={`p-2 text-[#F1359C] hover:text-opacity-80 transition-all duration-300 font-semibold ${
                    isSubmit ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};
