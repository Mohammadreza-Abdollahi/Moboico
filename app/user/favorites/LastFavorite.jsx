"use client";
import Error from "@/components/Error";
import { useUserData } from "@/context/userDataContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LastFavorite = () => {
  const { userData } = useUserData();
  const [favorites, setFavorites] = useState([]);
  const [lastFavorite, setLastFavorite] = useState({});
  const handleGetFavorites = async (userId) => {
    const res = await fetch(`/api/products/favorites?userId=${userId}`);
    const data = await res.json();
    return data;
  };
  useEffect(() => {
    if (!userData) return;
    const fetchFavorites = async () => {
      const data = await handleGetFavorites(userData._id);
      setFavorites(data.favorites);
    };
    fetchFavorites();
  }, [userData]);
  useEffect(() => {
    const lastItem = favorites.at(-1);
    setLastFavorite(lastItem);
  }, [favorites]);
  return (
    <>
      <div>
        <section className="flex justify-between items-center text-start">
          <div className="flex-2/6">
            <Image
              className="w-34"
              src={lastFavorite?.img || "/structuralImages/default-img.jpg"}
              alt={lastFavorite?.alt_Img || "Alt_Image"}    
              width={240}
              height={220}
            />
          </div>
          <div className="flex-4/6">
            <Link className="hover:text-pal1-600" href={`/products/${5454}`}>{lastFavorite?.title}</Link>
          </div>
        </section>
        {!userData?.favorites?.length > 0 && (
          <Error text="هیچ موردی به موردعلاقه ها اضافه نشده!" type="danger" />
        )}
      </div>
    </>
  );
};

export default LastFavorite;
