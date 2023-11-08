import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { IUser } from "./types";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    try {
      if (request.nextauth.token) {
        const fetchUserData = await fetch(
          "http://129.150.50.164:3000" +
            "/api/users?id=" +
            request.nextauth.token.id
        );

        const userData: IUser = await fetchUserData.json();

        if (userData) {
          if (userData.role) {
            if (
              request.nextUrl.pathname.startsWith("/teacher") &&
              userData.role !== "teacher"
            ) {
              return NextResponse.rewrite(new URL("/denied", request.url));
            }
            if (
              request.nextUrl.pathname.startsWith("/dashboard") &&
              userData.role !== "student"
            ) {
              return NextResponse.rewrite(new URL("/denied", request.url));
            }
            if (
              request.nextUrl.pathname.startsWith("/superadmin") &&
              userData.role !== "superadmin"
            ) {
              return NextResponse.rewrite(new URL("/denied", request.url));
            }
          } else {
            return NextResponse.next();
          }
        } else {
          return NextResponse.next();
        }
      }
    } catch {
      throw Error("Cann't Get User Information from database");
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/superadmin", "/teacher", "/dashboard"] };
