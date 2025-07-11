import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getUserFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
};
