"use client";

import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";

const AboutUsPage = () => {
  return (
    <>
      <section>
        <h1 className="text-3xl">
          سلاااام اینجا درباره ماعه {convertToPersianDigits(123)}
        </h1>
      </section>
    </>
  );
};

export default AboutUsPage;
