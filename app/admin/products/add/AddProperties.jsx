"use client";

import Input from "@/components/forms/inp";
import { useState } from "react";

const AddProperties = ({ properties, setProperties }) => {
  const [propName, setPropName] = useState("");
  const [propValue, setPropValue] = useState("");
  const [propUnit, setPropUnit] = useState("");
  const AddProperty = () => {
    const newProp = {
      name: propName,
      value: propValue,
      unit: propUnit,
    };
    setProperties([...properties, newProp]);
    setPropName("");
    setPropValue("");
    setPropUnit("");
  };
  return (
    <>
      <section className="my-8">
        <div className="w-3/5 gap-1 flex mx-auto text-slate-800 outline-none transition-all duration-150">
          <div className="w-2/5">
            <Input
              title="نام ویژگی"
              placeholder="نام ویژگی"
              onChange={(e) => setPropName(e.target.value)}
              name="prop-name"
              type="text"
              value={propName}
            />
          </div>
          <div className="w-2/5">
            <Input
              title="مقدار ویژگی"
              placeholder="مقدار ویژگی"
              onChange={(e) => setPropValue(e.target.value)}
              name="prop-value"
              type="text"
              value={propValue}
            />
          </div>
          <div className="w-1/5">
            <Input
              title="واحد ویژگی"
              placeholder="واحد ویژگی"
              onChange={(e) => setPropUnit(e.target.value)}
              name="prop-name"
              type="text"
              value={propUnit}
            />
          </div>
        </div>
        <button
          onClick={AddProperty}
          className="block w-3/5 mx-auto py-2.5 my-3 text-white bg-pal1-400 hover:bg-pal4-700 rounded transition-all duration-150"
          type="button"
        >
          افزودن ویژگی
        </button>
        <div className="w-2/3 mx-auto py-2.5 my-3">
          {properties.length > 0 ? (
            properties.map((item, index) => (
              <div
                className="w-3/5 mx-auto my-3 border border-pal1-400"
                key={index}
              >
                <div className="inline-block text-center bg-pal1 w-1/3 py-2">
                  {item.name}
                </div>
                <div className="inline-block text-center w-1/3 py-2">
                  {item.value}
                </div>
                {item.unit !== "" && (
                  <div
                    className={`inline-block text-center bg-pal1 w-1/3 py-2`}
                  >
                    {item.unit}
                  </div>
                )}
              </div>
            ))
          ) : (
            <span className="block text-red-900 bg-red-100 text-center py-2">
              هیچ ویژگی ثبت نشده!
            </span>
          )}
        </div>
      </section>
    </>
  );
};

export default AddProperties;
