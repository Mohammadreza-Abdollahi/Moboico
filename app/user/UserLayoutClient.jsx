"use client";

import { useEffect } from "react";
import { useUserData } from "@/context/userDataContext";

export default function UserLayoutClient({ children }) {
  const { setUserData } = useUserData();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
            setUserData(data.user);
        } else {
          console.log("خطا در گرفتن اطلاعات کاربر:", data.error);
        }
      } catch (error) {
        console.log("خطای ارتباط:", error);
      }
    };

    getUser();
  }, []);

  return <>{children}</>;
}
