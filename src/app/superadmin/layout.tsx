import { LucideUser } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Error from "@/components/Error";
import LogOut from "@/components/LogOut";
import Link from "next/link";

const SuperAdminLayout: FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const adminInfo = await getServerSession(authOptions);

  if (!adminInfo) {
    return (
      <Error
        title="Cann't Fetch User Information"
        description="We are really sorry to, but the website is having trouble fetchinh your information from databse. Contact admin"
      />
    );
  }

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex gap-4 border items-center px-2 py-1 rounded-lg">
            <LucideUser size={20} />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {adminInfo.user.name}
              </p>
              <p className="text-[12px] text-gray-500 text-muted-foreground">
                {adminInfo.user.email}
              </p>
            </div>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/examples/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Customers
            </Link>
            <Link
              href="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/examples/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default SuperAdminLayout;
