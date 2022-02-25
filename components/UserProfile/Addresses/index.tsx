import React from "react";
import { Formik } from "formik";
import { InputTextFormik } from "@components/shared";
import { CustomTextField, PageContainer, PageTitle } from "@components/shared";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
} from "./FormModel";
import {
  AddressesFormButtonContainer,
  AddressesInputContainer,
  CustomInputsDesign,
  AddressContainer,
  ShowAddress,
  AddresData,
  AddresIcons,
} from "./styled";
import { FaTrash } from "react-icons/fa";
import { PINK, PURPLE } from "@utils/colors";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import { BsPencil } from "react-icons/bs/index";

const Addresses: React.FC = (props) => {
  const formModel = getAddressesFormModel();

  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <Formik
        validateOnChange={false}
        enableReinitialize={true}
        validationSchema={getAddressesFormValidationSchema(formModel)}
        initialValues={getAddressesFormInitialValues()}
        onSubmit={(values) => console.log(values)}
      >
        {({ dirty, values, isValid }) => (
          <AddressesInputContainer>
            <CustomInputsDesign>
              <InputTextFormik
                fullWidth
                name={formModel.logradouro.name}
                value={values.logradouro}
                autoComplete="off"
                variant="outlined"
                helperText={formModel.logradouro.requiredErrorMessage}
                label={formModel.logradouro.label}
              />
              <InputTextFormik
                autoComplete="off"
                variant="outlined"
                value={values.numero}
                helperText={formModel.numero.requiredErrorMessage}
                label={formModel.numero.label}
                name={formModel.numero.name}
              />
            </CustomInputsDesign>
            <InputTextFormik
              fullWidth
              autoComplete="off"
              values={values.bairro}
              variant="outlined"
              helperText={formModel.bairro.requiredErrorMessage}
              label={formModel.bairro.label}
              name={formModel.bairro.name}
            />
            <InputTextFormik
              fullWidth
              autoComplete="off"
              values={values.complemento}
              variant="outlined"
              label={formModel.complemento.label}
              name={formModel.complemento.name}
            />
            <AddressesFormButtonContainer>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!isValid || !dirty}
              >
                Adicionar endereço
              </Button>
            </AddressesFormButtonContainer>
          </AddressesInputContainer>
        )}
      </Formik>
      <AddressContainer>
        <h3>Endereços cadastrados</h3>
        <ShowAddress>
          <span>
            <HiOutlineLocationMarker size={40} color={PINK} />
          </span>
          <AddresData>
            <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
            <p>Complemento: </p>
          </AddresData>
          <AddresIcons>
            <Tooltip title="Editar endereço" placement="bottom">
              <span>
                <BsPencil size={20} color={PURPLE} />
              </span>
            </Tooltip>
            <Tooltip title="Excluir endereço" placement="bottom">
              <span>
                <FaTrash size={20} color={PURPLE} />
              </span>
            </Tooltip>
          </AddresIcons>
        </ShowAddress>

        <ShowAddress>
          <span>
            <HiOutlineLocationMarker size={40} color={PINK} />
          </span>
          <AddresData>
            <p>Rua dos Alfeneiros Nº 4, Little Whinging</p>
            <p>Complemento: </p>
          </AddresData>
          <AddresIcons>
            <Tooltip title="Editar endereço" placement="bottom">
              <span>
                <BsPencil size={20} color={PURPLE} />
              </span>
            </Tooltip>
            <Tooltip title="Excluir endereço" placement="bottom">
              <span>
                <FaTrash size={20} color={PURPLE} />
              </span>
            </Tooltip>
          </AddresIcons>
        </ShowAddress>
      </AddressContainer>
    </PageContainer>
  );
};

export default Addresses;
