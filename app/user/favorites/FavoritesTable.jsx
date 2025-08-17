"use client";
import { useUserData } from "@/context/userDataContext";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const handleGetFavorites = async (userId) => {
  const res = await fetch(`/api/products/favorites?userId=${userId}`);
  const data = await res.json();
  return data;
};
const handleDeleteFavorites = async (userId, productId) => {
  const res = await fetch(`/api/products/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, productId }),
  });
  const data = await res.json();
  console.log(data);
};
const FavoritesTable = () => {
  const { userData } = useUserData();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (!userData?._id) return;

    const fetchData = async () => {
      const data = await handleGetFavorites(userData._id);
      setFavorites(data.favorites);
    };

    fetchData();
  }, [userData]);
  const handleDeleteItem = (userId, productId) => {
    setFavorites((prev) => prev.filter((item) => item._id !== productId));
    handleDeleteFavorites(userId, productId);
  };
  return (
    <>
      <table className="w-full">
        <thead className="text-center">
          <tr className="border-b-2 border-pal1-500 pb-5">
            <th className="w-1/12 pb-4">#</th>
            <th className="w-3/12 pb-4">تصویر محصول</th>
            <th className="w-7/12 pb-4">نام محصول</th>
            <th className="w-1/12 pb-4">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-center text-lg">
          {favorites.map((item) => (
            <tr
              key={item.id}
              className="align-middle border-b-2 border-pal1-200"
            >
              <td>{convertToPersianDigits(item.id)}</td>
              <td>
                <Image
                  className="w-60"
                  src={item.img}
                  alt={item.alt_Img}
                  width={260}
                  height={260}
                />
              </td>
              <td>
                <Link
                  href={`products/${item._id}`}
                  className="hover:text-pal1-600"
                >
                  <span className="line-clamp-1">{item.title}</span>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteItem(userData._id, item._id)}
                  className="text-red-500 hover:text-red-800 text-xl transition-all duration-150"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FavoritesTable;
