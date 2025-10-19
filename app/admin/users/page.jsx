"use client";

import ConfirmModal from "@/utilities/ConfirmModal";
import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

const getUsers = async () => {
  const res = await fetch("/api/admin/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const handleDeleteUser = async (addressId) => {
  const res = await fetch(`/api/admin/users/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [itemId, setItemId] = useState();
  const [isOpen, setIsOpen] = useState();
  const handleDeleteItem = (userId) => {
    setUsers((prev) => prev.filter((item) => item._id !== userId));
    handleDeleteUser(userId);
  };
  useEffect(() => {
    const handleGetUsers = async () => {
      const data = await getUsers();
      setUsers(data.users);
      console.log(data);
    };
    handleGetUsers();
  }, []);
  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleDeleteItem(itemId)}
        icon="trash"
        title="حذف"
        description="آیا از حذف این مورد اطمینان دارید؟"
      />
      <table className="w-full">
        <thead className="text-center">
          <tr className="border-b-2 border-pal1-500 pb-5">
            <th className="w-1/12 pb-4">#</th>
            <th className="w-2/12 pb-4">نام کاربری</th>
            <th className="w-3/12 pb-4">شماره همراه</th>
            <th className="w-1/12 pb-4">نقش</th>
            <th className="w-2/12 pb-4">تاریخ عضویت</th>
            <th className="w-1/12 pb-4">وضعیت</th>
            <th className="w-1/12 pb-4">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-center text-lg border-2 border-pal1-400">
          {users.map((item, index) => (
            <tr
              key={item.id}
              className="align-middle text-base border border-pal1-200 even:bg-pal1/60 hover:bg-pal1-200/50 transition-all duration-75"
            >
              <td className="py-3">{convertToPersianDigits(index + 1)}</td>
              <td className="py-3">{item.username}</td>
              <td className="py-3">{convertToPersianDigits(item.phone)}</td>
              <td className="py-3">
                {item.role === "creator"
                  ? "سازنده"
                  : item.role === "admin"
                  ? "ادمین"
                  : "کاربر"}
              </td>
              <td className="py-3">
                {convertToPersianDate(item.createdAt, "14jYY/jMM/jDD")}
              </td>
              <td
                className={`${item.isActive ? "bg-green-200" : "bg-red-200"}`}
              >
                {item.isActive ? "فعال" : "غیرفعال"}
              </td>
              <td>
                <Link href={`/admin/users/${item._id}/info`}>
                  <FontAwesomeIcon
                    icon={faEye}
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
                  onClick={() => {
                    setIsOpen(true);
                    setItemId(item._id);
                  }}
                  icon={faTrash}
                  className="text-xl text-red-500 mx-1.5 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsers;
