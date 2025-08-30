import FavoritesTable from "./FavoritesTable";

const Orders = () => {
  return (
    <>
      <section className="py-3">
        <section className="relative mb-6 px-2 py-8 mt-10 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
            موردعلاقه ها
          </span>
          <FavoritesTable />
        </section>
      </section>
    </>
  );
};

export default Orders;
