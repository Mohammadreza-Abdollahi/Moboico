import Loading from "@/components/loading";
import ProductItem from "@/components/products/ProductItem";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getProducts = async () => {
  const res = await fetch(` ${process.env.SITE_URL}/api/products`, {
    next: { revalidate: 600 },
  });
  return res.json();
};
const ShopPage = async () => {
  const products = (await getProducts()) || [];
  return (
    <>
      <section className="pt-8 pb-20">
        <section className="container mx-auto">
          <section className="flex justify-between items-center">
            <div className="flex-4/12 md:flex-2/12 text-center">
              <span className="md:text-2xl text-slate-800">همه محصولات</span>
            </div>
            <hr className="flex-4/12 md:flex-8/12 text-center text-pal1-400"/>
            <div className="flex-4/12 md:flex-2/12 text-center">
              <select
                name="sorting"
                id="sorting-select"
                className="w-24 text-center md:text-lg text-slate-700 appearance-none focus:outline-2 focus:outline-pal1-400/20 rounded-sm"
              >
                <option value="latest">جدیدترین</option>
                <option value="most-popular">پرفروش ترین</option>
                <option value="most-tidy">مرتب ترین</option>
              </select>
              <FontAwesomeIcon icon={faListUl}/>
            </div>
          </section>
          <section className="flex justify-center items-stretch flex-wrap gap-5 mt-10">
            {products.length !== 0 ? (
              products.map((item) => (
                <ProductItem
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  alt={item.alt}
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  count={item.count}
                  isFavourite={false}
                />
              ))
            ) : (
              <Loading />
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default ShopPage;
