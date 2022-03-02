import React, { useContext, Fragment, useState, useEffect } from "react";
import Axios from "@api";
import CartAddress from "./CartAddress";
import CartOrdersList from "./CartOrdersList";
import CartDeliveryType from "./CartDeliveryType";
import CartLoggedOptions from "./CartLoggedOptions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import { CartContext } from "@store/cart";
import { TipoEntrega } from "@models/pedido";
import { getSession } from "next-auth/client";
import { BsCheck2Circle } from "react-icons/bs/index";
import { transformPriceToString } from "@utils/transformation";
import { FormButton, Modal, CustomFade } from "@components/shared";
import {
  useCartFormValidationSchema,
  getCartFormInitialValues,
  CartFormValues,
  getCartSubmitData,
} from "./FormModel";
import {
  CartForm,
  CartFormTitle,
  CartFormLoginText,
  CartEmptyMessage,
  CartLoadingContainer,
  CartOrderConfirmation,
  CartOrderConfirmedIcon,
  CartOrderConfirmedMessage,
  CartEmptyMessageContainer,
  CartOrderConfirmationButtons,
} from "./styled";
import { SubtotalText } from "@components/shared/SharedStyledComponents";

import type { Session } from "next-auth";
import type { RequestState } from "@my-types/request";
import type { AddressOnCart } from "@models/endereco";

type Props = {
  onCloseModal: () => void;
};

const Cart: React.FC<Props> = ({ onCloseModal }) => {
  const { products, order, resetCart } = useContext(CartContext);
  const subTotalPrice = getSubTotalPrice();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [addresses, setAddresses] = useState<AddressOnCart[]>([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [request, setRequest] = useState<RequestState>({
    error: "",
    isLoading: false,
  });
  const cartFormValidationSchema = useCartFormValidationSchema(subTotalPrice);
  const cartFormInitialValues = getCartFormInitialValues();

  useEffect(() => {
    let isMounted = true;
    async function hasSession() {
      const result = await getSession();
      if (isMounted) {
        setSession(result);
        setIsLoadingSession(false);
      }
    }
    if (!session) hasSession();
    fetchAddresses(session, isMounted);
    return () => {
      isMounted = false;
    };
  }, [session]);

  function getSubTotalPrice() {
    const subTotal = products.reduce(
      (acc, product) => (acc += product.total_price * product.quantity),
      0
    );
    if (order.tipo_cupom === "pedido" && order.valor_desconto)
      return ((100 - order.valor_desconto) * subTotal) / 100;
    return subTotal;
  }

  function changeRequestStatus(status: Partial<RequestState>) {
    setRequest((prevState) => ({
      ...prevState,
      ...status,
    }));
  }

  function changeShouldShowConfirmation(shouldShow: boolean) {
    setShouldShowConfirmation(shouldShow);
  }

  async function fetchAddresses(session: Session | null, isComponentMounted: boolean) {
    try {
      if (session) {
        const response = await Axios.get<AddressOnCart[]>(
          `/address/relations/${session.user.id_usuario}`
        );
        if (isComponentMounted) setAddresses(response.data);
      }
    } catch (e) {
      const error = e as Error;
      setRequest({ error: error.message, isLoading: false });
    }
    setIsLoadingAddress(false);
  }

  async function cartSubmitHandler(formValues: CartFormValues) {
    try {
      setRequest({ error: "", isLoading: true });
      if (session) {
        const cartSubmitData = getCartSubmitData(formValues, products, session.user.id_usuario);

        await Axios.post("/order", cartSubmitData);

        setRequest({ error: "", isLoading: false });
        setIsOrderConfirmed(true);
        resetCart();
        return;
      }
      throw new Error("É necessário estar logado para finalizar pedidos");
    } catch (e) {
      const error = e as Error;
      setRequest({ error: error.message, isLoading: false });
    }
  }

  return (
    <Modal onClose={onCloseModal}>
      {request.isLoading && (
        <CartLoadingContainer>
          <CircularProgress />
        </CartLoadingContainer>
      )}

      <Formik
        enableReinitialize
        validateOnChange={false}
        onSubmit={cartSubmitHandler}
        validationSchema={cartFormValidationSchema}
        initialValues={cartFormInitialValues}
      >
        {({ values }) => (
          <Fragment>
            {isOrderConfirmed && !request.isLoading && (
              <Fragment>
                <CartOrderConfirmedIcon>
                  <BsCheck2Circle size={50} color="green" />
                </CartOrderConfirmedIcon>
                <CartOrderConfirmedMessage>Pedido realizado com sucesso!</CartOrderConfirmedMessage>
              </Fragment>
            )}

            {!isOrderConfirmed && !request.isLoading && (
              <CartForm>
                {products.length === 0 ? (
                  <CartEmptyMessageContainer>
                    <CartEmptyMessage>Carrinho vazio</CartEmptyMessage>
                  </CartEmptyMessageContainer>
                ) : (
                  <Fragment>
                    {shouldShowConfirmation ? (
                      <Fragment>
                        <CartOrderConfirmation>
                          Tem certeza que deseja finalizar seu pedido?
                        </CartOrderConfirmation>
                        <CartOrderConfirmationButtons>
                          <FormButton onClick={changeShouldShowConfirmation.bind(null, false)}>
                            Não
                          </FormButton>
                          <FormButton type="submit">Sim</FormButton>
                        </CartOrderConfirmationButtons>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <CartFormTitle>Seu pedido</CartFormTitle>

                        {session && <CartDeliveryType />}

                        {values.deliveryType === TipoEntrega.ENTREGA && (
                          <CustomFade
                            triggerAnimation={values.deliveryType === TipoEntrega.ENTREGA}
                          >
                            <CartAddress
                              onCloseModal={onCloseModal}
                              addresses={addresses}
                              isLoadingAddress={isLoadingAddress}
                            />
                          </CustomFade>
                        )}

                        <CartOrdersList products={products} />
                        <SubtotalText>
                          Subtotal: <span>R$ {transformPriceToString(subTotalPrice)}</span>
                        </SubtotalText>

                        {session && !isLoadingSession && (
                          <CartLoggedOptions
                            request={request}
                            subTotalPrice={subTotalPrice}
                            onChangeRequestStatus={changeRequestStatus}
                            onChangeShouldShowConfirmation={changeShouldShowConfirmation}
                          />
                        )}

                        {!session && !isLoadingSession && (
                          <CartFormLoginText>
                            Faça login para continuar sua compra!
                          </CartFormLoginText>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </CartForm>
            )}
          </Fragment>
        )}
      </Formik>
    </Modal>
  );
};

export default Cart;
