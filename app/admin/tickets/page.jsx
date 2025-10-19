"use client";

import { useEffect, useState } from "react";

const getTickets = async () => {
  const res = await fetch("/api/admin/tickets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const handleGetTickets = async () => {
      const data = await getTickets();
      setTickets(data.tickets);
    };
    handleGetTickets();
  }, []);
  return (
    <>
      <h1>اینجا پنل ادمین است</h1>
      <h1>اینجا تیکت ها است</h1>
      {tickets.map((item, index) => (
        <h1 key={index}>{item.subject}</h1>
      ))}
    </>
  );
};

export default AdminTickets;
