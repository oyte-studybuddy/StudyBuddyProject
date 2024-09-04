"use client";
import { Button } from "./button";

import Link from "next/link";
import { handleRemoveCookie } from "@/app/context/auth-handler";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { state } = useContext(AuthContext);
  const {push} = useRouter()
  return (
    <Button onClick={async () => {
       await handleRemoveCookie()
       push("/signin")
    }}>
      {/* <Link
        href=""
        className="inline-flex h-9 w-max items-center justify-center rounded-md text-white  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        prefetch={false}
      > */}
        Logout
      {/* </Link> */}
    </Button>
  );
};
export default LogoutButton;
