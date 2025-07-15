"use client";
import { useUserData } from "@/context/userDataContext";
import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import Image from "next/image";

const Profile = () => {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <>
      <section className="py-5 px-3">
        <div className="mx-auto text-center flex flex-col justify-center items-center gap-1.5">
          <Image
            className="border-2 border-pal1-400 rounded-full w-1/4 shadow-lg"
            src={"/structuralImages/user.png"}
            alt="User_Avatar"
            width={120}
            height={120}
          />
          <div className="flex justify-center items-center gap-2">
            <span className="bg-pal3-500 px-3 py-.5 rounded text-white text-sm">
              {userData?.role === "creator"
                ? "سازنده"
                : userData?.role === "admin"
                ? "ادمین"
                : "کاربر"}
            </span>
            <span className="mt-1 text-lg text-slate-800">
              {userData?.username}
            </span>
          </div>
          <button
            onClick={(e) => navigator.clipboard.writeText(userData?.id)}
            className="w-2/3 py-2 px-6 mt-2 rounded shadow bg-pal1-400 text-white hover:bg-pal1-600 transition-all duration-150 cursor-pointer"
          >
            کپی شناسه کاربری
          </button>
          <div className="mt-3">
            <span className="text-slate-700">
              {" "}
              تاریخ ورود :{" "}
              {convertToPersianDate(
                useUserData?.createdAt,
                "jDD  jMMMM  jYYYY"
              )}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
