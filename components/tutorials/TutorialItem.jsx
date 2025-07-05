import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import Image from "next/image";
import Link from "next/link";

const TutorialItem = ({
  id = 1,
  title = "",
  img = "",
  altImg = "",
  teacher = "",
  duration = "",
  content = "",
  createdAt = "",
}) => {
  return (
    <>
      <section className="relative w-80 group bg-back-gray border border-pal1-400 hover:shadow-lg hover:shadow-pal3-600/30 hover:border hover:border-pal3-600 rounded overflow-hidden transition duration-150">
        <Link href={`tutorials/${id}`} className="line-clamp-2">
          <div className="h-52">
            <Image
              className="w-full h-full"
              src={img || "/structuralImages/default-img.jpg"}
              alt={altImg}
              width={180}
              height={220}
            />
          </div>
        </Link>
        <div className="h-16 px-2.5 pt-2.5 text-justify group-hover:text-pal4-800 transition-all duration-150">
          <Link href={`tutorials/${id}`} className="line-clamp-2">
            {title}
          </Link>
        </div>
        <div className="h-10 px-2.5 pb-2.5 text-slate-800 transition-all duration-150">
            مدرس : {teacher}
        </div>
        <div className="flex justify-between px-2.5 pt-2 pb-2 text-sm border-t text-slate-600 border-pal1-400 group-hover:border-pal4-600 transition-all duration-150">
          <Link href={`tutorials/${id}`} className="line-clamp-2">
            {convertToPersianDate(createdAt,"jDD  jMMMM  jYYYY")}
          </Link>
          <span>
            {convertToPersianDigits(duration)}
          </span>
        </div>
      </section>
    </>
  );
};

export default TutorialItem;
