import { useUserData } from "@/context/userDataContext";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import {
  faEdit,
  faHouseCircleCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AddressesList = () => {
  const { userData } = useUserData();
  return (
    <>
      <section className="w-full px-5">
        {userData?.addresses.map((item) => (
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
                    <span className="text-slate-500 text-sm">{item?.city}</span>
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
            <section className="flex-2/12 text-center px-5">
              <Link href={`/user/addresses/${item?._id}/edit`}>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-xl text-yellow-500 mx-3 cursor-pointer"
                />
              </Link>
              <button>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-xl text-red-500 mx-3 cursor-pointer"
                />
              </button>
            </section>
          </div>
        ))}
      </section>
    </>
  );
};

export default AddressesList;
