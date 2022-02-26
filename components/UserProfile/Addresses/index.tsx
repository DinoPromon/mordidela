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
  AddressesInputContainer,
  AddressesFormButtonContainer,
} from "./styled";

const Addresses: React.FC = (props) => {
  const formModel = getAddressesFormModel();
  const validationSchema = getAddressesFormValidationSchema(formModel);
  const initialValues = getAddressesFormInitialValues();

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
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={addressFormSubmitHandler}
      >
        {({ values }) => (
          <AddressesInputContainer>
            <CustomInputsDesign>
              <InputTextFormik
                fullWidth
                name={formModel.publicPlace.name}
                value={values.publicPlace}
                autoComplete="off"
                variant="outlined"
                helperText={formModel.publicPlace.requiredErrorMessage}
                label={formModel.publicPlace.label}
              />
              <InputTextFormik
                autoComplete="off"
                variant="outlined"
                value={values.number}
                helperText={formModel.number.requiredErrorMessage}
                label={formModel.number.label}
                name={formModel.number.name}
              />
            </CustomInputsDesign>
            <InputTextFormik
              fullWidth
              autoComplete="off"
              values={values.neighborhood}
              variant="outlined"
              helperText={formModel.neighborhood.requiredErrorMessage}
              label={formModel.neighborhood.label}
              name={formModel.neighborhood.name}
            />
            <InputTextFormik
              fullWidth
              autoComplete="off"
              values={values.complement}
              variant="outlined"
              label={formModel.complement.label}
              name={formModel.complement.name}
            />
            <AddressesFormButtonContainer>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                // disabled={!(isValid && dirty)}
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
