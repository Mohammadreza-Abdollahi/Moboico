"use client";

import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import {
  faClock,
  faPaperPlane,
  faRobot,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const TicketPage = () => {
  const params = useParams();
  const [ticket, setTicket] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const messageFormat = /^[A-Za-z0-9\u0600-\u06FF:،]+$/;

  const getFaRole = (role) => {
    switch (role) {
      case "user":
        return "کاربر";
      case "admin":
        return "ادمین";
      case "creator":
        return "سازنده";
      case "system":
        return "سیستم";
      default:
        return "کاربر";
    }
  };

  const getTicket = async () => {
    const res = await fetch(`/api/tickets/${params.ticketId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  };

  const sendMessage = async (msg) => {
    if (msg === " ") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          createdAt: new Date(),
          message: "برای ارسال پیام متنی وارد کنید!",
        },
      ]);
    } else if (!messageFormat.test(msg)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          createdAt: new Date(),
          message:
            "شما تنها میتوانید از حروف و اعداد و کاراکتر های : و ، در پیام خود استفاده کنید",
        },
      ]);
      setNewMessage("");
    } else if (ticket?.status === "closed") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          createdAt: new Date(),
          message: "این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد",
        },
      ]);
      setNewMessage("");
    } else {
      const res = await fetch(`/api/tickets/${params.ticketId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
        }),
        credentials: "include",
      });
      if (res.status === 201) {
        setNewMessage("");
        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            createdAt: new Date(),
            message: msg,
          },
        ]);
      }
      console.log(await res.json());
    }
  };

  useEffect(() => {
    const handleGetTicket = async () => {
      const data = await getTicket();
      setTicket(data.ticket);
      setMessages(data.ticket.messages);
    };
    handleGetTicket();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="h-screen flex justify-center items-center">
      <section className="relative flex flex-col md:h-5/6 md:w-2/3 w-full h-full mx-auto rounded-2xl border-2 border-pal1-400 overflow-hidden">
        <div className="w-full flex justify-between gap-5 bg-pal1-400 px-4 py-5">
          <section className="flex-2/3 truncate">
            <b className="me-2">موضوع تیکت:</b>
            <span className="text-black/80">{ticket?.subject}</span>
          </section>
          <section className="flex-1/3 text-end">
            <b className="me-2">تاریخ ایجاد</b>
            <span className="text-black/80">
              {convertToPersianDate(ticket?.createdAt, " jDD / jMM / jYYYY")}
            </span>
          </section>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {messages?.map((item, index) => (
            <section
              key={index}
              className={`${
                item.sender === "user"
                  ? "me-auto rounded-l-3xl rounded-br-3xl bg-back-gray"
                  : item.sender === "system"
                  ? "ms-auto text-end rounded-r-3xl rounded-bl-3xl bg-amber-200"
                  : "ms-auto text-end rounded-r-3xl rounded-bl-3xl bg-pal3-500/40"
              } relative my-3 mx-3 ps-3 pe-2 pt-8 pb-8 max-w-[45%]`}
            >
              <div
                className={`absolute ${
                  item.sender === "user"
                    ? "top-1.5 right-1.5 text-slate-500"
                    : item.sender === "system"
                    ? "top-1.5 left-1.5 text-yellow-800"
                    : "top-1.5 left-1.5 text-pal3-700"
                } text-sm`}
              >
                <FontAwesomeIcon
                  icon={
                    item.sender === "user"
                      ? faUser
                      : item.sender === "system"
                      ? faRobot
                      : faUserTie
                  }
                  className="mx-1"
                />
                {getFaRole(item.sender)}
              </div>
              <div className="text-slate-700">{item.message}</div>
              <div
                className={`absolute ${
                  item.sender === "user"
                    ? "bottom-1.5 left-1.5 text-slate-500"
                    : item.sender === "system"
                    ? "bottom-1.5 right-1.5 text-yellow-800"
                    : "bottom-1.5 right-1.5 text-pal3-700"
                } text-sm`}
              >
                <FontAwesomeIcon icon={faClock} className="mx-1" />
                {convertToPersianDate(item.createdAt, "H:m")}
              </div>
            </section>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center border-t-2 border-pal1-400 bg-white">
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="flex-1 outline-0 py-3 px-2 pe-10"
            type="text"
            placeholder="پیام خود را بنویسید..."
          />
          <button
            onClick={() => sendMessage(newMessage)}
            className="text-center align-middle bg-pal4-700 hover:bg-pal4-800 w-14 h-12 flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-2xl text-white"
            />
          </button>
        </div>
      </section>
    </section>
  );
};

export default TicketPage;
