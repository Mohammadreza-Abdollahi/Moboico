import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ message: "شما از حساب خود خارج شدید." });
  console.log("LoooooogOuuuuuuuuut");
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  return response;
};
