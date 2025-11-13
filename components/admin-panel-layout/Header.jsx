"use client";
import { useMobileAside } from "@/context/mobileUserAsideContext";
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faEllipsisV,
  faGear,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPanelHeader = () => {
  const path = usePathname();
  const { toggleMenu } = useMobileAside();
  const [pageName, setPageName] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    redirect("/");
  };
  const handleChangePageName = (path = "") => {
    const pathName = path.slice(6);
    console.log(pathName);
    switch (pathName) {
      case "/":
        return "داشبورد";
        break;
      case "/users":
        return "کاربران";
        break;
      case "/products":
        return "محصولات";
        break;
      case "/articles":
        return "مقالات";
        break;
      case "/tickets":
        return "تیکت ها";
        break;
      default:
        return "داشبورد";
        break;
    }
  };
  useEffect(() => {
    setPageName(handleChangePageName(path));
  }, [path]);
  return (
    <>
      <header className="fixed top-0 md:right-1/12 z-3 mr-auto w-full md:w-11/12 px-5 py-5 bg-back-gray border-b-2 border-pal1-400 shadow-xl">
        <div className="flex justify-between items-center">
          <section className="md:hidden">
            <button onClick={toggleMenu}>
              <FontAwesomeIcon
                className="md:hidden text-2xl text-slate-800 hover:text-yellow-500 transition-all duration-150"
                icon={faBars}
              />
            </button>
          </section>
          <section className="flex justify-center md:justify-start">
            <span className="text-lg md:text-3xl text-slate-800">
              <b>پنل ادمین | {pageName}</b>
            </span>
          </section>
          <section>
            <div className="md:hidden relative">
              <span
                className="p-3"
                onClick={() => setDropdown((prev) => !prev)}
              >
                <FontAwesomeIcon
                  className="text-2xl text-slate-800 hover:text-yellow-500"
                  icon={faEllipsisV}
                />
              </span>
              <div
                className={`absolute top-8 left-0 py-1 ${
                  dropdown
                    ? "translate-y-0 opacity-100"
                    : "translate-y-32 opacity-0"
                } w-36 bg-white border border-pal1-400 rounded transition-all duration-75`}
              >
                <ul>
                  <li className="px-3 py-1.5 my-1 hover:bg-pal1 group">
                    <Link href="/" className="flex items-center gap-2">
                      <FontAwesomeIcon
                        className="text-lg text-slate-800 group-hover:text-yellow-500 transition-all duration-150"
                        icon={faGear}
                      />
                      تنظیمات
                    </Link>
                  </li>
                  <li className="px-3 py-1.5 my-1 hover:bg-pal1 group">
                    <Link href="/" className="flex items-center gap-2">
                      <FontAwesomeIcon
                        className="text-lg text-slate-800 group-hover:text-yellow-500 transition-all duration-150"
                        icon={faBell}
                      />
                      پیام ها
                    </Link>
                  </li>
                  <li className="px-3 py-1.5 my-1 hover:bg-pal1 group">
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2"
                    >
                      <FontAwesomeIcon
                        className="text-lg text-slate-800 group-hover:text-yellow-500 transition-all duration-150"
                        icon={faArrowRightFromBracket}
                      />
                      خروج
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="mx-2 px-2">
                <Link href="/user">
                  <FontAwesomeIcon
                    className="text-2xl text-slate-800 hover:text-yellow-500 transition-all duration-150"
                    icon={faHome}
                  />
                </Link>
              </div>
              <div className="mx-2 px-2">
                <Link href="/">
                  <FontAwesomeIcon
                    className="text-2xl text-slate-800 hover:text-yellow-500 transition-all duration-150"
                    icon={faGear}
                  />
                </Link>
              </div>
              <div className="mx-2 px-2">
                <Link href="/">
                  <FontAwesomeIcon
                    className="text-2xl text-slate-800 hover:text-yellow-500 transition-all duration-150"
                    icon={faBell}
                  />
                </Link>
              </div>
              <div className="mx-2 px-2" onClick={handleLogout}>
                <Link href="/">
                  <FontAwesomeIcon
                    className="text-2xl text-slate-800 hover:text-yellow-500 transition-all duration-150"
                    icon={faArrowRightFromBracket}
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </header>
    </>
  );
};

export default AdminPanelHeader;
