import Image from "next/image";
import Counter from "./Counter";
import { useState } from "react";
import { useRouter } from "next/router";

const MainContent: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: "/checkout-information",
      query: { count },
    });
  };
  return (
    <div className="flex items-center justify-center py-20">
      <div>
        <div className="flex justify-center min-h-full">
          <Image
            src={"/poster1.jpg"}
            className="h-full"
            width={650}
            height={650}
            loading={"eager"}
            alt="React Developer Roadmap Image"
          />
        </div>
        <div className="flex flex-col items-center pt-3">
          <p className="font-extralight">24&quot; x 36&quot; Poster</p>
          <div className="flex justify-center mt-5">
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
    </div>
  );
};

export default MainContent;
