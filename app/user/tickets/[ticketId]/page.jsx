"use client";

import { useUserData } from "@/context/userDataContext";
import { convertToPersianDate } from "@/utilities/convertToPersianDate";
import {
  faCheckDouble,
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
  const { userData } = useUserData();
  console.log(userData);
  const role = userData?.role;
  const params = useParams();
  const [ticket, setTicket] = useState();
  const [ticketStatus, setTicketStatus] = useState(ticket?.status);
  const [statusChanged, setStatusChanged] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const messageFormat = /^[^$\^"'\`*/]+$/;

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
            sender: role,
            createdAt: new Date(),
            message: msg,
          },
        ]);
      }
      console.log(await res.json());
    }
  };
  const updateTicketStatus = async () => {
    const res = await fetch(`/api/tickets/${params.ticketId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: ticketStatus }),
      credentials: "include",
    });
    if(res.status === 200){
      setStatusChanged(true)
    }
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    const handleGetTicket = async () => {
      const data = await getTicket();
      setTicket(data.ticket);
      setTicketStatus(data.ticket.status);
      setMessages(data.ticket.messages);
    };
    handleGetTicket();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(ticket?.status);
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
          <div className="flex flex-row-reverse">
            <button
              onClick={() => sendMessage(newMessage)}
              className="text-center align-middle bg-pal4-700 hover:bg-pal4-800 w-14 h-12 flex justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-2xl text-white"
              />
            </button>
            <button
              onClick={updateTicketStatus}
              className={`${statusChanged ? "bg-green-500 hover:bg-green-600" : "bg-pal2-500 hover:bg-pal2-600"} text-center align-middle w-14 h-12 flex justify-center items-center cursor-pointer ${
                role === "admin" || role === "creator" ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon
                icon={faCheckDouble}
                className="text-2xl text-white"
              />
            </button>
            <section
              className={`relative ${
                role === "admin" || role === "creator" ? "visible" : "invisible"
              }`}
            >
              <select
                onChange={(e) => setTicketStatus(e.target.value)}
                value={ticketStatus}
                name="province"
                id="province"
                className="w-40 text-slate-800 py-2.5 px-2 border-r-2 border-pal1-400 h-full outline-none transition-all duration-150"
              >
                <option className="bg-blue-500/20 text-blue-500" value="new">
                  جدید
                </option>
                <option className="bg-green-500/20 text-green-500" value="open">
                  باز
                </option>
                <option
                  className="bg-yellow-500/20 text-yellow-500"
                  value="pending"
                >
                  در انتظار
                </option>
                <option
                  className="bg-green-800/20 text-green-800"
                  value="resolved"
                >
                  پاسخ داده شده
                </option>
                <option className="bg-red-500/20 text-red-500" value="closed">
                  بسته شده
                </option>
                {/* {provinces.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))} */}
              </select>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TicketPage;
