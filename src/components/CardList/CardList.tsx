"use client";
import { Card } from "../Card";
import {
  StyledWrapper,
  SliderControls,
  ControlsTitle,
  ControlsContainer,
  ControlsLink,
} from "../Categories/Categories.styles";
import { Icon } from "../Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface IBook {
  id: string;
  title: string;
  url: string;
  price: number;
  author: string;
}

const CardList = ({ name, books }: { name: string; books: any[] }) => {
  let booksMarkup;
  if (books.length) {
    booksMarkup = books.map((book) => (
      <SwiperSlide key={book.id}>
        <Card book={book} />
      </SwiperSlide>
    ));
  }
  return (
    <StyledWrapper>
      <SliderControls>
        <ControlsTitle>{name}</ControlsTitle>
        <ControlsContainer>
          <ControlsLink className={`arrow-left-${name} arrow`}>
            <Icon name="arrow_left" size={24} />
          </ControlsLink>
          <ControlsLink className={`arrow-right-${name} arrow`}>
            <Icon name="arrow_right" size={24} />
          </ControlsLink>
        </ControlsContainer>
      </SliderControls>
      <Swiper
        slidesPerView={2}
        loop={true}
        spaceBetween={16}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          nextEl: `.arrow-right-${name}`,
          prevEl: `.arrow-left-${name}`,
        }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 13,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 5,
            spaceBetween: 13,
          },
        }}
      >
        {booksMarkup || ""}
      </Swiper>
    </StyledWrapper>
  );
};

export default CardList;
