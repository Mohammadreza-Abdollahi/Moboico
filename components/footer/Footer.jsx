import { menuItems } from "@/mocks/headerData";
import {
  faInstagram,
  faTelegram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <section>
        <div>
          <Image
            src={"/structuralImages/wave.svg"}
            alt="Wave-svg"
            width={1120}
            height={320}
            className="w-full"
          />
          {/* <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 L 0,150 C 140.1071428571429,166.78571428571428 280.2142857142858,183.57142857142858 393,183 C 505.7857142857142,182.42857142857142 591.2499999999998,164.5 712,170 C 832.7500000000002,175.5 988.7857142857144,204.42857142857142 1116,205 C 1243.2142857142856,205.57142857142858 1341.6071428571427,177.78571428571428 1440,150 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="#7758cf" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg> */}
        </div>
        <div className="bg-pal3-650">
          <section className="container mx-auto pb-8 flex flex-col md:flex-row gap-3.5 md:gap-10 justify-around items-center md:items-start text-white">
            <div className="w-full md:w-4/12 px-7">
              <span>
                <b>درباره ما</b>
              </span>
              <p className="text-justify text-sm mt-1 line-clamp-5 md:line-clamp-7">
                گروه مهندسی موبویکو با بهره‌گیری از دانش روز و تجربه‌ای ارزشمند
                در حوزه مهندسی پزشکی، به ارائه راهکارهای نوین و کارآمد برای
                ارتقای کیفیت تجهیزات و خدمات پزشکی می‌پردازد. این گروه متشکل از
                متخصصان خلاق و متعهد، همواره در تلاش است تا با تمرکز بر تحقیق،
                توسعه و بومی‌سازی فناوری‌های پیشرفته، نقشی مؤثر در بهبود سطح
                سلامت جامعه و تسهیل دسترسی به فناوری‌های پزشکی ایفا کند.
              </p>
            </div>
            <div className="w-full md:w-2/12 px-5 py-5 md:py-0">
              <ul className="flex md:flex-col justify-around gap-3">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="text-white text-sm hover:text-pal1-300 md:hover:-translate-x-1.5 transition-all duration-150"
                  >
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full pb-5 md:pb-0 md:pt-10 md:w-3/12 flex justify-center md:justify-around items-center gap-5">
              <a href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-4xl hover:text-pink-500 hover:-translate-y-2 transition-all duration-150"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faTelegram}
                  className="text-4xl hover:text-blue-500 hover:-translate-y-2 transition-all duration-150"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-4xl hover:text-red-500 hover:-translate-y-2 transition-all duration-150"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-4xl hover:text-black hover:-translate-y-2 transition-all duration-150"
                />
              </a>
            </div>
            <div className="w-full md:w-4/12 flex gap-2 justify-center">
              <a href="#" className="bg-white rounded shadow-2xl hover:-translate-y-2 transition-all duration-150">
                <Image
                  src="/structuralImages/enamad.png"
                  width={160}
                  height={240}
                  alt="E-Namad"
                />
              </a>
              <a href="#" className="bg-white rounded shadow-2xl hover:-translate-y-2 transition-all duration-150">
                <Image
                  src="/structuralImages/zarinpal.png"
                  width={160}
                  height={240}
                  alt="E-Namad"
                />
              </a>
            </div>
          </section>
          <section className="py-3 text-center">
            <hr className="text-white my-2" />
            <span className="text-center text-sm text-white">
              تمامی حقوق برای موبویکو و تیم توسعه محفوظ میباشد © 2025
            </span>
            <span className="block mt-2 text-center text-sm text-white">
              ساخته شده با ❤️ توسط <a href="https://github.com/Mohammadreza-Abdollahi">MohammadrezaAbdollahi</a>
            </span>
          </section>
        </div>
      </section>
    </>
  );
};

export default Footer;
