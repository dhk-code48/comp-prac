import { LucideUser, LucideUser2, User } from "lucide-react";
import React, { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserProfile: FC = () => {
  return (
    <div className="justify-between items-center cursor-pointer flex border gap-5 px-5 hover:bg-gray-100 py-1 rounded-lg">
      <div className="w-[30px] flex justify-center items-center h-[30px] bg-gray-300 rounded-full">
        <LucideUser2 size={20} />
      </div>
      <div>
        <p className="font-bold">Darshan Dhakal</p>
        <p className="text-sm text-muted-foreground">Teacher</p>
      </div>
    </div>
  );
};

export default UserProfile;
