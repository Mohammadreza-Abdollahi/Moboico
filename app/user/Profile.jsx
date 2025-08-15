"use client";
import { useUserData } from "@/context/userDataContext";
import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { userData } = useUserData();
  console.log(userData?._id);
  const userId = userData?._id;
  const fav = async () => {
    const res = await fetch(`/api/products/favorites?userId=${userId}`);
    const data = await res.json();
    console.log(data);
  };
  fav();
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
            className="w-full md:w-2/3 py-2 px-6 mt-2 rounded shadow bg-pal1-400 text-white hover:bg-pal1-600 transition-all duration-150 cursor-pointer"
          >
            کپی شناسه کاربری
          </button>
          <button className="w-full md:w-2/3 flex justify-center items-center py-2 px-6 mt-2 rounded align-middle shadow bg-pal4-500 text-white hover:bg-pal4-700 transition-all duration-150 cursor-pointer">
            <Link href={"/admin"}>
              <FontAwesomeIcon
                icon={faCrown}
                className="text-yellow-300 mx-1.5 text-lg"
              />
              ورود به پنل ادمین
            </Link>
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
