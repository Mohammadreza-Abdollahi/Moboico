"use client";
import ProductGallerySlider from "@/components/sliders/ProductGallerySlider";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    handleGetProduct();
  }, []);
  const handleGetProduct = async () => {
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();
    setProduct(data.product);
    console.log(data.product);
  };
  const imageSrc =
    product?.img?.length > 0 ? product.img[0] : "/structuralImages/def.jpg";
  return (
    <>
      <section className="container mx-auto mt-5 flex gap-6">
        <section className="w-2/3 border border-gray-300 shadow-xl rounded">
          <div className="flex">
            <div className="w-1/2">
              <ProductGallerySlider />
            </div>

            <div className="w-1/2 py-3 px-2">
              <h1>{product?.name}</h1>
            </div>
          </div>

          <div className="mt-5">3</div>
        </section>
        <aside className="w-1/3 relative">
          <div className="sticky top-24">
            <div className="border border-gray-300 shadow-xl rounded h-96 w-full">
              استیکی من
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default ProductPage;
