"use client";
import React, { FC } from "react";
import UserProfile from "./UserProfile";
import { LayoutDashboard, LogOut } from "lucide-react";
import PraticalCollapse from "./PraticalCollapse";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";
import { workSheets } from "@/lib/api";
import { signOut } from "next-auth/react";

const Sidebar: FC<{ workSheets: workSheets }> = ({ workSheets }) => {
  return (
    <>
      <div className="z-10 flex flex-col justify-between bg-card w-[350px] border-r h-screen fixed left-0 top-0 p-4">
        <div className=" space-y-10">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Gandaki Boarding School Logo"
              width={512}
              height={512}
              className="w-20"
            />
            <div>
              <h1 className="text-lg font-extrabold text-slate-700">
                Gandaki Boarding School
              </h1>
              <h4 className="font-bold text-slate-500">Computer Department</h4>
            </div>
          </div>
          <div className="hover:bg-gray-300 py-3 flex text-gray-700 font-semibold items-center gap-5 px-5 cursor-pointer rounded-xl">
            <LayoutDashboard />
            <p className="">Darshboard</p>
          </div>
          <h4 className="text-sm font-semibold tracking-wide text-gray-500">
            WorkSheets
          </h4>
          <div className="space-y-5">
            <PraticalCollapse />
            <PraticalCollapse />
            <PraticalCollapse />
            <PraticalCollapse />
          </div>
        </div>
        <div
          onClick={() => signOut()}
          className="flex justify-between items-center hover:bg-gray-200 cursor-pointer py-2 px-5 rounded-lg"
        >
          <p>LogOut</p>
          <LogOut />
        </div>
      </div>
      <div className="h-16 bg-card border-b pl-[400px] pr-[50px] items-center flex justify-between">
        <Breadcrumbs />
        <UserProfile />
      </div>
    </>
  );
};

export default Sidebar;
