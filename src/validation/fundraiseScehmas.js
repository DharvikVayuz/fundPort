import * as Yup from "yup";

export const fundraiseFundDetailsSchema = Yup.object().shape({
  businessId: Yup.string()
  .required("Please select a business"),
  businessLocation: Yup.string()
  .required("Please select a geographical Location"),
  fundDetails: Yup.array()
    .of(
      Yup.object().shape({
       
        roundName: Yup.string()
          .required("Round Name is required")
          .max(50, "Round Name cannot exceed 50 characters"),
        roundType: Yup.string().required("Round Type is required"),
        fundingDate: Yup.date()
          .required("Funding Date is required")
          .max(new Date(), "Funding Date cannot be in the future"),
        leadInvestor: Yup.string()
          .required("Lead Investor is required")
          .max(50, "Lead Investor cannot exceed 50 characters"),
        fundingAmount: Yup.number()
          .required("Funding Amount is required")
          .typeError("Funding Amount must be a number")
          .positive("Funding Amount must be positive"),
        valuation: Yup.number()
          .required("Valuation is required")
          .typeError("Valuation must be a number")
          .positive("Valuation must be positive"),
      })
    )
    .min(1, "At least one funding round is required")
    .required("Funding Details are required"),
});
