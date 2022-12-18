import Image from "next/image";
import Counter from "./Counter";
import Button from "next/button";

const MainContent = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className=" bg-red-400 w-[380px]  aspect-[24/36] ">
          <Image
            src={"/../public/poster1.jpg"}
            className="w-full h-full"
            width={0}
            height={0}
            alt="React Developer Roadmap Image"
          />
        </div>
        <div className="flex justify-center my-3">
          <Counter />
          <button className="transition rounded bg-green-500 px-3 ml-5 w-56 hover:bg-green-600 active:bg-green-700 ">
            <p className="animate-pulse">Buy Now</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
