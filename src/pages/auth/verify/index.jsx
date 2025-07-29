import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/buttons";
import { CustomAuthLayout } from "../components/layout";
import { MetaTitle } from "../../../components/metaTitle";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../../../components/layout/auth";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyUser } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

export const Verify = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const {
    isVerifying = false,
    verifyingError,
    resendingOtp,
    email,
    profile,
  } = useSelector((state) => state.auth);

  const { redirectedTo } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    if (redirectedTo !== "verify") {
      navigate("/sign-in");
    }
  }, []);
  const userId = JSON.parse(localStorage.getItem("auth"));

  const loginHeadingData = localStorage.getItem("islogindata");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^\d{10}$/;

  const profileEmail = profile?.[0]?.email;
  const profilePhone = profile?.[0]?.phone;

  const isEmail = emailRegex.test(loginHeadingData);
  const isPhone = phoneRegex.test(profilePhone);

  const subHeading =
    localStorage.getItem("forgotPassword") === "true"
      ? `We have sent you an OTP on your registered email id ${email}`
      : localStorage.getItem("isSignedUpData") === "true"
      ? `We have sent you an OTP on your registered email id ${email}`
      : isEmail
      ? `We have sent you an OTP on your registered email id ${loginHeadingData}`
      : `We have sent you an OTP on your registered phone number ${loginHeadingData}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerify(true);
    dispatch(verifyUser({ otp: otp, id: profile?.[0]?.id }));
  };

  useEffect(() => {
    if (isVerify && !isVerifying) {
      setIsVerify(false);
      if (verifyingError) {
        setOtpMessage(verifyingError);
      } else {
        const forgotPassword =
          localStorage.getItem("forgotPassword") === "true";

        if (forgotPassword) {
          navigate("/create-new-password");
        } else {
          if (localStorage.getItem("isSignedUpData") === "true") {
            toast.success("signed up successfully");
            navigate("/intro-video");
          } else {
            navigate("/dashboard");
          }
        }
        localStorage.removeItem("forgotPassword");
        localStorage.removeItem("isSignedUpData");
      }
    }
  }, [isVerify, isVerifying, verifyingError, navigate]);

  useEffect(() => {
    if (otpMessage) {
      const timer = setTimeout(() => {
        setOtpMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [otpMessage]);

  const handleResendOtp = async (event) => {
    event.preventDefault();
    setOtp("");

    const data = userId?.[0]?.id ? { id: userId?.[0]?.id } : { email: email };

    dispatch(resendOtp({ data: data, navigate }))
      .unwrap()
      .then(() => {
        setTimer(30);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (timer === 0 || timer === "00") {
      setIsResendDisabled(false);
    } else if (timer > 0) {
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

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent paste event
    toast.dismiss();
    toast.error("Pasting OTP is not allowed. Please enter the OTP manually.");
  };
  return (
    <>
      <MetaTitle title={"Verify"} />
      <AuthLayout>
        {/* className="sm:w-32 w-36" */}
        <img src="/CorpZLogo-011.png" alt="CORPZO Logo" width={200} />
        <div className="w-full flex">
          <div className="w-full">
            <div className="flex flex-col justify-between">
              <div>
                <DualHeadingTwo
                  containerClassName={"text-left pt-2"}
                  heading={"Verification Code"}
                  subHeading={subHeading}
                />
                <form
                  onSubmit={handleSubmit}
                  className="w-full sm:w-[100%] mt-8 flex flex-col gap-2"
                >
                  <div className="w-full  flex flex-col items-center sm:pb-16 sm:pt-5 gap-6">
                    <div className="w-full max-w-lg md:w-[70%] flex justify-between items-start gap-2">
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props, index) => {
                          const isActive = focusedIndex === index; // Check if this input is focused

                          return (
                            <input
                              {...props}
                              autoFocus={index === 0}
                              onPaste={handlePaste}
                              onFocus={() => setFocusedIndex(index)} // Set focusedIndex when this input is focused
                              onBlur={() => setFocusedIndex(null)} // Reset focusedIndex when this input loses focus
                              style={{
                                border: isActive
                                  ? "1px solid #FFD700"
                                  : "1px solid #DFEAF2", // Apply red border only if focused

                                fontWeight: "600",
                                textAlign: "center",
                                fontSize: "1.5rem",
                                display: "flex",
                                gap: "2px",
                                borderRadius: "12px",
                                margin: "4px",
                                border: otpMessage
                                  ? "1px solid red"
                                  : "1px solid #DFEAF2",
                              }}
                              className="max-w-[3rem] w-full xl:max-w-[4rem] xl:h-[4rem]"
                            />
                          );
                        }}
                        containerStyle="flex w-full justify-between items-start"
                        inputType="number"
                      />
                    </div>
                    <div className="text-red-500 mt-2 font-medium text-sm text-center">
                      {otpMessage ? otpMessage : null}
                    </div>
                  </div>
                  <div className="h-1"></div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <button
                      className={`text-xs ${
                        isResendDisabled || resendingOtp
                          ? "text-[#8D8D8D] opacity-50 cursor-not-allowed"
                          : "text-[#FF2C9C] hover:text-[#e51b87]"
                      }`}
                      onClick={
                        !isResendDisabled && !resendingOtp
                          ? handleResendOtp
                          : undefined
                      }
                      type="button"
                      disabled={isResendDisabled || resendingOtp || isVerify}
                    >
                      {timer > 0 ? (
                        <p className="!text-[#969696] font-normal text-sm">
                          Resend Code{" "}
                          <span className="!font-semibold text-[#040203] text-sm">
                            00:{timer}
                          </span>
                        </p>
                      ) : (
                        <div
                          className={`text-center flex justify-center gap-2 font-normal ${
                            isResendDisabled || resendingOtp
                              ? "text-[#8D8D8D] opacity-50 cursor-not-allowed"
                              : "text-[#6C6C6C]"
                          }`}
                        >
                          <p className="!font-medium text-sm hover:text-[#e51b87]">
                            Resend Code
                          </p>
                        </div>
                      )}
                    </button>

                    <Button
                      type={"submit"}
                      primary={true}
                      className={
                        "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                      }
                      disabled={otp?.length < 6}
                      isLoading={isVerify}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
