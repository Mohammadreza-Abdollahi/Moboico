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

const getProducts = async () => {
  const res = await fetch("/api/admin/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [fPrice, setFPrice] = useState("");
  useEffect(() => {
    const handleGetProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };
    handleGetProducts();
  }, []);
  return (
    <>
      <section>
        <div className="w-full flex justify-end mb-3">
          <Link className="align-middle" href={"/admin/products/add"}>
            <button className="bg-pal1-400 text-white px-8 py-1 hover:bg-pal3-600 rounded-sm text-lg transition-all duration-150">افزودن <FontAwesomeIcon className="align-middle" icon={faPlus} /></button>
          </Link>
        </div>
        <table className="w-full">
          <thead className="text-center">
            <tr className="border-b-2 border-pal1-500 pb-5">
              <th className="w-1/12 pb-4">#</th>
              <th className="w-1/12 pb-4">تصویر</th>
              <th className="w-4/12 pb-4">نام محصول</th>
              <th className="w-2/12 pb-4">قیمت</th>
              <th className="w-1/12 pb-4">تعداد</th>
              <th className="w-1/12 pb-4">تخفیف</th>
              <th className="w-1/12 pb-4">وضعیت</th>
              <th className="w-1/12 pb-4">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-center text-lg border-2 border-pal1-400">
            {products.map((item, index) => (
              <tr
                key={index}
                className="align-middle text-base border border-pal1-200 even:bg-pal1/60 hover:bg-pal1-200/50 transition-all duration-75"
              >
                <td className="py-3">{convertToPersianDigits(index + 1)}</td>
                <td className="py-3">
                  <Image
                    className="mx-auto"
                    src={`${item.img}`}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                </td>
                <td className="py-3">
                  <span className="line-clamp-1">{item.name}</span>
                </td>
                <td className="py-3">
                  {convertToPersianDigits(item.price, true)}
                </td>
                <td className="py-3">
                  {convertToPersianDigits(item.stock, true)}
                </td>
                <td className="py-3">
                  {item.discount == 0
                    ? "ندارد"
                    : "%" + convertToPersianDigits(item.discount)}
                </td>
                <td>{item.isActive ? "فعال" : "غیرفعال"}</td>
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

export default AdminProducts;
