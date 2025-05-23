'use client'
import { useMobileMenu } from "@/context/mobileMenuContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { id: 1, title: "خانه", path: "/" },
  { id: 2, title: "فروشگاه", path: "/shop" },
  { id: 3, title: "وبلاگ", path: "/blog" },
  { id: 4, title: "درباره ما", path: "/about-us" },
  { id: 5, title: "تماس با ما", path: "/contact-us" },
];

const MobileMenu = () => {
  const { isOpen, closeMenu } = useMobileMenu();
  return (
    <>
      <section className={`${isOpen ? "visible" : "invisible"} w-full h-full bg-black/50 fixed top-0 right-0 z-50 lg:hidden transition-all duration-300`}>
        <div className={`${isOpen ? "translate-x-0" : "translate-x-full"} bg-white w-3/4 sm:w-5/6 md:w-1/3 h-full py-6 relative transition-all duration-300`}>
          <section className="flex justify-center">
            <Link href="/">
              <div className=" flex items-center">
                <Image
                  src={"/logo/logo.png"}
                  alt="Logo"
                  width={60}
                  height={60}
                />
                <h1 className="text-pal1-600 pb-1.5">موبویکو</h1>
              </div>
            </Link>
          </section>
          <section className="mt-8">
            <ul className="flex flex-col items-start gap-4 text-lg">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="text-slate-700 hover:text-pal1-600 px-3 pb-2 w-full border-b-2 border-black/5 hover:-translate-x-2 cursor-pointer transition-all duration-150"
                >
                  <Link href={item.path}>
                    <span className="before:absolute before:scale-x-0 group-hover:before:scale-x-150 before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:w-14 before:h-0.5 before:bg-pal1-300 before:transition-all before:duration-150 transition-all duration-150">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <FontAwesomeIcon onClick={closeMenu} icon={faXmark} className="absolute top-2.5 left-2.5 text-2xl p-2 text-red-500 cursor-pointer  "/>
        </div>
      </section>
    </>
  );
};

export default MobileMenu;
