"use client";

import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
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
  const [faStatus, setFaStatus] = useState("جدید");
  const getFaStatus = (status) => {
    switch (status) {
      case "new":
        return "جدید";
        break;
      case "open":
        return "باز";
        break;
      case "pending":
        return "در انتظار";
        break;
      case "resolved":
        return "پاسخ داده شده";
        break;
      case "closed":
        return "بسته شده";
        break;
      default:
        return "جدید";
        break;
    }
  };
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
        {tickets.length > 0 && (
          <table className="w-full">
            <thead className="text-center">
              <tr className="border-b-2 border-pal1-500 pb-5">
                <th className="w-1/12 pb-4">#</th>
                <th className="w-5/12 pb-4">موضوع</th>
                <th className="w-2/12 pb-4">وضعیت</th>
                <th className="w-3/12 pb-4">تاریخ</th>
                <th className="w-1/12 pb-4">عملیات</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tickets.map((item, index) => (
                <tr
                  key={index}
                  className="align-middle border-b-2 border-pal1-200"
                >
                  <td>{convertToPersianDigits(index + 1)}</td>
                  <td>
                    <span className="line-clamp-1 py-3.5">{item.subject}</span>
                  </td>
                  <td
                    className={`py-1 ${
                      item.status === "new"
                        ? "text-blue-500"
                        : item.status === "pending"
                        ? "text-yellow-500"
                        : item.status === "open"
                        ? "text-green-500"
                        : item.status === "resolved"
                        ? "text-green-700"
                        : item.status === "closed"
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {getFaStatus(item.status)}
                  </td>
                  <td className="text-slate-600">
                    {convertToPersianDate(item.createdAt, "jDD  jMMMM  jYYYY")}
                  </td>
                  <td>
                    <Link href={`/user/tickets/${item._id}`} className="px-2 py-1">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-2xl text-blue-500"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default TicketList;
