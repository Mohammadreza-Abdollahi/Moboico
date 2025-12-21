import { connectToDatabase } from "@/lib/mongodb";
import Otp from "@/models/Otp";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { to } = await req.json();

    if (!to) {
      return Response.json({ error: "شماره موبایل الزامی است" }, { status: 400 });
    }

    const res = await fetch(
      `https://console.melipayamak.com/api/send/otp/${process.env.MELIPAYAMAK_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.code) {
      return Response.json(
        { error: "ارسال کد ناموفق بود" },
        { status: 500 }
      );
    }

    await Otp.findOneAndUpdate(
      { mobile: to },
      {
        code: result.code.toString(),
        expiresAt: new Date(Date.now() + 3 * 60 * 1000),
        attempts: 0,
      },
      { upsert: true }
    );

    return Response.json({ message: "کد ارسال شد" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "خطای سرور" }, { status: 500 });
  }
}
