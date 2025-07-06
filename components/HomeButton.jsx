'use client'

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const HomeButton = ({ text = "خانه" }) => {
  const navigation = useRouter();
  return (
    <>
      <div onClick={() => navigation.push("/")} className="bg-transparent cursor-pointer flex justify-center items-center hover:bg-back-gray px-5 rounded-full">
        <FontAwesomeIcon icon={faAngleRight} className="ml-2"/>
        {text}
      </div>
    </>
  );
};

export default HomeButton;
