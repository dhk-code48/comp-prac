import { UserAuthForm } from "@/components/UserAuthForm";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  console.log("SESSION = ", session);

  if (session) redirect("/dashboard");

  return (
    <div className="container h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden lg:flex h-full flex-col bg-muted p-10 text-white">
        <div className="z-10 absolute inset-0 bg-zinc-900/50" />
        <Image
          src="/gbs.jpg"
          width={1400}
          height={600}
          alt="GBS SCHOOl"
          className="z-0 absolute top-0 left-0 h-screen object-cover"
        />
        <div className="z-20 flex items-center gap-2">
          <Image
            src="/gbs.png"
            alt="Gandaki Boarding School Logo"
            width={512}
            height={512}
            className="w-20 bg-blend-color-doge"
          />
          <div className="text-white">
            <h1 className="text-lg font-extrabold">Gandaki Boarding School</h1>
            <h4 className="font-bold">Computer Department</h4>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Created By Darshan Dhakal</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login with your credentials
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to access worksheets
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
