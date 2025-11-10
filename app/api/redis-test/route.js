import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // تست SET
    const setResult = await redis.set("test-key", "hello", { ex: 120 });

    // تست GET
    const getResult = await redis.get("test-key");

    return Response.json({
      setResult,
      getResult,
      url: process.env.UPSTASH_REDIS_REST_URL,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
