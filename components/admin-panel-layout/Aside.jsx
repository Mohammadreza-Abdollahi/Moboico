"use client";
import AdminProfile from "@/app/admin/Profile";
import { useMobileAside } from "@/context/mobileUserAsideContext";
import {
  faBoxesStacked,
  faClipboardCheck,
  faEnvelope,
  faGaugeHigh,
  faNewspaper,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const adminMenu = [
  { id: 1, title: "داشبورد", path: "/admin", icon: faGaugeHigh },
  { id: 2, title: "کاربران", path: "/admin/users", icon: faUser },
  { id: 3, title: "محصولات", path: "/admin/products", icon: faBoxesStacked },
  { id: 4, title: "سفارشات", path: "/admin/orders", icon: faClipboardCheck },
  { id: 5, title: "مقالات", path: "/admin/articles", icon: faNewspaper },
  { id: 6, title: "تیکت ها", path: "/admin/tickets", icon: faEnvelope },
];
const AdminPanelAside = () => {
  const { isOpen, closeMenu } = useMobileAside();
  const path = usePathname();
  useEffect(() => {
    closeMenu();
  }, []);
  return (
    <>
      <aside
        className={`md:hidden fixed top-0 right-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:right-0 md:translate-x-0 w-10/12 md:w-3/12 h-screen z-20 md:z-10 px-3 py-5 bg-back-gray border-l-2 border-pal1-400 shadow-2xl transition-all duration-300`}
      >
        <AdminProfile />
        <hr className="text-pal1-400 my-2.5 mb-3" />
        <section className="px-3">
          <ul>
            {adminMenu.map((item) => (
              <Link href={item.path} key={item.id}>
                <li
                  className={`${
                    path === item.path && "bg-pal1-400 text-white"
                  } flex justify-start items-center gap-3 text-lg my-2.5 px-3 py-2.5 text-slate-800 hover:bg-slate-200 hover:text-slate-800 rounded`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-2xl text-pal1-500 group-hover:right-8 transition-all duration-300  ${
                      path === item.path && "text-white"
                    }`}
                  />
                  <span>{item.title}</span>
                </li>
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
      <aside
        className={`hidden overflow-hidden group md:block fixed top-0 right-0 translate-x-0 md:right-0 md:translate-x-0 w-10/12 md:w-2/12 lg:w-1/12 md:hover:w-5/12 lg:hover:w-3/12 h-screen z-20 md:z-10 px-3 py-5 bg-back-gray border-l-2 border-pal1-400 shadow-2xl transition-all duration-300`}
      >
        <AdminProfile />
        <hr className="text-pal1-400 my-2.5 mb-3" />
        <section className="px-3">
          <ul>
            {adminMenu.map((item) => (
              <Link href={item.path} key={item.id}>
                <li
                  className={`${
                    path === item.path ? "bg-pal1-400" : "bg-slate-200"
                  } relative flex group-hover:justify-start items-center gap-3 text-lg my-1 px-4 py-3 group-hover:pr-14 text-slate-800 hover:bg-slate-300 hover:text-slate-800 rounded`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-2xl text-pal1-500 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 group-hover:right-8 transition-all duration-300  ${
                      path === item.path && "text-white"
                    }`}
                  />
                  <span className="text-slate-800 -translate-x-full line-clamp-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                    {item.title}
                  </span>
                </li>
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

export default AdminPanelAside;
