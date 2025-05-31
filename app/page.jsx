import Activities from "@/components/activities/Activities";
import Products from "@/components/products/Products";
import LandingHeadSlider from "@/components/sliders/LandingHeadSlider";

export default function Home() {
  return (
    <div>
      <LandingHeadSlider/>
      <Activities/>
      <Products/>
      <h1 className="text-5xl mt-10">سلام دنیا</h1>
    </div>
  );
}