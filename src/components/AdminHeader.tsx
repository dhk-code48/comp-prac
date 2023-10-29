import React, { FC } from "react";
import UserProfile from "./UserProfile";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const AdminHeader: FC = () => {
  return (
    <div className="border-b py-3 flex justify-between items-center">
      <UserProfile />
      <div className="flex gap-2">
        <Input placeholder="Search All WorkSheets...." />
        <Button variant="outline">
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
