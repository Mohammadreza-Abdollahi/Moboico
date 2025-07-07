import { connectToDatabase } from "@/lib/mongodb";
import RequestCooperation from "@/models/RequestCooperation";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, title, phone, email, explanation } = body;
    const id = uuid();
    const createdAt = new Date();

    if (!name) {
      return Response.json({ error: "وارد کردن نام الزامی است!" }, { status: 400 });
    }
    if (!title) {
      return Response.json({ error: "وارد کردن عنوان شغلی الزامی است!" }, { status: 400 });
    }
    if (!phone) {
      return Response.json({ error: "وارد کردن تلفن همراه الزامی است!" }, { status: 400 });
    }
    if (!email) {
      return Response.json({ error: "وارد کردن ایمیل الزامی است!" }, { status: 400 });
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

    return Response.json(
      {
        data: JSON.parse(JSON.stringify(cooperateRequest)),
        success: true,
        message: "درخواست با موفقیت ثبت شد!",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "خطایی در سمت سرور رخ داده است...",
        detail: error.message || String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}