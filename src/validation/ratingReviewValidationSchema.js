import * as Yup from "yup";

export const ratingReviewSchema = Yup.object().shape({
  review: Yup.string()
    .nullable()
    .notRequired()
    .max(500, "Review cannot exceed 500 characters"), // Optional, no .required()
  serviceQualityRating: Yup.number()
    .required("Service Quality Rating is required")
    .min(1, "Service Quality Rating must be at least 1 star")
    .max(5, "Service Quality Rating cannot exceed 5 stars"),
  professionalBehaviourRating: Yup.number()
    .required("Professional Behaviour Rating is required")
    .min(1, "Professional Behaviour Rating must be at least 1 star")
    .max(5, "Professional Behaviour Rating cannot exceed 5 stars"),
  onTimeDeliveryRating: Yup.number()
    .required("On-Time Delivery Rating is required")
    .min(1, "On-Time Delivery Rating must be at least 1 star")
    .max(5, "On-Time Delivery Rating cannot exceed 5 stars"),
  transparentPricingRating: Yup.number()
    .required("Transparent Pricing Rating is required")
    .min(1, "Transparent Pricing Rating must be at least 1 star")
    .max(5, "Transparent Pricing Rating cannot exceed 5 stars"),
  valueForMoneyRating: Yup.number()
    .required("Value for Money Rating is required")
    .min(1, "Value for Money Rating must be at least 1 star")
    .max(5, "Value for Money Rating cannot exceed 5 stars"),
});
