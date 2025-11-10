"use client";
const sendOtp = async () => {
  const res = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: "09035371148" }),
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
};
const AdminPAge = () => {
  return (
    <>
      <h1>اینجا پنل ادمین است</h1>
      <h1>اینجا سفارشات است</h1>
      <button
        className="bg-pal1-400 cursor-pointer"
        onClick={() => sendOtp("09035371148")}
      >
        Send OTP
      </button>
    </>
  );
};

export default AdminPAge;
