import styled, { css } from "styled-components";

const topSpan = css`
  font-size: 0.75rem;
  transform: translate(-15%, -140%);
`;

type Props = {
  shouldGoTop: boolean;
  outlineColor: string;
};

const Wrapper = styled.fieldset<Props>`
  position: relative;
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  outline: 1px ${(props) => props.outlineColor} solid;
  transition: outline 250ms;
  background-color: inherit;
  
  &:hover {
    cursor: text;
  }

  & > span {
    position: absolute;
    color: black;
    padding: 0 4px;
    background-color: #fafafa;
    z-index: 20;
    font-size: 1rem;
    margin-left: 0.75rem;
    transition: font-size 250ms, transform 250ms;
    ${(props) => props.shouldGoTop && topSpan};
  }

  & > label {
    display: none;
  }

  & > input {
    width: 95%;
    font-size: 1rem;
    border: none;
    margin: 0 auto;
    outline: none;
    background-color: transparent;

    &:focus,
    &:active {
      background-color: transparent;
    }
  }
`;

export default Wrapper;
