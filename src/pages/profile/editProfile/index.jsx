import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../components/inputs";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import {
  submitEditProfile,
  updateProfilePicture,
} from "../../../redux/actions/profile-actions";
import { profileValidationSchema } from "./editProfileValidationSchema";
import Cropper from "react-easy-crop";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { getUser } from "../../../redux/actions/dashboard-action";
import getCroppedImg from "../../../components/imageCropper";
import { validateNumber } from "../../../utils";

const Edit = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [imageFile, setImageFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Managing the saving state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.dashboard);
  const { loading, isUpdatingImage } = useSelector((state) => state.profile);
  const [image, setImage] = useState(
    user?.profile_picture_url || "/images/insights/user-logo.svg"
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
    mode: "onChange",
  });

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    const formData = new FormData();

    // Process the image if selected
    if (imageFile && croppedAreaPixels) {
      const croppedImgBlob = await getCroppedImg(
        image,
        crop,
        croppedAreaPixels
      );
      const fileName = imageFile?.name;
      const croppedImgFile = await blobToFile(croppedImgBlob, fileName);

      // Upload the cropped image
      const imageFormData = new FormData();
      imageFormData.append("files", croppedImgFile);
      const imageUrl = await dispatch(
        updateProfilePicture({ formData: imageFormData })
      );

      if (imageUrl?.payload?.data?.url) {
        formData.append("profilePicture", imageUrl.payload.data.url);
      }
    }

    // Add other form fields
    formData.append("firstName", data.fullName);
    formData.append("businessEmail", data.businessEmail);
    if (user?.phone === undefined) {
      formData.append("phone", data.phone);
    }

    await dispatch(submitEditProfile({ formData, navigate }));
    dispatch(getUser());
    setIsSaving(false);
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Only image files (JPG, JPEG, PNG) are allowed.");
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        toast.error("File size should not exceed 3MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageFile(file);
        setImageSelected(true);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const blobToFile = (url, filename) => {
    let mimeType = (url.match(/^data:([^;]+);/) || "")[1];
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  useEffect(() => {
    setValue("fullName", user?.name);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail || "");
    setValue("phone", user?.phone);
  }, [user]);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUser());
    }
  }, [dispatch, user?.email]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Heading title={"Edit Profile"} backButton={true}>
          Edit Profile
        </Heading>

        <div className="relative p-4 border rounded-xl">
          <div className="py-4 bg-[#F3F7FF] flex flex-col gap-2 md:flex-row md:justify-center items-center rounded-xl">
            <div className="md:w-1/4">
              <div className="flex justify-center items-center">
                <div className="relative rounded-full size-32">
                  {imageSelected ? (
                    <div className="size-full relative">
                      <Cropper
                        cropShape="round"
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                  ) : (
                    <img
                      src={
                        user?.profile_picture_url ||
                        "/images/insights/user-logo.svg"
                      }
                      className="size-full border-2 border-white rounded-full object-cover"
                      alt="user-image"
                    />
                  )}
                  <label
                    htmlFor="image-upload"
                    className="size-8 border-2 border-white absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer bg-[#0A1C40] p-1.5 rounded-full"
                  >
                    <img
                      src="/icons/profile/profile-camera.svg"
                      className="size-full"
                      alt="Profile Picture"
                    />
                  </label>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="w-full md:w-3/4 py-4 pl-4 md:pl-0 pr-4 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center md:items-start items-center">
              <div className="w-full space-y-1">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Name<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"Full Name"}
                      type={"text"}
                      // placeholder={"Full Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.fullName?.message}
                      maxLength={30}
                    />
                  )}
                />
              </div>
              <div className="w-full space-y-1">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"Email id"}
                      type={"email"}
                      // placeholder={"Email id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      disabled={true}
                      maxLength={50}
                    />
                  )}
                />
              </div>
              <div className="w-full space-y-1">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Business Email<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="businessEmail"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"Business Email id"}
                      type={"email"}
                      // placeholder={"Business Email id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.businessEmail?.message}
                      maxLength={50}
                    />
                  )}
                />
              </div>
              <div className="w-full space-y-1">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Phone<span className="text-red-500">*</span>
                </label>

                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"Phone No"}
                      type={"phone"}
                      // placeholder={"Phone No"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.phone?.message}
                      disabled={user?.phone !== undefined}
                      maxLength={12}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!isValid && !imageSelected}
            className="px-10 py-1"
            primary
            isLoading={(isSaving && loading) || isUpdatingImage}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Edit;
