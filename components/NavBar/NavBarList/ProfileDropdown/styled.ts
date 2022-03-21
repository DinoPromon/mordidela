import styled from "styled-components";

export const ProfileDropdownContainer = styled.div`
  display: flex;
  position: relative;

  & > span {
    padding-left: 7px;
  }

  & > a {
    text-decoration: none;
    color: inherit;
    padding-left: 7px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
  align-items: center;
`;
