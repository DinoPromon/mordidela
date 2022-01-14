import React, { Fragment } from "react";

import { CartFormRightAlignText } from "../styled";
import useFadeAnimation from "@hooks/useFadeAnimation";
import { transformPriceToString } from "@utils/transformation";

type Props = {
  deliveryPrice: number;
  shoulShowDeliveryPrice: boolean;
};

const DeliveryPrice: React.FC<Props> = (props) => {
  const showComponent = useFadeAnimation(props.shoulShowDeliveryPrice);

  return (
    <Fragment>
      {showComponent && (
        <CartFormRightAlignText shouldShowComponent={props.shoulShowDeliveryPrice}>
          Entrega: <span>R$ {transformPriceToString(props.deliveryPrice)}</span>
        </CartFormRightAlignText>
      )}
    </Fragment>
  );
};

export default DeliveryPrice;
