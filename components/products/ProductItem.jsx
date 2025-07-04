import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({
  id = 1,
  img = "/products/laptop.png",
  alt = "",
  title = "",
  price = 0,
  discount = 0,
  count = 0,
}) => {
  return (
    <>
      <section className="relative w-80 group bg-back-gray border border-pal1-400 hover:shadow-lg hover:shadow-pal3-600/30 hover:border hover:border-pal3-600 rounded overflow-hidden transition duration-150">
        <Link href={`products/${id}`} className="line-clamp-2">
          <div
            className={`relative w-full px-5 py-3 overflow-hidden bg-white ${
              count === 0 ? "grayscale-100" : ""
            }`}
          >
            <Image
              className="w-full h-full"
              src={img}
              alt={alt}
              width={180}
              height={220}
            />
            {count === 0 && (
              <span className="absolute text-center top-1/2 right-1/2 w-2/3 -translate-y-1/2 translate-x-1/2 border border-black/30 text-black bg-white/80 shadow-lg py-2 rounded-md">
                ناموجود
              </span>
            )}
          </div>
        </Link>
        <div className="h-16 px-2.5 pt-2 pb-4 text-justify group-hover:text-pal4-800 transition-all duration-150">
          <Link href={`products/${id}`} className="line-clamp-2">
            {title}
          </Link>
        </div>
        <div className="h-10 flex flex-row-reverse border-t border-pal1-300 group-hover:border-pal3-600 justify-between items-center md:flex-col md:items-end md:justify-start lg:flex-row-reverse lg:justify-between lg:items-center px-6 mt-3 text-end transition-all duration-150">
          <span className="text-slate-700">
            {count !== 0
              ? (price * ((100 - discount) / 100)).toLocaleString("fa")
              : price.toLocaleString("fa")}{" "}
            تومان
          </span>
          {count === 0 ? (
            ""
          ) : discount !== 0 ? (
            <span className="line-through text-sm text-slate-500">
              {price.toLocaleString("fa")} تومان
            </span>
          ) : (
            ""
          )}
        </div>
        <div
          className={`text-start text-xs px-3 pb-2 text-red-600 ${
            count === 0 ? "invisible" : count < 5 ? "visible" : "invisible"
          }`}
        >
          <span>فقط {convertToPersianDigits(count)} عدد باقی مانده</span>
        </div>
        {count === 0 ? (
          ""
        ) : discount !== 0 ? (
          <span className="absolute top-1 right-1 w-12 h-12 flex justify-center items-center text-lg bg-pal3-700 text-white px-3 py-1 rounded-full">
            {discount.toLocaleString("fa")}%
          </span>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default ProductItem;
