import Activities from "@/components/activities/Activities";
import Articles from "@/components/articles/Articles";
import Email from "@/components/email/Email";
import Products from "@/components/products/Products";
import LandingHeadSlider from "@/components/sliders/LandingHeadSlider";
const getSlides = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/slides`,{next: {revalidate: 86400}});
  return res.json();
};
const getArticles = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/articles`,{next: {revalidate: 0}});
  return res.json();
};
const getProducts = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/products/latest`,{next: {revalidate: 0}});
  return res.json();
};
export default async function Home() {
  const slides = await getSlides();
  const articles = await getArticles();
  const products = await getProducts();
  return (
    <div>
      <LandingHeadSlider slides={slides}/>
      <Activities/>
      <Products products={products}/>
      <Email/>
      <Articles articles={articles}/>
    </div>
  );
}