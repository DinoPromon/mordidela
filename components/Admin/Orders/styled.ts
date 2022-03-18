import styled, { css } from "styled-components";

import { PINK } from "@utils/colors";

const selectedFilterStyle = css`
  color: white;
  background-color: ${PINK};
`;

const defaultFilterStyle = css`
  color: ${PINK};
  background-color: white;
`;

const disabledFilterStyle = css`
  color: #989898;
  background-color: #dcdcdc;
  border-color: #dcdcdc;

  &:hover {
    opacity: 0.7;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
`;

export const FiltersContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

export const OrdersFilter = styled.li<{ selected?: boolean; disabled?: boolean }>`
  padding: 10px;
  border-radius: 100px;
  border: 1px solid ${PINK};
  list-style: none;
  transition: background-color 300ms, color 300ms, opacity 500ms;
  font-weight: bold;

  ${({ selected, disabled }) => {
    if (selected) return selectedFilterStyle;

    return disabled ? disabledFilterStyle : defaultFilterStyle;
  }}

  &:hover {
    cursor: pointer;
  }
`;

export const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OrdersUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const GeneralDataContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 13px;
  }
`;
