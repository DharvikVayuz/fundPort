import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleExtraSpaces } from "../../../../utils/adminUtils";
import * as Yup from "yup";
import {
  addSteps,
  editStep,
  getAllSteps,
} from "../../../../redux/admin/actions/steps";
import { Input } from "../../../../components/inputs/input";
import { Button } from "../../../../components/buttons";
import { toast } from "react-toastify";
import serviceAPIs from "../../../../constants/APIList/serviceAPIs";
import { CrossButton } from "../../../../components/buttons/crossButton";
const initialValues = {
  steps: [
    {
      title: "",
      details: "",
    },
  ],
};
// Define validation schema
const stepSchema = Yup.object().shape({
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

const CreateSteps = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams({});
  const serviceId = searchParams.get("serviceId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector((state) => state.adminSteps.isFetching);
  const { isAdding } = useSelector((state) => state.adminSteps);
  const [steps] = useState(initialValues.steps);
  const storedSteps = JSON.parse(localStorage.getItem("serviceSteps")) || [];
  // Handle adding a new form
  // const formik = useFormik({
  //   initialValues,
  //   // validationSchema,
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   onSubmit: (values, actions) => {
  //     console.log(formik.errors)
  //     // dispatch(addConfig(values))
  //     // actions.resetForm();
  //     if(id || Object.keys(storedSteps).length > 0){
  //       values.steps.forEach((stepData) => {
  //         console.log(stepData, "stepData");
  //         // dispatch(editStep(id,stepData, serviceId, navigate));
  //       });
  //     }else{

  //       values.steps.forEach((stepData) => {
  //         console.log(stepData, "stepData");

  //         dispatch(addSteps({...stepData, serviceId}, serviceId, navigate));
  //       });

  //     }
  //   },
  // });

  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, actions) => {
      console.log("Formik Errors:", formik.errors);

      // Map steps to ensure correct IDs (_id) are sent
      const updatedSteps = values.steps.map((stepData) => {
        // Find corresponding step in storedSteps
        const correspondingStep = storedSteps.find(
          (storedStep) => storedStep.title === stepData.title // Match by unique identifier, e.g., title
        );

        // Replace id with _id if found
        return correspondingStep
          ? { ...stepData, id: correspondingStep._id || stepData.id } // Fallback to original id if _id isn't present
          : stepData;
      });

      // Prevent duplicate IDs by filtering out repeated steps
      const uniqueSteps = updatedSteps.filter(
        (step, index, self) => index === self.findIndex((s) => s.id === step.id)
      );

      if (id || Object.keys(storedSteps).length > 0) {
        uniqueSteps.forEach((stepData) => {
          console.log("Updating Step:", stepData);
          dispatch(editStep(stepData.id, stepData, serviceId, navigate));
        });
      } else {
        uniqueSteps.forEach((stepData) => {
          console.log("Adding Step:", stepData);
          dispatch(addSteps({ ...stepData, serviceId }, serviceId, navigate));
        });
      }
    },
  });

  const handleInputChange = (index, field, event) => {
    const value = event.target.value;

    formik.setFieldValue(`steps[${index}].${field}`, value);
  };

  const handleAddConfiguration = () => {
    const newConfig = {
      title: "",
      details: "",
    };

    formik.setFieldValue("steps", [...formik.values.steps, newConfig]);
  };

  const removeConfig = (indexToRemove) => {
    if (formik.values.steps.length === 1) return; // Prevent removing the last step

    const updatedSteps = formik.values.steps.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("steps", updatedSteps);
  };

  useEffect(() => {
    // Check if stepDetails exist in localStorage

    if (storedSteps.length > 0) {
      // Map the stored steps to formik field values
      const mappedSteps = storedSteps.map((step) => ({
        title: step.title || "",
        details: step.details || "",
      }));

      // Set the mapped steps to formik values
      formik.setFieldValue("steps", mappedSteps);
    }
  }, [id]); // Runs when `id` changes or on component mount

  // useEffect(() => {
  //   formik.setFieldValue(
  //     "steps",
  //     steps.map((form) => ({
  //       title: form.title || "",
  //       details: form.details || "",
  //     }))
  //   );
  // }, [steps]);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getAllSteps(undefined, id));
    }
  }, [id, dispatch]);

  return (
    <div className="relative">
      {id !== undefined && isFetching ? (
        <div className="flex justify-center items-center min-h-screen">
          {/* Loading spinner can be added here */}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {formik.values.steps.map((form, index) => (
            <div
              key={index}
              className="w-[50%] flex flex-col gap-6 mb-8 border p-4 relative"
            >
              {index !== 0 && (
                <CrossButton
                  type="button"
                  className="mb-2"
                  outline={true}
                  onClick={() => removeConfig(index)}
                >
                  Remove
                </CrossButton>
              )}
              <Input
                label={`Step Title ${index + 1}`}
                size="sm"
                placeholder="Add Step"
                value={formik.values.steps[index]?.title || ""}
                onChange={(e) =>
                  formik.setFieldValue(`steps[${index}].title`, e.target.value)
                }
                name={`steps[${index}].title`}
                maxLength={100}
                error={
                  formik.touched.steps?.[index]?.title &&
                  formik.errors.steps?.[index]?.title
                }
              />
              {formik.touched.steps?.[index]?.title &&
                formik.errors.steps?.[index]?.title && (
                  <p className="text-red-500">
                    {formik.errors.steps[index].title}
                  </p>
                )}

              <label
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Step Details {index + 1}
              </label>
              <textarea
                placeholder="Add Details"
                className="border !border-t-blue-gray-200 p-2 focus:!border-t-gray-900 w-full"
                name={`steps[${index}].details`}
                value={formik.values.steps[index]?.details || ""}
                onChange={(e) =>
                  formik.setFieldValue(
                    `steps[${index}].details`,
                    e.target.value
                  )
                }
                maxLength={2000}
              />
              {formik.touched.steps?.[index]?.details &&
                formik.errors.steps?.[index]?.details && (
                  <p className="text-red-500">
                    {formik.errors.steps[index].details}
                  </p>
                )}

              {steps.length > 1 && (
                <Button outline={true} onClick={() => removeConfig(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}

          <div className="flex gap-6">
            <Button
              type="button"
              disabled={steps.length >= 3}
              primary
              onClick={handleAddConfiguration}
            >
              Add Another Step
            </Button>
            <Button isLoading={isAdding} type="submit" primary>
              {id || Object.keys(storedSteps).length > 0
                ? "Update Step"
                : "Create Step"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateSteps;
