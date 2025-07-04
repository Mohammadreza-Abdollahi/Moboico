import Link from "next/link";
import ArticlesSlider from "./ArticlesSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Articles = ({articles}) => {
  return (
    <>
      <section className="container mx-auto mb-10 mt-12 md:mt-10 lg:mt-24">
        <section className="flex items-center justify-center mx-auto mb-4 md:mb-10">
          <div className="flex-6/12 md:flex-4/12 lg:flex-2/12 text-center px-2 text-base lg:text-xl text-pal3-700">
            <span className="">آخرین مقالات</span>
          </div>
          <hr className="flex-2/12 md:flex-8/12 lg:flex-9/12 text-center text-pal3-700" />
          <div className="flex-5/12 md:flex-3/12 lg:flex-2/12 text-center text-sm mx-2">
            <button className="px-3 py-1.5 rounded-full bg-pal3-600 text-white text-center hover:bg-pal3-700 group transition-all duration-150">
              <Link href="/blog">
                {" "}
                همه مقالات
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="mx-1 group-hover:-translate-x-1 transition-all duration-150"
                />
              </Link>
            </button>
          </div>
        </section>
        <div className="px-3">
          <ArticlesSlider articles={articles}/>
        </div>
      </section>
    </>
  );
};

export default Articles;
