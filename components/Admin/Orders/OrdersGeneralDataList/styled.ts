import { SuccessMessage } from "@components/shared/StyledComponents";
import { ERROR_RED } from "@utils/colors";
import styled from "styled-components";

export const ConfirmationMessage = styled(SuccessMessage)`
  text-align: center;
  font-weight: bold;
  margin-top: auto;
`;

export const RejectionMessage = styled(ConfirmationMessage)`
  color: ${ERROR_RED};
`;
