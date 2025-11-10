"use client";

import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import {
  faEdit,
  faNewspaper,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const getCategories = async () => {
  const res = await fetch("/api/admin/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const handleGetCategories = async () => {
      const data = await getCategories();
      console.log(data);
      setCategories(data.categories);
    };
    handleGetCategories();
  }, []);
  return (
    <>
      <section>
        <div className="w-full flex justify-end mb-3">
          <Link className="align-middle" href={"/admin/products/add"}>
            <button className="bg-pal1-400 text-white px-8 py-1 hover:bg-pal3-600 rounded-sm text-lg transition-all duration-150">
              افزودن <FontAwesomeIcon className="align-middle" icon={faPlus} />
            </button>
          </Link>
        </div>
        <table className="w-full">
          <thead className="text-center">
            <tr className="border-b-2 border-pal1-500 pb-5">
              <th className="w-1/12 pb-4">#</th>
              <th className="w-3/12 pb-4">عنوان دسته</th>
              <th className="w-3/12 pb-4">تگ دسته</th>
              <th className="w-2/12 pb-4">دسته والد</th>
              <th className="w-1/12 pb-4">وضعیت</th>
              <th className="w-2/12 pb-4">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-center text-lg border-2 border-pal1-400">
            {categories.map((item, index) => (
              <tr
                key={index}
                className="align-middle text-base border border-pal1-200 even:bg-pal1/60 hover:bg-pal1-200/50 transition-all duration-75"
              >
                <td className="py-3">{convertToPersianDigits(index + 1)}</td>
                <td className="py-3">{item.name}</td>
                <td className="py-3">{item.slug}</td>
                <td className="py-3">
                  {item.parent === null ? "ندارد" : item.parent}
                </td>
                <td
                  className={`py-3 ${
                    item.isActive ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {item.isActive ? "فعال" : "غیرفعال"}
                </td>
                <td>
                  <Link href={`/admin/users/${item._id}/edit`}>
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      className="text-xl text-blue-500 mx-1.5"
                    />
                  </Link>
                  <Link href={`/admin/users/${item._id}/edit`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-xl text-yellow-500 mx-1.5"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-xl text-red-500 mx-1.5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AdminCategories;
