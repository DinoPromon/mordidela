import styled from "styled-components";
import { PURPLE, PINK } from "@utils/colors";

export const ProductsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
`;

export const TrashPriceContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

export const TrashPriceText = styled.p`
  font-weight: bold;
  color: ${PURPLE};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemDescriptionContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  ${TrashPriceContainer} {
    margin-left: auto;
  }

  & > span {
    font-size: inherit;
    font-weight: bold;
    color: ${PINK};
    padding-right: 5px;
  }
`;

export const AddsListContainer = styled.div`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  position: relative;
  padding: 2px 0 0;
  gap: 4px;
`;

export const AddsText = styled.p`
  display: flex;
  width: 100%;
  font-size: inherit;
  gap: 0.25rem;

  & > span {
    font-weight: bold;
    font-size: inherit;
    color: ${PURPLE};
    margin-left: auto;
    flex-shrink: 0;
  }
`;

export const HighLightText = styled.p`
  width: 100%;
  color: ${PINK};
  font-weight: bold;
`;

export const SubtotalText = styled(HighLightText)`
  text-align: end;

  & > span {
    color: ${PURPLE};
  }
`;

export const TotalText = styled(SubtotalText)`
  font-size: 1.25rem;
  text-align: center;

  & > span {
    font-size: 1.25rem;
  }
`;

export const TotalTextOrdersUserProfile = styled(SubtotalText)`
  font-size: 1.5rem;
  text-align: center;

  & > span {
    font-size: 1.5rem;
  }
`;

export const CoupomDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const ColoredText = styled.p`
  font-weight: bold;
  color: ${PINK};
  flex-shrink: 0;

  & > span {
    color: ${PURPLE};
    font-weight: bold;
  }
`;

export const AddresTitle = styled.h2`
  color: ${PURPLE};
  font-size: 1rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
`;

export const AddresComplement = styled.p`
  font-size: 13px;
  cursor: pointer;
`;