"use server";

import { redirect } from "next/navigation";

export const registerAction = async (prevState, formData) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, phone, password }),
      cache: "no-store",
    });
    const result = await res.json();
    console.log(result);
    if (!res.ok) {
      return {
        success: false,
        message: null,
        error:
          result.error.name == "ValidationError"
            ? "فیلد های فرم را با دقت پر کنید!"
            : result.error || "خطایی رخ داده",
        data: null,
      };
    }
    return {
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
      error: null,
      data: result.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "خطا در ارتباط با API",
      error: err,
      data: null,
    };
  }
};
