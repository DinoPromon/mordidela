import styled from "styled-components";

export const ProfileDropdownContainer = styled.div`
  display: flex;
  position: relative;

  & > span {
    padding-left: 7px;
    color: white;
    font-weight: bold;
  }

  & > a {
    text-decoration: none;
    color: inherit;
    padding-left: 7px;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid white;
  }
`;
