import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/buttons";
import { Input } from "../../../../../components/inputs";

const Businessdetails = ({ control, errors }) => {
  return (
    <>
      <div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mb-4 ">
          <div>
            <Controller
              name={`businessName`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Business Name`}
                  placeholder={`Business Name`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={`legalBusinessName`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Legal Business Name`}
                  placeholder={`Legal Business Name`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={`businessType/Structure`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Business Type/Structure`}
                  placeholder={`Business Type/Structure`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={`businessIndustry`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Business Industry`}
                  placeholder={`Business Industry`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={`dateofBusinessFormation`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Date of Business Formation`}
                  placeholder={`Date of Business Formation`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={`Business Registration Number`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Business Registration Number`}
                  placeholder={`Business Registration Number`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name={` Business Description`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Business Description`}
                  placeholder={` Business Description`}
                  errorContent={errors.businessType?.message}
                  required={true}
                />
              )}
            />
          </div>
        </div>
        <Button className="w-[25%] py-2" primary={true}>
          Next{" "}
        </Button>
      </div>
    </>
  );
};

export default Businessdetails;
