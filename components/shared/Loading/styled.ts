import styled, { keyframes } from "styled-components";

const loadingRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

type Props = {
  color: string;
};

const Wrapper = styled.div<Props>`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: ${loadingRotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.color} transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

export default Wrapper;