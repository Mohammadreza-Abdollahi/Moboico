"use client";
import { useParams } from "next/navigation";
import UserAddresses from "./UserAddresses";
import UserDetails from "./UserDetails";
import UserInfo from "./UserInfo";
import UserOrders from "./UserOrders";
import { useEffect, useState } from "react";

const getUser = async (userId) => {
  const res = await fetch(`/api/admin/users/${userId}/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const UserInfoPage = () => {
  const [user, setUser] = useState();
  const [addresses, setAddresses] = useState([]);
  const params = useParams();
  const userId = params.userId;
  useEffect(() => {
    const handleGetUser = async () => {
      const data = await getUser(userId);
      setUser(data.data.user);
      setAddresses(data.data.addresses);
    };
    handleGetUser();
  }, []);
  return (
    <>
      <section className="pt-3">
        <UserInfo user={user} />
        <UserAddresses addresses={addresses} />
        <UserOrders />
        <UserDetails user={user} />
      </section>
    </>
  );
};

export default UserInfoPage;
