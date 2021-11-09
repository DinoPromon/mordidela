import styled from "styled-components";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "@utils/styles";
import { PURPLE } from "@utils/colors";

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

    & > h4 {
      background-color: white;
      color: ${PURPLE};
      width: 150px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      /* border: 1.5px solid rgba(130, 53, 206, 1); */
      padding: 1rem;
      margin: auto;
      border-radius: 0.25rem;
      text-align: center;
    }

    & > button {
      background-color: white;
      color: ${PURPLE};
      font-weight: bold;
      width: 150px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      padding: 1rem;
      margin: auto;
      border: none;
      border-radius: 0.25rem;
      text-align: center;
      cursor: pointer;
      transition: background-color 250ms, color 250ms;

      &:focus {
        background-color: ${PURPLE};
        color: white;
      }
    }
  }
`;

export default Wrapper;