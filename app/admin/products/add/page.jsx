"use client";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/inp";
import Select from "@/components/forms/Select";
import Tiptap from "@/components/tiptap/TiptapComponent";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddProperties from "./AddProperties";
import AddTags from "./AddTags";

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
const addProduct = async (product) => {
  const res = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await res.json();
};
const AddProductPage = () => {
  const [title, setTitle] = useState("سلام");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(100);
  const [stock, setStock] = useState(100);
  const [brand, setBrand] = useState("سلام");
  const [isActive, setIsActive] = useState(false);
  const [des, setDes] = useState("سلام");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(["تگ شماره یک"]);
  const [properties, setProperties] = useState([
    {
      name: "طول",
      value: "100",
      unit: "سانتی متر",
    },
  ]);
  const handleAddProduct = async () => {
    const productData = {
      name: title,
      category,
      price: Number(price),
      stock: Number(stock),
      brand,
      isActive,
      description: des,
      tags,
      features: properties,
    };
    console.log(productData);
    const data = await addProduct(productData);
    console.log(data);
  };
  useEffect(() => {
    const handleGetCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories);
    };
    handleGetCategories();
  }, []);
  useEffect(() => {
    console.log(des);
  }, [des]);
  return (
    <>
      <section className="mt-8">
        <div className="w-full flex gap-8 my-3 justify-center md:justify-around items-center">
          <Input
            title="نام محصول"
            placeholder="نام محصول خود را وارد کنید..."
            onChange={(e) => setTitle(e.target.value)}
            name="name"
            value={title}
          />
          <Select
            title="دسته بندی"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data={categories}
          />
        </div>
        <div className="w-full flex gap-8 my-5 justify-center md:justify-around items-center">
          <Input
            title="قیمت محصول"
            placeholder="لطفا قیمت محصول خود را وارد کنید..."
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            type="number"
            value={price}
          />
          <Input
            title="تعداد موجودی"
            placeholder="لطفا موجودی محصول خود را وارد کنید..."
            onChange={(e) => setStock(e.target.value)}
            name="stock"
            type="number"
            value={stock}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 my-5">
          <Input
            title="برند محصول"
            placeholder="لطفا برند محصول خود را وارد کنید..."
            onChange={(e) => setBrand(e.target.value)}
            name="brand"
            type="text"
            value={brand}
          />
          <Checkbox
            title="فعال شدن محصول پس از اضافه شدن"
            name={"isActive"}
            onChange={(e) => setIsActive(!isActive)}
            checked={isActive}
          />
        </div>
        <div className="w-full flex gap-8 my-5 justify-center md:justify-around items-top">
          <AddTags tags={tags} setTags={setTags} />
          <section className="relative w-full">
            <div>
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor={"tags"}
              >
                تصویر های محصول
              </label>
              <div className="flex">
                <input
                  className="w-full flex-4/5 text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded-r outline-none transition-all duration-150"
                  type={"file"}
                  name={"tags"}
                  id={"tags"}
                  placeholder={"لطفا تصویر های محصول خود را وارد کنید..."}
                />
                <button className="flex-1/5 w-full text-white py-2.5 px-2 border-2 bg-pal1-400 hover:bg-pal4-600 hover:border-pal4-600 border-pal1-400 focus:border-pal4-600 cursor-pointer rounded-l outline-none transition-all duration-150">
                  افزودن تصویر
                </button>
              </div>
              <div className="w-full">
                <div className="relative inline-block my-2 px-3 py-3 bg-pal1 rounded">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="absolute top-1 right-1.5 text-red-500 text-base me-2.5 inline-block align-middle cursor-pointer"
                  />
                  <Image
                    className="rounded"
                    src={"/structuralImages/def.jpg"}
                    alt="Image"
                    width={160}
                    height={160}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddProperties properties={properties} setProperties={setProperties} />
        <div>
          <Tiptap value={des} onChange={setDes} />
        </div>
        <button
          onClick={handleAddProduct}
          className="w-full py-2.5 my-3 text-white bg-pal1-400 hover:bg-pal4-700 rounded transition-all duration-150"
        >
          افزودن
        </button>
      </section>
    </>
  );
};

export default AddProductPage;
