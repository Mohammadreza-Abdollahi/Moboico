"use client";

import { useEffect } from "react";

const UserPanel = async () => {
  useEffect(async () => {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default UserPanel;
