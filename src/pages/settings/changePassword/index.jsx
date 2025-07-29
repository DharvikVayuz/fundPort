import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import changePasswordSchema from "../../../validation/changePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/settings-actions";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const isFirstRender = useRef(true);

  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { isPasswordChanging, changePasswordError } = useSelector(
    (state) => state.settings
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  let error;

  const onSubmit = (data) => {
    // test dev branch

    const passwordData = {
      newPassword: data.confirmPassword,
      oldPassword: data.password,
    };
    console.log(passwordData, "password Data");
    dispatch(changePassword({ passwordData, navigate }));
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  useEffect(() => {
    setTimer(30);
  }, []);

  useEffect(() => {
    if (timer === 0 || timer == "00") {
      setIsResendDisabled(false); // Enable the resend button when the timer reaches 0
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
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      // Check if the pasted content is exactly 5 digits
      const newOtp = paste.split("");
      setOtp(newOtp);

      // Delay focusing and blurring to allow state update
      setTimeout(() => {
        newOtp.forEach((_, index) => {
          inputRefs.current[index].focus();
          inputRefs.current[index].blur();
        });

        inputRefs.current[4].focus(); // Focus the last input field
      }, 0);
    }
    e.preventDefault();
  };

  // Function to handle backspace key press
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the digit at the current index
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    setTimer(30);
  };
  useEffect(() => {
    if (!isPasswordChanging && !changePasswordError) {
      reset({
        password: "",
        confirmPassword: "",
        newPassword: "",
      });
    }
  }, [isPasswordChanging]);
  useEffect(() => {
    console.log("this mf ran");
    if (!isPasswordChanging) {
      // Skip modal logic on the first render
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (!changePasswordError) {
        setConfirmationModal(true); // Display the modal

        reset({
          password: "",
          confirmPassword: "",
          oldPassword: "",
        });

        // Set the timeout only after the modal is displayed
        const timeOutId = setTimeout(() => {
          localStorage.removeItem("userInfo");
          setConfirmationModal(false); // Close the modal
          isFirstRender.current = true;
          navigate("/sign-in"); // Redirect to sign-in
        }, 3000);

        return () => {
          if (timeOutId) {
            clearTimeout(timeOutId);
          }
        };
      }
    }
  }, [isPasswordChanging, changePasswordError, reset, navigate]);

  return (
    <>
      <div className="mt-4 w-full">
        <p className="font-bold text-xl text-black">Change Password</p>
        <p className="text-sm pt-2 text-[#4E4E4E]">
          Change your password to keep account secure.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 w-full md:w-[50%] flex flex-col gap-6">
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Old Password`}
                  placeholder={`Enter your old password`}
                  className={"border-[#D9D9D9] border"}
                  type={"password"}
                  errorContent={errors.password?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <Controller
              name={`newPassword`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`New Password`}
                  type={"password"}
                  placeholder={`Enter your new password`}
                  className={"border-[#D9D9D9] border"}
                  errorContent={errors.newPassword?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <Controller
              name={`confirmPassword`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Re enter new Password`}
                  placeholder={`Re enter your new password`}
                  className={"border-[#D9D9D9] border"}
                  type={"password"}
                  errorContent={errors.confirmPassword?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <div className="  flex justify-start items-center gap-3 mt-14">
              <Button
                type={"submit"}
                className={"px-10 py-1.5 rounded-lg"}
                primary={true}
                isLoading={isPasswordChanging}
                disabled={!isValid}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col text-center gap-6">
          <h4 className="font-bold text-xl">Password Changed!</h4>
          <div>
            <h5 className="text-lg">
              Your password has been changed successfully for your account's
              security.
            </h5>
            <p className="text-xs text-[#828282]">
              As a security measure, you have been logged out of all sessions.
            </p>
          </div>
          {/* <div className="flex justify-center items-center gap-6">
            <Button outline={true} onClick={onConfirmationModalClose}>
              Cancel
            </Button>
            <Button primary={true}>Confirm</Button>
          </div> */}
        </div>
      </ConfirmationModal>
    </>
  );
};

export default ChangePassword;
