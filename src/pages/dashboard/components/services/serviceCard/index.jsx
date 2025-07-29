import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ProgressBar } from "../../../../../components/progressBar";
import { Heading } from "../../../../../components/heading";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { Rating } from "../../../../../components/rating";
import { Button } from "../../../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ratingReviewSchema } from "../../../../../validation/ratingReviewValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { ratingReview } from "../../../../../redux/actions/servicesDetails-actions";
import { LinkButton } from "../../../../../components/link";
import { TextArea } from "../../../../../components/inputs/textarea";
import { GoTriangleDown } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

export const ServiceCard = ({ data }) => {
  const { dataUpdate } = useSelector((state) => state.dashboard);
  const [dropdownStates, setDropdownStates] = useState(
    dataUpdate?.data?.map(() => false)
  );
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  const handleServiceDropdown = (index) => {
    setSelectedServiceIndex(selectedServiceIndex === index ? null : index);
  };

  const { isRatingAdding } = useSelector((state) => state.serviceDetails);

  console.log(data, "data from component");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      serviceQualityRating: 0,
      professionalBehaviourRating: 0,
      onTimeDeliveryRating: 0,
      transparentPricingRating: 0,
      valueForMoneyRating: 0,
      review: "",
    },
    resolver: yupResolver(ratingReviewSchema),
  });

  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
    setServiceId("");
    reset();
  };

  useEffect(() => {
    if (!isRatingAdding) setConfirmationModal(false);
  }, [isRatingAdding]);

  const onConfirmationModalOpen = (data, transactionId) => {
    setServiceId(data);
    setTransactionId(transactionId);
    setConfirmationModal(true);
  };

  const onSubmit = (formData) => {
    // Handle form submission logic
    const payload = {
      serviceQualityRating: formData.serviceQualityRating,
      professionalBehaviourRating: formData.professionalBehaviourRating,
      onTimeDeliveryRating: formData.onTimeDeliveryRating,
      transparentPricingRating: formData.transparentPricingRating,
      valueForMoneyRating: formData.valueForMoneyRating,
      review: formData.review,
    };
    if (formData.review === "") {
      delete payload.review;
    }

    dispatch(
      ratingReview({ ...payload, serviceId, applicationId: transactionId })
    );
    reset(); // Reset the form after submission
  };

  const calculateCompletionStatus = (expectedCompletionDate) => {
    const today = new Date();
    const expectedDate = new Date(expectedCompletionDate);
    const differenceInMilliseconds = expectedDate - today;
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );

    if (differenceInDays > 0) {
      return { status: "On Time", delay: null };
    } else if (differenceInDays < 0) {
      return { status: "Delayed", delay: Math.abs(differenceInDays) };
    } else {
      return { status: "On Time", delay: null };
    }
  };

  return (
    <>
      {data?.map((data, index) => {
        const { status, delay } = calculateCompletionStatus(
          data?.expectedCompletionDate
        );
        return (
          <div
            key={index}
            className="bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1 px-4 py-4 rounded-md  "
          >
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <img
                    className=""
                    src="/icons/dashboard/services.svg"
                    alt=""
                  />
                  <NavLink
                    // to={`/payment/create/${data._id}/${data._id}`}
                    to={
                      data?.status === "closed"
                        ? `/services/detail/${data._id}` // or any route for closed
                        : `/payment/create/${data._id}/${data._id}`
                    }
                    className="font-semibold text-md text-[#0A1C40] line-clamp-1"
                  >
                    Service: {data?.service[0]?.name}{" "}
                  </NavLink>
                  {/* <img
                    src="/icons/dashboard/service-error.svg"
                    width={15}
                    alt=""
                  /> */}
                </div>
                <div className="flex flex-row gap-2">
                  {data?.businessdetails[0]?.businessName && (
                    <h6 className="font-medium text-sm text-[#7C7D80]">
                      <span className="font-bold">Business:</span>{" "}
                      {data.businessdetails[0].businessName}
                    </h6>
                  )}

                  <p className="font-medium text-sm text-[#7C7D80]">
                    <span className="font-bold">Step:</span> {data?.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                {data?.ratingreviewsSize === 0 && (
                  <Button
                    onClick={() =>
                      onConfirmationModalOpen(data?.service[0]?._id, data?._id)
                    }
                    className="font-medium text-[12px] text-[#0068FF] underline underline-offset-4 whitespace-nowrap"
                  >
                    Rate Your Experience
                  </Button>
                )}
                <LinkButton
                  className={"px-4 py-2 font-medium text-xs text-[#0A1C40] whitespace-nowrap"}
                  // to={`/payment/create/${data._id}/${data._id}`}
                  to={
                    data?.status === "closed"
                      ? `/services/detail/${data._id}` // or any route for closed
                      : `/payment/create/${data._id}/${data._id}`
                  }
                  primary={true}
                >
{data?.status === "closed"
  ? "Avail again"
  : data?.status === "approved"
  ? "View Form"
  : "Complete Form"}
                </LinkButton>
                <div className="flex items-center justify-center whitespace-nowrap">
                  {status === "Delayed" ? (
                    <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#FFDFDF] px-2 py-1 text-xs font-medium !text-[#FF3B3B] text-center">
                      <GoDotFill />
                      <p>Delayed by {delay} days</p>
                    </div>
                  ) : status === "On Time" ? (
                    <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#DFFFE2] px-2 py-1 text-xs font-medium text-[#037847] text-center">
                      <GoDotFill />
                      <p>On Time</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#DFFFE2] px-2 py-1 text-xs font-medium text-[#037847] text-center">
                        <GoDotFill />
                        <p>On Time</p>
                      </div>
                    </>
                  )}
                </div>
                {/* <button
                  data-tooltip-content={"Service Progress"}
                  data-tooltip-id="my-tooltip"
                  className={`${
                    dropdownStates === true && "rotate-180 "
                  } hidden lg:block `}
                  onClick={() => handleServiceDropdown(index)}
                >
                  <GoTriangleDown size={15} />
                </button> */}
                <button
                  data-tooltip-content={"Service Progress"}
                  data-tooltip-id="my-tooltip"
                  className="hidden lg:block"
                  onClick={() => handleServiceDropdown(index)}
                >
                  <GoTriangleDown
                    size={15}
                    className={
                      selectedServiceIndex === index ? "rotate-180" : ""
                    }
                  />
                </button>
              </div>
            </div>
            {/* <Dropdown
              isOpen={true}
              servicesProgressSteps={[1, 2, 3, 4]}
            /> */}

            {selectedServiceIndex === index && (
              <Dropdown
                isOpen={true}
                servicesProgressSteps={data?.servicepeogresses || []}
              />
            )}
          </div>
        );
      })}
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
        modalClassName={"sm:max-w-4xl w-full"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between"
        >
          <p className="px-6 py-4 text-xl text-[#232323] font-semibold">
            Rate Your Experience!
          </p>

          <div className="px-6 py-0 max-h-[75vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-5">
              <label className="text-sm font-semibold text-gray-600">
                Service Quality
              </label>
              <Controller
                name="serviceQualityRating"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-6">
                    <Rating
                      {...field}
                      rating={field.value}
                      setRating={field.onChange}
                      size={30}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center pb-5">
              <label className="text-sm font-semibold text-gray-600">
                Professional Behavior
              </label>
              <Controller
                name="professionalBehaviourRating"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-6">
                    <Rating
                      {...field}
                      rating={field.value}
                      setRating={field.onChange}
                      size={30}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center pb-5">
              <label className="text-sm font-semibold text-gray-600">
                On-Time Delivery
              </label>
              <Controller
                name="onTimeDeliveryRating"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-6">
                    <Rating
                      {...field}
                      rating={field.value}
                      setRating={field.onChange}
                      size={30}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center pb-5">
              <label className="text-sm font-semibold text-gray-600">
                Transparent pricing
              </label>
              <Controller
                name="transparentPricingRating"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-6">
                    <Rating
                      {...field}
                      rating={field.value}
                      setRating={field.onChange}
                      size={30}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center pb-5">
              <label className="text-sm font-semibold text-gray-600">
                Value for Money
              </label>
              <Controller
                name="valueForMoneyRating"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-6">
                    <Rating
                      {...field}
                      rating={field.value}
                      setRating={field.onChange}
                      size={30}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="pt-4 pb-5">
              <label
                htmlFor="Review"
                className="flex text-lg font-bold text-[#0A1C40]"
              >
                Review
              </label>
              <Controller
                name="review"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <TextArea
                      {...field}
                      className="min-h-20 placeholder:text-xl border bg-white border-[#D9D9D9]"
                      placeholder="Add Review"
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="px-6 pb-4 flex justify-end gap-2">
            <Button
              outline={true}
              type="button"
              onClick={onConfirmationModalClose}
            >
              Maybe Later
            </Button>
            <Button
              disabled={!isValid}
              isLoading={isRatingAdding}
              primary={true}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </ConfirmationModal>
    </>
  );
};

const Dropdown = ({ isOpen, servicesProgressSteps }) => {
  return (
    <>
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <ProgressBar steps={servicesProgressSteps} />
          </div>
        </div>
      )}
    </>
  );
};
