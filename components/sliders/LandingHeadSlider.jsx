"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SliderItem from "./SliderItem";
import { slides } from "@/mocks/sliderData";

const LandingHeadSlider = () => {
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
        }}
        className="landing-head-slider"
      >
        {slides.map((item) => (
          <SwiperSlide>
            <SliderItem
              img={item.image}
              alt={item.alt}
              head={item.head}
              head2={item.head2}
              text={item.text}
              text2={item.text2}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LandingHeadSlider;
