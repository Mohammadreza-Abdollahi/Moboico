"use client";

import { useEffect, useState } from "react";

const handleGetTickets = async () => {
  const res = await fetch(`/api/tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetTickets();
        setTickets(data.tickets);
      } catch (error) {
        console.error("خطا در دریافت آدرس‌ها:", error);
        setTickets([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section>
        {tickets.length === 0 && (
          <h1 className="text-center bg-red-100 text-red-900 py-3 rounded">
            شما هیج تیکتی باز نکردید!
          </h1>
        )}
        {
          tickets.map((item)=>(
            <h1>{item.subject}</h1>
          ))
        }
      </section>
    </>
  );
};

export default TicketList;
