import * as Yup from "yup";

const deaqctivateAccountSchema = Yup.object().shape({
    password: Yup.string()
    //     .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
    //     .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    //     .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    //     .matches(/[\W_]/, 'Password must contain at least one special character')
        .required("Old password is required"),

    reason: Yup.string()
        .required("Please select a reason to deactivate your account"),  // Ensure a reason is selected
});

export default deaqctivateAccountSchema;
