import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProductsSlider from "./ProductsSlider";

const Products = () => {
  return (
    <>
      <section className="py-22 px-2">
        <div className="container mx-auto bg-pal1-400 px-2 lg:px-8 py-8 rounded-xl shadow-lg">
          <section className="flex items-center justify-center">
            <div className="flex-6/12 md:flex-4/12 lg:flex-2/12 text-center px-2 text-base lg:text-xl text-white">
              <span className="">جدیدترین محصولات</span>
            </div>
            <hr className="flex-2/12 md:flex-8/12 lg:flex-9/12 text-center text-white" />
            <div className="flex-5/12 md:flex-3/12 lg:flex-2/12 text-center text-sm mx-2">
              <button className="px-3 py-1.5 rounded-full bg-pal1-500 text-white text-center hover:bg-pal1-600 group transition-all duration-150">
                <Link href="/products">
                  {" "}
                  همه محصولات
                  <FontAwesomeIcon icon={faAngleLeft} className="mx-1 group-hover:-translate-x-1 transition-all duration-150" />
                </Link>
              </button>
            </div>
          </section>
          <section className="mt-10">
            <ProductsSlider/>
          </section>
        </div>
      </section>
    </>
  );
};

export default Products;
