"use client";

import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SelectAddress = ({ setProvince, province, city, setCity }) => {
  const [data, setData] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const getAddressesData = async () => {
      const res = await fetch("/addresses.json");
      const data = await res.json();
      setData(data);
    };
    getAddressesData();
  }, []);
  useEffect(() => {
    setProvinces(Object.keys(data));
  }, [data]);
  useEffect(() => {
    provinces ? setCities(data[province]) : [];
  }, [province]);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
        <section className="relative w-full">
          <label
            className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
            htmlFor="fName"
          >
            استان
          </label>
          <select
            onChange={(e) => setProvince(e.target.value)}
            value={province}
            name="province"
            id="province"
            className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
          >
            <option value=" ">انتخاب نشده</option>
            {provinces.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>
        <section className="relative w-full">
          <label
            className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
            htmlFor="fName"
          >
            شهر
          </label>
          <select
            onChange={(e) => setCity(e.target.value)}
            value={city}
            name="city"
            id="city"
            className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
          >
            <option value=" ">انتخاب نشده</option>
            {cities?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>
      </div>
    </>
  );
};

export default SelectAddress;
