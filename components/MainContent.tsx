import Image from "next/image";
import Counter from "./Counter";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getPriceBreakdown } from "../utils/utils";
import { InfinitySpin } from "react-loader-spinner";

const MainContent: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNext = async () => {
    setIsLoading(true);
    await axios.post("/api/setCookie", { quantity });
    router.push({
      pathname: "/checkout-information",
    });
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center py-20">
      <p></p>
      <div>
        <Image
          src="/poster1.jpg"
          width={650}
          height={650}
          loading="eager"
          alt="React Developer Roadmap Image"
          priority
        />
        <div className="flex flex-col items-center pt-3">
          <p className="font-extralight">24&quot; x 36&quot; Poster</p>
          <div className="flex justify-center mt-5">
            <Counter count={quantity} setCount={setQuantity} />
            <button
              onClick={handleNext}
              className="w-56 px-3 ml-5 transition bg-green-500 rounded hover:bg-green-600 hover:text-slate-100 active:bg-green-700 "
            >
              <p className="animate-pulse">{`$${getPriceBreakdown(
                quantity
              ).subTotal.toFixed(2)} - Buy Now`}</p>
            </button>
          </div>
          {isLoading && (
            <div className="absolute flex justify-center top-2/4 left-2/4">
              <InfinitySpin width="200" color="#4fa94d" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
