import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addSubscriptions,
  editSubscriptions,
  getSingleSubscription,
} from "../../../../redux/admin/actions/subscriptions";
import { Input } from "../../../../components/inputs";
import { Button } from "../../../../components/buttons";
import { CrossButton } from "../../../../components/buttons/crossButton";
import { validateNumber } from "../../../../utils/adminUtils";

const initialValues = {
  subscriptions: [
    {
      title: "",
      description: "",
      amount: 0,
      type: "",
      duration: "",
    },
  ],
};

const MAX_EDITOR_LENGTH = 200;

const AddSubscriptions = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subscriptionData = useSelector(
    (state) => state.adminSubscriptions.subscription
  );
  const isFetching = useSelector(
    (state) => state.adminSubscriptions.isFetching
  );
  const [searchParams] = useSearchParams({});
  const serviceId = searchParams.get("serviceId");
  const storedServiceSubscriptions =
    JSON.parse(localStorage.getItem("ServiceSubscriptions")) || [];
  // const formik = useFormik({
  //   initialValues,
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   onSubmit: (values) => {
  //     if (id) {
  //       // Update subscription
  //       values.subscriptions.forEach((sub) => {
  //         dispatch(editSubscriptions(id, { ...sub }, navigate, serviceId));
  //       });
  //     } else {
  //       // Add subscriptions
  //       values.subscriptions.forEach((sub) => {
  //         console.log(sub, "subscription");
  //         dispatch(addSubscriptions({ ...sub, serviceId }, navigate));
  //       });
  //     }
  //   },
  // });
  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // Retrieve stored subscriptions from localStorage or API
      const storedSubscriptions =
        JSON.parse(localStorage.getItem("ServiceSubscriptions")) || [];

      // Map subscriptions to ensure correct IDs (_id) are sent
      const updatedSubscriptions = values.subscriptions.map((sub) => {
        // Find corresponding subscription in storedSubscriptions
        const correspondingSub = storedSubscriptions.find(
          (storedSub) => storedSub.title === sub.title // Match by unique identifier, e.g., title
        );

        // Replace id with _id if found
        return correspondingSub
          ? { ...sub, id: correspondingSub._id || sub.id } // Fallback to original id if _id isn't present
          : sub;
      });

      // Prevent duplicate IDs by filtering out repeated subscriptions
      const uniqueSubscriptions = updatedSubscriptions.filter(
        (sub, index, self) => index === self.findIndex((s) => s.id === sub.id)
      );

      if (id || storedSubscriptions.length > 0) {
        // Update subscriptions
        uniqueSubscriptions.forEach((sub) => {
          console.log("Updating Subscription:", sub);
          dispatch(editSubscriptions(sub.id, { ...sub }, navigate, serviceId));
        });
      } else {
        // Add subscriptions
        uniqueSubscriptions.forEach((sub) => {
          console.log("Adding Subscription:", sub);
          dispatch(addSubscriptions({ ...sub, serviceId }, navigate));
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleSubscription(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && subscriptionData) {
      formik.setFieldValue("subscriptions", [subscriptionData]);
    }
  }, [id, subscriptionData, formik]);

  const handleAddSubscription = () => {
    const newSubscription = {
      title: "",
      description: "",
      amount: 0,
      type: "",
      duration: "",
    };
    formik.setFieldValue("subscriptions", [
      ...formik.values.subscriptions,
      newSubscription,
    ]);
  };

  const removeSubscription = (index) => {
    if (formik.values.subscriptions.length > 1) {
      const updatedSubscriptions = formik.values.subscriptions.filter(
        (_, i) => i !== index
      );
      formik.setFieldValue("subscriptions", updatedSubscriptions);
    }
  };
  useEffect(() => {
    // Check if stepDetails exist in localStorage

    if (storedServiceSubscriptions.length > 0) {
      // Map the stored steps to formik field values
      const mappedSteps = storedServiceSubscriptions.map((step) => ({
        title: step.title || "",
        description: step.description || "",
        amount: step.amount || 0,
        type: step.type || "",
        duration: step.duration || "",
      }));

      // Set the mapped steps to formik values
      formik.setFieldValue("subscriptions", mappedSteps);
    }
  }, [id]);
  const modules = useMemo(
    () => ({
      toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
    }),
    []
  );

  return (
    <div className="relative mt-4">
      {id && isFetching ? (
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {formik.values.subscriptions.map((sub, index) => (
            <div
              key={index}
              className="w-[50%] flex flex-col gap-6 mb-8 border p-4 relative"
            >
              {index !== 0 && (
                <CrossButton
                  type="button"
                  className="mb-2"
                  outline
                  onClick={() => removeSubscription(index)}
                >
                  Remove
                </CrossButton>
              )}
              <Input
                label={`Subscription Title ${index + 1}`}
                size="sm"
                placeholder="Add Title"
                value={formik.values.subscriptions[index]?.title || ""}
                onChange={(e) =>
                  formik.setFieldValue(
                    `subscriptions[${index}].title`,
                    e.target.value
                  )
                }
                name={`subscriptions[${index}].title`}
                maxLength={100}
                error={
                  formik.touched.subscriptions?.[index]?.title &&
                  formik.errors.subscriptions?.[index]?.title
                }
              />
              <label className="mb-2 font-medium">
                Description {index + 1}
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Write something awesome..."
                value={formik.values.subscriptions[index]?.description || ""}
                onChange={(value) =>
                  formik.setFieldValue(
                    `subscriptions[${index}].description`,
                    value
                  )
                }
                modules={modules}
              />
              <Input
                label="Amount"
                size="sm"
                placeholder="Add Amount"
                value={formik.values.subscriptions[index]?.amount || ""}
                onChange={(e) =>
                  formik.setFieldValue(
                    `subscriptions[${index}].amount`,
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  validateNumber(e);
                }}
                name={`subscriptions[${index}].amount`}
                maxLength={5}
              />
              {/* <Input
                label="Type"
                size="sm"
                placeholder="Add Type"
                value={formik.values.subscriptions[index]?.type || ""}
                onChange={(e) =>
                  formik.setFieldValue(`subscriptions[${index}].type`, e.target.value)
                }
                name={`subscriptions[${index}].type`}
              /> */}
              <label
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Type
              </label>
              <select
                className="px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500"
                name="type"
                value={formik.values.subscriptions[index]?.type || ""}
                onChange={(e) =>
                  formik.setFieldValue(
                    `subscriptions[${index}].type`,
                    e.target.value
                  )
                }
                // onBlur={handleBlur}
                onFocus={() => (touched.type = true)}
              >
                <option value="" disabled>
                  Select a Type
                </option>
                <option value="Basic">Basic</option>
                <option value="Agency">Agency</option>
                <option value="Enterprise">Enterprise</option>
              </select>

              {/* error={
                  formik.touched.subscriptions?.[index]?.type &&
                  formik.errors.subscriptions?.[index]?.type
                } */}
              {/* <Input
                label="Duration"
                size="sm"
                placeholder="Add Duration"
                value={formik.values.subscriptions[index]?.duration || ""}
                onChange={(e) =>
                  formik.setFieldValue(`subscriptions[${index}].duration`, e.target.value)
                }
                name={`subscriptions[${index}].duration`}
              /> */}
              <div>
                <label
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Duration
                </label>
                <select
                  className="px-3 py-2 rounded-lg border border-gray-500 bg-transparent text-gray-500"
                  name="duration"
                  // value={values.duration}
                  // onChange={handleChange}
                  value={formik.values.subscriptions[index]?.duration || ""}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `subscriptions[${index}].duration`,
                      e.target.value
                    )
                  }
                  // onBlur={handleBlur}
                  onFocus={() => (touched.type = true)}
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  <option value="1">Monthly</option>
                  <option value="3">Quarterly</option>
                  <option value="6">Half-Yearly</option>
                  <option value="12">Yearly</option>
                  <option value="24">Two Years</option>
                  <option value="60">Five Years</option>
                </select>
              </div>
            </div>
          ))}
          <div className="flex gap-6">
            <Button type="button" primary onClick={handleAddSubscription}>
              Add Another Subscription
            </Button>
            <Button type="submit" primary>
              {id ? "Update Subscription" : "Create Subscriptions"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddSubscriptions;
