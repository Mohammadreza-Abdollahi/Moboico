"use client";
import { useUserData } from "@/context/userDataContext";
import Image from "next/image";

const AdminProfile = () => {
  const { userData } = useUserData();
  return (
    <>
      <section className="py-1 px-3">
        <div className="mx-auto text-center flex flex-col justify-center items-center gap-1.5">
          <Image
            className="border-2 border-pal1-400 rounded-full max-w-20 shadow-lg"
            src={"/structuralImages/user.png"}
            alt="User_Avatar"
            width={120}
            height={120}
          />
          <div className="flex justify-center items-center gap-2 md:-translate-x-full group-hover:translate-x-0 transition duration-150">
            <span className="bg-pal3-500 px-3 py-.5 rounded text-white text-sm">
              {userData?.role === "creator"
                ? "سازنده"
                : userData?.role === "admin"
                ? "ادمین"
                : "کاربر"}
            </span>
            <span className="mt-1 text-lg text-slate-800 ">
              {userData?.username}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfile;
