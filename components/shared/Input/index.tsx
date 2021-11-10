import React, { useState, useRef } from "react";

import { getInputColor } from "./utils";
import Wrapper from "./styled";

type Props = {
  type: string;
  id: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValidation: (text: string) => boolean;
};

const Input: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const focusHandler = () => {
    setIsOnFocus(true);
  };

  const blurHandler = () => {
    setIsOnFocus(false);
  };

  const wrapperClickHandler = () => {
    inputRef.current?.focus();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(event);
    const inputValue = event.target.value;
    const validation = props.inputValidation(inputValue);
    setIsInputValid(validation);
    setIsInputTouched(!!inputValue);
  };

  return (
    <Wrapper
      shouldGoTop={isOnFocus || isInputTouched}
      onClick={wrapperClickHandler}
      outlineColor={getInputColor(isInputValid, isInputTouched, isOnFocus)}
    >
      <label htmlFor={props.id}>{props.id}</label>
      <span>{props.placeholder}</span>
      <input
        name={props.id}
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
