import AddressesList from "./AddressesList";
import Link from "next/link";

const Orders = () => {
  return (
    <>
      <section className="pt-3">
        <section className="relative mb-6 px-2 py-8 mt-10 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
            آدرس ها
          </span>
          <Link
            href={"/user/addresses/new"}
            className="absolute text-lg top-0 left-5 -translate-y-1/2 bg-pal1-400 hover:bg-pal1-600 rounded px-5 py-0.5 text-white transition-all duration-150"
          >
            افزودن ادرس جدید
          </Link>
          <AddressesList />
        </section>
      </section>
    </>
  );
};

export default Orders;
