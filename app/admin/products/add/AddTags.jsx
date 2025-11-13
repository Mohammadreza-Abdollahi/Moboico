"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AddTags = ({ tags, setTags }) => {
  const [tagsInp, setTagsInp] = useState("");
  const AddToTags = (tagName = "") => {
    const editedName = tagName.trim();
    if (editedName === "") {
      return;
    } else {
      const newTags = [...tags, tagName];
      setTags(newTags);
      setTagsInp("");
    }
  };
  const removeFromTags = (index) => {
    setTags(tags.filter((item, i) => i !== index));
  };
  return (
    <>
      <section className="relative w-full">
        <div>
          <label
            className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
            htmlFor={"tags"}
          >
            تگ های محصول
          </label>
          <div className="flex">
            <input
              className="w-full flex-4/5 text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded-r outline-none transition-all duration-150"
              type={"text"}
              name={"tags"}
              id={"tags"}
              placeholder={"لطفا تگ های محصول خود را وارد کنید..."}
              onChange={(e) => setTagsInp(e.target.value)}
              value={tagsInp}
            />
            <button
              onClick={() => AddToTags(tagsInp)}
              className="flex-1/5 w-full text-white py-2.5 px-2 border-2 bg-pal1-400 hover:bg-pal4-600 hover:border-pal4-600 border-pal1-400 focus:border-pal4-600 cursor-pointer rounded-l outline-none transition-all duration-150"
            >
              افزودن تگ
            </button>
          </div>
          <div className="w-full">
            {tags.map((item, index) => (
              <div
                key={index}
                className="inline-block my-2 mx-1 px-3 py-1.5 bg-pal1 rounded-full"
              >
                <FontAwesomeIcon
                  onClick={() => removeFromTags(index)}
                  icon={faXmark}
                  className="text-red-500 text-base me-2.5 inline-block align-middle cursor-pointer"
                />
                <span className="inline-block">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTags;
