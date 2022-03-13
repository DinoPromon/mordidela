import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Modal,
  CustomAnimatePresence,
  ConfirmationLayout,
  SuccessRequestLayout,
} from "@components/shared";

import { DeleteStep } from "../constants";
import { AddressModalLoadingContainer } from "./styled";

type AddressesModalProps = {
  deleteStep: DeleteStep | null;
  onDeleteAddress: () => Promise<void>;
  onCloseModal: () => void;
};

const AddressesModal: React.FC<AddressesModalProps> = ({
  deleteStep,
  onCloseModal,
  onDeleteAddress,
}) => {
  return (
    <CustomAnimatePresence exitBeforeEnter>
      {deleteStep !== null && (
        <Modal onClose={onCloseModal}>
          {deleteStep === DeleteStep.CONFIRMATION && (
            <ConfirmationLayout
              cancelProps={{
                onClick: onCloseModal,
              }}
              confirmProps={{
                type: "button",
                onClick: onDeleteAddress,
              }}
              confirmationMessage="Deseja realmente excluir o endereço selecionado?"
            />
          )}

          {deleteStep === DeleteStep.DELETING && (
            <AddressModalLoadingContainer>
              <CircularProgress color="primary" size={40} />
            </AddressModalLoadingContainer>
          )}

          {deleteStep === DeleteStep.DELETED && (
            <SuccessRequestLayout successMessage="Endereço excluído com sucesso!" />
          )}
        </Modal>
      )}
    </CustomAnimatePresence>
  );
};

export default AddressesModal;
