"use client";
import { Icon } from "../Icon";
import { IBook } from "./Card.types";
import {
  CardContainer,
  ImageContainer,
  CardLink,
  DescriptionContainer,
  Title,
  Authors,
  BottomContainer,
  Price,
  CartButton,
  BoxStyles,
} from "./Card.styles";

import FavoriteBtn from "@/components/Favorite/FavoriteBtn";

const Card = ({ book }: { book: IBook }) => {
  const { title, url, price, author, id } = book;

  return (
    <CardContainer>
      <ImageContainer
        style={{ ["--background-image" as string]: `url(${url})` }}
      >
        <CardLink href={`book/${id}`}></CardLink>
      </ImageContainer>
      <DescriptionContainer>
        <Title>
          <CardLink href={`book/${id}`}>{title}</CardLink>
        </Title>
        <Authors>{author}</Authors>
        <BottomContainer>
          <Price>{price} ₴</Price>
          <BoxStyles>
            <FavoriteBtn book={book} />
            <CartButton>
              <Icon name="cart" size={24} color="white" />
            </CartButton>
          </BoxStyles>
        </BottomContainer>
      </DescriptionContainer>
    </CardContainer>
  );
};

export default Card;
