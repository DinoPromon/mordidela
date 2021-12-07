import React, { Fragment } from "react";

import CustomText from "./styled";
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
        <CustomText shouldShowComponent={props.shoulShowDeliveryPrice}>
          Entrega: <span>R$ {transformPriceToString(props.deliveryPrice)}</span>
        </CustomText>
      )}
    </Fragment>
  );
};

export default DeliveryPrice;
