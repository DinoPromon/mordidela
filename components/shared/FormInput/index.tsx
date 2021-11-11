import React, { useState, useRef } from "react";

import { getInputColor } from "./utils";
import Wrapper from "./styled";

type Props = {
  type?: string;
  value: string,
  id: string;
  placeholder: string;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInputValid: boolean;
};

const FormInput: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
  };

  const isInputTouched = props.value.length > 0;

  return (
    <Wrapper
      shouldGoTop={isOnFocus || isInputTouched}
      onClick={wrapperClickHandler}
      outlineColor={getInputColor(props.isInputValid, isInputTouched, isOnFocus)}
    >
      <fieldset>
        <label htmlFor={props.id}>{props.id}</label>
        <span>{props.placeholder}</span>
        <input
          onChange={changeHandler}
          type={props.type || 'text'}
          value={props.value}
          id={props.id}
          onFocus={focusHandler}
          onBlur={blurHandler}
          ref={inputRef}
        />
      </fieldset>
      {!props.isInputValid && isInputTouched && !isOnFocus && <p>{props.errorMessage || ""}</p>}
    </Wrapper>
  );
};

export default FormInput;
