"use server";

export const sendCooperate = async (prevState, formData) => {
  const name = formData.get("name");
  const title = formData.get("title");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const explanation = formData.get("explanation");

  const payload = {
    name,
    title,
    phone,
    email,
    explanation,
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cooperates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) {
      return {
        error: result.error || "خطا در ثبت اطلاعات!",
        detail: result.detail || null,
        success: false,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return {
      error: "ارتباط با سرور برقرار نشد",
      detail: error.message,
      success: false,
    };
  }
};
