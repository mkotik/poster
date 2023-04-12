import { useRouter } from "next/router";
import { useState } from "react";
import states from "../utils/states";
import axios from "axios";
import { FormData } from "../types";
import { InfinitySpin } from "react-loader-spinner";
import CheckoutFormSchema from "../checkoutFormValidationSchema";
import * as Yup from "yup";
import TextField from "./TextField";
import SelectField from "./SelectField";

type CheckoutFormProps = {
  className?: string;
  quantity: number;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ className, quantity }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormData>({});
  const [formData, setFormData] = useState<FormData>({});

  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      setErrors({});
      await CheckoutFormSchema.validate(formData, { abortEarly: false });
      setIsLoading(true);
      await axios.post("/api/setCookie", {
        ...formData,
        quantity,
      });
      router.push("/checkout-payment");
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errorMessages = err.inner.reduce(
          (acc: { [key: string]: string }, error) => {
            if (error.path) acc[error.path] = error.message;
            console.log(acc);
            return acc;
          },
          {}
        );
        setErrors(errorMessages);
      }
    }
  };

  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      <div className="flex justify-center">
        {isLoading && <InfinitySpin width="200" color="#4fa94d" />}
      </div>
      <form onSubmit={handleSubmit} className={className}>
        <TextField
          label="Contact Information"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Email"
          name="email"
          className="relative flex flex-col pb-4"
        />
        <label className="flex flex-col ">
          Shipping Address
          <div className="flex justify-between mb-1">
            <TextField
              className="relative flex flex-col flex-1 w-full pb-4 mr-1"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              error={errors.firstName}
            />
            <TextField
              error={errors.lastName}
              className="relative flex flex-col flex-1 w-full pb-4 ml-1"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <TextField
            error={errors.address1}
            className="relative flex flex-col flex-1 w-full pb-4 mb-1"
            onChange={handleChange}
            placeholder="Address"
            name="address1"
            value={formData.address1}
          />
          <TextField
            error={errors.address2}
            className="relative flex flex-col flex-1 w-full pb-4 mb-1"
            placeholder="Address, suite, etc. (optional)"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
          <TextField
            error={errors.city}
            className="relative flex flex-col flex-1 w-full pb-4 mb-1"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <div className="flex">
            <SelectField
              error={errors.country}
              className="relative flex flex-col flex-1 w-full h-12 pb-4 mb-1"
              onChange={handleChange}
              name="country"
              value={formData.country}
              options={[
                { text: "-- Country --", value: "", key: "0", disabled: true },
                { text: "United States", value: "US", key: "1" },
              ]}
            />
            <SelectField
              error={errors.state}
              className="relative flex flex-col flex-1 w-full h-12 pb-4 mx-2 mb-1"
              onChange={handleChange}
              name="state"
              value={formData.state}
              options={states.map((state) => ({
                text: state,
                key: state,
                value: state,
              }))}
            />
            <TextField
              error={errors.zipCode}
              className="relative flex flex-col flex-1 w-full pb-4 mb-1"
              placeholder="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <TextField
            error={errors.phoneNumber}
            className="relative flex flex-col flex-1 w-full pb-4 mb-0"
            placeholder="Phone Number (optional)"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <TextField
          label="Special Notes:"
          error={errors.specialNotes}
          className="relative flex flex-col flex-1 w-full pb-4 mb-2"
          placeholder="Notes (optional)"
          name="specialNotes"
          value={formData.specialNotes}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-3 py-2 transition rounded hover:bg-slate-300"
          >
            Back
          </button>
          <button
            className="px-3 py-2 transition bg-green-300 rounded hover:bg-green-400"
            type="submit"
          >
            Continue to Shipping
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
