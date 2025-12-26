import Loading from "@/components/loading";
import ProductItem from "./ProductItem";
import Pagination from "@/components/Pagination";

export const dynamic = "force-dynamic";

const getProducts = async (page) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?page=${page}&limit=3`,
    { cache: "no-store" }
  );
  return res.json();
};

const ShopPage = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const data = await getProducts(page);

  return (
    <section className="pt-8 pb-0">
      <section className="container mx-auto">
        <section className="flex flex-wrap gap-5 mt-10">
          {data.products.length ? (
            data.products.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                img={item.img[0]}
                title={item.name}
                price={item.price}
                discount={item.discount}
                stock={item.stock}
              />
            ))
          ) : (
            <Loading />
          )}
        </section>
      </section>
      <section className="text-center mt-20">
        <Pagination
          page={page}
          totalPages={data.pagination.totalPages}
          basePath="/shop"
        />
      </section>
    </section>
  );
};

export default ShopPage;
