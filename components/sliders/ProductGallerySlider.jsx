"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../../app/globals.css";
import ProductGallerySliderItem from "./ProductGalerySliderItem";

const ProductGallerySlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-galley-top"
      >
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
        <SwiperSlide>
          <ProductGallerySliderItem />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default ProductGallerySlider;
