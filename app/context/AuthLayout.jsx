"use client";
import { AuthContext } from "./auth-context";
import { useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { handleGetCookie } from "./auth-handler";

const AuthLayout = ({ children, route = "/" }) => {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const pathname = usePathname();

  const ch = useCallback(async () => {
    const cookieToken = await handleGetCookie();
    if (!cookieToken) {
      router.replace(
        pathname === "/signin" || pathname === "/signup" ? pathname : "/signin"
      );
      setTimeout(() => {
        setLoadingPage(false);
      }, 2000);
    } else {
      router.push(route);
      setTimeout(() => {
        setLoadingPage(false);
      }, 2000);
    }
  }, [router, pathname, route]);

  useEffect(() => {
    ch();
  }, [state, ch]);

  return (
    <>
      {loadingPage ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-50 flex items-center justify-center">
          <p className="text-[3rem] text-black/70 uppercase">Loading....</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthLayout;
