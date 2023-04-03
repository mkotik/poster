import { useRouter } from "next/router";

const CheckoutForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/checkout-payment");
  };

  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="flex flex-col mb-4">
        Contact Information
        <input placeholder="Email" />
      </label>
      <label className="flex flex-col mb-4">
        Shipping Address
        <div className="flex justify-between mb-2">
          <input placeholder="First Name" className="flex-1 mr-1" />
          <input placeholder="Last Name" className="flex-1 ml-1" />
        </div>
        <input placeholder="Address" className="mb-2" />
        <input placeholder="Address, suite, etc. (optional)" className="mb-2" />
        <input placeholder="City" className="mb-2 border" />
        <div className="flex">
          <select className="flex-1 mr-1">
            <option key={1} value={1}>
              test
            </option>
            <option key={2} value={1}>
              test
            </option>
          </select>
          <select className="flex-1 mx-1">
            <option key={1} value={1}>
              test
            </option>
            <option key={2} value={1}>
              test
            </option>
          </select>
          <input placeholder="ZIP Code" className="flex-1 ml-1" />
        </div>
        <input placeholder="Phone Number (optional)" className="mt-2 mb-2" />
      </label>
      <label className="flex flex-col mb-4">
        Special Notes:
        <input placeholder="Notes (optional)" />
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
  );
};

export default CheckoutForm;
