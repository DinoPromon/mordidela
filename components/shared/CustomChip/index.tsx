import React from "react";
import Chip from "@material-ui/core/Chip";

import { SUCCESS_GREEN, ERROR_RED } from "@utils/colors";
import { CustomChipContainer } from "./styled";

import type { ChipProps } from "@material-ui/core";

type CustomChipProps = Omit<ChipProps, "color" | "variant"> & {
  color: "green" | "red";
};

const CustomChip = ({ color, ...chipProps }: CustomChipProps) => {
  function getChipColor(color: "green" | "red") {
    switch (color) {
      case "green":
        return SUCCESS_GREEN;

      case "red":
        return ERROR_RED;

      default:
        return color;
    }
  }

  return (
    <CustomChipContainer color={getChipColor(color)}>
      <Chip {...chipProps} variant="outlined" />
    </CustomChipContainer>
  );
};

export default CustomChip;
