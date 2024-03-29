import React, { useContext, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import { getSession } from "next-auth/client";

import Axios from "@api";
import useIsMounted from "@hooks/useIsMounted";
import useRequestState from "@hooks/useRequestState";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import { CartContext } from "@store/cart";
import { TipoEntrega } from "@models/pedido";
import { transformPriceToString } from "@utils/transformation";
import { SubtotalText } from "@components/shared/StyledComponents";
import { Modal, ConfirmationLayout, SuccessRequestLayout } from "@components/shared";

import CartOrdersList from "./CartOrdersList";
const CartAddress = dynamic(() => import("./CartAddress"));
const CartDeliveryType = dynamic(() => import("./CartDeliveryType"));
const CartLoggedOptions = dynamic(() => import("./CartLoggedOptions"));

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
  CartEmptyMessageContainer,
  RedirectMessage,
} from "./styled";

import type { Session } from "next-auth";
import type { AxiosError } from "axios";
import type { AddressOnCart } from "@models/endereco";

type Props = {
  onCloseModal: () => void;
};

const Cart: React.FC<Props> = ({ onCloseModal }) => {
  const isMounted = useIsMounted();
  const { products, order, resetCart } = useContext(CartContext);
  const [requestStatus, changeRequestStatus] = useRequestState();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [addresses, setAddresses] = useState<AddressOnCart[]>([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  const subTotalPrice = getSubTotalPrice();
  const cartFormInitialValues = getCartFormInitialValues();
  const cartFormValidationSchema = useCartFormValidationSchema(subTotalPrice);

  useEffect(() => {
    async function fetchAddresses(session: Session | null) {
      try {
        if (session) {
          const response = await Axios.get<AddressOnCart[]>(
            `/address/relations/${session.user.id_usuario}`
          );
          if (isMounted.current) setAddresses(response.data);
        }
      } catch (e) {
        const error = e as AxiosError;
        if (isMounted.current) changeRequestStatus({ error: error.response?.data.message });
      }
      setIsLoadingAddress(false);
    }

    async function fetchSession() {
      const result = await getSession();
      if (isMounted.current) {
        setSession(result);
        setIsLoadingSession(false);
      }
    }

    if (!session) fetchSession();
    if (isMounted.current) fetchAddresses(session);
  }, [session, isMounted, changeRequestStatus]);

  function getSubTotalPrice() {
    const subTotal = products.reduce(
      (acc, product) => (acc += product.total_price * product.quantity),
      0
    );
    if (order.tipo_cupom === "pedido" && order.valor_desconto)
      return ((100 - order.valor_desconto) * subTotal) / 100;
    return subTotal;
  }

  function changeShouldShowConfirmation(shouldShow: boolean) {
    setShouldShowConfirmation(shouldShow);
  }

  function cancelConfirmationHandler() {
    changeShouldShowConfirmation(false);
  }

  async function cartSubmitHandler(formValues: CartFormValues) {
    try {
      changeRequestStatus({ error: "", isLoading: true });
      if (!session) throw new Error("É necessário estar logado para finalizar pedidos");

      const cartSubmitData = getCartSubmitData(formValues, products, session.user.id_usuario);

      await Axios.post("/order", cartSubmitData);
      setIsOrderConfirmed(true);
      resetCart();
    } catch (e) {
      const error = e as Error;
      changeRequestStatus({ error: error.message });
    }

    changeRequestStatus({ isLoading: false });
  }

  return (
    <Modal onClose={onCloseModal}>
      {requestStatus.isLoading && (
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
            {isOrderConfirmed && !requestStatus.isLoading && (
              <SuccessRequestLayout successMessage="Pedido realizado com sucesso!">
                <RedirectMessage>
                  Visualize seu pedido em{" "}
                  <Link href={"/pedidos"}>
                    <a>pedidos!</a>
                  </Link>{" "}
                </RedirectMessage>
              </SuccessRequestLayout>
            )}

            {!isOrderConfirmed && !requestStatus.isLoading && (
              <CartForm>
                {products.length === 0 ? (
                  <CartEmptyMessageContainer>
                    <CartEmptyMessage>Carrinho vazio</CartEmptyMessage>
                  </CartEmptyMessageContainer>
                ) : (
                  <Fragment>
                    {shouldShowConfirmation ? (
                      <ConfirmationLayout
                        cancelProps={{
                          onClick: cancelConfirmationHandler,
                        }}
                        confirmProps={{
                          type: "submit",
                        }}
                        confirmationMessage="Tem certeza que deseja finalizar seu pedido?"
                      />
                    ) : (
                      <Fragment>
                        <CartFormTitle>Seu pedido</CartFormTitle>

                        {session && <CartDeliveryType />}

                        <CustomAnimatePresence>
                          {values.deliveryType === TipoEntrega.ENTREGA && (
                            <CartAddress
                              onCloseModal={onCloseModal}
                              addresses={addresses}
                              isLoadingAddress={isLoadingAddress}
                            />
                          )}
                        </CustomAnimatePresence>

                        <CartOrdersList products={products} />
                        <SubtotalText>
                          Subtotal: <span>R$ {transformPriceToString(subTotalPrice)}</span>
                        </SubtotalText>

                        {session && !isLoadingSession && (
                          <CartLoggedOptions
                            request={requestStatus}
                            subTotalPrice={subTotalPrice}
                            onChangeRequestStatus={changeRequestStatus}
                            onChangeShouldShowConfirmation={changeShouldShowConfirmation}
                          />
                        )}

                        {!session && !isLoadingSession && (
                          <CartFormLoginText>
                            Faça{" "}
                            <Link href={"/login"}>
                              <a>login</a>
                            </Link>{" "}
                            para continuar sua compra!
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
