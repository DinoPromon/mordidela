import React from "react";
import Button from "@material-ui/core/Button";

import {
  ConfirmationLayoutContainer,
  ConfirmationActionsContainer,
  ConfirmationMessageContainer,
} from "./styled";

import type { ButtonProps } from "@material-ui/core";

type ConfirmationLayoutProps = {
  cancelProps: ButtonProps;
  confirmProps: ButtonProps;
  confirmationMessage: string;
};

type ConfirmationLayoutType = (props: ConfirmationLayoutProps) => JSX.Element;

const ConfirmationLayout: ConfirmationLayoutType = ({
  cancelProps,
  confirmProps,
  confirmationMessage,
}: ConfirmationLayoutProps) => {
  return (
    <ConfirmationLayoutContainer>
      <ConfirmationMessageContainer>{confirmationMessage}</ConfirmationMessageContainer>
      <ConfirmationActionsContainer>
        <Button
          {...cancelProps}
          color={cancelProps.color || "secondary"}
          variant={cancelProps.variant || "outlined"}
        >
          Não
        </Button>
        <Button
          {...confirmProps}
          color={confirmProps.color || "secondary"}
          variant={confirmProps.variant || "contained"}
        >
          Sim
        </Button>
      </ConfirmationActionsContainer>
    </ConfirmationLayoutContainer>
  );
};

export default ConfirmationLayout;
