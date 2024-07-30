import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="p-2">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-3/4 h-auto mx-auto rounded-lg"  // Adjust width and center image
            style={{ maxWidth: '300px' }}  // Optional: set a maximum width
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
