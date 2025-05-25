import { MobileMenuProvider } from "@/context/mobileMenuContext";
import Image from "next/image";
import Link from "next/link";

const NotFoundError = () => {
  return (
    <>
      <MobileMenuProvider>
        <section className="container mx-auto">
          <div className="flex justify-center items-center">
            <Image
              className=""
              src={"/structuralImages/404error.gif"}
              alt="404Error"
              width={580}
              height={560}
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl mb-5">صفحه ی مورد نظر یافت نشد!</h1>
            <Link
              href="/"
              className="px-5 py-1.5 rounded-sm bg-pal1-400 hover:bg-pal4-600 text-white text-lg transition-all duration-150"
            >
              بارگشت به خانه
            </Link>
          </div>
        </section>
      </MobileMenuProvider>
    </>
  );
};

export default NotFoundError;
