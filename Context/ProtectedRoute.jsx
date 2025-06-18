"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) return router.push("/Auth/Sign_in");
    const userRole = user?.publicMetadata?.role;
    if (!allowedRoles.includes(userRole)) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);
  
  if (!isLoaded || !isSignedIn) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
