import { useRouter } from "next/router";

const CheckoutForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("here");
  };

  const handleBack = () => {
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
        <div className="mb-2 flex justify-between">
          <input placeholder="First Name" className="mr-1 flex-1" />
          <input placeholder="Last Name" className="ml-1 flex-1" />
        </div>
        <input placeholder="Address" className="mb-2" />
        <input placeholder="Address, suite, etc. (optional)" className="mb-2" />
        <input placeholder="City" className="mb-2 border" />
        <div className="flex">
          <select className="mr-1 flex-1">
            <option key={1} value={1}>
              test
            </option>
            <option key={1} value={1}>
              test
            </option>
          </select>
          <select className="mx-1 flex-1">
            <option key={1} value={1}>
              test
            </option>
            <option key={1} value={1}>
              test
            </option>
          </select>
          <input placeholder="ZIP Code" className="ml-1 flex-1" />
        </div>
      </label>
      <label className="flex flex-col mb-4">
        Special Notes:
        <input placeholder="Notes (optional)" />
      </label>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="hover:bg-slate-300 transition px-3 py-2 rounded"
        >
          Back
        </button>
        <button className="bg-green-300 px-3 py-2 rounded" type="submit">
          Continue to Shipping
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
