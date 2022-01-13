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
          <FilterSelector>Todas as categorias</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Cones</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Caixas</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Salgados</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Combos</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Pratos executivos</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Lanches</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Cremes gelados</FilterSelector>
        </FilterItem>
        <FilterItem>
          <FilterSelector>Bebidas</FilterSelector>
        </FilterItem>
      </FilterListContainer>
      <FilterArrowButton className="right-arrow-button" onClick={rightArrowClickHandler}>
        <MdOutlineKeyboardArrowRight size={24} />
      </FilterArrowButton>
    </FilterContainer>
  );
};

export default MenuFilter;
