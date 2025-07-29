import * as Yup from "yup";


// Validation Schema
export const registrationSchema = Yup.object().shape({
  registration: Yup.object().shape({
    typeOfBusiness: Yup.string()
      .required("Business Type is required.")
      // .min(3, "Business Type must be at least 3 characters.")
      // .max(50,"Business Type must be atmost 50 characters.")
      ,
    // businessName: Yup.string()
    //   .required("Business Name is required.")
    //   .min(3, "Business Name must be at least 3 characters.")
    //   .max(50,"Business Name must be atmost 50 characters."),
    about: Yup.string()
      .required("About field is required.")
      .min(3, "About field must be at least 3 characters.")
      .max(1000,"About field must be atmost 500 characters."),
    cinNumber: Yup.string()
      .required("CIN No. is required.")
      .matches(/^[A-Z0-9]{21}$/, "CIN No. must be a valid 21-character code."), // Example pattern for CIN
    roleOfCompany: Yup.string()
      .required("Role of the Company is required.")
      // .oneOf([1, 0], "Invalid Role of the Company value.")
      ,
      yearOfStablish: Yup.date()
      .transform((value, originalValue) => {
        // Convert empty string to null to avoid "Invalid Date" errors
        return originalValue === "" ? null : value;
      })
      .nullable() // Allow null values after transformation
      .required("Year of Establishment is required.")
      .min(new Date(1900, 0, 1), "Year cannot be before 1900.")
      .max(new Date(), "Year cannot be in the future."),
    
    headQuarterLocation: Yup.string()
      .required("Headquarter Location is required.")
      .min(3, "Location must be at least 3 characters.")
      .max(50,"Location must be atmost 50 characters."),
    industryId: Yup.string()
      .required("Industry Type is required."),
    subIndustryId: Yup.string()
      .required("Sub Industry Type is required."),
      sizeOfCompany: Yup.string()
      .required("Size of the Company is required.")
    ,
    funded: Yup.string()
      .required("Funding Status is required.")
      .oneOf(["funded", "bootstrap"], "Invalid funding status."),
  }),
});


// Address Details Schema
export const addressSchema = Yup.object().shape({
  address: Yup.object().shape({
      businessAddressL1: Yup.string().
      required("Line 1 is required")
      .min(3, "Line 1 must be at least 3 characters.")
      .max(100, "Line 1 must be at most 50 characters."),
      businessAddressL2: Yup.string().
      required("Line 2 is required")
      .min(3, "Line 2 must be at least 3 characters.")
      .max(100, "Line 2 must be at most 50 characters."),
      businessAddressPin: Yup.string()
      .required("Pin is required")
      .matches(/^\d{6}$/, "Must be exactly 6 digits and contain only numbers"),    
      businessAddressCity: Yup.string().required("City is required"),
      businessAddressState: Yup.string()
      .required("State is required"),
      communicationAddressL1: Yup.string()
      .required("Line 1 is required")
      .min(3, "Line 1 must be at least 3 characters.")
      .max(100, "Line 1 must be at most 50 characters."),
      communicationAddressL2: Yup.string()
      .required("Line 2 is required")
      .min(3, "Line 2 must be at least 3 characters.")
      .max(100, "Line 2 must be at most 50 characters."),
      communicationAddressPin: Yup.string()
      .required("Pin is required")
      .matches(/^\d{6}$/, "Must be exactly 6 digits and contain only numbers"),  
      communicationAddressCity: Yup.string()
      .required("City is required"),
      communicationAddressState: Yup.string()
      .required("State is required"),
  }),
});

// Financial Details Schema
export const financialSchema = Yup.object().shape({
  financial: Yup.object().shape({
      authorizedCapital: Yup.number("Invalid value")
      
        .required('Authorized Capital is required')
        .positive('Authorized Capital must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val => val.toString().length >= 6 &&  val.toString().length <= 15)
        .typeError('Invalid value'),
      paidCapital: Yup.number("Invalid value")
      
        .required('Paid Capital is required')
        .positive('Paid Capital must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val => val.toString().length >= 6 &&  val.toString().length <= 15)
        .typeError('Invalid value'),
      revenue: Yup.number()
        .required('Revenue is required')
        .positive('Revenue must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val => val.toString().length >= 6 &&  val.toString().length <= 15)
        .typeError('Invalid value'),
      profit: Yup.number()
        .required('Profit is required')
        // .positive('Profit must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val =>   val.toString().length <= 15)
        // .test('len', 'Must be between 6 to 10 digits', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Invalid value'),
      pat: Yup.number()
        .required('PAT is required')
        // .positive('Profit must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val =>   val.toString().length <= 15)
        // .test('len', 'Must be between 6 to 10 digits', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Invalid value'),
      grossMargin: Yup.number()
        .required('Gross Margin is required')
        // .positive('Profit must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val =>   val.toString().length <= 15)
        // .test('len', 'Must be between 6 to 10 digits', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Invalid value'),
      loans: Yup.number()
        .required('Loan amount is required')
        // .positive('Profit must be a positive number')
        .test('len', 'Must be between 6 to 15 digits', val =>   val.toString().length <= 15)
        // .test('len', 'Must be between 6 to 10 digits', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Invalid value'),
  }),
});

// KYC Details Schema
export const kycSchema = Yup.object().shape({
  kyc: Yup.object().shape({
      // kycUser: Yup.string()
      //   .required('Username is required')
      //   .min(4, 'Username must be at least 4 characters')
      //   .max(20, 'Username must be at most 20 characters'),
      id: Yup.string()
        .required('ID proof No. is required')
        // .matches(/[^A-Z0-9 _\-\\]/g, 'ID proof No. must be alphanumeric')
        .min(5, 'ID proof No. must be at least 5 characters')
        .max(20, 'ID proof No. must be at most 15 characters'),

      addressProof: Yup.string()
        .required('Address Proof No. is required')
        // .matches(/^[A-Z0-9 _\-\\]{3,30}$/, 'Address proof No. can include only uppercase letters, numbers, spaces, underscores, hyphens, and backslashes')
        .min(3, "Address must be at least 3 characters.")
        .max(30, "Address must be at most 30 characters."),
  }),
});

// Funding Details Schema
export const fundingSchema = Yup.object().shape({
  funding: Yup.object().shape({
      lookingForFunding: Yup.number()
        .required('Funding requirement is required')
        .oneOf([1, 0], 'Please select a valid option'), // Validate 'Yes' or 'No'
      existingBusinessName: Yup.string()
        .required('Existing business status is required'),
        // .oneOf([1, 0], 'Please select a valid option'), // Validate 'Active' or 'Inactive'
        stageOfBusiness: Yup.string()
        .required('Stage of business is required')
        // .oneOf([1, 0], 'Please select a valid option'), // Validate 'Active' or 'Inactive'
  }),
});