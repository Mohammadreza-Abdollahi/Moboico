"use client";

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
  useEffect(() => {
    const handleGetProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };
    handleGetProducts();
  }, []);
  return (
    <>
      <h1>اینجا پنل ادمین است</h1>
      <h1>اینجا محصولات است</h1>
      {products.map((item, index) => (
        <h1 key={index}>{item.title}</h1>
      ))}
    </>
  );
};

export default AdminProducts;
