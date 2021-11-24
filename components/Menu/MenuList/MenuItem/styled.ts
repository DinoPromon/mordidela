import styled from "styled-components";

const ListItem = styled.li`
  display: grid;
  grid-template-rows: 2fr clamp(70px, 90px, 120px);
  padding-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default ListItem;
