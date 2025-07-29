import { Controller, useForm } from "react-hook-form";
import { IoIosAdd, IoIosArrowRoundBack } from "react-icons/io";
import {
  Link,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { FaPlus } from "react-icons/fa";
import { ReactModal } from "../../../components/modal/";
import { CheckOffer } from "../../../database/";
import { ImCross, ImSpinner2 } from "react-icons/im";
import { useEffect, useState } from "react";
import PricingDetail from "./components/pricingDetail";
import { Heading } from "../../../components/heading";
import { DebitCard } from "../makeAPayment/components/debitCard";
import { UPI } from "../makeAPayment/components/upi";
import { NetBanking } from "./components/netBanking";
import { useDispatch, useSelector } from "react-redux";
import {
  availService,
  getServiceDetails,
  handlePayment,
  paymentStatus,
  talkToAdvisor,
  verifyCoupon,
  verifyOffer,
  verifyPayment,
} from "../../../redux/actions/servicesDetails-actions";
import {
  addCoupons,
  removeCoupon,
  setAppliedOffer,
  updateOfferDetails,
  updateOriginalPrice,
} from "../../../redux/slices/serviceDetailsSlice";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { PricingDetailShimmer } from "../../../components/loader/PricingDetailShimmer";
import { RouteProgressBar } from "../../../components/progressBar/routeBased";
import { calculateFinalPriceByType } from "../../../utils";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getUser } from "../../../redux/actions/dashboard-action";
import { IoTrashOutline } from "react-icons/io5";

