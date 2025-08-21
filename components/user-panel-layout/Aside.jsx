"use client";
import Profile from "@/app/user/Profile";
import { useMobileAside } from "@/context/mobileUserAsideContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const UserMenu = [
  { id: 1, title: "مرور کلی", path: "/user" },
  { id: 2, title: "اطلاعات کاربر", path: "/user/bio" },
  { id: 3, title: "سفارش ها", path: "/user/orders" },
  { id: 4, title: "ادرس ها", path: "/user/addresses" },
  { id: 5, title: "موردعلاقه ها", path: "/user/favorites" },
  { id: 6, title: "تیکت ها", path: "/user/tickets" },
];
const UserPanelAside = () => {
  const { isOpen, closeMenu } = useMobileAside();
  const path = usePathname();
  useEffect(() => {
    closeMenu();
  }, []);
  return (
    <>
      <aside
        className={`fixed top-0 right-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:right-0 md:translate-x-0 w-10/12 md:w-3/12 h-screen z-20 md:z-10 px-3 py-5 bg-back-gray border-l-2 border-pal1-400 shadow-2xl transition-all duration-300`}
      >
        <Profile />
        <hr className="text-pal1-400 my-2.5 mb-3" />
        <section className="px-3">
          <ul>
            {UserMenu.map((item) => (
              <Link href={item.path} key={item.id}>
                <li className={`${path === item.path && "bg-pal1-400 text-white"} text-lg my-2.5 px-3 py-2.5 text-slate-800 hover:bg-slate-200 hover:text-slate-800 rounded`}>{item.title}</li>
              </Link>
            ))}
          </ul>
        </section>
        <button className="md:hidden absolute top-1 left-1.5 cursor-pointer">
          <FontAwesomeIcon
            onClick={closeMenu}
            icon={faXmark}
            className="text-2xl p-2 text-red-500"
          />
        </button>
      </aside>
    </>
  );
};

export default UserPanelAside;
