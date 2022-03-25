import styled from "styled-components";

export const CardContainer = styled.ul`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 0 1rem;
  justify-content: center;
`;

export const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.h2`
  font-size: 13pt;
`;

export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const UserGeneralDataContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 13px;
  }
`;

export const CardActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const Card = styled.li`
  width: 350px;
  height: 350px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${CardActionsContainer} {
    margin-top: auto;
  }

  & > p {
    text-align: center;
    margin-top: auto;
  }
`;
