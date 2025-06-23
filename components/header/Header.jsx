"use client";
import { useMobileMenu } from "@/context/mobileMenuContext";
import { menuItems } from "@/mocks/headerData";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { toggleMenu } = useMobileMenu();
  const [searchOpen, setSearchOpen] = useState(false);
  const [fromTop, setFromTop] = useState(0);
  const [fixedTop, setFixedTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setFromTop(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    fromTop > 600 ? setFixedTop(true) : setFixedTop(false);
  });
  return (
    <>
      <nav
        className={`w-full rounded-full md:rounded-none py-3 border-b-2 border-pal1-300 bg-white z-50 transition-all duration-500 ${
          fixedTop
            ? "fixed top-1 md:top-0 left-0 translate-y-0 shadow-md"
            : "fixed top-0 left-0 -translate-y-full pointer-events-none transition-all duration-500"
        }`}
      >
        <section className="lg:mx-auto lg:container lg:flex">
          <section className="hidden md:flex justify-center lg:justify-start lg:items-center lg:flex-1/5">
            <Link href="/">
              {/* <div className=" flex items-center">
                <Image
                  src={"/logo/logo.png"}
                  alt="Logo"
                  width={80}
                  height={80}
                />
                <h1 className="text-pal1-600 pb-1.5 text-xl">موبویکو</h1>
              </div> */}
              <Image
                src={"/logo/moboico.png"}
                alt="Logo"
                width={160}
                height={80}
              />
            </Link>
          </section>
          <section className="hidden lg:block lg:my-auto lg:flex-2/5 lg:items-center">
            <ul className="px-10 flex gap-5 justify-around items-center">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="text-slate-700 text-center hover:text-pal1-600 cursor-pointer relative group"
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
          <section className="px-3 py-1.5 flex lg:flex-2/5 items-center">
            <div
              className="flex-1 lg:hidden text-2xl cursor-pointer"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="text-pal1-600 hover:text-pal4-600 w-12 px-3 py-1 transition-all duration-150"
              />
            </div>
            <div className="flex-1 flex justify-end lg:gap-6 text-2xl">
              <div className="hidden lg:block relative group">
                <FontAwesomeIcon
                  icon={searchOpen ? faXmark : faSearch}
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className="text-pal1-600 hover:text-pal4-600 px-3 py-1 transition-all duration-150 cursor-pointer"
                />
                <section
                  className={`w-80 px-2 mt-5 group absolute -top-1/2 -right-full transition-all duration-150 ${
                    searchOpen
                      ? "translate-x-10/12 opacity-100 visible"
                      : "invisible opacity-0 translate-x-5/12"
                  }`}
                >
                  <div className="group w-full flex border border-black/5 group-focus-within:border-pal1-400 rounded-full overflow-hidden">
                    <input
                      type="text"
                      className="py-1 px-1.5 w-3/4 text-base text-slate-700 focus:outline-none"
                      placeholder="جستجو کنید..."
                      onBlur={() => setSearchOpen(false)}
                    />
                    <button className="py-2 flex w-1/4 bg-pal1-400 hover:bg-pal3-500 items-center justify-center transition-all duration-150">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-xl text-white"
                      />
                    </button>
                  </div>
                </section>
              </div>
              <FontAwesomeIcon
                icon={faUser}
                className="text-pal1-600 hover:text-pal4-600 drop-shadow px-3 py-1 transition-all duration-150"
              />
            </div>
          </section>
        </section>
      </nav>
      <nav className="w-full py-3 border-b-2 border-pal1-300 bg-white z-20">
        <section className="lg:mx-auto lg:container lg:flex">
          <section className="flex justify-center lg:justify-start lg:items-center lg:flex-1/5">
            <Link href="/">
              {/* <div className=" flex items-center">
                <Image
                  src={"/logo/logo.png"}
                  alt="Logo"
                  width={80}
                  height={80}
                />
                <h1 className="text-pal1-600 pb-1.5 text-xl">موبویکو</h1>
              </div> */}
              <Image
                src={"/logo/moboico.png"}
                alt="Logo"
                width={160}
                height={80}
              />
            </Link>
          </section>
          <section className="hidden lg:block lg:my-auto lg:flex-2/5 lg:items-center">
            <ul className="px-10 flex gap-5 justify-around items-center">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="text-slate-700 text-center hover:text-pal1-600 cursor-pointer relative group"
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
          <section className="px-3 py-1.5 flex lg:flex-2/5 items-center">
            <div
              className="flex-1 lg:hidden text-2xl cursor-pointer"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="text-pal1-600 hover:text-pal4-600 w-12 px-3 py-1 transition-all duration-150"
              />
            </div>
            <div className="flex-1 flex justify-end lg:gap-6 text-2xl">
              <div className="hidden lg:block relative group">
                <FontAwesomeIcon
                  icon={searchOpen ? faXmark : faSearch}
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className="text-pal1-600 hover:text-pal4-600 px-3 py-1 transition-all duration-150 cursor-pointer"
                />
                <section
                  className={`w-80 px-2 mt-5 group absolute -top-1/2 -right-full transition-all duration-150 ${
                    searchOpen
                      ? "translate-x-10/12 opacity-100 visible"
                      : "invisible opacity-0 translate-x-5/12"
                  }`}
                >
                  <div className="group w-full flex border border-black/5 group-focus-within:border-pal1-400 rounded-full overflow-hidden">
                    <input
                      type="text"
                      className="py-1 px-1.5 w-3/4 text-base text-slate-700 focus:outline-none"
                      placeholder="جستجو کنید..."
                      onBlur={() => setSearchOpen(false)}
                    />
                    <button className="py-2 flex w-1/4 bg-pal1-400 hover:bg-pal3-500 items-center justify-center transition-all duration-150">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-xl text-white"
                      />
                    </button>
                  </div>
                </section>
              </div>
              <FontAwesomeIcon
                icon={faUser}
                className="text-pal1-600 hover:text-pal4-600 drop-shadow px-3 py-1 transition-all duration-150"
              />
            </div>
          </section>
        </section>
      </nav>
    </>
  );
};

export default Header;
