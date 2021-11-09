import styled, { Keyframes, keyframes } from 'styled-components';

export const placeholderAnimationUp = keyframes`
  from{
    font-size: 1rem;
    transform: translate(0, 0);
  };
  to {
    font-size: 0.75rem;
    transform: translate(-15%, -140%);
  }
`;

export const placeholderAnimationDown = keyframes`
  from{
    font-size: 0.75rem;
    transform: translate(-15%, -140%);
  };
  to {
    font-size: 1rem;
    transform: translate(0, 0);
  }
`;

type Props = {
  animationName: Keyframes | string,
  outlineColor: string;
}

const Wrapper = styled.fieldset<Props>`
  position: relative;
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  outline: 1px ${props => props.outlineColor} solid;
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
    animation: ${props => props.animationName} 150ms forwards ease-out;
  }

  & > input {
    width: 95%;
    font-size: 1rem;
    border: none;
    margin: 0 auto;
    outline: none;
    background-color: transparent;

    &:focus, &:active {
      background-color: transparent;
    }
  }

  & > label {
    display: none;
  }
`;

export default Wrapper;