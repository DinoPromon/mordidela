import { ORANGE, PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

export const NavBarAdminContainer = styled.nav`
  background-color: ${PURPLE};
  height: 60px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavBarAdminListItem = styled.li`
  display: inline-block;
  color: white;
  font-weight: bold;
  margin: 1rem 1rem;
  cursor: pointer;

  &:hover {
    border-bottom: 2px white solid;
  }
`;
