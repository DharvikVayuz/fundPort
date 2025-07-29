import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../../../redux/axios-baseurl";
import InputField from "../../../components/dynamicFormFields/InputField";
import RadioField from "../../../components/dynamicFormFields/RadioField";
import DropdownField from "../../../components/dynamicFormFields/DropdownField";
import CheckBoxField from "../../../components/dynamicFormFields/CheckBoxField";
import ParagraphField from "../../../components/dynamicFormFields/ParagraphField";
import FileField from "../../../components/dynamicFormFields/FileField";
import { FormShimmer } from "../../../components/loader/FormShimmer";
import { Button } from "../../../components/buttons/button";
import toast from "react-hot-toast";

import { RouteProgressBar } from "../../../components/progressBar/routeBased";
import { Selector } from "../../../components/select";

function SelectBusiness() {
  const { applicationId, navigationId } = useParams();
  const navigate = useNavigate();

  const [dynamicForm, setDynamicForm] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [allBusiness, setAllBusiness] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  useEffect(() => {
    const fetchDynamicForm = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get(
          "/application/application-purchased-form",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              applicationId: navigationId,
            },
          }
        );
        setDynamicForm(response.data?.data);
        setSelectedBusinessId(
          response.data?.data
            ? response.data?.data[0]?.userapplications[0]?.businessId
            : null
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicForm();
  }, []);

  const handleInputValueChange = (index, newValue) => {
    const field = dynamicForm[index];
    field.value[0] = newValue;

    if (field?.isRequired && field?.value.length <= 0) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  };
  const handleFileValueChange = (index, { fileUrl, filename, fileType }) => {
    const field = dynamicForm[index];
    field.value[0] = fileUrl;
    field.fileName = filename;
    field.type = fileType;

    if (field?.isRequired && field?.value.length <= 0) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  };

  const handleInputValueChangeV2 = (index, newValue, err) => {
    const field = dynamicForm[index];
    field.value[0] = newValue;
    field.error = err;

    if (
      field?.isRequired &&
      (field?.value.length <= 0 || field?.value[0]?.trim() === "")
    ) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  };

  const handleCheckBoxValueChange = (index, newValue) => {
    const field = dynamicForm[index];
    field.value = newValue;

    if (field?.isRequired && field?.value.length <= 0) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  };

  const handleSubmit = async () => {
    if (!selectedBusinessId) {
      toast.error("Please select business");
      return;
    }

    const formData = dynamicForm?.map((field) => {
      const { value } = field;
      return {
        attributeId: field._id,
        value: value,
        fileName: value instanceof File ? value.name : field.fileName,
        type: value instanceof File ? value.type : field.type,
      };
    });

    // console.log("formData", formData);

    try {
      // Simulate API calls for each child
      setIsSaving(true);

      //Auth
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;
      if (!token) {
        return rejectWithValue("No token found");
      }

      //Save FormData API calls
      const savePromises = Object.entries(formData).map(([key, payload]) => {
        // console.log("saved:payload",payload);

        return client.put(`/application/form-value`, payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      });

      await Promise.all(savePromises); // Wait for all API calls to complete

      //Save selected Business API
      client
        .put(
          `/application/application-business`,
          {
            applicationId: navigationId,
            businessId: selectedBusinessId,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          navigate(`/payment/preview/${navigationId}`);
        });
    } catch (error) {
      toast.error("Error while saving form");
      // console.error("Error while saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const getAllBusiness = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get("/business/user-business-card", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedOptions = response.data?.data?.map((business) => ({
          label: business.businessName, // The display text
          value: business._id, // The unique identifier
        }));
        setAllBusiness(formattedOptions);
      } catch (err) {
        // console.log(err, "get business list error");
        setError(err);
      } finally {
      }
    };

    getAllBusiness();
  }, []);

  if (loading) return <FormShimmer className={"m-3"} count={6} />;

  const fieldStyle =
    "my-2 hover:shadow-md   hover:rounded-md hover:border transition-all";

  return (
    <div className="flex flex-col my-4">
      <RouteProgressBar
        currStep={1}
        totalSteps={3}
        steps={[
          { label: "Make the payment" },
          { label: "Fill the form" },
          { label: "Preview" },
        ]}
      />
      <div className="grid grid-cols-1 gap-6 mt-6">
        <div>
          <label className="block font-semibold text-gray-700 pb-1">
            {"Select Business"}
            {true && <span className="text-red-600 ml-1">*</span>}
          </label>
          <Selector
            className={"w-full"}
            label={"Select business"}
            // placeholder={"Select business"}
            // errorContent={errors.registration?.typeOfBusiness?.message}
            options={allBusiness}
            // required={true}
            value={
              allBusiness?.find(
                (business) => business.value === selectedBusinessId
              ) || null
            }
            onChange={(selectedValue) =>
              setSelectedBusinessId(selectedValue.value)
            }
          />
        </div>
        {dynamicForm?.map((field, idx) => {
          switch (field?.inputType) {
            case "short_answer":
              return (
                <InputField
                  key={idx}
                  onChange={handleInputValueChangeV2}
                  index={idx}
                  field={field}
                />
              );
            case "paragraph":
              return (
                <ParagraphField
                  key={idx}
                  onChange={handleInputValueChangeV2}
                  index={idx}
                  field={field}
                />
              );
            case "multiple_choice":
              return (
                <RadioField
                  key={idx}
                  onChange={handleInputValueChange}
                  index={idx}
                  field={field}
                />
              );
            case "dropdown":
              return (
                <DropdownField
                  key={idx}
                  onChange={handleInputValueChange}
                  index={idx}
                  field={field}
                />
              );
            case "checkboxes":
              return (
                <CheckBoxField
                  key={idx}
                  onChange={handleCheckBoxValueChange}
                  index={idx}
                  field={field}
                />
              );
            case "file":
              return (
                <FileField
                  key={idx}
                  onChange={handleFileValueChange}
                  index={idx}
                  field={field}
                />
              );
            default:
              return null;
          }
        })}
      </div>
      <div className=" mt-4 flex justify-end">
        <Button
          type="button"
          primary={true}
          disabled={
            isSaving ||
            dynamicForm?.some(
              (field, idx) =>
                field?.isRequiredMsg ||
                field?.error === true ||
                (field?.isRequired === true && !field?.value[0])
            )
          }
          onClick={handleSubmit}
        >
          {isSaving ? "Saving..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default SelectBusiness;
