import { redis } from "@/lib/redis";

export async function POST(req) {
  try {
    const body = await req.json();
    const { to } = body;

    if (!to) {
      return Response.json(
        { error: "Mobile number (to) is required" },
        { status: 400 }
      );
    }
    const cooldown = await redis.get(`otp:lock:${to}`);
    if (cooldown) {
      return Response.json(
        {
          error: "لطفاً قبل از ارسال دوباره ۳ دقیقه صبر کنید",
          retryAfter: cooldown,
        },
        { status: 429 }
      );
    }
    const res = await fetch(
      `https://console.melipayamak.com/api/send/otp/${process.env.MELIPAYAMAK_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to }),
      }
    );
    const otpResult = await res.json();
    console.log("OTP RESPONSE STATUS:", res.status);
    console.log("OTP RESPONSE BODY:", otpResult);
    if (res.ok) {
      console.log("CODE:::::::::::::::" + otpResult.code);
      await redis.set(`otp:${to}`, otpResult.code, {
        ex: 300,
      });
      await redis.set(`otp:lock:${to}`, "1", { ex: 180 });
    }
    return Response.json(
      {
        status: "کد ارسال شد.",
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: "Server Error", details: err.message },
      { status: 500 }
    );
  }
}
