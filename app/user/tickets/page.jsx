"use client";

import Link from "next/link";
import { useEffect } from "react";
import TicketList from "./TicketList";

const Orders = () => {
  useEffect(() => {}, []);
  return (
    <>
      <section className="pt-3">
        <section className="relative mb-6 px-2 py-8 mt-10 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
            تیکت ها
          </span>
          <Link
            href={"/user/tickets/new"}
            className="absolute text-lg top-0 left-5 -translate-y-1/2 bg-pal1-400 hover:bg-pal1-600 rounded px-5 py-0.5 text-white transition-all duration-150"
          >
            بازکردن تیکت جدید
          </Link>
          <section className="w-full">
            <TicketList/>
          </section>
        </section>
      </section>
    </>
  );
};

export default Orders;
