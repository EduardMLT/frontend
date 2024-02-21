"use client";
import { Icon } from "@/components/common/Icon";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";
import { MobileCard } from "../MobileCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, selectBooks } from "@/lib/redux";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";

const BooksQuantity = styled.p`
  margin-top: 24px;
  margin-bottom: 20px;
  color: var(--gray);
  font-size: 20px;
  font-variant-numeric: lining-nums proportional-nums;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ControlButton = styled.button`
  background-color: var(--gray_border);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  &.active {
    background-color: var(--red);
  }
`;

const Controls = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const booksArr = useSelector(selectBooks);

  const [isOpen, setIsOpen] = useState(false);
  const toggeModal = () => {
    setIsOpen(!isOpen);
  };

  const quantity = booksArr.length;
  return (
    <>
      <Wrapper>
        <BooksQuantity>{quantity} Товарів</BooksQuantity>
        <ControlsContainer>
          <ControlButton
            className="active"
            onClick={toggeModal}
          >
            <Icon name="filter" size={20} /> Фільтр{" "}
            <Icon name="arrow_down" color="#fff" size={16} />
          </ControlButton>
          <ControlButton>
            <Icon name="rating" size={20} /> За рейтингом
          </ControlButton>
        </ControlsContainer>
        {booksArr.map((book: any) => {
          return <MobileCard book={book} key={book.id} />;
        })}
        {isOpen && <Filter toggeModal={toggeModal} />}
      </Wrapper>
      {/* <MobileCard />
      <MobileCard />
      <MobileCard />
      <MobileCard /> */}
    </>
  );
};

export default Controls;
