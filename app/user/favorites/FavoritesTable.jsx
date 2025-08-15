import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const FavoritesTable = () => {
  return (
    <>
      <table className="w-full">
        <thead className="text-center">
          <tr className="border-b-2 border-pal1-500 pb-5">
            <th className="w-1/12 pb-4">#</th>
            <th className="w-3/12 pb-4">تصویر محصول</th>
            <th className="w-7/12 pb-4">نام محصول</th>
            <th className="w-1/12 pb-4">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-center text-lg">
          <tr className="align-middle border-b-2 border-pal1-200">
            <td>{convertToPersianDigits(1435)}</td>
            <td>
              <Image
                className="w-60"
                src={"/structuralImages/default-img.jpg"}
                alt="Product-Img"
                width={260}
                height={260}
              />
            </td>
            <td>
              <Link href={"/products"} className="hover:text-pal1-600">
                <span className="line-clamp-1">
                  لپ تاپ 15.6 اینچی ایسوس مدل Vivobook 15 A1502VA-BQ531-i5
                  13420H-24GB DDR4-512GB SSD-TN - کاستوم شده
                </span>
              </Link>
            </td>
            <td>
              <button className="text-red-500 hover:text-red-800 text-xl transition-all duration-150">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FavoritesTable;
