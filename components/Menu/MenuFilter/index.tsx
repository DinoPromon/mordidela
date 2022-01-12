import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FilterSelector, FilterItem, FilterListContainer, FilterContainer, FilterArrowButton } from "./styled";

const MenuFilter: React.FC = () => {
  const filterListRef = useRef<HTMLUListElement>(null);

  function leftArrowClickHandler() {
    if (filterListRef.current) {
      filterListRef.current.scrollLeft -= filterListRef.current.offsetWidth;
    }
  }

  function rightArrowClickHandler() {
    if (filterListRef.current) {
      filterListRef.current.scrollLeft += filterListRef.current.offsetWidth;
    }
  }

  return (
    <FilterContainer>
      <FilterArrowButton className="left-arrow-button" onClick={leftArrowClickHandler}>
        <MdOutlineKeyboardArrowLeft size={24} />
      </FilterArrowButton>
      <FilterListContainer ref={filterListRef}>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Teste_Gigantesco</FilterSelector>
        </FilterItem>
      </FilterListContainer>
      <FilterArrowButton className="right-arrow-button" onClick={rightArrowClickHandler}>
        <MdOutlineKeyboardArrowRight size={24} />
      </FilterArrowButton>
    </FilterContainer>
  );
};

export default MenuFilter;
