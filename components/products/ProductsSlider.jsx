"use client";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSliderItem from "./ProductSliderItem";
import { productsData } from "@/mocks/productsData";

const ProductsSlider = () => {
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
        modules={[Navigation , Autoplay]}
        className="products-slider"
      >
        {productsData.map((item) => (
          <SwiperSlide className="text-center">
            <ProductSliderItem
              img={item.img}
              alt={item.alt_Img}
              title={item.title}
              price={item.price}
              discount={item.discount}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsSlider;
