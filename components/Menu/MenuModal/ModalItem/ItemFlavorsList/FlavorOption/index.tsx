import React from "react";
import ISabor from "@models/sabor";
import { InputCheckbox } from "@components/shared";
import { FlavorOptionContainer } from "./styled";

type Props = {
  flavorId: ISabor["id_sabor"];
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FlavorOption: React.FC<Props> = ({ flavorId, name, label, onChange }) => {
  const inputId = `sabor-${flavorId}`;
  return (
    <FlavorOptionContainer>
      <InputCheckbox id={inputId} name={name} onChange={onChange} value={flavorId}>
        {label}
      </InputCheckbox>
    </FlavorOptionContainer>
  );
};

export default FlavorOption;
