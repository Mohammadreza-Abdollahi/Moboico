import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import Image from "next/image";
import Link from "next/link";

const ProductSliderItem = ({
  id = 1,
  img = "",
  alt = "",
  title = "",
  price = 0,
  discount = 0,
  count = 0,
}) => {
  return (
    <>
      <section
        className={`relative z-10 bg-white rounded overflow-hidden group`}
      >
        <div
          className={`relative w-full px-5 py-3 overflow-hidden ${
            count === 0 ? "grayscale-100" : ""
          }`}
        >
          <Image
            src={`${img}`}
            alt={alt}
            width={380}
            height={420}
            className="group-hover:scale-110 transition-all duration-150"
          />
          {count === 0 && (
            <span className="absolute top-1/2 right-1/2 w-2/3 -translate-y-1/2 translate-x-1/2 border border-black/30 text-black bg-white/80 shadow-lg py-2 rounded-md">
              ناموجود
            </span>
          )}
        </div>
        <div className="h-20 px-3 my-2 pb-4 border-b border-pal1-400/50">
          <Link href={`/products/${id}`}>
            <span className="text-start md:text-sm lg:text-base text-slate-800 line-clamp-2">
              {title}
            </span>
          </Link>
        </div>
        <div className="h-10 flex flex-row-reverse justify-between items-center md:flex-col md:items-end md:justify-start lg:flex-row-reverse lg:justify-between lg:items-center px-6 mt-3 text-end">
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
          className={`text-start text-xs px-3 py-3 text-red-600 ${
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

export default ProductSliderItem;
