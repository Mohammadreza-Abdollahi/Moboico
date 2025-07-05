'use client'
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSliderItem from "./ArticleSliderItem";
const ArticlesSlider = ({articles = []}) => {
  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={12}
        autoplay={{
            delay: 10000,
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
        modules={[Autoplay]}
        className="articles-slider"
      >
        {articles.map((item) => (
          <SwiperSlide className="text-center">
            <ProductSliderItem
              id={item.id}
              img={item.img}
              alt={item.alt_Img}
              title={item.title}
              createdAt={item.createdAt}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ArticlesSlider;
