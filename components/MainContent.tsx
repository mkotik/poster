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
    <div className="flex justify-center items-center">
      <div>
        <div className="w-[380px]  aspect-[24/36] ">
          <Image
            src={"/../public/poster1.jpg"}
            className="w-full h-full"
            width={0}
            height={0}
            alt="React Developer Roadmap Image"
          />
        </div>
        <div className="flex justify-center my-3">
          <Counter count={count} setCount={setCount} />
          <button
            onClick={handleNext}
            className="transition rounded bg-green-500 px-3 ml-5 w-56 hover:bg-green-600 hover:text-slate-100 active:bg-green-700 "
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
