import styled from "styled-components";

const ListItem = styled.li`
  & > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 1.5rem;
    font-size: 13px;
    & > p {
      font-size: inherit;
    }
  }
`;

export default ListItem;
