import Image from "next/image";

const ProductSliderItem = ({
  img = "",
  alt = "",
  title = "",
  price = 0,
  discount = 0,
}) => {
  return (
    <>
      <section className="relative z-10 bg-white rounded overflow-hidden group">
        <div className="w-full px-5 py-3 overflow-hidden">
          <Image src={img} alt={alt} width={380} height={420} className="group-hover:scale-110 transition-all duration-150"/>
        </div>
        <div className="h-20 px-3 my-2 pb-4 border-b border-pal1-400/50">
          <span className="text-start md:text-sm lg:text-base text-slate-800 line-clamp-2">
            {title}
          </span>
        </div>
        <div className="flex flex-row-reverse justify-between items-center md:flex-col md:items-end md:justify-start lg:flex-row-reverse lg:justify-between lg:items-center px-6 my-3 text-end">
          <span className="text-slate-700">
            {(price * ((100 - discount) / 100)).toLocaleString("fa")} تومان
          </span>
          {discount !== 0 && (
            <span className="line-through text-sm text-slate-500">
              {price.toLocaleString("fa")} تومان
            </span>
          )}
        </div>
        <span className="absolute top-1 right-1 w-12 h-12 flex justify-center items-center text-lg bg-pal3-700 text-white px-3 py-1 rounded-full">
          {discount.toLocaleString("fa")}%
        </span>
      </section>
    </>
  );
};

export default ProductSliderItem;
