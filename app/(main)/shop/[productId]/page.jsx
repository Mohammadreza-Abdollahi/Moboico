"use client";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const { productId } = useParams();
  console.log(productId);
  return (
    <>
      <section>
        <h1>این قسمت برای محصولات تکی است</h1>
      </section>
    </>
  );
};

export default ProductPage;
