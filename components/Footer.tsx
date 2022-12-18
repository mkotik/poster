import logo from "./github-mark-white.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-gray-700 w-full h-14 flex justify-start items-center p-5">
      <Image src={logo} alt="github logo" className="w-5" />
      <Link
        target="_blank"
        href="https://github.com/mkotik"
        className="text-gray-light ml-2 text-gray-100"
      >
        github.com/mkotik
      </Link>
    </div>
  );
};

export default Footer;
