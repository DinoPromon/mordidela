import styled from "styled-components";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "@utils/styles";

const Wrapper = styled.div`
  height: calc(100vh - ${FOOTER_HEIGHT} - ${NAVBAR_HEIGHT});
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  & > img {
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 100px;
    margin-top: 1rem;
  }

  & > h3 {
    line-height: 1rem;
  }

  & > h4 {
    background-color: white;
    color: rgba(130, 53, 206, 1);
    width: 150px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    /* border: 1.5px solid rgba(130, 53, 206, 1); */
    padding: 1rem;
    margin: auto;
    border-radius: 0.25rem;
    text-align: center;
    transition: color 0.4s ease;
  }
`;

export default Wrapper;
