import Image from "next/image";
import { SwiperSlide } from "swiper/react";

const ProductGallerySliderItem = ({
  src = "/structuralImages/def.jpg",
  alt = "بدون نام",
}) => {
  return <Image src={src} alt={alt} width={300} height={250} />;
};

export default ProductGallerySliderItem;