const MakeAPayment = () => {
  const dispatch = useDispatch();
  const { serviceId, subscriptionId, quotationId } = useParams();

  const [couponApplied, setCouponApplied] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState("Card");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isOfferValid, setIsOfferValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [orderId, setOrderId] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState("");
  const [cashfree, setCashfree] = useState(null);
  const client = axios.create(
    {
      baseURL: "https://corpzo.onrender.com/api",
      // baseURL: "http://localhost:8080/
    },
    {
      withCredentials: true,
    }
  );

  const {
    success,
    offerPrice,
    couponDiscount,
    serviceDetailLoading,
    isOfferRemoved,
    finalPrice,
    isCouponVerifiedLoading,
    quotationDetails,
    cost,
    originalPrice,
    appliedCoupons,
    coupons,
    availServiceData,
    isServiceAvailing,
    totalSavings,
    serviceCost,
    serviceCharge,
    stateWiseServiceCharge,
  } = useSelector((state) => state.serviceDetails);
  const user = useSelector((state) => state.dashboard.user);
  console.log("USERUSERUSERUSERUSER", success);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    // PASS DYNAMIC ID HERE
    //  dispatch(verifyOffer({offerId : ""}))
    // dispatch(getUser());
    dispatch(getServiceDetails({ serviceId: serviceId }))
      .unwrap()
      .then((res) => {
        const offerId = res?.offerservices?.[0]?.offers?.[0]?._id;
        if (offerId) {
          dispatch(verifyOffer({ offerId }))
            .unwrap()
            .then((res) => {
              if (res.isCouponValid === true) {
                console.log("Offer apllied");
                setIsOfferValid(true);
              } else {
                setIsOfferValid(false);
              }
            })
            .catch((err) => {
              setIsOfferValid(false);
            });
        }
      });
  }, [dispatch]);

  //  const offerId =  success?.offerservices?.[0]?.offers?.[0]?._id
  const transformedCouponArray = coupons?.map((item) => {
    const {
      couponTitle,
      discount,
      _id,
      discountType,
      usageType,
      isNotApplicable,
    } = item[0];
    return {
      id: _id,
      title: couponTitle,
      discountType: discountType,
      off: discount,
      usageType: usageType,
      isNotApplicable: isNotApplicable,
    };
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const handleApplyCoupon = ({
    id,
    offerCost,
    title,
    discountType,
    usageType,
  }) => {
    dispatch(
      verifyCoupon({
        couponId: id,
        cost: offerCost,
        title,
        discountType,
        usageType,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res, "res");
        setCouponApplied(true);
        setShowAddIcon(false);
        setModalOpen(false);
      });
  };

  const handleRemoveCoupon = (id) => {
    dispatch(removeCoupon({ id }));
    setCouponApplied(false);
    setShowAddIcon(!showAddIcon);
  };

  const availTheService = async () => {
    let userData = {};
    if (!user) {
      toast.error("No user found");
      return;
    }

    const requiredFields = ["name", "email", "phone", "userId"];
    const missingFields = requiredFields.filter((field) => !user[field]);

    if (missingFields.length > 0) {
      toast.loading("Fetching user details..."); // Step 1: Show loading message
      await dispatch(getUser()); // Wait until user details are fetched
      toast.success("User details fetched successfully!"); // Step 2: Success message
    }

    let customerData = {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      _id: user?.userId,
    };

    const type = searchParams.get("paymentType");
    // if(isServiceAvailing === false){
    //   onConfirmationModalClose()
    // }
    if (type === "subscription") {
      let totalCouponDiscount = 0;
      if (isOfferRemoved) {
        totalCouponDiscount = offerPrice - couponDiscount;
      } else {
        (couponDiscount || 0) + offerPrice;
      }
      userData = {
        ...availServiceData,
        ...customerData,
        amount: finalPrice,
        // totalCouponDiscount: Math.abs(totalCouponDiscount),
        subscriptionDetails: subscriptionData,
      };
    } else if (type === "quotation") {
      userData = {
        ...availServiceData,
        ...customerData,
        amount: finalPrice,
        totalCouponDiscount: 0,
      };
    } else if (type === "regular") {
      let totalCouponDiscount = 0;
      if (isOfferRemoved) {
        totalCouponDiscount = offerPrice - couponDiscount;
      } else {
        couponDiscount + offerPrice;
      }
      userData = {
        ...availServiceData,
        ...customerData,
        amount: finalPrice,
        // totalCouponDiscount: Math.abs(totalCouponDiscount),
        subscriptionDetails: subscriptionData,
      };
    }
    console.log("userdata", userData);

    try {
      // toast.loading("Processing payment..")
      let response = await dispatch(availService({ userData, navigate }));

      if (response.meta.requestStatus === "fulfilled") {
        let request = {
          order_amount: response?.payload?.data?.data?.resultPayment?.amount,
          order_currency: "INR",
          order_id: response?.payload?.data?.data?.resultPayment?._id,
          customer_details: {
            customer_id: userData?._id,
            customer_phone: userData?.phone.toString(),
            customer_name: userData?.name,
            customer_email: userData?.email,
          },
        };

        // dispatch(paymentStatus({  paymentStatus:"CAPTURED",transactionId : response?.data?.data._id}))

        // console.log("Request",request)

        const paymentResponse = await dispatch(handlePayment(request));
        console.log("responseII", paymentResponse);
        // toast.loading(paymentResponse?.payload?.data?.message)
        let transactionId =
          response?.payload?.data?.data?.resultApplication?.transactionId;
        let navId = response?.payload?.data?.data?.resultApplication?._id;
        // Make sure the response contains the necessary payment session ID
        if (paymentResponse?.payload?.data?.payment_session_id) {
          let sessionId = paymentResponse?.payload?.data?.payment_session_id;

          let checkoutOptions = {
            paymentSessionId: sessionId,
            redirectTarget: "_modal",
          };

          cashfree.checkout(checkoutOptions).then((res) => {
            console.log("Payment initialized");
            console.log(
              paymentResponse?.payload?.data?.order_id,
              response?.payload?.paymentData?.payload?.data
            );
            verifyCashfreePayment(
              paymentResponse?.payload?.data?.order_id,
              transactionId,
              navId
            );
          });
        } else {
          console.log("Payment session ID not found in response");
        }
      }
    } catch (error) {
      console.error("Error during service availability:", error);
    }
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };
  const onFailureModalClose = () => {
    setFailureModal(!failureModal);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (!isCouponVerifiedLoading) {
      setModalOpen(false);
      closeModal();
    }
  }, [isCouponVerifiedLoading]);
  useEffect(() => {
    const type = searchParams.get("paymentType");
    console.log(type, "data for subscription");

    // Check if success is valid and contains the subscription property
    if (
      type === "subscription" &&
      success &&
      success.subscription &&
      success.subscription.length > 0
    ) {
      const pricingData = calculateFinalPriceByType(
        success,
        type,
        subscriptionId,
        isOfferValid
      );
      console.log(pricingData, "subscription data");
      dispatch(updateOriginalPrice("subscription"));
      setSubscriptionData(pricingData.subscription);
      dispatch(
        setAppliedOffer({
          offerPrice: pricingData.discountAmount,
          finalPrice: pricingData.finalPrice,
        })
      );
      console.log(
        success.offerservices[0]?.offers,
        "success.offerservices[0]?.offers"
      );
      if (success.offerservices[0]?.offers && isOfferValid) {
        dispatch(updateOfferDetails(pricingData.offerDetails));
      }
    }
    // Check if success is valid and contains any length of array for quotations
    else if (
      type === "quotation" &&
      success &&
      Object.keys(success).length > 0
    ) {
      console.log("isnide quotation block");
      const pricingData = calculateFinalPriceByType(
        success,
        type,
        subscriptionId
      );
      dispatch(
        setAppliedOffer({
          offerPrice: pricingData.discountAmount,
          finalPrice: pricingData.finalPrice,
        })
      );
      dispatch(updateOriginalPrice("quotation"));
      console.log(pricingData, "quotation data");
    } else if (
      type === "regular" &&
      success &&
      Object.keys(success).length > 0
    ) {
      console.log("Inside regular part");
      const pricingData = calculateFinalPriceByType(
        success,
        type,
        null,
        isOfferValid
      );
      console.log(pricingData, "pricingData for cost regular");
      dispatch(updateOriginalPrice("regular"));
      dispatch(
        setAppliedOffer({
          offerPrice: pricingData.discountAmount,
          finalPrice: pricingData.finalPrice,
        })
      );
      console.log(
        success.offerservices[0]?.offers,
        "success.offerservices[0]?.offers"
      );
      if (success.offerservices[0]?.offers && isOfferValid) {
        console.log("insie offer appliation");
        dispatch(updateOfferDetails(pricingData.offerDetails));
      }
    }
  }, [
    success,
    searchParams,
    isOfferValid,
    success?.offerservices?.[0]?.offers,
  ]);

  useEffect(() => {
    const initializeSDK = async () => {
      const sdk = await load({
        mode: "sandbox", // Change to 'production' in production environment
      });
      setCashfree(sdk);
    };
    initializeSDK();
  }, []);

  const verifyCashfreePayment = async (id, transactionId, applicationId) => {
    try {
      let res = await dispatch(verifyPayment({ id }));
      // const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

      // try {
      // let res = await client.post(`/application/verify-cashfree-payment`, {
      // orderId: id
      // }, {
      //   headers: {
      //     // Accept: "application/json",
      //     // "Content-Type": "application/json",
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     'Authorization': `Bearer ${token}`
      //   }})

      console.log("I'm Here...", res);
      if (
        res &&
        res?.payload?.data?.data &&
        res?.payload?.data?.data[0]?.payment_status == "SUCCESS"
      ) {
        const userData = {
          paymentStatus: "CAPTURED",
          transactionId: transactionId,
          paymentMode: res?.payload?.data?.data[0]?.payment_group,
        };

        let navId = transactionId;
        let navigationId = applicationId;
        console.log("I'm Here...");
        dispatch(paymentStatus({ userData, navigate, navId, navigationId }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(appliedCoupons, "appliedCoupons");
  return (
    <>
      <div>
        <Heading title={"Payment"} backButton>Payment</Heading>
        <RouteProgressBar
          currStep={1}
          totalSteps={3}
          steps={[
            { label: "Make the payment" },
            { label: "Fill the form" },
            { label: "Preview" },
          ]}
        />
        {!quotationDetails.length > 0 && coupons && coupons?.length > 0 && (
          <div className="flex justify-end">
            <div className="mt-6 text-right">
              <p className="font-semibold text-md pb-2 text-[#4F5B76]">
                Coupon Code
              </p>
              <div className="mt-1 flex flex-row items-center gap-2">
                {appliedCoupons.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {appliedCoupons.map((coupon, index) => (
                      <div
                        key={coupon.id || index}
                        className="flex gap-2 items-center"
                      >
                        <p className="w-fit p-4 text-sm bg-[#46c666] font-medium text-white rounded">
                          {coupon.cost}{" "}
                          {coupon?.discountType === "fixed" ? "₹" : "%"}{" "}
                          {coupon.title}
                        </p>
                        <button
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={"Remove applied coupon"}
                          onClick={() => handleRemoveCoupon(coupon.couponId)}
                          className="flex justify-center items-center"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Controller
                    name="coupon"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={"Coupon"}
                        label={"Add Coupon Code"}
                        placeholder={"Add Coupon Code"}
                        containerClassName={"w-full"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.email?.message}
                        maxLength={35}
                      />
                    )}
                  />
                )}
                <div>
                  <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={"Check available coupons"}
                    className="flex justify-center items-center"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <IoIosAdd size={20} />
                  </button>
                  {modalOpen && (
                    <ModalWrapper
                      onClick={() => setModalOpen(false)}
                      isOpen={modalOpen}
                      crossButton={true}
                      onRequestClose={() => setModalOpen(false)}
                      button={
                        showAddIcon && (
                          <FaPlus
                            size={25}
                            color="#abaaaa"
                            className="bg-[#D9D9D9] px-1 py-1 rounded-full"
                          />
                        )
                      }
                    >
                      <div className="pb-4 overflow-hidden">
                        <div className="text-center">
                          <p className="mt-4 font-bold md:text-2xl text-center">
                            All Coupons
                          </p>
                          <NavLink
                            to={"/offersDetails"}
                            className="font-medium text-sm pb-2 text-[#595959]"
                          >
                            Check all offers!
                          </NavLink>
                        </div>

                        <div className="h-full max-h-[60vh] p-4 overflow-y-scroll">
                          {transformedCouponArray?.map((data, index) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row justify-between gap-6 bg-white rounded-sm"
                            >
                              <div className="flex gap-2">
                                <p className="text-xl text-center flex justify-cener items-center px-3 py-2 font-semibold bg-[#007AFF26] text-[#272727]">
                                  {data.off}{" "}
                                  {data.discountType === "fixed" ||
                                  data.discountType === "amount"
                                    ? "₹"
                                    : "%"}
                                </p>
                                <div className="py-3 flex flex-col gap-1">
                                  <p className="font-medium text-[#080808] text-lg">
                                    {data.title}
                                  </p>
                                  <p className="font-normal text-xs text-[#4D4D4D]">
                                    {data.description}
                                  </p>
                                  {/* <Link className="underline text-[#5E63FF] font-normal text-sm">
                                More
                              </Link> */}
                                </div>
                              </div>
                              <div className="pb-4 sm:pb-0 flex gap-4 text-center items-center px-2 justify-center">
                                {/* {isCouponVerifiedLoading ? (
                                    <ImSpinner2 className="animate-spin text-gray hover:text-white !text-xl" />
                                  ) : (
                                    <Button
                                      primary={true}
                                      isLoading={isServiceAvailing}
                                      onClick={() =>
                                        handleApplyCoupon({
                                          id: data.id,
                                          offerCost: data.off,
                                          title: data.title,
                                          discountType: data.discountType,
                                          usageType: data.usageType,
                                        })
                                      }
                                    >
                                      Apply
                                    </Button>
                                  )} */}

                                {!data?.isNotApplicable && (
                                  <p className="flex font-medium text-sm text-[#000000]">
                                    <img
                                      src="/images/payment/coupon.svg"
                                      alt=""
                                    />
                                    Coupon Applicable
                                  </p>
                                )}
                                <Button
                                  primary={true}
                                  isLoading={isCouponVerifiedLoading[data.id]}
                                  // disabled={data?.isNotApplicable}
                                  // disabled={data?.isNotApplicable || appliedCoupons.some(c => c.couponId === data.id)}
                                  disabled={
                                    data?.isNotApplicable ||
                                    appliedCoupons.some(
                                      (c) => c.couponId === data.id
                                    ) ||
                                    (appliedCoupons.length >= 1 &&
                                      !appliedCoupons.some(
                                        (c) => c.couponId === data.id
                                      ))
                                  }
                                  onClick={() =>
                                    handleApplyCoupon({
                                      id: data.id,
                                      offerCost: data.off,
                                      title: data.title,
                                      discountType: data.discountType,
                                      usageType: data.usageType,
                                    })
                                  }
                                >
                                  {appliedCoupons?.some(
                                    (c) => c.couponId === data.id
                                  )
                                    ? "Applied"
                                    : "Apply"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ModalWrapper>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex sm:flex-row flex-col *:gap-6 pt-4">
          {serviceDetailLoading ? (
            <PricingDetailShimmer />
          ) : (
            <div className="w-full flex flex-col p-4 border rounded-xl gap-3">
              <PricingDetail
                totalCost={finalPrice}
                originalPrice={originalPrice}
                offer={offerPrice}
                availServiceData={availServiceData}
                totalSavings={totalSavings}
                serviceCost={serviceCost}
                serviceCharge={stateWiseServiceCharge?.estimatedTotal}
                data={success}
              />
              <div className="flex justify-end items-center pt-6 gap-3">
                {!serviceDetailLoading ? (
                  <Button
                    isLoading={isServiceAvailing}
                    onClick={availTheService}
                    primary={true}
                  >
                    Continue
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal isOpen={failureModal} onClose={onFailureModalClose}>
        <div className="flex flex-col text-center gap-2 py-5 px-5 items-center">
          <img
            src="/images/payment/payment-failed-icon.svg"
            alt=""
            width={100}
          />
          <p className="text-3xl font-bold text-[#0A1C40]">Failed</p>
          <p className="font-medium text-[16px] text-[#595959]">
            The registration failed due to incomplete <br /> or non-compliant
            documentation
          </p>
          <Button className="w-full py-2" primary={true}>
            {" "}
            Try Again{" "}
          </Button>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col text-center gap-2 px-5 py-5 items-center">
          <img src="/images/payment/payment-done.svg" alt="" width={100} />
          <p className="text-3xl font-bold text-[#0A1C40]">Payment Done! </p>
          <p className="font-medium text-[16px] text-[#595959]">
            Thank you for availing this service.
          </p>
          <Button primary={true} className="w-full py-2">
            {" "}
            Try Again{" "}
          </Button>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default MakeAPayment;
