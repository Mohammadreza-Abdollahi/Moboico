"use server";

import { connectToDatabase } from "@/lib/mongodb";
import RequestCooperation from "@/models/RequestCooperation";
import { v4 as uuid } from "uuid";

export const sendCooperate = async (prevState , formData) => {
  const name = formData.get("name");
  const title = formData.get("title");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const explanation = formData.get("explanation");
  const id = uuid();
  const createdAt = new Date();
  try {
    if (!name) {
      return {
        error: "وارد کردن نام الزامی است!",
        status: 400,
      };
    } else if (!title) {
      return {
        error: "وارد کردن عنوان شغلی الزامی است!",
        status: 400,
      };
    } else if (!phone) {
      return {
        error: "وارد کردن تلفن همراه الزامی است!",
        status: 400,
      };
    } else if (!email) {
      return {
        error: "وارد کردن ایمیل الزامی است!",
        status: 400,
      };
    }
    await connectToDatabase();
    const cooperateRequest = await RequestCooperation.create({
      id,
      name,
      title,
      phone,
      email,
      explanation,
      createdAt,
    });
    return {
      data: JSON.parse(JSON.stringify(cooperateRequest)),
      success: true,
      message: "درخواست با موفقیت ثبت شد!",
    };
  } catch (error) {
    return {
      error: "خطایی در سمت سرور رخ داده است...",
      detail: error.message || String(error),
      success: false,
      status: 500,
    };
  }
};
