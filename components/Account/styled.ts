import styled from "styled-components";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "@utils/styles";

const Wrapper = styled.div`
  min-height: calc(100vh - ${FOOTER_HEIGHT} - ${NAVBAR_HEIGHT});
  background-color: #fafafa;
  padding: 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;

    & > div {
      margin-top: 1rem;
    }

    & > h3 {
      line-height: 1rem;
      font-size: 20px;
    }
  }
`;

export default Wrapper;