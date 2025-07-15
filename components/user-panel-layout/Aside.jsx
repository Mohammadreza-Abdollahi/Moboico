"use client";
import Profile from "@/app/user/Profile";
import { useMobileAside } from "@/context/mobileUserAsideContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const UserPanelAside = () => {
  const { isOpen, closeMenu } = useMobileAside();
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
        <Profile/>
        <hr className="text-pal1-400 my-2.5"/>
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
