import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import Image from "next/image";
import Link from "next/link";

const ArticleSliderItem = ({
  id = 1,
  img = "",
  alt = "",
  title = "",
  createdAt = ""
}) => {
  return (
    <>
      <section
        className={`relative z-10 bg-gradient-to-br border-b-2 border-pal3-700 rounded overflow-hidden group shadow-2xl`}
      >
        <div className={`w-full h-72 overflow-hidden rounded`}>
          <Image
            src={img}
            alt={alt}
            width={380}
            height={420}
            className="transition-all duration-150 w-full h-full group-hover:grayscale-100"
          />
        </div>
        <div className="absolute group-hover:top-0 top-full h-full w-full z-30 px-4 py-3 rounded flex justify-center items-center bg-gradient-to-t from-black/90 to-black/70 transition-all duration-300">
          <Link href={`/blog/${id}`}>
            <span className="text-justify md:text-sm lg:text-base text-white line-clamp-7">
              {title}
            </span>
          </Link>
        </div>
        <div className="absolute group-hover:-right-full top-3 right-0 py-1 px-5 rounded-l-full text-pal3-700 text-sm bg-white transition-all duration-500">
          {convertToPersianDate(createdAt,"jDD  jMMMM  jYYYY")}
        </div>
      </section>
    </>
  );
};

export default ArticleSliderItem;
