import React from "react";

import { InputCheckbox } from "@components/shared";
import {FlavorOptionContainer} from "./styled";

type Props = {
  id: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FlavorOption: React.FC<Props> = (props) => {
  const { id, name, label } = props;

  const inputId = `sabor-${id}`;
  return (
    <FlavorOptionContainer>
      <InputCheckbox id={inputId} name={name} onChange={props.onChange} value={props.id}>
        {label}
      </InputCheckbox>
    </FlavorOptionContainer>
  );
};

export default FlavorOption;
