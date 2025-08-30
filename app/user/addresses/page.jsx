"use client";
import { useUserData } from "@/context/userDataContext";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import AddressesList from "./AddressesList";

const Orders = () => {
  // const { userData } = useUserData();
  // const id = userData?._id;
  // const addAddress = async () => {
  //   const addressData = {
  //     userId: "686d7e33225dbe128afc030e",
  //     fullName: "محمدرضا عبداللهی",
  //     phone: "09134673387",
  //     province: "اصفهان",
  //     city: "هرند",
  //     postalCode: 8134188551,
  //     addressLine:
  //       "استان اصفهان ، شهرستان هرند ، روستای خورچان ، خیابان شهید حسین جعفری ، پلاک 195",
  //     isDefault: false,
  //   };
  //   const res = await fetch("/api/address", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(addressData),
  //   });
  //   const data = await res.json();
  //   console.log("Hello");
  //   console.log(data);
  // };
  // addAddress();
  return (
    <>
      <section className="pt-3">
        <section className="relative mb-6 px-2 py-8 mt-10 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
            آدرس ها
          </span>
          <button className="absolute text-lg top-0 left-5 -translate-y-1/2 bg-pal1-400 hover:bg-pal1-600 rounded-xs px-5 py-0.5 text-white transition-all duration-150">
            افزودن ادرس جدید
          </button>
          <AddressesList />
        </section>
      </section>
    </>
  );
};

export default Orders;
