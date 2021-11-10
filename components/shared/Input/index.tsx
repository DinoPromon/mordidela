import React, { useState, useRef } from "react";

import { getInputColor, getAnimation } from "./utils";
import Wrapper from "./styled";

type Props = {
  type: string;
  id: string;
  placeholder: string;
  inputValidation: (text: string) => boolean;
};

const Input: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);

  const focusHandler = () => {
    if (isInitialState) setIsInitialState(false);
    setIsOnFocus(true);
  };

  const blurHandler = () => {
    setIsOnFocus(false);
  };

  const wrapperClickHandler = () => {
    inputRef.current?.focus();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const validation = props.inputValidation(inputValue);
    setIsInputValid(validation);
    setIsInputTouched(!!inputValue);
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
        ref={inputRef}
        required={true}
      />
    </Wrapper>
  );
};

export default Input;
