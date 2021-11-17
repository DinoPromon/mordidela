import styled, { css } from "styled-components";

import { PURPLE } from "@utils/colors";

type Props = {
  shouldGoTop: boolean;
  isDisabled: boolean
};

const moveTop = css`
  top: -5px;
`;

const Wrapper = styled.div<Props>`
  position: relative;
  border-bottom: 1px solid ${props => props.isDisabled ? "#adadad" : PURPLE};

  & > input {
    width: 100%;
    padding: 0.5rem;
    height: 40px;
    border: none;
    background: none;
    outline: none;
  }

  & > label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0px;
    color: ${props => props.isDisabled ? "#adadad" : PURPLE};
    transition: top 200ms;
    ${(props) => props.shouldGoTop && moveTop}
  }
`;

export default Wrapper;
