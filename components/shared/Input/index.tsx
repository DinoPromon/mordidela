import React, { useState } from "react";

import { getInputColor, getAnimation } from "./utils";
import Wrapper from "./styled";

type Props = {
  type: string;
  id: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  inputValidation: (text: string) => boolean;
};

const Input: React.FC<Props> = (props) => {
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);

  const focusHandler = () => {
    setIsOnFocus(true);
    if (isInitialState) setIsInitialState(false);
  };

  const blurHandler = () => {
    if (props.inputRef.current?.value.length === 0) {
      setIsOnFocus(false);
    }
  };

  const wrapperClickHandler = () => {
    props.inputRef.current?.focus();
  };

  const changeHandler = () => {
    const input = props.inputRef.current?.value ? props.inputRef.current.value : "";
    const validation = props.inputValidation(input);
    setIsInputValid(validation);
    setIsInputTouched(!!input);
  };

  return (
    <Wrapper
      animationName={getAnimation(isInitialState, isOnFocus, isInputTouched)}
      onClick={wrapperClickHandler}
      outlineColor={getInputColor(isInputValid, isInputTouched, isOnFocus)}
    >
      <label htmlFor={props.id}>{props.id}</label>
      <span>{props.placeholder}</span>
      <input
        onChange={changeHandler}
        type={props.type}
        id={props.id}
        onFocus={focusHandler}
        onBlur={blurHandler}
        ref={props.inputRef}
        required={true}
      />
    </Wrapper>
  );
};

export default Input;
