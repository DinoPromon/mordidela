import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import type { ButtonProps } from "@material-ui/core/Button";

type LoadingButtonProps = Omit<ButtonProps, "startIcon" | "endIcon"> & {
  isLoading: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, children, ...buttonProps }) => {
  return (
    <Button
      {...buttonProps}
      disabled={isLoading || buttonProps.disabled}
      startIcon={
        isLoading ? (
          <CircularProgress
            size={20}
            color={buttonProps.color !== "default" ? buttonProps.color : "inherit"}
          />
        ) : undefined
      }
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
