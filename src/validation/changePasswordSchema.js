import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, '') 
    //     .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    //     .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    //     .matches(/[\W_]/, 'Password must contain at least one special character')
        .required("Old password is required"),

    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
        .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
        .matches(/[A-Z]/, 'New Password must contain at least one uppercase letter')  // At least one uppercase letter
        .matches(/[a-z]/, 'New Password must contain at least one lowercase letter')  // At least one lowercase letter
        .matches(/[0-9]/, 'New Password must contain at least one number')  // At least one number
        .matches(/[\W_]/, 'New Password must contain at least one special character')  // At least one special character (e.g., !, @, #, etc.)
        .required('New Password is required'),  // Ensure password is not empty

    confirmPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
        .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
        .matches(/[A-Z]/, 'confirmPassword must contain at least one uppercase letter')  // At least one uppercase letter
        .matches(/[a-z]/, 'confirmPassword must contain at least one lowercase letter')  // At least one lowercase letter
        .matches(/[0-9]/, 'confirmPassword must contain at least one number')  // At least one number
        .matches(/[\W_]/, 'confirmPassword must contain at least one special character') 
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});

export default changePasswordSchema;
