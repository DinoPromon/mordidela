import React, { useContext, Fragment, useState, useEffect } from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { BsCheck2Circle } from "react-icons/bs/index";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import Endereco from "@models/endereco";
import CartOrdersList from "./CartOrdersList";
import CartDeliveryType from "./CartDeliveryType";
import CartLoggedOptions from "./CartLoggedOptions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CartContext } from "@store/cart";
import { FormButton, Modal } from "@components/shared";
import { RequestState } from "@my-types/request";
import { transformPriceToString } from "@utils/transformation";
import CartAddress from "./CartAddress";
import {
  CartForm,
  CartFormTitle,
  CartFormLoginText,
  CartEmptyMessage,
  CartLoadingContainer,
  CartFormSubtotalText,
  CartOrderConfirmation,
  CartOrderConfirmedIcon,
  CartOrderConfirmedMessage,
  CartEmptyMessageContainer,
  CartOrderConfirmationButtons,
} from "./styled";

type Props = {
  onCloseModal: () => void;
};

type CartFormValues = {
  delivery_type: string | null;
  address_id: Endereco["id_endereco"] | null;
  payment_type: string | null;
  payment_amount: string | null;
  cupom_id: string | null;
};

const Cart: React.FC<Props> = ({ onCloseModal }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [request, setRequest] = useState<RequestState>({
    error: "",
    isLoading: false,
    success: false,
  });
  const { products, order, resetCart } = useContext(CartContext);
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isPaymentOk, setIsPaymentOk] = useState(false);
  const [addresses, setAddresses] = useState<Endereco[]>([]);

  const canSubmit = isPaymentOk && Boolean(order.delivery_type);

  function getSubTotalPrice() {
    const subTotal = products.reduce((acc, cur) => (acc += cur.total_price * cur.quantity), 0);
    if (order.tipo_cupom === "pedido" && order.valor_desconto)
      return ((100 - order.valor_desconto) * subTotal) / 100;
    return subTotal;
  }

  function changeShouldShowConfirmation(shouldShow: boolean) {
    setShouldShowConfirmation(shouldShow);
  }

  const cartFormValidationSchema = yup.object().shape({
    delivery_type: yup.string().nullable().required("Selecione um tipo de entrega"),
    address_id: yup.number().nullable().required("Selecione um endereço de entrega"),
    payment_type: yup.string().nullable().required("Selecione um tipo de pagamento"),
    payment_amount: yup.string().nullable(),
    cupom_id: yup.string().nullable(),
  });

  const cartFormInitialValues: CartFormValues = {
    delivery_type: null,
    address_id: null,
    cupom_id: null,
    payment_amount: null,
    payment_type: null,
  };

  async function fetchAddresses(session: Session | null, isComponentMounted: boolean) {
    try {
      if (session) {
        const response = await fetch(`/api/address/${session.user.id_usuario}`);
        const data = await response.json();
        if (isComponentMounted) setAddresses(data.address as Endereco[]);
      }
    } catch (e) {
      const error = e as Error;
      setRequest({ error: error.message, isLoading: false, success: false });
    }
  }

  async function cartSubmitHandler(
    formValues: CartFormValues,
    formikHelpers: FormikHelpers<CartFormValues>
  ) {
    try {
      setRequest({ error: "", isLoading: true, success: false });
      if (session) {
        const produtos = products.map((item) => ({
          id_produto: item.product_id,
          quantidade: item.quantity,
          observacao: item.orderNote,
          adicionais: JSON.stringify(item.adds.map((add) => add.id_adicional)),
          sabores: JSON.stringify(item.flavors.map((flavor) => flavor.id_sabor)),
        }));

        const pedido = {
          troco_para: order.payment_amount,
          id_cupom: order.id_cupom,
          tipo_pagamento: order.payment_type,
          tipo_entrega: order.delivery_type,
          id_endereco: order.address_id,
          id_usuario: session.user.id_usuario,
        };

        if (canSubmit) {
          const response = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify({ produtos, pedido }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "");
          setRequest({ error: "", isLoading: false, success: true });
          setIsOrderConfirmed(true);
          resetCart();
        }
        return;
      }
      throw new Error("É necessário estar logado para finalizar pedidos.");
    } catch (e) {
      const error = e as Error;
      setRequest({ error: error.message, isLoading: false, success: false });
    }
  }

  const isCartEmpty = products.length === 0;

  useEffect(() => {
    let isMounted = true;
    async function hasSession() {
      const result = await getSession();
      setSession(result);
      setIsLoadingSession(false);
    }
    if (!session) hasSession();
    fetchAddresses(session, isMounted);
    return () => {
      isMounted = false;
    };
  }, [session]);

  const subTotalPrice = getSubTotalPrice();

  return (
    <Modal onClose={onCloseModal}>
      {request.isLoading && (
        <CartLoadingContainer>
          <CircularProgress />
        </CartLoadingContainer>
      )}

      {isOrderConfirmed && !request.isLoading && (
        <Fragment>
          <CartOrderConfirmedIcon>
            <BsCheck2Circle size={50} color="green" />
          </CartOrderConfirmedIcon>
          <CartOrderConfirmedMessage>Pedido realizado com sucesso!</CartOrderConfirmedMessage>
        </Fragment>
      )}

      {!isOrderConfirmed && !request.isLoading && (
        <Formik
          enableReinitialize
          validateOnChange={false}
          onSubmit={cartSubmitHandler}
          validationSchema={cartFormValidationSchema}
          initialValues={cartFormInitialValues}
        >
          {({ setFieldValue, values, errors, validateForm }) => (
            <CartForm>
              {isCartEmpty ? (
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
                      {session && (
                        <CartDeliveryType
                          selectedDeliveryType={values.delivery_type}
                          onSetDeliveryType={setFieldValue.bind(null, "delivery_type")}
                        />
                      )}
                      {order.delivery_type === "entrega" && (
                        <CartAddress
                          selectedAddressId={values.address_id}
                          addresses={addresses}
                          onSetAddressId={setFieldValue.bind(null, "address_id")}
                        />
                      )}
                      <CartOrdersList products={products} />
                      <CartFormSubtotalText>
                        Subtotal: <span>R$ {transformPriceToString(subTotalPrice)}</span>
                      </CartFormSubtotalText>
                      {session && !isLoadingSession && (
                        <CartLoggedOptions
                          onSetPaymentType={setFieldValue.bind(null, "payment_type")}
                          selectedPaymentType={values.payment_type}
                          canSubmit={canSubmit}
                          onChangeShouldShowConfirmation={changeShouldShowConfirmation}
                          onSetIsPaymentOk={setIsPaymentOk}
                          subTotalPrice={subTotalPrice}
                          request={request}
                        />
                      )}

                      {!session && !isLoadingSession && (
                        <CartFormLoginText>Faça login para continuar sua compra!</CartFormLoginText>
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </CartForm>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default Cart;
