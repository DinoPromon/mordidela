import React from "react";
import { Formik } from "formik";
import { getSession } from "next-auth/client";
import { FaTrash } from "react-icons/fa/index";
import { BsPencil } from "react-icons/bs/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";

import Axios from "@api";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { getAddressFormArg } from "./Submit";
import { PINK, PURPLE } from "@utils/colors";
import { InputTextFormik } from "@components/shared";
import { PageContainer, PageTitle } from "@components/shared";
import {
  getAddressesFormModel,
  getAddressesFormInitialValues,
  getAddressesFormValidationSchema,
  IAddressesFormValues,
} from "./FormModel";
import {
  ShowAddress,
  AddresData,
  AddresIcons,
  AddressContainer,
  CustomInputsDesign,
  AddressesFormikForm,
  AddressesFormButtonContainer,
} from "./styled";

const Addresses: React.FC = () => {
  const formModel = getAddressesFormModel();

  async function addressFormSubmitHandler(values: IAddressesFormValues) {
    const addressesFormArg = getAddressFormArg(values);
    const session = await getSession();
    if (!session) return;

    await Axios.post(`address/${session.user.id_usuario}`, addressesFormArg);
  }

  return (
    <PageContainer>
      <PageTitle>Endereços</PageTitle>
      <Formik
        validateOnMount
        enableReinitialize
        validateOnChange={false}
        validationSchema={getAddressesFormValidationSchema(formModel)}
        initialValues={getAddressesFormInitialValues()}
        onSubmit={addressFormSubmitHandler}
      >
        {({ values, isValid, dirty }) => (
          <AddressesFormikForm>
            <CustomInputsDesign>
              <InputTextFormik
                value={values.publicPlace}
                name={formModel.publicPlace.name}
                label={formModel.publicPlace.label}
                helperText={formModel.publicPlace.requiredErrorMessage}
                fullWidth
                autoComplete="off"
                variant="outlined"
              />
              <InputTextFormik
                value={values.number}
                name={formModel.number.name}
                label={formModel.number.label}
                helperText={formModel.number.requiredErrorMessage}
                autoComplete="off"
                variant="outlined"
              />
            </CustomInputsDesign>
            <InputTextFormik
              value={values.neighborhood}
              name={formModel.neighborhood.name}
              label={formModel.neighborhood.label}
              helperText={formModel.neighborhood.requiredErrorMessage}
              fullWidth
              autoComplete="off"
              variant="outlined"
            />
            <InputTextFormik
              value={values.complement}
              name={formModel.complement.name}
              label={formModel.complement.label}
              fullWidth
              autoComplete="off"
              variant="outlined"
            />
            <AddressesFormButtonContainer>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!(isValid && dirty)}
              >
                Adicionar endereço
              </Button>
            </AddressesFormButtonContainer>
          </AddressesFormikForm>
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
