import Image from "next/image";
import Link from "next/link";

const ForbiddenError = () => {
  return (
    <>
        <section className="container mx-auto mt-3">
          <div className="flex justify-center items-center">
            <Image
              className=""
              src={"/structuralImages/403error.png"}
              alt="403Error"
              width={580}
              height={200}
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl mb-7">شما درسترسی لازم برای رفتن به این صفحه را ندارید!</h1>
            <Link
              href="/"
              className="px-5 py-1.5 rounded-sm bg-pal1-400 hover:bg-pal4-600 text-white text-lg transition-all duration-150"
            >
              بازگشت به خانه
            </Link>
          </div>
        </section>
    </>
  );
};

export default ForbiddenError;
