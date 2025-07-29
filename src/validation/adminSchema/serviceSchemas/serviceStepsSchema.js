import * as Yup from "yup"

export const serviceStepsSchema = Yup.object({
    details: Yup.string()
        .trim()
        .min(100, "Step Details must be at least 100 characters long")
        .max(2000, "Step Details must be at most 2000 characters long")
        .required("Please enter step content."),
    title: Yup.string()
        .trim()
        .max(100, "Step title must be at most 100 characters long")
        .required("Please enter step title."),
});