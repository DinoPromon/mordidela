import styled from "styled-components";

export const AddressesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

export const AddressesListItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  & > span {
    display: flex;
    align-items: center;
  }
`;

export const AddressDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
  align-items: center;
`;
