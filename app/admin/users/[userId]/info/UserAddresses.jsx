import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import {
  faEdit,
  faHouseCircleCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const UserAddresses = ({ addresses }) => {
  return (
    <>
      <section className="relative mb-6 px-2 py-4 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
        <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
          ادرس ها
        </span>
        <section className="w-full">
          {addresses.length > 0 &&
            addresses?.map((item) => (
              <div
                key={item?._id}
                className="bg-back-gray text-slate-800 py-3 px-5 my-3 rounded-md flex justify-start items-center"
              >
                <section className="flex-1/12 px-5 text-center">
                  <FontAwesomeIcon
                    icon={faHouseCircleCheck}
                    className={`text-2xl ${
                      item?.isDefault ? "text-pal1-400" : "text-slate-400"
                    }`}
                  />
                </section>
                <label htmlFor="address-2" className="flex-9/12">
                  <section className="flex justify-between flex-11/12">
                    <section className="flex-3">
                      <div className="my-1">
                        <span className="text-base">استان : </span>
                        <span className="text-slate-500 text-sm">
                          {item?.province}
                        </span>
                      </div>
                      <div className="my-1">
                        <span className="text-base">شهر : </span>
                        <span className="text-slate-500 text-sm">
                          {item?.city}
                        </span>
                      </div>
                    </section>
                    <section className="flex-3">
                      <div className="my-2">
                        <span className="text-base">کدپستی : </span>
                        <span className="text-slate-500 text-sm">
                          {convertToPersianDigits(item?.postalCode)}
                        </span>
                      </div>
                      <div className="my-2">
                        <span className="text-base">تلفن همراه : </span>
                        <span className="text-slate-500 text-sm">
                          {convertToPersianDigits(item?.phone)}
                        </span>
                      </div>
                    </section>
                    <section className="flex-3">
                      <div className="my-2">
                        <span className="text-base">ادرس کامل : </span>
                        <span className="text-slate-500 text-sm">
                          {item?.addressLine}
                        </span>
                      </div>
                    </section>
                  </section>
                </label>
              </div>
            ))}
          {addresses.length === 0 && (
            <h1 className="text-center bg-red-100 text-red-900 py-3 rounded">
              هیچ آدرسی ثبت نشده است!
            </h1>
          )}
        </section>
      </section>
    </>
  );
};

export default UserAddresses;
