import React, { useRef } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  FilterSelector,
  FilterItem,
  FilterListContainer,
  FilterContainer,
  FilterArrowButton,
} from "./styled";

import type { ProductCategory } from "@models/produto";

type MenuFilterProps = {
  categories: ProductCategory[];
  selectedCategoryFilter: ProductCategory;
  onFilterClick: (categoryId: ProductCategory) => void;
};

const MenuFilter: React.FC<MenuFilterProps> = ({
  categories,
  selectedCategoryFilter,
  onFilterClick,
}) => {
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
        {categories.length > 0 &&
          categories.map((category) => (
            <FilterItem
              onClick={onFilterClick.bind(null, category)}
              key={`menu-filter-${category.id_categoria}`}
              isSelected={category.id_categoria === selectedCategoryFilter.id_categoria}
            >
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
