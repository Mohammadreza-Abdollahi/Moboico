'use client'
import Activities from "@/components/activities/Activities";
import Articles from "@/components/articles/Articles";
import Email from "@/components/email/Email";
import Products from "@/components/products/Products";
import LandingHeadSlider from "@/components/sliders/LandingHeadSlider";

export default function Home() {
  return (
    <div>
      <LandingHeadSlider/>
      <Activities/>
      <Products/>
      <Email/>
      <Articles/>
    </div>
  );
}