import styled from "styled-components";

import { PINK } from "@utils/colors";

const Item = styled.li`
  width: 85%;
  margin: auto;
  padding-top: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${PINK};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export default Item;
