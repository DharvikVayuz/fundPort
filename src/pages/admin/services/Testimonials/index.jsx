import React, { useMemo } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "../../../../components/inputs";
import { Button } from "../../../../components/buttons";

const MAX_EDITOR_LENGTH = 500;

const ServiceTestimonials = () => {
  const initialValues = {
    authorName: "",
    authorDescription:
      "",
    authorImage:
      "",
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Add your form submission logic here, e.g., API call
    },
  });

  ReactQuill.Quill.register('modules/maxlength', function (quill, options) {
    quill.on('text-change', function () {
      const textLength = quill.getText().trim().length;
      if (textLength > options.maxLength) {
        quill.deleteText(options.maxLength, textLength - options.maxLength);
      }
    });
  });

  const modules = useMemo(() => ({
    toolbar: {
      container: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    },
    maxlength: { maxLength: MAX_EDITOR_LENGTH }, // Custom maxlength module
  }), []);
  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">ServiceTestimonials Form</h2> */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Author Name"
            name="authorName"
            placeholder="Enter author name"
            value={formik.values.authorName}
            onChange={formik.handleChange}
            error={formik.touched.authorName && formik.errors.authorName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Author Description</label>
          <ReactQuill
            theme="snow"
            value={formik.values.authorDescription}
            onChange={(value) => formik.setFieldValue("authorDescription", value)}
            modules={modules}
            className="bg-white rounded-lg border"
            placeholder="Enter author description"
          />
        </div>
        <div>
          {/* <Input
            label="Service ID"
            name="serviceId"
            placeholder="Enter service ID"
            value={formik.values.serviceId}
            onChange={formik.handleChange}
            error={formik.touched.serviceId && formik.errors.serviceId}
          /> */}
        </div>
        <div>
          {/* <label className="block text-sm font-medium mb-2">Author Image</label>
          <img
            src={formik.values.authorImage}
            alt="Author"
            className="w-32 h-32 object-cover rounded-md mb-4"
          /> */}
          {/* <Input
            label="Image URL"
            name="authorImage"
            placeholder="Enter image URL"
            value={formik.values.authorImage}
            onChange={formik.handleChange}
            error={formik.touched.authorImage && formik.errors.authorImage}
          /> */}
        </div>
        <div>
          <Button type="submit" primary>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceTestimonials;
