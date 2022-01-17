import styled from "styled-components";

export const NavBarListContainer = styled.ul`
  display: block;
  list-style: none;
  padding-right: 2rem;
  padding-left: 1rem;

  & > .float-left {
    float: left;
  }

  & > .float-right {
    float: right;
  }
`;

export const NavBarListItem = styled.li`
  display: inline-block;
  color: white;
  font-weight: bold;
  margin: 1rem 0.5rem;
`;
