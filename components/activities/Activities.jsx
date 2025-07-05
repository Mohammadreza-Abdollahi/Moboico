import ActivityItem from "./AcivityItem";
import { faBrain, faChartColumn, faClipboardCheck, faGraduationCap, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

const Activities = () => {
  return (
    <>
      <section className="bg-back-gray w-full py-16">
        <div className="container mx-auto">
          <section className="text-center">
            <span className="text-3xl text-slate-800">
              دستاوردها و فعالیت ها
            </span>
            <p className="px-2 text-lg lg:w-2/3 lg:text-center text-justify mx-auto mt-4 text-slate-700 leading-8">
              گروه مهندسی موبویکو با تکیه بر تخصص فنی، دانش روز و تجربه‌ی عملی،
              در سه حوزه‌ی کلیدی شامل تولیدات مهندسی، خدمات تعمیراتی، و
              بازاریابی تخصصی فعالیت گسترده‌ای دارد. این مجموعه با رویکردی
              نوآورانه و مشتری‌محور، تلاش می‌کند تا با ارائه‌ی راه‌حل‌های فنی
              کارآمد و خدمات قابل‌اعتماد، نیازهای متنوع بازار را پاسخ دهد.
            </p>
          </section>
          <section className="mt-12 lg:px-24 flex flex-col items-center lg:justify-center lg:items-stretch lg:flex-row gap-8">
            <ActivityItem
              icon={faScrewdriverWrench}
              title={"تعمیرات"}
              text={
                "در حوزه‌ی تعمیرات و نگهداری، این گروه با ارائه‌ی خدمات تخصصی، سریع و دقیق، سعی دارد حداکثر بهره‌وری را برای مشتریان خود تضمین کند. این خدمات شامل تعمیر تجهیزات صنعتی، قطعات الکترونیکی، و دستگاه‌های تخصصی می‌باشد."
              }
            />
            <ActivityItem
              icon={faGraduationCap}
              title={"اموزش"}
              text={
                "در بخش تولیدات، موبویکو با بهره‌گیری از فناوری‌های پیشرفته و تیمی متخصص، به طراحی و ساخت تجهیزات و محصولات مهندسی می‌پردازد که نه‌تنها کیفیت بالا دارند، بلکه با نیازهای بومی و صنعتی نیز سازگار هستند."
              }
            />
            <ActivityItem
              icon={faClipboardCheck}
              title={"نگهداری"}
              text={
                "در بخش بازاریابی و توسعه‌ی بازار، موبویکو با شناخت دقیق از فضای رقابتی و نیازهای بازار، راهکارهایی هدفمند ارائه می‌دهد تا محصولات و خدمات به درستی به مخاطبان هدف معرفی شوند و جایگاه مناسبی در بازار پیدا کنند."
              }
            />
          </section>
        </div>
      </section>
    </>
  );
};

export default Activities;
