import Image from "next/image";
import Counter from "./Counter";
import { useState } from "react";
import { useRouter } from "next/router";

const MainContent: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const router = useRouter();

  const handleNext = () => {
    router.push("/checkout-information");
  };
  return (
    <div className="h-[86vh] py-2 flex justify-center items-center">
      <div>
        <div className="flex justify-center min-h-full">
          <Image
            src={"/poster1.jpg"}
            className="h-full"
            width={350}
            height={350}
            loading={"eager"}
            alt="React Developer Roadmap Image"
          />
        </div>
        <div className="flex justify-center my-3">
          <Counter count={count} setCount={setCount} />
          <button
            onClick={handleNext}
            className="w-56 px-3 ml-5 transition bg-green-500 rounded hover:bg-green-600 hover:text-slate-100 active:bg-green-700 "
          >
            <p className="animate-pulse">{`$${(count * 18.99).toFixed(
              2
            )} - Buy Now`}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
