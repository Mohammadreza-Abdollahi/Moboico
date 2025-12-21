"use client";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSliderItem from "./ProductSliderItem";

const ProductsSlider = ({ products = [] }) => {
  console.log(
    "PRODUCTS =>",
    products,
    typeof products,
    Array.isArray(products)
  );
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <>
      <Swiper
        loop={true}
        navigation={true}
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="products-slider"
      >
        {safeProducts?.map((item) => (
          <SwiperSlide className="text-center">
            <ProductSliderItem
              id={item.id}
              img={item.img}
              alt={item.alt_Img}
              title={item.title}
              price={item.price}
              discount={item.discount}
              count={item.count}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsSlider;
