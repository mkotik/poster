import { useRouter } from "next/router";
import { useState } from "react";
import states from "../utils/states";
import axios from "axios";
import { FormData } from "../types";
import { InfinitySpin } from "react-loader-spinner";

type CheckoutFormProps = {
  className?: string;
  quantity: number;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ className, quantity }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    specialNotes: "",
    country: "",
    state: "",
  });

  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.post("/api/setCookie", {
      ...formData,
      quantity,
    });
    setIsLoading(false);
    router.push("/checkout-payment");
  };

  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  return (
    <>
      <div className="flex justify-center">
        {isLoading && <InfinitySpin width="200" color="#4fa94d" />}
      </div>
      <form onSubmit={handleSubmit} className={className}>
        <label className="flex flex-col mb-4">
          Contact Information
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </label>
        <label className="flex flex-col mb-4">
          Shipping Address
          <div className="flex justify-between mb-2">
            <input
              placeholder="First Name"
              className="flex-1 mr-1"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              placeholder="Last Name"
              className="flex-1 ml-1"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <input
            placeholder="Address"
            className="mb-2"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
          />
          <input
            placeholder="Address, suite, etc. (optional)"
            className="mb-2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
          <input
            placeholder="City"
            className="mb-2 border"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <div className="flex">
            <select
              className="flex-1 mr-1"
              onChange={handleChange}
              name="country"
              value={formData.country}
            >
              <option value="" disabled>
                -- Country --
              </option>
              <option key={1} value="US">
                United States
              </option>
            </select>
            <select
              className="flex-1 mx-1"
              onChange={handleChange}
              name="state"
              value={formData.state}
            >
              <option value="" disabled>
                -- State --
              </option>
              {states.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
            <input
              placeholder="ZIP Code"
              className="flex-1 ml-1"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
          <input
            placeholder="Phone Number (optional)"
            className="mt-2 mb-2"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col mb-4">
          Special Notes:
          <input
            placeholder="Notes (optional)"
            name="specialNotes"
            value={formData.specialNotes}
            onChange={handleChange}
          />
        </label>

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
