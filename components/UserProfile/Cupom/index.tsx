import React from "react";
import { PINK } from "@utils/colors";
import { RiCoupon3Line } from "react-icons/ri";
import { getFormatedDate } from "@utils/transformation";
import { PageContainer, PageTitle } from "@components/shared";
import { CupomContainer, CupomDataContainer, CupomTitle, CupomData } from "./styled";

import { RelatedUserCoupon, TipoCupom } from "@models/cupom";

type CouponsProps = {
  relatedCoupons: RelatedUserCoupon[];
};

const Coupons: React.FC<CouponsProps> = ({ relatedCoupons }) => {
  const usedCoupons = relatedCoupons.filter(
    (relatedCoupon) => Boolean(relatedCoupon.pedido) && relatedCoupon.foi_usado
  );

  const availableCoupons = relatedCoupons.filter((relatedCoupon) => relatedCoupon.pedido === null);

  function getCouponDiscountText(coupon: RelatedUserCoupon["cupom"]) {
    if (coupon.tipo === TipoCupom.ENTREGA) return "Frete grátis";

    return `${coupon.valor_desconto}% de desconto`;
  }

  function getCouponValidDate(coupon: RelatedUserCoupon["cupom"]) {
    if (coupon.data_fim === null) return `Válido até o uso`;

    return `Válido até ${getFormatedDate(coupon.data_fim)}`;
  }

  return (
    <PageContainer>
      <PageTitle>Cupons</PageTitle>
      <CupomContainer>
        <CupomTitle>Cupons disponíveis</CupomTitle>
        {availableCoupons.map((availabeCoupon) => (
          <CupomDataContainer key={`coupon-${availabeCoupon.data_obtencao}`}>
            <RiCoupon3Line size={40} color={PINK} />
            <CupomData>
              <p>
                {availabeCoupon.cupom.codigo} - {getCouponDiscountText(availabeCoupon.cupom)}
              </p>
              <span>{getCouponValidDate(availabeCoupon.cupom)}</span>
            </CupomData>
          </CupomDataContainer>
        ))}

        <CupomTitle>Cupons utilizados</CupomTitle>
        {usedCoupons.map((usedCoupon) => (
          <CupomDataContainer key={`coupon-${usedCoupon.id_usuario_cupom}`}>
            <RiCoupon3Line size={40} color={PINK} />
            <CupomData>
              <p>
                {usedCoupon.cupom.codigo} - {getCouponDiscountText(usedCoupon.cupom)}
              </p>
              <span>Utilizado no pedido {usedCoupon.pedido?.id_pedido}</span>
            </CupomData>
          </CupomDataContainer>
        ))}
      </CupomContainer>
    </PageContainer>
  );
};

export default Coupons;
