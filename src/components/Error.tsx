import React, { FC } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Error: FC<{ title: string; button?: boolean; description?: string }> = ({
  title,
  button,
  description,
}) => {
  return (
    <div>
      <Image
        src="/gbs.jpg"
        alt="Gandaki Boarding School"
        className="h-screen w-full object-cover"
        width={1400}
        height={600}
      />

      <div className="bg-black bg-opacity-70 bg-blend-overlay z-20 fixed top-0 left-0 flex flex-col justify-center items-center text-center space-y-5 h-screen w-full text-white lg:px-[25%]">
        <h1 className="text-xl font-black text-red-500 tracking-wide">ERROR</h1>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-400 font-semibold">{description}</p>

        <Link href={"/"} className={buttonVariants({ variant: "destructive" })}>
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
