import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSliderItem from "./ArticleSliderItem";
import { articlesData } from "@/mocks/articlesData";

const ArticlesSlider = () => {
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
        {articlesData.map((item) => (
          <SwiperSlide className="text-center">
            <ProductSliderItem
              id={item.id}
              img={item.img}
              alt={item.alt_Img}
              title={item.title}
              date={item.date}
              key={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ArticlesSlider;
