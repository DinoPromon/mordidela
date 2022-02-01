import { ProductCategory } from "@models/produto";
import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  FilterSelector,
  FilterItem,
  FilterListContainer,
  FilterContainer,
  FilterArrowButton,
} from "./styled";

type MenuFilterProps = {
  categories: ProductCategory[];
};

const MenuFilter: React.FC<MenuFilterProps> = ({ categories }) => {
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
        {categories.length > 0 &&
          categories.map((category) => (
            <FilterItem key={`menu-filter-${category.id_categoria}`}>
              <FilterSelector>{category.nome}</FilterSelector>
            </FilterItem>
          ))}
      </FilterListContainer>
      <FilterArrowButton className="right-arrow-button" onClick={rightArrowClickHandler}>
        <MdOutlineKeyboardArrowRight size={24} />
      </FilterArrowButton>
    </FilterContainer>
  );
};

export default MenuFilter;
