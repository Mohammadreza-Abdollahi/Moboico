import { convertToPerisan } from "@/utilities/moment";
import Image from "next/image";
import Link from "next/link";

const ArticleItem = ({
  id = 0,
  src = "",
  alt = "",
  title = "",
  text = "",
  date = "",
}) => {
  return (
    <>
      <article
        className="w-80 group bg-white hover:shadow-lg hover:shadow-pal1-400/20 rounded overflow-hidden transition duration-150"
        key={id}
      >
        <div className="h-52">
          <Image
            className="w-full h-full"
            src={src}
            alt={alt}
            width={180}
            height={220}
          />
        </div>
        <div className="h-20 px-2.5 pt-2 pb-4 text-justify group-hover:text-pal1-600 transition-all duration-150">
          <Link href={`blog/${id}`} className="line-clamp-2">
            {title}
          </Link>
        </div>
        <div className="border-t text-sm text-slate-600 border-pal1-300 px-2.5 pt-3 pb-5 text-justify">
          <p className="line-clamp-5">{text}</p>
        </div>
        <div className="border-t text-sm text-slate-600 border-pal1-300 px-2.5 py-3">
          {convertToPerisan(date)}
        </div>
      </article>
    </>
  );
};

export default ArticleItem;
