import React, { useState, useRef } from "react";

import Wrapper from "./styled";

type Props = {
  id: string;
  placeholder: string;
  disabled?: boolean;
  value: string;
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const GeneralDataInput: React.FC<Props> = (props) => {
  // tirar use ref depois
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const focusHandler = () => {
    setIsOnFocus(true);
  };

  const blurHandler = () => {
    setIsOnFocus(false);
  };

  const shouldGoTop = isOnFocus || props.value.length > 0;
  return (
    <Wrapper
      shouldGoTop={shouldGoTop}
      onFocus={focusHandler}
      onBlur={blurHandler}
      isDisabled={!!props.disabled}
    >
      <input
        type="text"
        id={props.id}
        ref={inputRef}
        disabled={props.disabled}
        value={props.value}
        onChange={props.setValue}
      />
      <label htmlFor={props.id}>{props.placeholder}</label>
    </Wrapper>
  );
};

export default GeneralDataInput;
