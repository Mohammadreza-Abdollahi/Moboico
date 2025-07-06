"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Password = ({ formParams }) => {
  const [hide, setHide] = useState(true);
  return (
    <>
      <section className="relative w-full group">
        <label
          className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
          htmlFor={formParams.id}
        >
          {formParams.label || "عنوان پیشفرص"}
        </label>
        <input
          className="w-full text-slate-800 py-2.5 pl-12 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
          type={hide ? "password" : "text"}
          name={formParams.name}
          id={formParams.id}
          placeholder={formParams.placeholder || ""}
        />
        <div
          onClick={() => setHide((prev) => !prev)}
          className="absolute top-1/2 pt-1 left-7 -translate-y-1/2 -translate-x-1/2 text-pal1-400 group-focus-within:text-pal4-600 text-xl transition-all duration-150"
        >
          <FontAwesomeIcon icon={!hide ? faEyeSlash : faEye} />
        </div>
      </section>
    </>
  );
};

export default Password;
